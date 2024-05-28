import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggerService } from '../config/logger/logger.service';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class HttpLogginInterceptor implements NestMiddleware {
    private readonly logger: LoggerService = new LoggerService(HttpLogginInterceptor.name);

    use(req: Request, res: Response, next: NextFunction): void {
        const { hostname, ip, body, originalUrl, method } = req;
        const startTime = new Date().getTime();

        res.on('finish', () => {
            const { statusCode, statusMessage } = res;
            const endTime = new Date().getTime();
            const entry = `${hostname}\t[${ip}]\t${method}\t${originalUrl}\tbody:\t${JSON.stringify(body)}\tresponse:\t${statusCode}\t(${statusMessage})\t${endTime - startTime} ms`;

            if (statusCode >= 400 && statusCode <= 500) {
                this.logger.error(entry);
            } else {
                this.logger.log(entry);
            }
        });
        next();
    }
}
