import { BaseEntity } from 'src/database/entity/baseEntity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { IUser } from '../interfaces/user.interface';
import { ApiProperty } from '@nestjs/swagger';
import { TypeDocumentEntity } from '../../type-document/entities/typeDocument.entity';
import { RoleEntity } from 'src/roles/entities/role.entity';

@Entity({ name: 'Tbl_Users' })
export class UserEntity extends BaseEntity implements IUser {
    @Column('varchar', { length: 30 })
    firstName: string;

    @Column('varchar', { length: 30 })
    lastName: string;

    @Column({ nullable: true, default: null, length: 9 })
    cellphone: string;

    @ManyToOne(() => TypeDocumentEntity, (tdocument) => tdocument.id, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    typeDocument: TypeDocumentEntity;

    @Column({ length: 15, unique: true })
    document: string;

    @ApiProperty({
        example: 'test@test.es',
        uniqueItems: true,
        description: 'Cuenta de correo',
    })
    @Column({ length: 50, unique: true })
    email: string;

    @ApiProperty({
        description: 'Nombre de usuario',
        example: 'abc',
        minLength: 3,
    })
    @Column({ length: 50, unique: true })
    username: string;

    @ApiProperty({
        description: 'Contraseña de la cuenta.',
        minLength: 8,
        maxLength: 50,
    })
    @Column({ length: 65, select: false })
    password: string;

    @Column({ nullable: true, default: null })
    avatar: string;

    @ManyToOne(() => RoleEntity, (role) => role.id)
    role: RoleEntity;

    @ApiProperty()
    @Column('boolean', { default: 1 })
    isActive: boolean;

    @Column('boolean', { default: 0 })
    isDeleted: boolean;
}
