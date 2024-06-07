import { PartialType } from '@nestjs/swagger';
import { CreateTypeDocumentDto } from './create-td.dto';

export class UpdateTypeDocumentDto extends PartialType(CreateTypeDocumentDto) {}
