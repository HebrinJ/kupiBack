import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { WishlistsService } from './wishlists.service';
import { Wishlist } from './entities/wishlist.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { Wish } from 'src/wishes/entities/wish.entity';

@UseGuards(JwtGuard)
@Controller('wishlistlists')
export class WishlistsController {

    constructor(private wishlistService: WishlistsService) {};

    @Get()
    async getWishlists(): Promise<Wishlist[]> {
        return this.wishlistService.getWishlists();
    }

    @Post()
    async createWishList(@Body() createWishlistDto: CreateWishlistDto, @Request() req): Promise<Wishlist> {
        return this.wishlistService.createWishlist(createWishlistDto, req.user.id);      
    }

    @Get(':id')
    async getWishlistById(@Param('id') wishlistId: number): Promise<Wish[]> {
        return this.wishlistService.getWishlistItems(wishlistId);
    }

    @Delete(':id')
    async deleteFromWishlist(@Param('id') wishlistId: number) {
        return this.wishlistService.deleteWishlist(wishlistId);
    }
}
