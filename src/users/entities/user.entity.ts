import { BaseEntity } from 'src/database/entity/baseEntity';
import { Column, Entity } from 'typeorm';
import { IUser } from '../interfaces/user.interface';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity implements IUser {
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    cellphone: string;

    @Column()
    typeDocument: string;

    @Column({ unique: true })
    document: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    avatar: string;

    @Column('boolean', { default: 1 })
    status: boolean;

    @Column('boolean', { default: 0 })
    isDeleted: boolean;
}
