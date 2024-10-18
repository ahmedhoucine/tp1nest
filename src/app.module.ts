import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { TestModule } from './test/test.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './todo/todo.entity';
import { TodoModule } from './todo/todo.module';


@Module({
  imports: [CommonModule,TestModule,TodoModule,
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'serpent00',
      database: 'todo',
      autoLoadEntities:true,
      synchronize: true, 
    }),
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
