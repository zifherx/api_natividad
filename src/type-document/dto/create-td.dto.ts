import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTypeDocumentDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    abbreviation: string;

    @IsNumber()
    @IsNotEmpty()
    length: number;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;
}
