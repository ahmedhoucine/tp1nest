// src/todo/todo.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { StatusEnum } from './status.enum';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async getTodos(
    name?: string,
    description?: string,
    status?: StatusEnum,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ todos: TodoEntity[]; total: number }> {
    // Validate that if name or description is provided, status must also be present
    if ((name || description) && !status) {
      throw new BadRequestException('Status must be provided if name or description is specified.');
    }

    const query = this.todoRepository.createQueryBuilder('todo');

    // If only status is provided, filter by status
    if (status) {
      query.andWhere('todo.status = :status', { status });
    }

    // If name is provided, filter by name
    if (name) {
      query.andWhere('todo.name ILIKE :name', { name: `%${name}%` });
    }

    // If description is provided, filter by description
    if (description) {
      query.andWhere('todo.description ILIKE :description', { description: `%${description}%` });
    }

    // Calculate total count of results before pagination
    const total = await query.getCount();

    // Apply pagination
    query.skip((page - 1) * limit).take(limit);

    const todos = await query.getMany();

    // Throw an exception if no Todos are found
    if (todos.length === 0) {
      throw new NotFoundException('No Todo items found for the given criteria.');
    }

    return { todos, total };
  }
  async getAllTodos(): Promise<TodoEntity[]> {
    return this.todoRepository.find(); 
  }

  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = this.todoRepository.create(createTodoDto);
    return this.todoRepository.save(todo);
  }
  async updateTodo(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    // Merge the update fields with the existing entity
    const updatedTodo = Object.assign(todo, updateTodoDto);
    return this.todoRepository.save(updatedTodo);
  }

  async softDeleteTodo(id: number): Promise<void> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    await this.todoRepository.softRemove(todo);
  }

  // Method to restore a soft deleted Todo
  async restoreTodo(id: number): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({ where: { id }, withDeleted: true });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    await this.todoRepository.restore(id);
    return this.todoRepository.findOne({ where: { id } });
  }

  async countTodosByStatus() {
    const pendingCount = await this.todoRepository.count({
      where: { status: StatusEnum.PENDING },
    });

    const inProgressCount = await this.todoRepository.count({
      where: { status: StatusEnum.IN_PROGRESS },
    });

    const completedCount = await this.todoRepository.count({
      where: { status: StatusEnum.COMPLETED },
    });

    return {
      pending: pendingCount,
      inProgress: inProgressCount,
      completed: completedCount,
    };
  }

  async getTodoById(id: number): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

}


