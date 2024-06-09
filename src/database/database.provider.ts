import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const dataSourceConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3307,
    database: 'db-natividad',
    username: 'zifher',
    password: 'secret1234',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
    logger: 'file',
};
