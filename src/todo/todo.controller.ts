import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, ForbiddenException, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoService } from './todo.service';
import { TodoEntity } from './todo.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { StatusEnum } from './status.enum';
import { Request } from 'express';

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
  
  @Get('count-by-status')
  async getCountByStatus() {
    return this.todoService.countTodosByStatus();
  }

  @Get('all')
  async getAllTodos(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ todos: TodoEntity[]; total: number }> {
    return this.todoService.getAllTodos(page, limit);
  }

  @Post()
  async createTodo(
    @Body() createTodoDto: CreateTodoDto, 
    @Req() req: Request
  ) {
    const userId = req['userId'];
    return this.todoService.addTodo({ ...createTodoDto, userId });
  }

  @Get(':id')
  async getTodoById(@Param('id', ParseIntPipe) id: number): Promise<TodoEntity> {
    return this.todoService.getTodoById(id);
  }

  @Patch(':id')
  async updateTodo(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateTodoDto: UpdateTodoDto, 
    @Req() req: Request
  ) {
    const userId = req['userId'];
    const todo = await this.todoService.getTodoById(id);

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    if (todo.userId !== userId) {
      throw new ForbiddenException('You are not authorized to update this todo');
    }

    return this.todoService.updateTodo(id, updateTodoDto);
  }

  @Delete(':id')
  async softDeleteTodo(
    @Param('id', ParseIntPipe) id: number, 
    @Req() req: Request
  ) {
    const userId = req['userId'];
    const todo = await this.todoService.getTodoById(id);

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    if (todo.userId !== userId) {
      throw new ForbiddenException('You are not authorized to delete this todo');
    }

    return this.todoService.softDeleteTodo(id);
  }

  @Patch('restore/:id')
  async restoreTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.restoreTodo(id);
  }
}
