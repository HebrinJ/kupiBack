import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './offer.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { WishesService } from 'src/wishes/wishes.service';

@Injectable()
export class OffersService {

    constructor(
        @InjectRepository(Offer)
        private offerRepository: Repository<Offer>,
        private usersService: UsersService,
        private wishesService: WishesService,
      ) {}

    async makeOffer(offerData, userId: number) {

        const user = await this.usersService.findById(userId);
        const wish = await this.wishesService.getWishById(offerData.itemId);
        await this.wishesService.raiseUp(offerData.amount, wish.id);

        const offer = new Offer();
        offer.amount = offerData.amount;
        offer.hidden = offerData.hidden;
        offer.item = wish;
        offer.user = user;

        return await this.offerRepository.save(offer);
    }

    async getOffers(userId: number) {

        const offers = await this.offerRepository.findOne({
            where: {
                user: {
                    id: userId
                },
            },
        });

        return offers;
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
