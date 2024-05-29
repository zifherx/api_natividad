import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from 'src/module/health/health.module';
import { ConfigModule } from '@nestjs/config';
import { HttpLogginInterceptor } from 'src/common/interceptors/http-loggin.interceptor';
import { DatabaseModule } from './module/database/database.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            // envFilePath: `.${process.env.NODE_ENV}.env`,
            isGlobal: true,
        }),
        HealthModule,
        DatabaseModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(HttpLogginInterceptor).exclude({ path: 'metrics', method: RequestMethod.GET }, { path: 'health', method: RequestMethod.GET }).forRoutes('*');
    }
}
