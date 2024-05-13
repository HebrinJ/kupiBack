import { IsNotEmpty, IsString, Length, MinLength } from "class-validator";

export class SigninDto {
    
    @IsString()
    @Length(1, 64)
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @MinLength(2)
    password: string;
}