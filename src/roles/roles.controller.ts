import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
    private readonly logger: Logger = new Logger(RolesController.name);

    constructor(private readonly rolesService: RolesService) {}

    @Post()
    create(@Body() createRoleDto: CreateRoleDto) {
        this.logger.log(`Create: Creando rol`);
        return this.rolesService.create(createRoleDto);
    }

    @Get('custom')
    async getAllParam(@Query('type') type: string) {
        this.logger.log(`GetAllByParam: Listando los roles ${type}`);
        return this.rolesService.getAllParam(type);
    }

    @Get()
    findAll() {
        this.logger.log(`GetAll: Listando los roles`);
        return this.rolesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        this.logger.log(`FindOne: Buscando rol ${id}`);
        return this.rolesService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
        this.logger.log(`UpdateById: Actualizando rol ${id}`);
        return this.rolesService.updateById(id, updateRoleDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        this.logger.log(`DeleteById: Eliminando rol ${id}`);
        return this.rolesService.removeById(id);
    }
}
