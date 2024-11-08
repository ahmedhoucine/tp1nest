import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { Repository } from 'typeorm';
import { Skill } from 'src/skill/entities/skill.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private cvRepository: Repository<Cv>,
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Create a CV with user relation
  async create(cvData: any): Promise<Cv> {
    console.log(cvData)
    // Create a CV entity with the associated user
    const cv = this.cvRepository.create(cvData);
    // Save the CV entity and return the saved entity
    return this.cvRepository.save(cv); // Will return a single Cv entity
  }
  findAll() {
    return `This action returns all cv`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cv`;
  }

  update(id: number, updateCvDto: UpdateCvDto) {
    return `This action updates a #${id} cv`;
  }

  remove(id: number) {
    return `This action removes a #${id} cv`;
  }

  // Add skills to an existing CV
  async addSkillsToCv(cvId: number, skillIds: number[]): Promise<Cv> {
    const cv = await this.cvRepository.findOne({ where: { id: cvId }, relations: ['skills'] });
    if (!cv) throw new Error('CV not found');
  
    const skills = await this.skillRepository.findByIds(skillIds);
    
    // Check that skills have a valid Designation
    skills.forEach(skill => {
      if (!skill.Designation) {
        throw new Error(`Skill with ID ${skill.id} is missing a designation.`);
      }
    });
  
    cv.skills = [...cv.skills, ...skills];
    return this.cvRepository.save(cv);
  }
}
