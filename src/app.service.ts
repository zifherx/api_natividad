import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        let fecha = new Date();
        return `Hola usuario`;
    }
}
