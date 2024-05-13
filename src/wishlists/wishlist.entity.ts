import { Entity, Column, OneToMany,  } from 'typeorm';
import { IsUrl, Length, MaxLength } from 'class-validator'
import { Content } from 'src/content.entity';
import { Wish } from 'src/wishes/entities/wish.entity';

@Entity()
export class Wishlist extends Content {

  @Column()
  @Length(1, 250)
  name: string;

  @Column()
  @MaxLength(1500)
  description: string;

  @Column()
  @IsUrl()
  image: string;

  @OneToMany(() => Wish, (wish) => wish.owner)
  items: Wish[];
}