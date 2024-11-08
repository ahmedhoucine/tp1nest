import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './todo.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { AuthMiddleware } from '../auth/auth.middleware';
import { AuthMiddlewarepost } from '../auth/auth.middlewarepost';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddlewarepost)
      .forRoutes({ path: 'todo', method: RequestMethod.POST },
        { path: 'todo*', method: RequestMethod.PATCH },
        { path: 'todo*', method: RequestMethod.DELETE } 

      );
  }
}
