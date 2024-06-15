import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInputDto } from './dto/create-account.dto';
import { CoreOutput } from '../database/dto/output.dto';
import { encryptPassword } from 'src/utils/hash-password';
import { TypeDocumentEntity } from '../type-document/entities/typeDocument.entity';
import { RoleEntity } from 'src/roles/entities/role.entity';
import { Constant } from 'src/constants/constant';
import { UpdateUserInputDto } from './dto/update-account.dto';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(TypeDocumentEntity)
        private readonly typeDocumentRepository: Repository<TypeDocumentEntity>,
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>,
    ) {}

    public async create(createUserInputDto: CreateUserInputDto): Promise<CoreOutput> {
        const documentFound = await this.typeDocumentRepository.findOne({ where: { abbreviation: createUserInputDto.typeDocument } });
        if (!documentFound) throw new BadRequestException(`Tipo de Documento ${Constant.MSG_NO_EXISTE}`);

        const roleFound = await this.roleRepository.findOne({ where: { name: createUserInputDto.role } });
        if (!roleFound) throw new BadRequestException(`Rol ${Constant.MSG_NO_EXISTE}`);

        const userDocumentExist = await this.findByDocument(createUserInputDto.document);
        // if (userDocumentExist) throw new BadRequestException(`Documento '${createUserInputDto.document}' ya está registrado.'`);

        const userEmailExist = await this.findByEmail(createUserInputDto.email);
        // if (userEmailExist != null) throw new BadRequestException(`Email '${createUserInputDto.email}' ya está registrado.'`);

        const usernameExist = await this.findByUsername(createUserInputDto.username);
        // if (usernameExist != null) throw new BadRequestException(`Nombre del usuario '${createUserInputDto.username}' ya está registrado.'`);

        try {
            let newUser = {
                firstName: createUserInputDto.firstName,
                lastName: createUserInputDto.lastName,
                document: createUserInputDto.document,
                email: createUserInputDto.email,
                username: createUserInputDto.username,
                password: await encryptPassword(createUserInputDto.password),
                typeDocument: documentFound,
                role: roleFound,
            } as UserEntity;

            let obj = this.userRepository.create(newUser);

            const query = await this.userRepository.save(obj);
            if (query) {
                this.logger.log(`Create: Usuario ${Constant.MSG_CREATE_EXITOSO}`);
                return { success: true, message: `Usuario ${Constant.MSG_CREATE_EXITOSO}` };
            }
        } catch (err) {
            this.logger.error(`CatchCreate: ${err.message}`);
            if (err.status === HttpStatus.BAD_REQUEST) {
                throw err;
            } else {
                throw new InternalServerErrorException(err.message);
            }
        }
    }

    public async getAll(): Promise<CoreOutput> {
        try {
            // const query = await this.userRepository
            //     .createQueryBuilder('u')
            //     .select('u.id', 'id')
            //     .addSelect('CONCAT(u.firstname, " ", u.lastname)', 'fullname')
            //     .addSelect('d.abbreviation', 'document')
            //     .addSelect('u.document', 'nro_document')
            //     .addSelect('u.cellphone', 'cellphone')
            //     .addSelect('u.email', 'email')
            //     .addSelect('u.username', 'username')
            //     .addSelect('u.avatar', 'avatar')
            //     .addSelect('u.role', 'rol')
            //     .addSelect('u.isActive', 'isActive')
            //     .addSelect('r.name', 'rol')
            //     .innerJoin(TypeDocumentEntity, 'd', 'd.id = u.typeDocumentId')
            //     .innerJoin(RoleEntity, 'r', 'r.id = u.roleId')
            //     .getRawMany();

            const query = await this.userRepository.find({ relations: { typeDocument: true, role: true } });

            // console.log(query);
            if (query.length == 0) throw new BadRequestException(`No existen registros`);

            this.logger.log(`GetAll: Listado de usuarios.`);
            return { success: true, total: query.length, data: query };
        } catch (err) {
            this.logger.error(`CatchGetAll: ${err.message}`);
            if (err.status === HttpStatus.BAD_REQUEST) {
                throw err;
            } else {
                throw new InternalServerErrorException(err.message);
            }
        }
    }

    public async findOneById(id: string): Promise<CoreOutput> {
        try {
            const userDeleted = await this.userRepository.query(`SELECT COUNT(1) as count FROM Tbl_Users WHERE id = '${id}' AND isDeleted = ${true}`);
            if (userDeleted[0].count == 1) throw new BadRequestException(`Usuario ${Constant.MSG_ELIMINADO}`);

            const query = await this.userRepository.findOneBy({ id });
            if (query == null) throw new BadRequestException(`Usuario ${Constant.MSG_NO_EXISTE}`);

            this.logger.log(`GetOneById: Usuario ${Constant.MSG_FOUNDED_EXITOSO}`);
            return { success: true, data: query };
        } catch (err) {
            this.logger.error(`CatchGetOneById: ${err.message}`);
            if (err.status === HttpStatus.BAD_REQUEST) {
                throw err;
            } else {
                throw new InternalServerErrorException(err.message);
            }
        }
    }

    public async updateById(id: string, updateUserInputDto: UpdateUserInputDto): Promise<CoreOutput> {
        try {
            const userDeleted = await this.userRepository.query(`SELECT COUNT(1) AS count FROM Tbl_Users WHERE id = '${id}' AND isDeleted = ${true}`);
            if (userDeleted[0].count == 1) throw new BadRequestException(`Usuario ${Constant.MSG_ELIMINADO} el `);

            const userExist = await this.userRepository.findOneBy({ id });
            if (userExist == null) throw new BadRequestException(`Usuario ${Constant.MSG_NO_EXISTE}`);

            const documentFound = await this.typeDocumentRepository.findOne({ where: { abbreviation: updateUserInputDto.typeDocument } });
            if (!documentFound) throw new BadRequestException(`Tipo de Documento ${Constant.MSG_NO_EXISTE}`);

            const roleFound = await this.roleRepository.findOne({ where: { name: updateUserInputDto.role } });
            if (!roleFound) throw new BadRequestException(`Rol ${Constant.MSG_NO_EXISTE}`);

            let updateUser = {
                ...updateUserInputDto,
                typeDocument: documentFound,
                role: roleFound,
            } as UserEntity;

            const query = await this.userRepository.update(id, updateUser);
            if (query.affected == 1) {
                this.logger.log(`UpdateById: Tipo de documento ${Constant.MSG_UPDATE_EXITOSO}`);
                return { success: true, message: `Tipo de documento ${Constant.MSG_UPDATE_EXITOSO}` };
            }
        } catch (err) {
            this.logger.error(`CatchUpdate: ${err.message}`);
            if (err.status === HttpStatus.BAD_REQUEST) {
                throw err;
            } else {
                throw new InternalServerErrorException(err.message);
            }
        }
    }

    public async deleteById(id: string): Promise<CoreOutput> {
        try {
            const userDeleted = await this.userRepository.query(`SELECT COUNT(1) AS count FROM Tbl_Users WHERE id = '${id}' AND isDeleted = ${true}`);
            if (userDeleted[0].count == 1) throw new BadRequestException(`Usuario ${Constant.MSG_ELIMINADO} el `);

            const userExist = await this.userRepository.findOneBy({ id });
            if (userExist == null) throw new BadRequestException(`Usuario ${Constant.MSG_NO_EXISTE}`);

            const query = await this.userRepository.update(id, { isDeleted: true, deletedAt: new Date() });
            if (query.affected == 1) {
                this.logger.log(`DeleteById: Usuario ${Constant.MSG_DELETE_EXITOSO}`);
                return { success: true, message: `Usuario ${Constant.MSG_DELETE_EXITOSO}` };
            }
        } catch (err) {
            this.logger.error(`CatchDelete: ${err.message}`);
            if (err.status === HttpStatus.BAD_REQUEST) {
                throw err;
            } else {
                throw new InternalServerErrorException(err.message);
            }
        }
    }

    public async findByDocument(document: string): Promise<UserEntity | HttpException> {
        let userFound: UserEntity;
        try {
            userFound = await this.userRepository.findOne({ where: { document } });
            if (userFound !== null) throw new BadRequestException(`Usuario con el documento '${document}' ya se encuentra registrado`);

            this.logger.log(`Usuario con el documento ${document} ${Constant.MSG_FOUNDED_EXITOSO}`);
            return userFound;
        } catch (err) {
            this.logger.error(`CatchFindByDocument: ${err.message}`);
            if (err.status === HttpStatus.BAD_REQUEST) {
                throw err;
            } else {
                throw new InternalServerErrorException(err.message);
            }
        }
    }

    public async findByEmail(email: string): Promise<UserEntity | HttpException> {
        let userFound: UserEntity;
        try {
            userFound = await this.userRepository.findOne({ where: { email } });
            if (userFound !== null) throw new BadRequestException(`Usuario con el email '${email}' ya se encuentra registrado`);

            this.logger.log(`Usuario con el email ${email} ${Constant.MSG_FOUNDED_EXITOSO}`);
            return userFound;
        } catch (err) {
            this.logger.error(`CatchFindByEmail: ${err.message}`);
            if (err.status === HttpStatus.BAD_REQUEST) {
                throw err;
            } else {
                throw new InternalServerErrorException(err.message);
            }
        }
    }

    public async findByUsername(username: string): Promise<UserEntity | HttpException> {
        let userFound: UserEntity;
        try {
            userFound = await this.userRepository.findOne({ where: { username } });
            if (userFound !== null) throw new BadRequestException(`Usuario con el nickname '${username}' ya se encuentra registrado`);

            this.logger.log(`Usuario con el nickname ${username} ${Constant.MSG_FOUNDED_EXITOSO}`);
            return userFound;
        } catch (err) {
            this.logger.error(`CatchFindByUsername: ${err.message}`);
            if (err.status === HttpStatus.BAD_REQUEST) {
                throw err;
            } else {
                throw new InternalServerErrorException(err.message);
            }
        }
    }
}
