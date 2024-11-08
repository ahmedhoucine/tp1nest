// cv.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Skill } from 'src/skill/entities/skill.entity';

@Entity()
export class Cv {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  firstname: string;

  @Column()
  age: number;

  @Column()
  Cin: string;

  @Column()
  Job: string;

  @Column()
  path: string;

  @ManyToOne(() => User, (userId) => userId.cvs)
  userId: number;

  @ManyToMany(() => Skill, (skill) => skill.cvs)
  @JoinTable()
  skills: Skill[];
}
