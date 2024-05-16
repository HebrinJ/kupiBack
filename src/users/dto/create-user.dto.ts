import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, Length, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @MaxLength(200)
    about: string;

    @IsOptional()
    @IsString()
    @IsUrl()
    avatar: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(2)
    @IsNotEmpty()
    password: string;

    @IsString()
    @Length(1, 64)
    @IsNotEmpty()
    username: string;
}