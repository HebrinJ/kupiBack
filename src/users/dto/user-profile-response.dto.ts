import { IsNumber, IsString, Length } from "class-validator";

export class UserProfileResponseDto {

    @IsNumber()
    id: number;

    @IsString()
    @Length(1, 64)
    username: string;

    @IsString()
    @Length(1, 200)
    about: string;

    @IsString()
    avatar: string;

    @IsString()
    email: string;

    @IsString()
    createdAt: Date;

    @IsString()
    updatedAt: Date;
}