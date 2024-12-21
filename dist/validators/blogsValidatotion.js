"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputCheckErrorsMiddleware = exports.middlewareValidationArray = exports.blogsWebsiteUrlValidation = exports.blogsDescriptionValidation = exports.blogsNameValidation = void 0;
const express_validator_1 = require("express-validator");
exports.blogsNameValidation = (0, express_validator_1.body)('name').isString().withMessage('can not be a number').trim().isLength({ min: 1, max: 15 }).withMessage('can not be long then 15 symbols');
exports.blogsDescriptionValidation = (0, express_validator_1.body)('description').isString().withMessage('can not be a number').isLength({ min: 1, max: 500 }).withMessage('can not be long then 500 symbols');
exports.blogsWebsiteUrlValidation = (0, express_validator_1.body)('websiteUrl').isString().withMessage('can not be a number')
    .trim().isLength({ max: 100 }).withMessage('can not be long then 100 symbols')
    .custom(url => {
    const pattern = new RegExp('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$');
    return !!pattern.test(url);
}).withMessage('Not valid url');
exports.middlewareValidationArray = [exports.blogsNameValidation, exports.blogsDescriptionValidation, exports.blogsWebsiteUrlValidation];
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
