import { ConfigModule, ConfigService } from '@nestjs/config';

ConfigModule.forRoot();
const configService = new ConfigService();

// SERVER PARAMS
export const NODE_ENV = configService.get<string>('NODE_ENV');
export const PORT = parseInt(configService.get<string>('PORT'), 10);
export const APP_NAME = configService.get<string>('APP_NAME');

// ENCRYPTATION OPTIONS
export const HASH_SALT = parseInt(configService.get('HASH_SALT'), 10);

//SWAGGER OPTIONS
export const SWAGGER_API_ROOT = configService.get<string>('SWAGGER_API_ROOT');
export const SWAGGER_API_NAME = configService.get<string>('SWAGGER_API_NAME');
export const SWAGGER_API_CURRENT_VERSION = configService.get<string>('SWAGGER_API_CURRENT_VERSION');
export const SWAGGER_API_DESCRIPTION = configService.get<string>('SWAGGER_API_DESCRIPTION');

// DATABASE PROPERTIES
export const MYSQL_HOST = configService.get<string>('MYSQL_HOST');
export const MYSQL_PORT = parseInt(configService.get<string>('MYSQL_PORT'), 10);
export const MYSQL_DATABASE = configService.get<string>('MYSQL_DATABASE');
export const MYSQL_USERNAME = configService.get<string>('MYSQL_USERNAME');
export const MYSQL_PASSWORD = configService.get<string>('MYSQL_PASSWORD');

//LOGGER OPTIONS
export const LOG_FOLDER = configService.get<string>('LOG_FOLDER');

// TIMEZONE PROPERTIES
export const TZ = configService.get<string>('TZ');

export class Constant {}
