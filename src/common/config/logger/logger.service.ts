import { Injectable, Logger } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class LoggerService extends Logger {
    private readonly logger: winston.Logger;

    constructor(context?: string) {
        super(context);

        this.logger = winston.createLogger({
            format: winston.format.combine(winston.format.timestamp()),
            transports: [
                new winston.transports.DailyRotateFile({
                    dirname: `logs/${context}/info`,
                    filename: '%DATE%.log',
                    datePattern: 'DD-MM-YYYY',
                    level: 'info',
                    zippedArchive: true,
                    format: winston.format.combine(
                        winston.format.printf(({ timestamp, context, level, message, trace }) => {
                            return `${timestamp}\t[${context ? context : this.context}]\t${level}:\t${message}${trace ? `\n${trace}` : ''}`;
                        }),
                    ),
                }),

                new winston.transports.DailyRotateFile({
                    dirname: `logs/${context}/error`,
                    filename: '%DATE%-error.log',
                    datePattern: 'DD-MM-YYYY',
                    level: 'error',
                    zippedArchive: true,
                    format: winston.format.combine(
                        winston.format.printf(({ timestamp, context, level, message, trace }) => {
                            return `${timestamp}\t[${context ? context : this.context}]\t${level}:\t${message}${trace ? `\n${trace}` : ''}`;
                        }),
                    ),
                }),
            ],
        });
    }

    log(message: string, context?: string) {
        this.logger.info(message, { context });
    }

    debug(message: string, context?: string) {
        this.logger.debug(message, { context });
    }

    error(message: any, stack?: string, context?: string) {
        this.logger.error(message, { stack, context });
    }
}
