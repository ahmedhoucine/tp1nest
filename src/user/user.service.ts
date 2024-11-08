import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import { User } from './user.entity';
import {Repository} from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {
    }

    async create(data: any): Promise<User> {
        return this.userRepository.save(data);
    }
    async findAll(): Promise<User[]> {
        return this.userRepository.find();
      }
    async findOne(where: { id: number }): Promise<User | undefined> {
        return this.userRepository.findOne({ where });
    }
    
}