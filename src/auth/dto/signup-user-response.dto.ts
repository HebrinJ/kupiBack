import { IsEmail, IsNotEmpty, IsNumber, IsString, IsUrl, Length } from "class-validator";

export class SignupUserResponseDto {
    
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    @Length(1, 64)
    @IsNotEmpty()
    username: string;

    @IsString()
    @Length(1, 200)
    @IsNotEmpty()
    about: string;

    @IsString()
    @IsUrl()
    avatar: string;

    @IsEmail()
    email: string;

    @IsString()
    createdAt: string;

    @IsString()
    updatedAt: string;
}