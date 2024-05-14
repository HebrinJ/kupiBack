import { Entity, Column, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne,  } from 'typeorm';
import { IsUrl, Length, MaxLength } from 'class-validator'
import { Wish } from 'src/wishes/entities/wish.entity';
import { UserPublicProfileDto } from 'src/users/dto/user-public-profile.dto';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Wishlist {

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
  @IsUrl()
  image: string;

  @ManyToOne(() => User, (user) => user.id)
  owner: User;

  @OneToMany(() => Wish, (wish) => wish.owner)
  items: Wish[];
}