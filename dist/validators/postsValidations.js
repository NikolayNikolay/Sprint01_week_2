"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postBlogIdValidation = exports.postContentValidation = exports.postShortDescriptionValidation = exports.postTitleValidation = void 0;
const express_validator_1 = require("express-validator");
exports.postTitleValidation = (0, express_validator_1.body)('title').isString().withMessage('not sting').trim().isLength({ min: 1, max: 30 }).withMessage('too shortly or more then 30 mathes');
exports.postShortDescriptionValidation = (0, express_validator_1.body)('shortDescription').isString().withMessage('not sting').trim().isLength({ min: 1, max: 100 }).withMessage('too shortly or more then 100 mathes');
exports.postContentValidation = (0, express_validator_1.body)('content').isString().withMessage('not sting').trim().isLength({ min: 1, max: 1000 }).withMessage('too shortly or more then 1000 mathes');
exports.postBlogIdValidation = (0, express_validator_1.body)('blogId').isString().withMessage('not string');
