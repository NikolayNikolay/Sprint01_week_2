"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewareValidationArray = exports.blogPostsUriParamsIsId = exports.blogsWebsiteUrlValidation = exports.blogsDescriptionValidation = exports.blogsNameValidation = void 0;
const express_validator_1 = require("express-validator");
exports.blogsNameValidation = (0, express_validator_1.body)('name').isString().withMessage('can not be a number').trim().isLength({ min: 1, max: 15 }).withMessage('can not be long then 15 symbols');
exports.blogsDescriptionValidation = (0, express_validator_1.body)('description').isString().withMessage('can not be a number').isLength({ min: 1, max: 500 }).withMessage('can not be long then 500 symbols');
exports.blogsWebsiteUrlValidation = (0, express_validator_1.body)('websiteUrl')
    .custom((url) => {
    console.log(url);
    if (url.length === 0) {
        throw new Error('Can not be empty');
    }
    if (url.length > 100) {
        throw new Error('can not be long then 100 symbols');
    }
    const pattern = new RegExp('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$');
    if (!pattern.test(url)) {
        console.log(pattern.test(url));
        throw new Error('Not a valid URL');
    }
    return true;
});
exports.blogPostsUriParamsIsId = (0, express_validator_1.param)('id').isNumeric().withMessage('Must be valid id');
exports.middlewareValidationArray = [exports.blogsNameValidation, exports.blogsDescriptionValidation, exports.blogsWebsiteUrlValidation];
