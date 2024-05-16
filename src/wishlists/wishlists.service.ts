import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';

@Injectable()
export class WishlistsService {    

    constructor(
        @InjectRepository(Wishlist)
        private wishlistRepository: Repository<Wishlist>,
        private usersService: UsersService,
    ) {}

    async getWishlists() {        
        return await this.wishlistRepository.find();
    }

    async createWishlist(wishlistData: CreateWishlistDto, userId: number): Promise<Wishlist> {

        const user = await this.usersService.findById(userId);

        const wishlist = this.wishlistRepository.create({
            ...wishlistData,
            owner: user,
        })

        return await this.wishlistRepository.save(wishlist);
    }

    async getWishlistById(wishlistId: number): Promise<Wishlist> {

        const wishlist = await this.wishlistRepository.findOne({
            where: {
                id: wishlistId,
            }
        })

        return wishlist;
    }

    async deleteWishlist(wishlistId: number) {
        return await this.wishlistRepository.delete({
            id: wishlistId,
        })
    }
}
