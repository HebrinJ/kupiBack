import { IsInt, IsNumber, IsString, Length, Min } from "class-validator";
import { Offer } from "src/offers/entities/offer.entity";

export class UserWishesDto {

    @IsNumber()
    id: number;

    @IsString()
    createdAt: string;

    @IsString()
    updatedAt: string;

    @IsString()
    @Length(1, 250)
    name: string;

    @IsString()
    link: string;

    @IsString()
    image: string;

    @IsNumber()
    @Min(1)
    price: number;

    @IsInt()
    @Min(1)
    raised: number;

    @IsNumber()
    copied: number;

    @IsString()
    @Length(1, 1024)
    description: string;

    offers: Offer[];    
}