import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from 'src/health/health.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { HttpLogginInterceptor } from './interceptors/http-loggin.interceptor';

@Module({
    imports: [
        ConfigModule.forRoot({
            // envFilePath: `.${process.env.NODE_ENV}.env`,
            isGlobal: true,
        }),
        HealthModule,
        DatabaseModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(HttpLogginInterceptor).exclude({ path: 'metrics', method: RequestMethod.GET }, { path: 'health', method: RequestMethod.GET }).forRoutes('*');
    }
}
