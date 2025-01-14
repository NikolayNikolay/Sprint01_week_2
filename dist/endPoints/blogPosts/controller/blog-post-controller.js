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
exports.blogPostsController = void 0;
const blogsPostsService_1 = require("../domain/blogsPostsService");
const settings_1 = require("../../../settings");
const blog_post_QueryRepository_1 = require("../repository/blog-post-QueryRepository");
const mongodb_1 = require("mongodb");
exports.blogPostsController = {
    getAllPostsForBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const paginationsPostResult = yield blog_post_QueryRepository_1.blogPostsQueryRepository.getAllPostsForBlog(req.params.id, req.query);
            res.status(settings_1.httpStatusCodes.OK).send(paginationsPostResult);
        });
    },
    createPostForBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdPost = yield blogsPostsService_1.blogPostsService.createPostForBlog(req.body, req.params.id);
            if (!createdPost) {
                res.send(settings_1.httpStatusCodes.BAD_REQUEST);
                return;
            }
            const getCreatedPost = yield blog_post_QueryRepository_1.blogPostsQueryRepository.getPostforBlog(new mongodb_1.ObjectId(createdPost));
            res.status(settings_1.httpStatusCodes.CREATED).send(getCreatedPost);
        });
    },
};
