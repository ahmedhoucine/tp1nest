import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserService } from './user/user.service';
import { randFullName, randEmail, randPassword } from '@ngneat/falso';

async function bootstrap() {
  // Crée l'application sans contexte Web
  const appContext = await NestFactory.createApplicationContext(AppModule);

  // Récupère le service nécessaire pour le seed
  const userProfileService = appContext.get(UserService);

  // Génère des données fictives et les insère
  const fakeUsers = Array.from({ length: 10 }).map(() => ({
    name: randFullName(),
    email: randEmail(),
    password: randPassword(),
  }));

  for (const user of fakeUsers) {
    await userProfileService.create(user);
  }

  console.log('Seeding terminé.');
  await appContext.close();
}

bootstrap();
