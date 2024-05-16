import { Entity, Column, OneToMany, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { IsNumber, IsUrl, Length } from 'class-validator'
import { Offer } from 'src/offers/entities/offer.entity';
import { User } from 'src/users/entities/user.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';

@Entity()
export class Wish {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @Length(1, 250)
  name: string;

  @Column()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column()
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @Column()
  @IsNumber({ maxDecimalPlaces: 2 })
  raised: number;

  @Column()
  @Length(1, 1024)
  description: string;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @Column()
  copied: number;

  @ManyToMany(() => Wishlist, (wishlist) => wishlist.items)
  wishlist: Wishlist[];
}