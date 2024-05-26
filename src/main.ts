import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import { Swagger } from './common/config/swagger/swagger';
import { PORT } from './common/constants/constant';

async function API_NATIVIDAD() {
    const app = await NestFactory.create(AppModule);
    const logger = new Logger(API_NATIVIDAD.name);

    const port = PORT || 5000;

    new Swagger(app);

    await app.listen(port);
    logger.log(`Application running on: ${await app.getUrl()}`);
}
API_NATIVIDAD();
