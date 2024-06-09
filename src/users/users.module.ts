import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { TypeDocumentEntity } from '../type-document/entities/typeDocument.entity';
import { RoleEntity } from 'src/roles/entities/role.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, TypeDocumentEntity, RoleEntity])],
    providers: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}
