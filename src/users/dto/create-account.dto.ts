import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { TypeDocumentEntity } from 'src/type-document/entities/typeDocument.entity';

export class CreateUserInputDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    typeDocumentId: TypeDocumentEntity;

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
}
