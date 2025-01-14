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
const blog_post_repository_1 = require("../repository/blog-post-repository");
const mongodb_1 = require("mongodb");
exports.blogPostsService = {
    // frozen method
    getAllPostsForBlog(blogId, queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            // const searchFilter = filter(queryParams, blogId)
            // const totalCount = await postRepository.totalCountPostsforBlog(searchFilter)
            // create paginations params for serch posts of blog
            // const PaginationParams = PaginationQueryParams(queryParams)
            // let getItems = await blogPostsRepository.getAllPostsForBlog(blogId,PaginationParams)
            //    getItems = mapViewPostsModel(getItems)
            //    return {
            //       pagesCount: Math.ceil(totalCount / PaginationParams.pageSize),
            //       page: PaginationParams.pageNumber,
            //       pageSize: PaginationParams.pageSize,
            //       totalCount,
            //       items: getItems
            //    }
        });
    },
    createPostForBlog(postInput, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blog_post_repository_1.blogPostsRepository.getById(new mongodb_1.ObjectId(blogId));
            if (!blog) {
                return false;
            }
            const newPost = Object.assign(Object.assign({}, postInput), { blogName: blog.name, blogId: blogId, createdAt: new Date().toISOString() });
            const resultIdCreatedPost = yield blog_post_repository_1.blogPostsRepository.createPostForBlog(newPost);
            return resultIdCreatedPost;
        });
    },
};
