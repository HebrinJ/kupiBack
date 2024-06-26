import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './guards/auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SignupUserResponseDto } from './dto/signup-user-response.dto';
import { User } from 'src/users/entities/user.entity';
import { SigninUserResponseDto } from './dto/signin-user-response.dto';
import { entityToDtoTransform } from 'src/utils/entityToDtoTransform';

@Controller()
export class AuthController {

    constructor(private authService: AuthService, private userService: UsersService) {}

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    signin(@Request() req): SigninUserResponseDto {
        return this.authService.signin({ username: req.user.username, id: req.user.id })
    }

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto): Promise<SignupUserResponseDto> {            
        const user: User = await this.userService.createUser(createUserDto);
        
        return entityToDtoTransform<User, SignupUserResponseDto>(user, SignupUserResponseDto)
    }
}
