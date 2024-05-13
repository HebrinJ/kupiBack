import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { WishesService } from './wishes.service';

@UseGuards(JwtGuard)
@Controller('wishes')
export class WishesController {

    constructor(private wishService: WishesService) {}

    @Post()
    async createWish(@Request() req, @Body() body) {
        return this.wishService.createPresent(req, body);
    }
}
