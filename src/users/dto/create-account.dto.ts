import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, MinLength } from 'class-validator';

export class CreateUserInputDto {
    @IsString()
    @IsNotEmpty({ message: `Oops al parecer no has ingresado dato en este campo.` })
    firstName: string;

    @IsString()
    @IsNotEmpty({ message: `Oops al parecer no has ingresado dato en este campo.` })
    lastName: string;

    @IsString()
    typeDocument: string;

    @IsString()
    @MinLength(8, { message: `El documento debe tener 8 caracteres como mínimo.` })
    @IsNotEmpty({ message: `Oops al parecer no has ingresado dato en este campo.` })
    document: string;

    @IsEmail({}, { message: `Email ingresado es incorrecto.` })
    @IsNotEmpty({ message: `Oops al parecer no has ingresado dato en este campo.` })
    email: string;

    @IsNotEmpty({ message: `Oops al parecer no has ingresado dato en este campo.` })
    username: string;

    @MinLength(8, { message: `La contraseña debe tener 8 caracteres como mínimo.` })
    @IsNotEmpty({ message: `Oops al parecer no has ingresado dato en este campo.` })
    password: string;

    @IsOptional()
    cellphone?: string;

    @IsString()
    @IsNotEmpty({ message: `Oops al parecer no has ingresado dato en este campo.` })
    role: string;

    @IsOptional()
    isActive: boolean;

    @IsOptional()
    avatar: string;
}
