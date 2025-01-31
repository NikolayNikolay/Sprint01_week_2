"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultResponsObject = void 0;
const resultResponsObject = (statusCode, errMessage, data, errArray) => {
    return {
        status: statusCode,
        message: errMessage,
        data: data ? data : null,
        errors: errArray
    };
};
exports.resultResponsObject = resultResponsObject;
