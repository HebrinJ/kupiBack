import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { Wish } from 'src/wishes/entities/wish.entity';
import { WishesService } from 'src/wishes/wishes.service';

@Injectable()
export class WishlistsService {    

    constructor(
        @InjectRepository(Wishlist)
        private wishlistRepository: Repository<Wishlist>,
        private usersService: UsersService,
        private wishService: WishesService,
    ) {}

    async getWishlists() {        
        return await this.wishlistRepository.find();
    }

    async createWishlist(wishlistData: CreateWishlistDto, userId: number): Promise<Wishlist> {

        const user = await this.usersService.findById(userId);

        const promisses = wishlistData.itemsId.map(async (id) => {
            const wish = await this.wishService.getWishById(id);
            return wish;
        });
            
        const items = await Promise.all(promisses);

        const wishlist = this.wishlistRepository.create({
            ...wishlistData,
            items: items,
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

    async getWishlistItems(wishlistId: number): Promise<Wish[]> {

        const wishes = await this.wishlistRepository.findOne({
            where: {
                id: wishlistId,
            },
            relations: ['items'],
        })
        
        return wishes.items;
    }
}
