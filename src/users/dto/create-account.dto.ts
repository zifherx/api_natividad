import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserInputDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
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

    cellphone?: string;
}
