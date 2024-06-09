import { BaseEntity } from 'src/database/entity/baseEntity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { IRole } from '../interfaces/role.interface';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity({ name: 'Tbl_Roles' })
export class RoleEntity extends BaseEntity implements IRole {
    @Column('varchar', { length: 50, nullable: false })
    name: string;

    @Column('text', { nullable: false })
    description: string;

    @Column('boolean', { default: 1 })
    isActive: boolean;

    @Column('boolean', { default: 0 })
    isDeleted: boolean;

    @OneToMany(() => UserEntity, (user) => user.role)
    user: UserEntity;
}
