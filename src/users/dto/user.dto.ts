import { CoreOutput } from 'src/database/dto/output.dto';
import { UserEntity } from '../entities/user.entity';

export class UserOutputDto extends CoreOutput {
    user?: UserEntity;
}
