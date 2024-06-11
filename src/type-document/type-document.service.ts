import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeDocumentEntity } from './entities/typeDocument.entity';
import { Repository } from 'typeorm';
import { CreateTypeDocumentDto } from './dto/create-td.dto';
import { CoreOutput } from 'src/database/dto/output.dto';
import { UpdateTypeDocumentDto } from './dto/update-td.dto';
import { Constant } from 'src/constants/constant';

@Injectable()
export class TypeDocumentService {
    private readonly logger: Logger = new Logger(TypeDocumentService.name);

    constructor(
        @InjectRepository(TypeDocumentEntity)
        private readonly typeDocumentRepository: Repository<TypeDocumentEntity>,
    ) {}

    public async create(createTypeDocumentDTO: CreateTypeDocumentDto): Promise<CoreOutput> {
        const documentFound = await this.findDocumentByTitle(createTypeDocumentDTO.title);
        if (documentFound) throw new BadRequestException(`El tipo de documento ya existe`);

        try {
            let obj = this.typeDocumentRepository.create(createTypeDocumentDTO);
            const query = await this.typeDocumentRepository.save(obj);
            if (query) {
                this.logger.log(`Create: Tipo de documento ${Constant.MSG_CREATE_EXITOSO}`);
                return { success: true, message: `Tipo de documento ${Constant.MSG_CREATE_EXITOSO}` };
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

    async findDocumentByTitle(title: string): Promise<TypeDocumentEntity | HttpException> {
        let documentFound: TypeDocumentEntity;
        try {
            documentFound = await this.typeDocumentRepository.findOne({ where: { title } });
            if (documentFound) {
                this.logger.log(`El tipo de documento '${title}' ya existe.`);
                return documentFound;
            }
        } catch (err) {
            this.logger.error(`CatchFindByTitle: ${err.message}`);
            throw new InternalServerErrorException(err.message);
        }
    }

    public async getAll(): Promise<CoreOutput> {
        try {
            const query = await this.typeDocumentRepository.find();
            // console.log('T:',typeof(query));
            // console.log('Q:',query.length);
            if (query.length == 0) throw new BadRequestException(`No existen registros.`);

            this.logger.log(`GetAll: Obtención de tipos de documento.`);
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

    public async getOneById(id: string): Promise<CoreOutput> {
        try {
            const documentDeleted = await this.typeDocumentRepository.query(`SELECT COUNT(1) AS count FROM Tbl_TypeDocument WHERE id = '${id}' AND isDeleted = ${true}`);
            if (documentDeleted[0].count == 1) throw new BadRequestException(`Tipo de documento ${Constant.MSG_ELIMINADO}`);

            const query = await this.typeDocumentRepository.findOneBy({ id });
            if (query == null) throw new BadRequestException(`Tipo de Documento ${Constant.MSG_NO_EXISTE}`);

            this.logger.log(`GetOneById: Tipo de documento ${Constant.MSG_FOUNDED_EXITOSO}`);
            return { success: true, data: query };
        } catch (err) {
            this.logger.error(`CathGetOne: ${err.message}`);
            if (err.status === HttpStatus.BAD_REQUEST) {
                throw err;
            } else {
                throw new InternalServerErrorException(err.message);
            }
        }
    }

    public async updateById(id: string, updateTypeDocumentDto: UpdateTypeDocumentDto): Promise<CoreOutput> {
        try {
            const documentDeleted = await this.typeDocumentRepository.query(`SELECT COUNT(1) AS count FROM Tbl_TypeDocument WHERE id = '${id}' AND isDeleted = ${true}`);
            if (documentDeleted[0].count == 1) throw new BadRequestException(`Tipo de documento ${Constant.MSG_ELIMINADO}`);

            const documentFound = await this.typeDocumentRepository.findOneBy({ id });
            if (documentFound == null) throw new BadRequestException(`Tipo de documento ${Constant.MSG_NO_EXISTE}`);

            const query = await this.typeDocumentRepository.update(id, updateTypeDocumentDto);
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
            const documentDeleted = await this.typeDocumentRepository.query(`SELECT COUNT(1) AS count FROM Tbl_TypeDocument WHERE id = '${id}' AND isDeleted = ${true}`);
            if (documentDeleted[0].count == 1) throw new BadRequestException(`Tipo de documento ${Constant.MSG_ELIMINADO}`);

            const documentFound = await this.typeDocumentRepository.findOneBy({ id });
            if (documentFound == null) throw new BadRequestException(`Tipo de documento ${Constant.MSG_NO_EXISTE}`);

            const query = await this.typeDocumentRepository.update(id, { isDeleted: true, deletedAt: new Date() });
            if (query.affected == 1) {
                this.logger.log(`DeleteById: Tipo de documento ${Constant.MSG_DELETE_EXITOSO}`);
                return { success: true, message: `Tipo de documento ${Constant.MSG_DELETE_EXITOSO}` };
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

    public async getAllParam(param: string): Promise<CoreOutput> {
        let query = '';
        try {
            if (param == 'eliminados') {
                query = await this.typeDocumentRepository.query(`SELECT * FROM Tbl_TypeDocument WHERE isDeleted = ${true}`);
            } else if (param == 'inactivos') {
                query = await this.typeDocumentRepository.query(`SELECT * FROM Tbl_TypeDocument WHERE isActive = ${false}`);
            }

            if (query.length == 0) throw new BadRequestException(`No existen registros`);

            this.logger.log(`GetAllParam: Listado de registros`);
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
