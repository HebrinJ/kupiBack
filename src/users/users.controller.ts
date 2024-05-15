import { Controller, Get, Body, UseGuards, Request, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { WishesService } from 'src/wishes/wishes.service';
import { Wish } from 'src/wishes/entities/wish.entity';
import { User } from './entities/user.entity';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { instanceToPlain, plainToInstance } from 'class-transformer';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService, private wishesService: WishesService) {}

    @Get('me')
    async findOne(@Request() req): Promise<UserProfileResponseDto> {
        const user: User = await this.usersService.findById(req.user.id);
        
        const responsePlain = instanceToPlain(user);
        const responseDto = plainToInstance(UserProfileResponseDto, responsePlain);
        
        return responseDto;
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
}
