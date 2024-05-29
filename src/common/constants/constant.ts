import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

// SERVER PARAMS
export const NODE_ENV = configService.get<string>('NODE_ENV');
export const PORT = parseInt(configService.get<string>('PORT'), 10);

// DATABASE PROPERTIES
export const MYSQL_HOST = configService.get<string>('MYSQL_HOST');
export const MYSQL_PORT = parseInt(configService.get<string>('MYSQL_PORT'), 10);
export const MYSQL_DATABASE = configService.get<string>('MYSQL_DATABASE');
export const MYSQL_USERNAME = configService.get<string>('MYSQL_USERNAME');
export const MYSQL_PASSWORD = configService.get<string>('MYSQL_PASSWORD');

export class Constant {
    // ENCRYPTATION OPTIONS
    static readonly HASH_SALT = parseInt(configService.get('HASH_SALT'), 10);

    //SWAGGER OPTIONS
    static readonly SWAGGER_API_ROOT = configService.get<string>('SWAGGER_API_ROOT');
    static readonly SWAGGER_API_NAME = configService.get<string>('SWAGGER_API_NAME');
    static readonly SWAGGER_API_DESCRIPTION = configService.get<string>('SWAGGER_API_DESCRIPTION');
    static readonly SWAGGER_API_CURRENT_VERSION = configService.get<string>('SWAGGER_API_CURRENT_VERSION');

    //SERVER OPTIONS
    static readonly APP_NAME = configService.get<string>('APP_NAME');

    //LOGGER OPTIONS
    static readonly LOG_FOLDER = configService.get<string>('LOG_FOLDER');

    // TIMEZONE PROPERTIES
    static readonly TZ = configService.get<string>('TZ');
}
