import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { WishesService } from './wishes.service';
import { Wish } from './entities/wish.entity';
import { CreateWishDto } from './dto/create-wish.dto';

@UseGuards(JwtGuard)
@Controller('wishes')
export class WishesController {

    constructor(private wishService: WishesService) {}

    @Post()
    createWish(@Request() req, @Body() createWishDto: CreateWishDto): object {
        this.wishService.createWish(req.user.id, createWishDto);
        return {};
    }

    @Get('last')
    async getLastWish(): Promise<Wish[]> {
        return await this.wishService.getLastWishes();
    }

    @Get('top')
    async getTopWish(): Promise<Wish[]> {
        return this.wishService.getTopWishes();
    }

    @Get(':id')
    async getWishById(@Param('id') id: number): Promise<Wish> {
        return this.wishService.getWishById(id);
    }

    @Post(':id/copy')
    async getWishCopy(@Param('id') wishId: number, @Request() req): Promise<Wish> {
        return this.wishService.createWishCopy(wishId, req.user.id);
    }

    @Delete(':id')
    async removeWishById(@Param('id') id: number) {
        await this.wishService.removeWishById(id);
    }
    
}
