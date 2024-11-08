import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { TestModule } from './test/test.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';
import { User } from './user/user.entity';
import { Skill } from './skill/entities/skill.entity';
import { Cv } from './cv/entities/cv.entity';

@Module({
  imports: [
    CommonModule,
    TestModule,
    TodoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'serpent00',
      database: 'todo',
      autoLoadEntities: true, // This will automatically load entities
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Cv, Skill]),  
    UserModule,
    CvModule,
    SkillModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
