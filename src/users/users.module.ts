import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Module({    
    providers: [UsersService, Repository<User>],
    controllers: [UsersController]
})
export class UsersModule {}
