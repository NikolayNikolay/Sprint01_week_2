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
const settings_1 = require("../settings");
const mongodb_1 = require("mongodb");
const blogsRepository_1 = require("../endPoints/blogs/repository/blogsRepository");
const blogPostsUriParamsId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fuondBlog = yield blogsRepository_1.blogRepository.getById(new mongodb_1.ObjectId(req.params.id));
    if (!fuondBlog) {
        res.sendStatus(settings_1.httpStatusCodes.NOT_FOUND);
        return;
    }
    next();
});
exports.blogPostsUriParamsId = blogPostsUriParamsId;
