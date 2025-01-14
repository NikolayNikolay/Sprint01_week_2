"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidObjectId = void 0;
const express_validator_1 = require("express-validator");
const mongodb_1 = require("mongodb");
exports.isValidObjectId = (0, express_validator_1.param)('id').custom((value) => {
    console.log(mongodb_1.ObjectId.isValid(value));
    if (!mongodb_1.ObjectId.isValid(value)) {
        throw new Error('Invalid ID format.');
    }
    else {
        return true;
    }
});
