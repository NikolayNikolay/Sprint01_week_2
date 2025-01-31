"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userloginOrEmailValidations = void 0;
const express_validator_1 = require("express-validator");
exports.userloginOrEmailValidations = (0, express_validator_1.body)('loginOrEmail').isString().withMessage('not string');
