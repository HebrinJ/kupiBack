import { Entity, Column, OneToMany, OneToOne,  } from 'typeorm';
import { IsNumber } from 'class-validator'
import { Content } from 'src/content.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Offer extends Content {

  @OneToMany(() => User, (user) => user.id) 
  user: User;

  @OneToOne(() => Wish, (wish) => wish.id)
  item: Wish;

  @Column()
  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;

  @Column({
    default: false
  })
  hidden: boolean
}