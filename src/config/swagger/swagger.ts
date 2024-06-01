import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_API_CURRENT_VERSION, SWAGGER_API_DESCRIPTION, SWAGGER_API_NAME, SWAGGER_API_ROOT } from 'src/constants/constant';

export class Swagger {
    private config: any;
    private document: OpenAPIObject;

    constructor(app: INestApplication) {
        this.createSwagger(app);
        this.initializeSwagger(app);
    }

    createSwagger(app: INestApplication): void {
        this.config = new DocumentBuilder();
        this.config.setTitle(SWAGGER_API_NAME).setDescription(SWAGGER_API_DESCRIPTION).setVersion(SWAGGER_API_CURRENT_VERSION).build();

        this.document = SwaggerModule.createDocument(app, this.config);
    }

    initializeSwagger(app: INestApplication): void {
        SwaggerModule.setup(SWAGGER_API_ROOT, app, this.document);
    }
}
