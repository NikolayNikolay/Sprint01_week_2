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
exports.blogPostsUriParamsId = void 0;
const mongodb_1 = require("mongodb");
const blogQyeryRepository_1 = require("../endPoints/blogs/repository/blogQyeryRepository");
const express_validator_1 = require("express-validator");
const blogPostsUriParamsId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fuondBlog = yield blogQyeryRepository_1.queryBlogRepository.getById(new mongodb_1.ObjectId(req.body.blogId));
    if (!fuondBlog) {
        const errors = (0, express_validator_1.validationResult)(req);
    }
    next();
});
exports.blogPostsUriParamsId = blogPostsUriParamsId;
