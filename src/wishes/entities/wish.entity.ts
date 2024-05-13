import { Entity, Column, OneToMany, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, JoinTable } from 'typeorm';
import { IsNumber, IsUrl, Length } from 'class-validator'
import { Offer } from 'src/offers/offer.entity';
import { User } from 'src/users/entities/user.entity';

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

  @ManyToOne(() => User, (user) => user.id)
  @JoinTable()
  owner: User;

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @Column()
  copied: number;
}