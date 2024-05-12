import { Controller, Get, Headers, Body, UseGuards, Request, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/jwt/jwt.guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
    //constructor(private usersService: UsersService, private jwtService: JwtService) {}
    constructor(private usersService: UsersService) {}

    
    // @Get('me')
    // async findOne(@Headers() headers) {
    //     const token = headers.authorization;
    //     const userData = this.jwtHandlerService.decodeToken(token);
    //     return this.usersService.findUserByName(userData.username);
    // }

    @Get('me')
    async findOne(@Request() req) {        
        return this.usersService.findUserByName(req.username);
    }

    @Get(':username')
    async findUser(@Param('username') username: string): Promise<any> {
        return this.usersService.findUserByName(username);
    }

    // @Patch('me')
    // async updateUser(user: User, @Body() updateUserDto: any) {

    // }
}
