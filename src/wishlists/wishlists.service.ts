import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './wishlist.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { UserPublicProfileDto } from 'src/users/dto/user-public-profile.dto';

@Injectable()
export class WishlistsService {    

    constructor(
        @InjectRepository(Wishlist)
        private wishlistRepository: Repository<Wishlist>,
        private usersService: UsersService,
    ) {}

    async getWishlist(userId) {
        const wishlist = await this.wishlistRepository.find({
            where: {
                owner: {
                    id: userId,
                }
            }
        })

        return wishlist;
    }

    async createWishlist(wishlistData, userId) {
        const wishlist = new Wishlist();
        const user = await this.usersService.findById(userId);

        // const responseUser = new UserPublicProfileDto();
        // responseUser.username = user.username;
        // responseUser.about = user.about;
        // responseUser.id = user.id;
        // responseUser.avatar = user.avatar;
        // responseUser.createdAt = user.createdAt;
        // responseUser.updatedAt = user.updatedAt;

        wishlist.name = wishlistData.name;
        wishlist.image = wishlistData.image;
        wishlist.owner = user;
        wishlist.items = wishlistData.itemsId;

        return this.wishlistRepository.save(wishlist);
    }

    async getWishlistById(wishlistId: number) {

        const wishlist = await this.wishlistRepository.find({
            where: {
                id: wishlistId,
            }
        })

        return wishlist;
    }

    async updateWishlist(wishlistId: number, wishlistData) {

        const updatedWishlist = await this.wishlistRepository.update({ id: wishlistId }, { 
            name: wishlistData.name,
            image: wishlistData.image,
            items: wishlistData.itemsId,
        })

        return updatedWishlist;
    }

    async deleteWishlist(wishlistId: number) {
        return await this.wishlistRepository.delete({
            id: wishlistId,
        })
    }
}
