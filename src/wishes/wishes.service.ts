import { Injectable, UseGuards } from '@nestjs/common';
import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateWishDto } from './dto/create-wish.dto';

@UseGuards(JwtGuard)
@Injectable()
export class WishesService {

    constructor(
        @InjectRepository(Wish)
        private wishRepository: Repository<Wish>,
        private usersService: UsersService,
      ) {}

    async createWish(userId: number, wishData: CreateWishDto): Promise<Wish> {

        const owner = await this.usersService.findById(userId);

        const wish = this.wishRepository.create({
            ...wishData,
            copied: 0,
            offers: [],
            raised: 0,
            owner,
        })
        
        return await this.wishRepository.save(wish);
    }

    async findUserWishes(userId: number): Promise<Wish[]> {

        const wishes = await this.wishRepository.find({
            where: {
                owner: {
                    id: userId,
                },
            },
        });

        return wishes;        
    }

    async getLastWishes(): Promise<Wish[]> {
        const wishes = await this.wishRepository.find({
            where: {},
            order: { id: 'DESC' },
            take: 40,
        })

        return wishes;
    }

    async getWishById(id: number): Promise<Wish> {

        const wish = await this.wishRepository.findOne({
            where: {
                id: id,
            },
            relations: ['owner', 'offers', 'offers.user'],
        })

        return wish;
    }

    async removeWishById(id: number) {
        await this.wishRepository.delete({
            id: id,
        })
    }

    async createWishCopy(wishId: number, userId: number): Promise<Wish> {

        const currentWish = await this.getWishById(wishId);
        const currCopied = currentWish.copied + 1;
        await this.wishRepository.update({ id: wishId }, { copied: currCopied });        

        const newWishData: CreateWishDto = {
            name: currentWish.name,
            link: currentWish.link,
            image: currentWish.image,
            price: currentWish.price,
            description: currentWish.description,
        }
        return await this.createWish(userId, { ...newWishData })
    }

    async getTopWishes(): Promise<Wish[]> {
        const wishes = await this.wishRepository.find({
            where: {},
            order: { copied: 'DESC' },
            take: 20,
        })

        return wishes;
    }

    async wishRaiseUp(sum: number, wishId: number) {
        const wish = await this.getWishById(wishId);

        const raised = wish.raised + sum;

        this.wishRepository.update({ id: wishId }, { raised: raised });
    }
}
