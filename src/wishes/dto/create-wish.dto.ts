import { IsNotEmpty, IsNumber, IsString, Length, Min } from "class-validator";

export class CreateWishDto {
    
    @IsString()
    @Length(1, 250)
    @IsNotEmpty()
    name: string;

    @IsString()
    link: string;

    @IsString()
    image: string;

    @IsNumber()
    @Min(1)
    price: number;

    @IsString()
    description: string;
}