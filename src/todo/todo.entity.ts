import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { StatusEnum } from './status.enum';
import { BaseEntity } from './BaseEntity';
import { IsOptional } from 'class-validator';

@Entity('todo')
export class TodoEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  userId:number;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.PENDING,
  })
  status: StatusEnum;
  

  
 
}
