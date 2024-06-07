import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorHandle extends Error {
    constructor({ type, message }: { type: keyof typeof HttpStatus; message: string }) {
        super(`${type} :: ${message}`);
    }

    public static createError(message: string) {
        const name = message.split(' :: ')[0];
        if (name) throw new HttpException(message, HttpStatus[name]);
        throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
