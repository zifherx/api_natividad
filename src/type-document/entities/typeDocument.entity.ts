import { Column, Entity, OneToMany } from 'typeorm';
import { ITypeDocument } from '../interfaces/typeDocument.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/database/entity/baseEntity';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity({ name: 'Tbl_TypeDocument' })
export class TypeDocumentEntity extends BaseEntity implements ITypeDocument {
    @ApiProperty({
        example: 'Documento Nacional Identidad',
        uniqueItems: true,
        description: 'Tipo de Documento del ciudadano',
    })
    @Column('varchar', { length: 50 })
    title: string;

    @ApiProperty({
        description: 'Abreviatura del documento de identidad',
        example: 'DNI',
    })
    @Column('varchar', { length: 20, nullable: false })
    abbreviation: string;

    @Column('numeric', { nullable: false })
    length: number;

    @ApiProperty()
    @Column('boolean', { default: 1 })
    isActive: boolean;

    @ApiProperty()
    @Column('boolean', { default: 0 })
    isDeleted: boolean;

    @OneToMany(() => UserEntity, (user) => user.typeDocument)
    user: UserEntity[];
}
