// skill.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { SkillService } from './skill.service';

@Module({
  imports: [TypeOrmModule.forFeature([Skill])], // Register SkillRepository
  providers: [SkillService],
  exports: [SkillService, TypeOrmModule], // Export both SkillService and TypeOrmModule
})
export class SkillModule {}
