import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserService } from './user/user.service';
import { CvService } from './cv/cv.service';
import { SkillService } from './skill/skill.service';
import { randFullName, randEmail, randPassword, randNumber, randJobTitle } from '@ngneat/falso';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);

  const userService = appContext.get(UserService);
  const cvService = appContext.get(CvService);
  const skillService = appContext.get(SkillService);

  // Step 1: Create Users
  const fakeUsers = Array.from({ length: 10 }).map(() => ({
    name: randFullName(),
    email: randEmail(),
    password: randPassword(),
  }));

  const users = [];
  for (const user of fakeUsers) {
    const createdUser = await userService.create(user);
    users.push(createdUser);
  }

  // Step 2: Create Skills
  const fakeSkills = Array.from({ length: 10 }).map(() => ({
    Designation: randJobTitle(),
  }));

  const skills = [];
  for (const skill of fakeSkills) {
    console.log(skill)
    const createdSkill = await skillService.create(skill);
    skills.push(createdSkill);
  }

  // Ensure skills were created before continuing
  if (skills.length === 0) {
    throw new Error('No skills were created');
  }

  // Step 3: Create CVs and Assign Skills
  for (const user of users) {
    const fakeCv = {
      name: user.name,
      firstname: user.name.split(" ")[0],
      age: randNumber({ min: 20, max: 60 }),
      Cin: `CIN${randNumber({ min: 100000, max: 999999 })}`,
      Job: randJobTitle(),
      path: `path/to/cv/${user.name}.pdf`,
      userId: user.id, // Pass userId here
    };
    

    // Create CV and associate it with the user
    const createdCv = await cvService.create(fakeCv);

    // Randomly select some skill IDs to assign to this CV
    const randomSkillIds = skills
      .slice(0, randNumber({ min: 1, max: skills.length }))
      .map((skill) => skill.id);

    // Only add skills if randomSkillIds is populated
    if (randomSkillIds.length > 0) {
      await cvService.addSkillsToCv(createdCv.id, randomSkillIds);
    }
  }

  console.log('Seeding completed.');
  await appContext.close();
}

bootstrap();
