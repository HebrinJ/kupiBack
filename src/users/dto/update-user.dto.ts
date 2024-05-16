import { IsEmail, IsOptional, IsString, Length, MaxLength, MinLength } from "class-validator";

export class UpdateUserDto {

    @IsOptional()
    @IsString()
    @Length(1, 64)
    username: string;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    about: string;

    @IsOptional()
    @IsString()
    avatar: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    @MinLength(2)
    password: string;    
}