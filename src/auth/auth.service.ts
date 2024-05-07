import { Injectable } from '@nestjs/common';
import { HashService } from 'src/hash/hash.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(private hashService: HashService, private userService: UsersService) {}

    // signup(userData) {
    //     Logger.log(userData);
    //     return userData;
    // }

    async signin(userData): Promise<string> {
        const { username, password } = userData;

        const user = await this.userService.findUserByName(username);

        const match = await this.hashService.comparePasswords(password, user.password);

        if(match) {
            return {
                access_token: token,
            }
        } else {
            
        }
    }
}
