import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserInputDto } from './dto/create-account.dto';

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
        this.logger.log('Listando los usuarios');
        return this.userService.getAll();
    }
}
