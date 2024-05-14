import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class UserPublicProfileDto {

    @IsNumber()
    id: number;

    @IsString()
    @Length(1, 64)
    @IsNotEmpty()
    username: string;

    @IsString()
    @Length(1, 200)
    about: string;

    @IsString()    
    avatar: string;

    @IsString()
    createdAt: Date;

    @IsString()
    updatedAt: Date;
    
}