"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentContentValidation = void 0;
const express_validator_1 = require("express-validator");
exports.commentContentValidation = (0, express_validator_1.body)('content').isString().withMessage('must be string').isLength({ min: 20, max: 300 });
