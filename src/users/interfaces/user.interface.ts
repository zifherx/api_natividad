import { TypeDocumentEntity } from '../../type-document/entities/typeDocument.entity';

export interface IUser {
    firstName: string;
    lastName: string;
    typeDocument: TypeDocumentEntity;
    document: string;
    cellphone: string;
    email: string;
    username: string;
    password: string;
    avatar: string;
    isActive: boolean;
    isDeleted: boolean;
}
