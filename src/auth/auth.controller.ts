import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './guards/auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller()
export class AuthController {

    constructor(private authService: AuthService, private userService: UsersService) {}

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    signin(@Request() req) {
        return this.authService.signin({ username: req.user.username, id: req.user.id })
    }

    @Post('signup')
    signup(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)        
    }
}
