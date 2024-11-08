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
    const { userId, ...cvFields } = cvData;
    // Find user by ID
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    // Create a CV entity with the associated user
    const cv = this.cvRepository.create({
      ...cvFields, // Spread other fields
      user, // Associate the found user
    });
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

    // Validate skill IDs array
    if (!Array.isArray(skillIds) || skillIds.length === 0) {
      throw new Error('No skill IDs provided to add to the CV');
    }

    const skills = await this.skillRepository.findByIds(skillIds);
    cv.skills = [...cv.skills, ...skills];

    return this.cvRepository.save(cv);
  }
}
