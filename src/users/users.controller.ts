import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserInputDto } from './dto/create-account.dto';
import { CoreOutput } from '../database/dto/output.dto';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    @ApiOperation({ summary: 'Creación de una cuenta de usuario' })
    async create(@Body() createUserDto: CreateUserInputDto): Promise<CoreOutput> {
        return this.userService.create(createUserDto);
    }
}
