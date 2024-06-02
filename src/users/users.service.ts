import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInputDto } from './dto/create-account.dto';
import { CoreOutput } from '../database/dto/output.dto';
import { encryptPassword } from 'src/utils/hash-password';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    public async create(createUserInputDto: CreateUserInputDto): Promise<CoreOutput> {
        try {
            const existUser = await this.userRepository.findOne({
                where: {
                    email: createUserInputDto.email,
                    document: createUserInputDto.document,
                    username: createUserInputDto.username,
                },
            });

            if (existUser) {
                return { success: false, error: 'Usuario ya existe' };
            }

            let usuario = createUserInputDto as UserEntity;
            usuario.password = await encryptPassword(usuario.password);
            const obj = this.userRepository.create(usuario);
            await this.userRepository.save(obj);
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    }

    public async findAll(): Promise<CoreOutput> {
        try {
            const obj = await this.userRepository.find({ where: { isDeleted: false } });
            if (obj) return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    }
}
