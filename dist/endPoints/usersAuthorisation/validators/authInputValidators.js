"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userloginOrEmailValidations = exports.userPasswordValidations = void 0;
const express_validator_1 = require("express-validator");
exports.userPasswordValidations = (0, express_validator_1.body)('password').isString().withMessage('not string');
exports.userloginOrEmailValidations = (0, express_validator_1.body)('loginOrEmail').isString().withMessage('not string');
