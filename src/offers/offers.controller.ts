import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { OffersService } from './offers.service';

@UseGuards(JwtGuard)
@Controller('offers')
export class OffersController {

    constructor(private offerService: OffersService) {};

    @Post()
    async makeOffer(@Body() body, @Request() req) {
        return this.offerService.makeOffer(body, req.user.id);
    }

    @Get()
    async getOffers(@Request() req) {
        return this.offerService.getOffers(req.user.id);
    }

    @Get(':id')
    async getOfferById(@Param('id') id: number) {
        return this.offerService.getOffer(id);
    }
}
