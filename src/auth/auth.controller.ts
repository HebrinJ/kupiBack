import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

class RegisterDto {
    about: string;
    avatar: string;
    email: string;
    password: string;
    username: string;
}

@Controller()
export class AuthController {

    constructor(private authService: AuthService, private userService: UsersService) {}

    @Post('signin')
    signin() {

    }

    @Post('signup')
    signup(@Body() registerDto: RegisterDto) {
        console.log(registerDto)
        return this.userService.create(registerDto)
    }
}
