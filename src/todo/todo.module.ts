// src/todo/todo.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './todo.entity';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoEntity]) // Import TodoEntity for database interaction
  ],
  controllers: [TodoController], // Expose the TodoController
  providers: [TodoService], // Provide the TodoService
  exports: [TodoService], // Export TodoService if needed in other modules
})
export class TodoModule {}
