// src/todo/todo.controller.ts
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoService } from './todo.service';
import { TodoEntity } from './todo.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { StatusEnum } from './status.enum';


@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodos(
    @Query('name') name?: string,
    @Query('description') description?: string,
    @Query('status') status?: StatusEnum,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ todos: TodoEntity[]; total: number }> {
    return this.todoService.getTodos(name, description, status, page, limit);
  }

  @Get('all')
  async getAllTodos(): Promise<TodoEntity[]> {
    return this.todoService.getAllTodos();
  }
  
  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get(':id')
  async getTodoById(@Param('id', ParseIntPipe) id: number): Promise<TodoEntity> {
    return this.todoService.getTodoById(id);
  }

  
  @Patch(':id')
  async updateTodo(
    @Param('id') id: number, 
    @Body() updateTodoDto: UpdateTodoDto
  ) {
    return this.todoService.updateTodo(id, updateTodoDto);
  }

  @Delete(':id')
  async softDeleteTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.softDeleteTodo(id);
  }
  @Patch('restore/:id')
  async restoreTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.restoreTodo(id);
  }

  @Get('count-by-status')
  async getCountByStatus() {
    return this.todoService.countTodosByStatus();
  }

}
