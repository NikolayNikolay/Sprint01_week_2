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
const queryParamsForBlogPosts_1 = require("../helpers/queryParamsForBlogPosts");
exports.blogPostsService = {
    getAllPostsForBlog(blogId, queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchFilter = (0, queryParamsForBlogPosts_1.filter)(queryParams, blogId);
            const totalCount = yield postRepository_1.postRepository.totalCountPostsforBlog(searchFilter);
            // create paginations params for serch posts of blog
            const PaginationParams = (0, queryParamsForBlogPosts_1.PaginationForBlogsPosts)(queryParams);
            const getItems = yield blog_post_repository_1.blogPostsRepository.getAllPostsForBlog(blogId, PaginationParams);
            return {
                pagesCount: Math.ceil(totalCount / PaginationParams.pageSize),
                page: PaginationParams.pageNumber,
                pageSize: PaginationParams.pageSize,
                totalCount,
                items: getItems
            };
        });
    }
};
