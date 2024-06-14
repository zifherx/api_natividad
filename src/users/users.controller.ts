import { Body, Controller, Delete, Get, Logger, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserInputDto } from './dto/create-account.dto';
import { UpdateUserInputDto } from './dto/update-account.dto';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
    private readonly logger = new Logger(UsersController.name);
    constructor(private readonly userService: UsersService) {}

    @Post()
    @ApiOperation({ summary: 'Creación de una cuenta de usuario' })
    async create(@Body() createUserDto: CreateUserInputDto) {
        this.logger.log(`Create: Creando usuario`);
        return this.userService.create(createUserDto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todos los usuarios' })
    async findAll() {
        this.logger.log(`GetAll: Listando los usuarios`);
        return this.userService.getAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un usuario por id' })
    async getOne(@Param('id') id: string) {
        this.logger.log(`GetOneById: Obteniendo el usuario ${id}`);
        return this.userService.findOneById(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar usuario por id' })
    async updateOne(@Param('id') id: string, @Body() updateUserDto: UpdateUserInputDto) {
        this.logger.log(`UpdateOneById: Actualizando el usuario ${id}`);
        return this.userService.updateById(id, updateUserDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un usuario por id' })
    async deleteOne(@Param('id') id: string) {
        this.logger.log(`DeleteOneById: Eliminando el usuario ${id}`);
        return this.userService.deleteById(id);
    }
}
