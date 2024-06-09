import { BadRequestException, HttpException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { Repository } from 'typeorm';
import { CoreOutput } from 'src/database/dto/output.dto';

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
                this.logger.log(`Create: Rol creado con éxito.`);
                return { success: true, message: `Rol creado con éxito` };
            }
        } catch (err) {
            this.logger.error(`CatchCreate`, { error: err.message });
            throw new InternalServerErrorException(err.message);
        }
    }

    public async findAll(): Promise<CoreOutput> {
        try {
            const query = await this.roleRepository.find();
            if (query.length == 0) throw new BadRequestException(`No existen registros.`);
            this.logger.log('GetAll: Listado de roles');
            return { success: true, total: query.length, data: query };
        } catch (err) {
            this.logger.error(`CatchGetAll`, { error: err.message });
            throw new InternalServerErrorException(err.message);
        }
    }

    public async findOne(id: string): Promise<CoreOutput> {
        try {
            const query = await this.roleRepository.findOneBy({ id });
            if (query == null) throw new BadRequestException(`Rol no encontrado`);

            this.logger.log(`GetFindOne: Rol encontrado con éxito`);
            return { success: true, data: query };
        } catch (err) {
            this.logger.error(`CathFindOne`, { error: err.message });
            throw new InternalServerErrorException(err.message);
        }
    }

    public async updateById(id: string, updateRoleDto: UpdateRoleDto): Promise<CoreOutput> {
        try {
            const doc1 = await this.roleRepository.query(`SELECT COUNT(1) AS count FROM Tbl_Roles WHERE id = '${id}' AND isDeleted = ${true}`);
            if (doc1[0].count == 1) throw new BadRequestException(`Rol no existe`);

            const query = await this.roleRepository.update(id, updateRoleDto);
            if (query.affected == 1) {
                this.logger.log('UpdateById: Rol actualizado con éxito');
                return { success: true, data: null };
            }
        } catch (err) {
            this.logger.error(`CatchUpdate`, { error: err.message });
            throw new InternalServerErrorException(err.message);
        }
    }

    removeById(id: string) {
        return `This action removes a #${id} role`;
    }

    async findRoleByName(name: string): Promise<RoleEntity | HttpException> {
        let roleFound: RoleEntity;
        try {
            roleFound = await this.roleRepository.findOne({ where: { name } });
            console.log(roleFound);
            if (roleFound !== null) throw new NotFoundException(`Rol '${name}' ya existe.`);
            this.logger.log(`Rol ${name} encontrado`);
            return roleFound;
        } catch (err) {
            this.logger.error(`CatchFindByName`, { error: err.message });
            throw new InternalServerErrorException(err.message);
        }
    }
}
