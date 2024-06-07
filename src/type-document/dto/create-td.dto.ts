import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTypeDocumentDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    abbreviation: string;

    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;
}
