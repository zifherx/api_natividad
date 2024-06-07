import { Module } from '@nestjs/common';
import { TypeDocumentService } from './type-document.service';
import { TypeDocumentController } from './type-document.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeDocumentEntity } from './entities/typeDocument.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TypeDocumentEntity])],
    providers: [TypeDocumentService],
    controllers: [TypeDocumentController],
})
export class TypeDocumentModule {}
