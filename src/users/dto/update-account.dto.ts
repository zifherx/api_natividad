import { PartialType } from '@nestjs/swagger';
import { CreateUserInputDto } from './create-account.dto';

export class UpdateUserInputDto extends PartialType(CreateUserInputDto) {}
