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
        const raised = 0;
        const owner = await this.usersService.findById(req.user.id)
        
        const wish = { ...presentData, copied, offers, raised, owner };

        return await this.wishRepository.save(wish);
    }
}
