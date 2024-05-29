import { DataSourceOptions } from 'typeorm';

export const dataSourceConfig: DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3307,
    database: 'db-natividad',
    username: 'zifher',
    password: 'secret1234',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
    logging: true,
    logger: 'file',
};
