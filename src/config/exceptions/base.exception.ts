export enum ExceptionCode {
    Default = 'DEFAULT_EXCEPTION',

    // INFRAESTRUCTURE
    DatabaseException = 'DATABASE_EXCEPTION',
}

export class ExceptionBase extends Error {
    code: string;

    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, ExceptionBase.prototype);
    }
}
