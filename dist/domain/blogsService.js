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
exports.blogsService = void 0;
const blogsRepository_1 = require("../repository/mongo-db-repository/blogsRepository");
const queryParamsForBlogPosts_1 = require("../helpers/queryParamsForBlogPosts");
exports.blogsService = {
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = Object.assign(Object.assign({}, input), { id: Date.now() + Math.random().toString(), createdAt: new Date().toISOString(), isMembership: false });
            const result = yield blogsRepository_1.blogRepository.create(newBlog);
            if (result.acknowledged) {
                return blogsRepository_1.blogRepository.getById(newBlog.id);
            }
            return false;
        });
    },
    getAll(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const totalCount = yield blogsRepository_1.blogRepository.totalBlogs();
            const paginationForBlogs = (0, queryParamsForBlogPosts_1.PaginationForBlogsPosts)(queryParams);
            const blogs = yield blogsRepository_1.blogRepository.getAll(paginationForBlogs);
            return {
                pagesCount: Math.ceil(totalCount / paginationForBlogs.pageSize),
                page: paginationForBlogs.pageNumber,
                pageSize: paginationForBlogs.pageSize,
                totalCount: totalCount,
                items: blogs
            };
        });
    },
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogsRepository_1.blogRepository.getById(id);
        });
    },
    update(input, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return blogsRepository_1.blogRepository.update(input, id);
        });
    },
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return blogsRepository_1.blogRepository.deleteById(id);
        });
    }
};
