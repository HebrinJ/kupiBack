import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { WishesService } from './wishes.service';
import { Wish } from './entities/wish.entity';

@UseGuards(JwtGuard)
@Controller('wishes')
export class WishesController {

    constructor(private wishService: WishesService) {}

    @Post()
    async createWish(@Request() req, @Body() body) {
        return this.wishService.createPresent(req, body);
    }

    @Get('last')
    async getLastWish() {
        return this.wishService.getLastWishes();
    }

    @Get(':id')
    async getWishById(@Param('id') id: number) {
        return this.wishService.getWishById(id);
    }

    @Post(':id/copy')
    async getWishCopy(@Param('id') id: number, @Request() req) {
        return this.wishService.createWishCopy(id, req.user.id);
    }

    @Delete(':id')
    async removeWishById(@Param('id') id: number): Promise<Wish> {
        return this.wishService.removeWishById(id);
    }
    
}
