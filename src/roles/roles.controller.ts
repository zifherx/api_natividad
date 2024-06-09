import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
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

    @Get()
    findAll() {
        this.logger.log(`GetAll: Listando los tipos de documento`);
        return this.rolesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.rolesService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
        return this.rolesService.updateById(id, updateRoleDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.rolesService.removeById(id);
    }
}
