import { Module } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { WishlistsController } from './wishlists.controller';
import { UsersModule } from 'src/users/users.module';
import { WishesModule } from 'src/wishes/wishes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist]), UsersModule, WishesModule],
  controllers: [WishlistsController],
  providers: [WishlistsService],
})
export class WishlistsModule {}
