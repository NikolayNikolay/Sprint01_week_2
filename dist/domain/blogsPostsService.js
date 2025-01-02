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
exports.blogPostsService = void 0;
const blog_post_repository_1 = require("../repository/mongo-db-repository/blog-post-repository");
const postRepository_1 = require("../repository/mongo-db-repository/postRepository");
const SortDirections_enum_1 = require("../enums/SortDirections.enum");
exports.blogPostsService = {
    getAllPostsForBlog(blogId, queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const totalCount = yield postRepository_1.postRepository.totalCountPostsforBlog(blogId);
            // create paginations params for serch posts of blog
            const postsPaginationForBlog = {
                pageNumber: queryParams.pageNumber ? +queryParams.pageNumber : 1,
                pageSize: queryParams.pageSize !== undefined ? +queryParams.pageSize : 10,
                sortBy: queryParams.sortBy ? queryParams.sortBy : 'createdAt',
                sortDirection: SortDirections_enum_1.sortDirections.includes(queryParams.sortDirection) ? queryParams.sortDirection : 'desc'
            };
            const getItems = yield blog_post_repository_1.blogPostsRepository.getAllPostsForBlog(blogId, postsPaginationForBlog);
            return {
                pagesCount: Math.ceil(totalCount / postsPaginationForBlog.pageSize),
                page: postsPaginationForBlog.pageNumber,
                pageSize: postsPaginationForBlog.pageSize,
                totalCount,
                items: getItems
            };
        });
    }
};
