import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceConfig } from './database.provider';

@Module({
    imports: [TypeOrmModule.forRootAsync({ useFactory: () => dataSourceConfig })],
})
export class DatabaseModule {}
