import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config({ path: `.env` });
const configService = new ConfigService();

export const dataSourceConfig: DataSourceOptions = {
    type: 'mysql',
    host: configService.get<string>('MYSQL_HOST'),
    port: configService.get<number>('MYSQL_PORT'),
    username: configService.get<string>('MYSQL_USERNAME'),
    password: configService.get<string>('MYSQL_PASSWORD'),
    database: configService.get<string>('MYSQL_DATABASE'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],

    migrationsRun: true,
    migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations_db',

    synchronize: false,
    logging: true,
    logger: 'file',
};

export const DataSourceApp = new DataSource(dataSourceConfig);
