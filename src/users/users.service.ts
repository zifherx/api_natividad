import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInputDto } from './dto/create-account.dto';
import { CoreOutput } from '../database/dto/output.dto';
import { encryptPassword } from 'src/utils/hash-password';
import { TypeDocumentEntity } from '../type-document/entities/typeDocument.entity';
import { RoleEntity } from 'src/roles/entities/role.entity';

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
        if (!documentFound) throw new BadRequestException('Tipo de Documento no encontrado');

        const roleFound = await this.roleRepository.findOne({ where: { name: createUserInputDto.role } });
        if (!roleFound) throw new BadRequestException('Rol no encontrado');

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
                this.logger.log(`Create: Usuario creado con éxito.`);
                return { success: true, message: `Usuario creado con éxito.` };
            }
        } catch (err) {
            this.logger.error(`CatchCreate`, { error: err.message });
            throw new InternalServerErrorException(err.message);
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
            this.logger.error(`CatchGetAll`, { error: err.message });
            throw new InternalServerErrorException(err.message);
        }
    }
}
