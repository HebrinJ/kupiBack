import { Controller, Get, Headers, Body, UseGuards, Request, Param, Patch, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}    

    @Get('me')
    async findOne(@Request() req) {
        return this.usersService.findById(req.user.id);
    }

    @Get(':username')
    async findUser(@Param('username') username: string): Promise<any> {
        return this.usersService.findUserByName(username);
    }

    // @Patch('me')
    // async updateUser(user: User, @Body() updateUserDto: any) {

    // }

    @Get('me/wishes')
    async findUserWishes (@Request() req) {
        
    }
}
