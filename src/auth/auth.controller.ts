import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './auth.guard';

class RegisterDto {
    about: string;
    avatar: string;
    email: string;
    password: string;
    username: string;
}

class SigninDto {
    username: string;
    password: string;
}

@Controller()
export class AuthController {

    constructor(private authService: AuthService, private userService: UsersService) {}

    @UseGuards(LocalAuthGuard)
    @Post('signin')    
    signin(@Body() signinDto: SigninDto) {
        return this.authService.signin({ data: signinDto })
    }

    @Post('signup')
    signup(@Body() registerDto: RegisterDto) {        
        return this.userService.create(registerDto)        
    }
}
