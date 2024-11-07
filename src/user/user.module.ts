import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.register({
    secret: 'your-secret-key', // replace with your actual secret
    signOptions: { expiresIn: '60m' }, // optional: configure token expiry
  }),],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
