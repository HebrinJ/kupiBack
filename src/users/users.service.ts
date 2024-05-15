import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HashService } from 'src/hash/hash.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {    

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private hashService: HashService,
      ) {}

    async createUser(userData: CreateUserDto): Promise<User> {

        if(await this.checkUserExists(userData.username, userData.email)) {  
            throw new HttpException('Пользователь с таким email или username уже зарегистрирован', HttpStatus.CONFLICT);
        }
        
        const hashPassword = await this.hashService.hashPassword(userData.password);

        const newUser = new User();
        Object.assign(newUser, userData, { password: hashPassword });

        return await this.userRepository.save(newUser);
    }

    async checkUserExists(username: string, email: string): Promise<boolean> {

        const userByName = await this.findUserByName(username);
        
        if(userByName) return true;

        const usersByEmail = await this.findUsersByEmail(email);
        
        if(usersByEmail.length > 0) return true;
        
        return false;        
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

    async findUsersByQuery(queryString: string): Promise<User[]> {
        const isEmail = queryString.includes('@');

        if(isEmail) {
            return await this.findUsersByEmail(queryString);
        } else {
            const users: User[] = new Array<User>;
            users.push(await this.findUserByName(queryString))
            return users;
        }
    }
}
