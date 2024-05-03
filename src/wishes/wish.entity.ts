import { Entity, Column, OneToMany } from 'typeorm';
import { IsNumber, IsUrl, Length } from 'class-validator'
import { Content } from 'src/content.entity';
import { Offer } from 'src/offers/offer.entity';

@Entity()
export class Wish extends Content {

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
  owner: string;

  @Column()
  @Length(1, 1024)
  description: string;

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @Column()
  copied: number;
}