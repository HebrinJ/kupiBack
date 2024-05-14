import { Injectable, UseGuards } from '@nestjs/common';
import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Injectable()
export class WishesService {

    constructor(
        @InjectRepository(Wish)
        private wishRepository: Repository<Wish>,
        private usersService: UsersService,
      ) {}

    async createPresent(req: any, presentData): Promise<Wish> {

        const copied = 0;
        const offers = [];
        const raised = 1;
        const owner = await this.usersService.findById(req.user.id)
        
        const wish = { ...presentData, copied, offers, raised, owner };

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
        console.log('Its id')
        console.log(id)
        const wish = await this.wishRepository.findOne({
            where: {
                id: id,
            },
            relations: ['owner', 'offers', 'offers.user'],
        })

        return wish;
    }

    async removeWishById(id: number) {

        // const wish = this.getWishById(id);
        
        // await this.wishRepository.delete({
        //     id: id,
        // })

        // return wish;
        return await this.wishRepository.delete({
            id: id,
        })
    }

    async createWishCopy(wishId: number, userId: number): Promise<Wish> {

        const wish = await this.getWishById(wishId);
        const currCopied = wish.copied + 1;
        this.wishRepository.update({ id: wishId }, { copied: currCopied });
        
        // const copied = 0;
        // const offers = [];
        // const raised = 1;
        // const owner = await this.usersService.findById(userId);
        
        // const newWish = new Wish();
        // newWish.copied = copied;
        // newWish.description = wish.description;
        // newWish.image = wish.image;
        // newWish.link = wish.link;
        // newWish.name = wish.name;
        // newWish.offers = offers;
        // newWish.price = wish.price;
        // newWish.raised = raised;
        // newWish.owner = owner;

        const newWish = new Wish();
        Object.assign(newWish, wish);
        newWish.copied = 0;
        newWish.raised = 1;
        newWish.offers = [];
        newWish.owner = await this.usersService.findById(userId);

        return await this.wishRepository.save(newWish);
    }

    async getTopWishes(): Promise<Wish[]> {
        const wishes = await this.wishRepository.find({
            where: {},
            order: { copied: 'DESC' },
            take: 20,
        })

        return wishes;
    }

    async raiseUp(sum: number, wishId: number) {
        const wish = await this.getWishById(wishId);        

        // if((wish.raised + sum) > wish.price) {
        //     console.log('Слишком большая сумма')
        //     return;
        // }

        const raised = wish.raised + sum;

        this.wishRepository.update({ id: wishId }, { raised: raised });
    }
}
