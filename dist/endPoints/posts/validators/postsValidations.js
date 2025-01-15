"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postBlogIdValidation = exports.postContentValidation = exports.postShortDescriptionValidation = exports.postTitleValidation = void 0;
const express_validator_1 = require("express-validator");
const blogQyeryRepository_1 = require("../../blogs/repository/blogQyeryRepository");
const mongodb_1 = require("mongodb");
exports.postTitleValidation = (0, express_validator_1.body)('title').isString().withMessage('not sting').trim().isLength({ min: 1, max: 30 }).withMessage('too shortly or more then 30 mathes');
exports.postShortDescriptionValidation = (0, express_validator_1.body)('shortDescription').isString().withMessage('not sting').trim().isLength({ min: 1, max: 100 }).withMessage('too shortly or more then 100 mathes');
exports.postContentValidation = (0, express_validator_1.body)('content').isString().withMessage('not sting').trim().isLength({ min: 1, max: 1000 }).withMessage('too shortly or more then 1000 mathes');
exports.postBlogIdValidation = (0, express_validator_1.body)('blogId').custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBlog = yield blogQyeryRepository_1.queryBlogRepository.getById(new mongodb_1.ObjectId(value));
    if (!foundBlog) {
        throw new Error('Blog does not exist');
    }
}));
