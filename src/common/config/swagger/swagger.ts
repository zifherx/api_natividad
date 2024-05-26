import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { Constant } from 'src/common/constants/constant';

export class Swagger {
    private readonly logger = new Logger(Swagger.name);
    private config: any;
    private document: OpenAPIObject;

    constructor(app: INestApplication) {
        this.createSwagger(app);
        this.initializeSwagger(app);
    }

    createSwagger(app: INestApplication): void {
        this.config = new DocumentBuilder();
        this.config.setTitle(Constant.SWAGGER_API_NAME).setDescription(Constant.SWAGGER_API_DESCRIPTION).setVersion(Constant.SWAGGER_API_CURRENT_VERSION).build();

        this.document = SwaggerModule.createDocument(app, this.config);
    }

    initializeSwagger(app: INestApplication): void {
        SwaggerModule.setup(Constant.SWAGGER_API_ROOT, app, this.document);
    }
}
