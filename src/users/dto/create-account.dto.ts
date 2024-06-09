import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserInputDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    typeDocument: string;

    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    document: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    username: string;

    @MinLength(8)
    @IsNotEmpty()
    password: string;

    @IsOptional()
    cellphone?: string;

    @IsString()
    @IsNotEmpty()
    role: string;
}
