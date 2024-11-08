import {BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException} from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {Response, Request} from 'express';
import { User } from './user.entity';

@Controller('api')
export class UserController {
    constructor(
        private readonly appService: UserService,
        private jwtService: JwtService
    ) {
    }
    @Get('all')
    async getAllUsers(): Promise<User[]> {
        return this.appService.findAll();
      }
    @Post('register')
    async register(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string
    ) {
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await this.appService.create({
            name,
            email,
            password: hashedPassword
        });

        delete user.password;

        return user;
    }

    @Post('login')
    async login(
        @Body('id') id: number,
        @Body('password') password: string,
        @Res({passthrough: true}) response: Response
    ) {
        const user = await this.appService.findOne({id});

        if (!user) {
            throw new BadRequestException('invalid email');
        }

        if (!await bcrypt.compare(password, user.password)) {
            throw new BadRequestException('invalid password');
        }

        const jwt = await this.jwtService.signAsync({id: user.id});

        return(jwt)

       
    }
    @Post('extract-userid')
  extractUserId(@Body('token') token: string): string {
    
        try {
          const decoded = this.jwtService.decode(token) as { userId: string };
          return decoded.userId || null;
        } catch (error) {
          console.error('Invalid or expired token', error);
          return null;
        }
      
  }

    @Get('user')
    async user(@Req() request: Request) {
        try {
            const cookie = request.cookies['jwt'];

            const data = await this.jwtService.verifyAsync(cookie);

            if (!data) {
                throw new UnauthorizedException();
            }

            const user = await this.appService.findOne({id: data['id']});

            const {password, ...result} = user;

            return result;
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    
}