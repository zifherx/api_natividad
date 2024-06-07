import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInputDto } from './dto/create-account.dto';
import { CoreOutput } from '../database/dto/output.dto';
import { encryptPassword } from 'src/utils/hash-password';
import { TypeDocumentEntity } from '../type-document/entities/typeDocument.entity';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(TypeDocumentEntity)
        private readonly typeDocumentRepository: Repository<TypeDocumentEntity>,
    ) {}

    public async create(createUserInputDto: CreateUserInputDto) {
        try {
            const documentFound = await this.typeDocumentRepository.findOne({ where: { abbreviation: createUserInputDto.typeDocumentId.abbreviation } });
            if (!documentFound) throw new NotFoundException('Tipo de Documento no encontrado');

            createUserInputDto.typeDocumentId = documentFound;
            let obj = this.userRepository.create(createUserInputDto);
            const query = await this.userRepository.save(obj);
            return query;
        } catch (err) {
            console.log(err);
        }
    }

    public async findAll() {
        try {
            const obj = await this.userRepository.find({ where: { isDeleted: false } });
            if (obj) return { success: true, all: obj };
        } catch (err) {
            return { success: false, error: err.message };
        }
    }
}
