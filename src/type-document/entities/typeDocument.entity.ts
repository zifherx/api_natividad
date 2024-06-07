import { Column, Entity, OneToOne } from 'typeorm';
import { ITypeDocument } from '../interfaces/typeDocument.interface';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../users/entities/user.entity';
import { BaseEntity } from 'src/database/entity/baseEntity';

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

    @ApiProperty()
    @Column('boolean', { default: 1 })
    isActive: boolean;

    @ApiProperty()
    @Column('boolean', { default: 0 })
    isDeleted: boolean;

    @OneToOne(() => UserEntity, (user: UserEntity) => user.typeDocumentId)
    usuario: UserEntity;
}
