import { Injectable } from '@nestjs/common';
import { HashService } from 'src/hash/hash.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(private hashService: HashService, private userService: UsersService, private jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<User> {
        const user = await this.userService.findUserByName(username);
        
        if(user) {
            const match = await this.hashService.comparePasswords(password, user.password);

            if(match) return user;
        }
        
        return null;        
    }

    signin({ username, id }) {
        
        return {
            access_token: this.jwtService.sign({ username, id })
        }
    }    
}
