import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { WishesService } from 'src/wishes/wishes.service';
import { CreateOfferDto } from './dto/create-offer.dto';

@Injectable()
export class OffersService {

    constructor(
        @InjectRepository(Offer)
        private offerRepository: Repository<Offer>,
        private usersService: UsersService,
        private wishesService: WishesService,
      ) {}

    async makeOffer(offerData: CreateOfferDto, userId: number): Promise<Offer> {

        const wish = await this.wishesService.getWishById(offerData.itemId);
        
        if(wish.owner.id === userId) {
            throw new HttpException('Нельзя поддерживать свои подарки', HttpStatus.BAD_REQUEST);
        }
        
        if((wish.raised + offerData.amount) > wish.price) {
            throw new HttpException('Слишком большая сумма', HttpStatus.BAD_REQUEST);
        }

        const user = await this.usersService.findById(userId);
        await this.wishesService.wishRaiseUp(offerData.amount, wish.id);

        const offer = this.offerRepository.create({
            amount: offerData.amount,
            hidden: offerData.hidden,
            item: wish,
            user: user,
        })

        return await this.offerRepository.save(offer);
    }    

    async getOffer(offerId: number) {

        const offer = await this.offerRepository.findOne({
            where: {
                id: offerId               
            },
        });

        return offer;
    }
}
