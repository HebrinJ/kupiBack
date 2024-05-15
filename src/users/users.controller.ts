import { Controller, Get, Body, UseGuards, Request, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { WishesService } from 'src/wishes/wishes.service';
import { Wish } from 'src/wishes/entities/wish.entity';
import { User } from './entities/user.entity';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPublicProfileDto } from './dto/user-public-profile.dto';
import { entityToDtoTransform } from 'src/utils/entityToDtoTransform';
import { UserWishesDto } from './dto/user-wishes.dto';
import { FindUserDto } from './dto/find-users.dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService, private wishesService: WishesService) {}

    @Get('me')
    async findOne(@Request() req): Promise<UserProfileResponseDto> {
        const user: User = await this.usersService.findById(req.user.id);
        return entityToDtoTransform<User, UserProfileResponseDto>(user, UserProfileResponseDto);        
    }    

    @Post('find')
    async findUsersByEmail(@Body() findUserDto: FindUserDto): Promise<UserProfileResponseDto[]> {
        const users: User[] = await this.usersService.findUsersByQuery(findUserDto.query);
        return entityToDtoTransform<User[], UserProfileResponseDto[]>(users, UserProfileResponseDto);
    }

    @Patch('me')
    async updateUser(@Request() req, @Body() updateUserDto: UpdateUserDto): Promise<UserProfileResponseDto> {
        const user: User = await this.usersService.updateUserProfile(req.user.id, updateUserDto);
        return entityToDtoTransform<User, UserProfileResponseDto>(user, UserProfileResponseDto);        
    }

    @Get('me/wishes')
    async findUserWishes (@Request() req): Promise<Wish[]> {        
        return this.wishesService.findUserWishes(req.user.id);
    }

    @Get(':username')
    async findUserByName(@Param('username') username: string): Promise<UserPublicProfileDto> {
        const user: User = await this.usersService.findUserByName(username);
        return entityToDtoTransform<User, UserPublicProfileDto>(user, UserPublicProfileDto);
    }

    @Get(':username/wishes')
    async findWishesByUser(@Param('username') username: string): Promise<UserWishesDto> {
        const user = await this.usersService.findUserByName(username);
        const id = user.id;

        const userWishes = await this.wishesService.findUserWishes(id);
        return entityToDtoTransform<Wish[], UserWishesDto>(userWishes, UserWishesDto);
    }
}
