import { Controller, Get, Headers, Body, UseGuards, Request, Param, Patch, Req, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { WishesService } from 'src/wishes/wishes.service';
import { UserWishesDto } from './dto/user-wishes.dto';
import { Wish } from 'src/wishes/entities/wish.entity';
import { User } from './entities/user.entity';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService, private wishesService: WishesService) {}    

    @Get('me')
    async findOne(@Request() req) {
        return this.usersService.findById(req.user.id);
    }

    @Get(':username')
    async findUserByName(@Param('username') username: string): Promise<User> {
        return this.usersService.findUserByName(username);
    }

    @Get(':username/wishes')
    async findWishesByUser(@Param('username') username: string): Promise<Wish[]> {
        const user = await this.usersService.findUserByName(username);
        const id = user.id;

        return this.wishesService.findUserWishes(id);
    }

    @Post('find')
    async findUsersByEmail(@Body() body): Promise<User[]> {
        const email = body.query;
        
        return this.usersService.findUsersByEmail(email);
    }

    @Patch('me')
    async updateUser(@Request() req, @Body() body): Promise<User> {
        return this.usersService.updateUserProfile(req.user.id, body);
    }

    @Get('me/wishes')
    async findUserWishes (@Request() req): Promise<Wish[]> {
        return this.wishesService.findUserWishes(req.user.id);
    }
}
