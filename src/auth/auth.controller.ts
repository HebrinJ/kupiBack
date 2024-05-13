import { Controller, Post, Body, UseGuards, Req, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './guards/auth.guard';
import { SigninDto } from './dto/signin-user.dto';
import { RegisterDto } from './dto/register-user.dto';

@Controller()
export class AuthController {

    constructor(private authService: AuthService, private userService: UsersService) {}

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    signin(@Request() req) {        
        return this.authService.signin({ username: req.user.username, id: req.user.id })
    }

    @Post('signup')
    signup(@Body() registerDto: RegisterDto) {
        return this.userService.create(registerDto)        
    }
}
