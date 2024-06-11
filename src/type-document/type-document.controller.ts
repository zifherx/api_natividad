import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query } from '@nestjs/common';
import { TypeDocumentService } from './type-document.service';
import { CreateTypeDocumentDto } from './dto/create-td.dto';
import { UpdateTypeDocumentDto } from './dto/update-td.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tipo de Documento')
@Controller('type-document')
export class TypeDocumentController {
    private readonly logger: Logger = new Logger(TypeDocumentController.name);

    constructor(private readonly typeDocumentService: TypeDocumentService) {}

    @Post()
    async create(@Body() createTypeDocumentDto: CreateTypeDocumentDto) {
        this.logger.log(`Create: Creando tipo de documento`);
        return this.typeDocumentService.create(createTypeDocumentDto);
    }

    @Get('custom')
    async getAllParam(@Query('type') type: string) {
        this.logger.log(`GetAllByParam: Listando los tipos de documento ${type}`);
        return this.typeDocumentService.getAllParam(type);
    }

    @Get()
    async getAll() {
        this.logger.log(`GetAll: Listando los tipos de documento`);
        return this.typeDocumentService.getAll();
    }

    @Get(':id')
    async getOneById(@Param('id') id: string) {
        this.logger.log(`GetOneById: Obteniendo el tipo de documento '${id}'`);
        return this.typeDocumentService.getOneById(id);
    }

    @Patch(':id')
    async updateOneById(@Param('id') id: string, @Body() updateTypeDocumentDto: UpdateTypeDocumentDto) {
        this.logger.log(`UpdateOneById: Actualizando el tipo de documento '${id}'`);
        return this.typeDocumentService.updateById(id, updateTypeDocumentDto);
    }

    @Delete(':id')
    async deleteOneById(@Param('id') id: string) {
        this.logger.log(`DeleteOneById: Eliminando el tipo de documento '${id}'`);
        return this.typeDocumentService.deleteById(id);
    }
}
