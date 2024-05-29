import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Swagger } from './common/config/swagger/swagger';
import { PORT } from './common/constants/constant';
import helmet from 'helmet';

async function API_NATIVIDAD() {
    const app = await NestFactory.create(AppModule);
    const logger = new Logger(API_NATIVIDAD.name);

    const port = PORT || 5000;

    app.setGlobalPrefix('/api/v1');
    app.useGlobalPipes(new ValidationPipe());
    app.use(helmet());

    new Swagger(app);

    await app.listen(port);
    logger.log(`Application running on: ${await app.getUrl()}`);
}
API_NATIVIDAD();
