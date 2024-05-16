import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';

@UseGuards(JwtGuard)
@Controller('offers')
export class OffersController {

    constructor(private offerService: OffersService) {};

    @Post()
    async makeOffer(@Body() createOfferDto: CreateOfferDto, @Request() req): Promise<Offer> {
        return this.offerService.makeOffer(createOfferDto, req.user.id);
    }

    @Get(':id')
    async getOfferById(@Param('id') id: number): Promise<Offer> {
        return this.offerService.getOffer(id);
    }
}
