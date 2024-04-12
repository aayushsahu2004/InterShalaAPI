class ErroHandler extends Error {
    constructor(message, stutasCode) {
        super(message);
        this.stutasCode = stutasCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErroHandler;