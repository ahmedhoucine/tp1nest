// src/seeder/seeder.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Cv } from 'src/cv/entities/cv.entity';
import { Skill } from 'src/skill/entities/skill.entity';
import { randFirstName, randLastName, randJobTitle, randNumber, randText, randEmail } from '@ngneat/falso';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Cv)
    private cvRepository: Repository<Cv>,
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}

  async seed() {
    console.log('Starting database seeding...');
  
    // Seed Users
    const users = Array.from({ length: 10 }).map(() => {
      const user = new User();
      user.email = randEmail();
      user.password = 'password123';
      return user;
    });
    await this.userRepository.save(users);
    console.log('Users seeded:', users.length);
  
    // Seed CVs
    const cvs = Array.from({ length: 20 }).map(() => {
      const cv = new Cv();
      cv.name = randFirstName();
      cv.firstname = randLastName();
      cv.age = randNumber({ min: 20, max: 60 });
      cv.Cin = randText({ charCount: 8 });
      cv.Job = randJobTitle();
      cv.path = randText();
      cv.user = users[Math.floor(Math.random() * users.length)];
      return cv;
    });
    await this.cvRepository.save(cvs);
    console.log('CVs seeded:', cvs.length);
  
    // Seed Skills
    const skills = Array.from({ length: 15 }).map(() => {
      const skill = new Skill();
      skill.Designation = randJobTitle();
      return skill;
    });
    await this.skillRepository.save(skills);
    console.log('Skills seeded:', skills.length);
  
    console.log('Database seeding completed.');
  }
  
}
