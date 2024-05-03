import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users/users.controller';
import { User } from './users/user.entity';
import { Content } from './content.entity';
import { WishesController } from './wishes/wishes.controller';
import { WishlistsController } from './wishlists/wishlists.controller';
import { OffersController } from './offers/offers.controller';
import { Wish } from './wishes/wish.entity';
import { Wishlist } from './wishlists/wishlist.entity';
import { Offer } from './offers/offer.entity';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { WishesService } from './wishes/wishes.service';
import { WishesModule } from './wishes/wishes.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { OffersService } from './offers/offers.service';
import { OffersModule } from './offers/offers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'student',
      password: 'student',
      database: 'kupipodariday',
      entities: [Content, User, Wish, Wishlist, Offer],
      synchronize: true,
    }),
    UsersModule,
    WishesModule,
    WishlistsModule,
    OffersModule,
  ],
  controllers: [AppController, UsersController, WishesController, WishlistsController, OffersController],
  providers: [AppService, UsersService, WishesService, OffersService],
})
export class AppModule {}
