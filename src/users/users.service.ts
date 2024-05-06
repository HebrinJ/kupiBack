import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
      ) {}

    async create(userData: any): Promise<User> {
        const { username, email, about, avatar, password } = userData;
        
        const user = new User();
        user.username = username;
        user.email = email;
        user.about = about;
        user.avatar = avatar;
        user.password = password;

        return await this.userRepository.save(user);
    }

    findOne(): string {
        return 'user';
    }

    updateOne() {}

    removeOne() {}
    
}
