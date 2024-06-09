import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeDocumentEntity } from './entities/typeDocument.entity';
import { Repository } from 'typeorm';
import { CreateTypeDocumentDto } from './dto/create-td.dto';
import { CoreOutput } from 'src/database/dto/output.dto';
import { UpdateTypeDocumentDto } from './dto/update-td.dto';

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
                this.logger.log(`Create: Tipo de documento creado con éxito`);
                return { success: true, message: `Tipo de documento creado con éxito.` };
            }
        } catch (err) {
            this.logger.error(`CatchCreate`, { error: err.message });
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
            this.logger.error(`CatchFindByTitle`, { error: err.message });
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
            const query = await this.typeDocumentRepository.findOneBy({ id });
            if (query == null) throw new BadRequestException('Tipo de Documento no encontrado');
            this.logger.log(`GetOneById: Tipo de documento encontrado con éxito.`);
            return { success: true, data: query };
        } catch (err) {
            this.logger.error(`CathGetOne`, { error: err.message });
            if (err.status === HttpStatus.BAD_REQUEST) {
                throw err;
            } else {
                throw new InternalServerErrorException(err.message);
            }
        }
    }

    public async updateById(id: string, updateTypeDocumentDto: UpdateTypeDocumentDto): Promise<CoreOutput> {
        try {
            const doc1 = await this.typeDocumentRepository.query(`SELECT COUNT(1) AS count FROM Tbl_TypeDocument WHERE id = '${id}' AND isDeleted = ${true}`);
            // if (doc1[0].count == 1) return { success: false, message: `Tipo de documento no existe` };
            if (doc1[0].count == 1) throw new BadRequestException(`Tipo de documento no existe.`);

            const query = await this.typeDocumentRepository.update(id, updateTypeDocumentDto);
            if (query.affected == 1) {
                this.logger.log(`UpdateById: Tipo de documento actualizado con éxito.`);
                return { success: true, message: `Tipo de documento actualizado con éxito.` };
            }
        } catch (err) {
            this.logger.error(`CatchUpdate`, { error: err.message });
            if (err.status === HttpStatus.BAD_REQUEST) {
                throw err;
            } else {
                throw new InternalServerErrorException(err.message);
            }
        }
    }

    public async deleteById(id: string): Promise<CoreOutput> {
        try {
            const doc1 = await this.typeDocumentRepository.query(`SELECT COUNT(1) AS count FROM Tbl_TypeDocument WHERE id = '${id}' AND isDeleted = ${true}`);
            // if (doc1[0].count == 1) return { success: false, message: `Tipo de documento no existe` };
            if (doc1[0].count == 1) throw new BadRequestException(`Tipo de documento no existe.`);

            const query = await this.typeDocumentRepository.update(id, { isDeleted: true, deletedAt: new Date() });
            if (query.affected == 1) {
                this.logger.log(`DeleteById: Tipo de documento eliminado con éxito.`);
                return { success: true, message: 'Tipo de documento eliminado con éxito.' };
            }
        } catch (err) {
            this.logger.error(`CatchDelete`, { error: err.message });
            if(err.status === HttpStatus.BAD_REQUEST){
                throw err
            }else{
                throw new InternalServerErrorException(err.message);
                
            }
        }
    }
}
