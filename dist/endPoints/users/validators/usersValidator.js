"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersEmailValidations = exports.usersLoginValidations = exports.usersPasswordValidations = void 0;
const express_validator_1 = require("express-validator");
exports.usersPasswordValidations = (0, express_validator_1.body)('password').isString().withMessage('not string').isLength({ min: 6, max: 20 }).withMessage('not valid length, must be min 6 mathes or max 20 mathes');
exports.usersLoginValidations = (0, express_validator_1.body)('login').isString().withMessage('not string').isLength({ min: 3, max: 10 }).withMessage('not valid length, must be min 3 mathes or max 10 mathes')
    .custom((login) => {
    console.log(login);
    const pattern = new RegExp('^[a-zA-Z0-9_-]*$');
    if (!pattern.test(login)) {
        throw new Error('Not a valid Login');
    }
    return true;
});
exports.usersEmailValidations = (0, express_validator_1.body)('email').custom((email) => {
    console.log(email);
    email = email.trim();
    const pattern = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!pattern.test(email)) {
        throw new Error('Not a valid email');
    }
    return true;
});
