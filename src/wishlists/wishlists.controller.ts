import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { WishlistsService } from './wishlists.service';

@UseGuards(JwtGuard)
@Controller('wishlistlists')
export class WishlistsController {

    constructor(private wishlistService: WishlistsService) {};

    @Get()
    async getWishlists(@Request() req) {
        return this.wishlistService.getWishlist(req.user.id);
    }

    @Post()
    async createWishList(@Body() body, @Request() req) {
        return this.wishlistService.createWishlist(body, req.user.id);      
    }

    @Get(':id')
    async getWishlistById(@Param('id') wishlistId: number) {
        return this.wishlistService.getWishlistById(wishlistId);
    }

    @Patch(':id')
    async updateWishlist(@Param('id') wishlistId: number, @Body() wishlistData) {
        return this.wishlistService.updateWishlist(wishlistId, wishlistData);
    }

    @Delete(':id')
    async deleteFromWishlist(@Param('id') wishlistId: number) {
        return this.wishlistService.deleteWishlist(wishlistId);
    }
}
