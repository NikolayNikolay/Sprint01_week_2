"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputCheckErrorsMiddleware = void 0;
const express_validator_1 = require("express-validator");
const inputCheckErrorsMiddleware = (req, res, next) => {
    const e = (0, express_validator_1.validationResult)(req);
    const errors = e.array({ onlyFirstError: true });
    if (errors.length > 0) {
        res.status(400).send({ errorsMessages: errors.map((err) => { return { message: err.msg, field: err.path }; }) });
        return;
    }
    next();
};
exports.inputCheckErrorsMiddleware = inputCheckErrorsMiddleware;
