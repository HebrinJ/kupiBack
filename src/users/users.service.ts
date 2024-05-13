import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HashService } from 'src/hash/hash.service';

@Injectable()
export class UsersService {    

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private hashService: HashService,
      ) {}

    async create(userData: any): Promise<User> {
        const { username, email, about, avatar, password } = userData;
        
        const hashPassword = await this.hashService.hashPassword(password);

        const user = new User();
        user.username = username;
        user.email = email;
        user.about = about;
        user.avatar = avatar;
        user.password = hashPassword;

        return await this.userRepository.save(user);
    }

    async updateUserProfile(id: number, userData: any): Promise<User> {
        const user = await this.findById(id);
        
        const { username, email, about, avatar, password } = userData;

        if(username) user.username = username;
        if(email) user.email = email;
        if(about) user.about = about;
        if(avatar) user.avatar = avatar;

        if(password) {
            const hashPassword = await this.hashService.hashPassword(password);
            user.password = hashPassword;
        }

        return await this.userRepository.save(user);
    }

    async findUserByName(name: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: {
                username: name,
            },
        });
        return user;
    }

    async findById(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({ id });

        return user;
    }

    async findUsersByEmail(email: string): Promise<User[]> {
        const users = await this.userRepository.find({ 
            where: {
                email: email,
            }, 
        });

        return users;
    }    
}
