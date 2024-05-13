import { Injectable } from '@nestjs/common';
import { HashService } from 'src/hash/hash.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(private hashService: HashService, private userService: UsersService, private jwtService: JwtService) {}

    async validateUser(username, password): Promise<User> {
        const user = await this.userService.findUserByName(username);        
        const match = await this.hashService.comparePasswords(password, user.password);

        if(match) {
            return user;
        } else {
            return null;
        }
    }

    async signin(data) {
        console.log(data)
        return {
            access_token: this.jwtService.sign({ data: data.user, id: data.id})
        }
    }    
}
