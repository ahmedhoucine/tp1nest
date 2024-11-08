import { Cv } from "src/cv/entities/cv.entity";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;
    @OneToMany(() => Cv, (cv) => cv.user)
  cvs: Cv[];
}