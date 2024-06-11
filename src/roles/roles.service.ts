import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { Repository } from 'typeorm';
import { CoreOutput } from 'src/database/dto/output.dto';
import { Constant } from 'src/constants/constant';

@Injectable()
export class RolesService {
    private readonly logger: Logger = new Logger(RolesService.name);

    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>,
    ) {}

    public async create(createRoleDto: CreateRoleDto): Promise<CoreOutput> {
        const roleFound = await this.findRoleByName(createRoleDto.name);
        if (roleFound) throw new BadRequestException(`Rol ya existe`);

        try {
            const obj = this.roleRepository.create(createRoleDto);
            const query = this.roleRepository.save(obj);
            if (query) {
                this.logger.log(`Create: Rol ${Constant.MSG_CREATE_EXITOSO}`);
                return { success: true, message: `Rol ${Constant.MSG_CREATE_EXITOSO}` };
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

    public async findAll(): Promise<CoreOutput> {
        try {
            const query = await this.roleRepository.find();
            if (query.length == 0) throw new BadRequestException(`No existen registros.`);
            this.logger.log('GetAll: Listado de roles');
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

    public async findOne(id: string): Promise<CoreOutput> {
        try {
            const roleDeleted = await this.roleRepository.query(`SELECT COUNT(1) AS count FROM Tbl_Roles WHERE id = '${id}' AND isDeleted = ${true}`);
            if (roleDeleted[0].count == 1) throw new BadRequestException(`Rol ${Constant.MSG_ELIMINADO}`);

            const query = await this.roleRepository.findOneBy({ id });
            if (query == null) throw new BadRequestException(`Rol '${id}' ${Constant.MSG_NO_EXISTE}`);

            this.logger.log(`GetFindOne: Rol ${Constant.MSG_FOUNDED_EXITOSO}`);
            return { success: true, data: query };
        } catch (err) {
            this.logger.error(`CathFindOne: ${err.message}`);
            if (err.status === HttpStatus.BAD_REQUEST) {
                throw err;
            } else {
                throw new InternalServerErrorException(err.message);
            }
        }
    }

    public async updateById(id: string, updateRoleDto: UpdateRoleDto): Promise<CoreOutput> {
        try {
            const roleDeleted = await this.roleRepository.query(`SELECT COUNT(1) AS count FROM Tbl_Roles WHERE id = '${id}' AND isDeleted = ${true}`);
            if (roleDeleted[0].count == 1) throw new BadRequestException(`Rol ${Constant.MSG_ELIMINADO}`);

            const roleFound = await this.roleRepository.findOneBy({ id });
            if (roleFound == null) throw new BadRequestException(`idRol '${id}' ${Constant.MSG_NO_EXISTE}`);

            const query = await this.roleRepository.update(id, updateRoleDto);
            if (query.affected == 1) {
                this.logger.log(`UpdateById: Rol ${Constant.MSG_UPDATE_EXITOSO}`);
                return { success: true, message: `Rol ${Constant.MSG_UPDATE_EXITOSO}` };
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

    public async removeById(id: string): Promise<CoreOutput> {
        try {
            const roleDeleted = await this.roleRepository.query(`SELECT COUNT(1) AS count FROM Tbl_Roles WHERE id = '${id}' AND isDeleted = ${true}`);
            if (roleDeleted[0].count == 1) throw new BadRequestException(`Rol ${Constant.MSG_ELIMINADO}`);

            const roleFound = await this.roleRepository.findOneBy({ id });
            if (roleFound == null) throw new BadRequestException(`idRol '${id}' ${Constant.MSG_NO_EXISTE}`);

            const query = await this.roleRepository.update(id, { isDeleted: true, deletedAt: new Date() });
            if (query.affected == 1) {
                this.logger.log(`DeleteById: Rol ${Constant.MSG_DELETE_EXITOSO}`);
                return { success: true, message: `Rol ${Constant.MSG_DELETE_EXITOSO}` };
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

    async findRoleByName(name: string): Promise<RoleEntity | HttpException> {
        let roleFound: RoleEntity;
        try {
            roleFound = await this.roleRepository.findOne({ where: { name } });
            console.log(roleFound);
            if (roleFound !== null) throw new BadRequestException(`Rol '${name}' ya existe.`);
            this.logger.log(`Rol ${name} ${Constant.MSG_FOUNDED_EXITOSO}`);
            return roleFound;
        } catch (err) {
            this.logger.error(`CatchFindByName: ${err.message}`);
            if (err.status === HttpStatus.BAD_REQUEST) {
                throw err;
            } else {
                throw new InternalServerErrorException(err.message);
            }
        }
    }

    public async getAllParam(param: string): Promise<CoreOutput> {
        let query = '';
        try {
            if (param == 'eliminados') {
                query = await this.roleRepository.query(`SELECT * FROM Tbl_Roles WHERE isDeleted = ${true}`);
            } else if (param == 'inactivos') {
                query = await this.roleRepository.query(`SELECT * FROM Tbl_Roles WHERE isActive = ${false}`);
            }

            if (query.length == 0) throw new BadRequestException(`No existen registros`);

            this.logger.log(`GetAllParam: Listado de registros ${param}`);
            return { success: true, total: query.length, data: query };
        } catch (err) {
            this.logger.error(`CatchDelete: ${err.message}`);
            if (err.status === HttpStatus.BAD_REQUEST) {
                throw err;
            } else {
                throw new InternalServerErrorException(err.message);
            }
        }
    }
}
