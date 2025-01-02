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
exports.postsService = void 0;
const postRepository_1 = require("../repository/mongo-db-repository/postRepository");
const blogsRepository_1 = require("../repository/mongo-db-repository/blogsRepository");
const queryParamsForBlogPosts_1 = require("../helpers/queryParamsForBlogPosts");
exports.postsService = {
    create(input, idBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkdId = input.blogId || idBlog;
            const blog = yield blogsRepository_1.blogRepository.getById(checkdId);
            if (blog) {
                const newPost = Object.assign(Object.assign({}, input), { id: Date.now() + Math.random().toString(), blogName: blog.name, blogId: idBlog || input.blogId, createdAt: new Date().toISOString() });
                console.log(newPost);
                return yield postRepository_1.postRepository.create(newPost);
            }
            else {
                return false;
            }
        });
    },
    getAll(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const totalCount = yield postRepository_1.postRepository.totalCountPostsforBlog();
            const paginationForBlogsPosts = (0, queryParamsForBlogPosts_1.PaginationForBlogsPosts)(queryParams);
            const posts = yield postRepository_1.postRepository.getAll(paginationForBlogsPosts);
            return {
                pagesCount: Math.ceil(totalCount / paginationForBlogsPosts.pageSize),
                page: paginationForBlogsPosts.pageNumber,
                pageSize: paginationForBlogsPosts.pageSize,
                totalCount: totalCount,
                items: posts
            };
        });
    },
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield postRepository_1.postRepository.getById(id);
        });
    },
    update(input, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield postRepository_1.postRepository.update(input, id);
        });
    },
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield postRepository_1.postRepository.deleteById(id);
        });
    }
};
