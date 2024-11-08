import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Cv } from 'src/cv/entities/cv.entity';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Designation: string;

  @ManyToMany(() => Cv, (cv) => cv.skills)
  cvs: Cv[];
}
