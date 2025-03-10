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
const mongodb_1 = require("mongodb");
const blogsRepository_1 = require("../../blogs/repository/blogsRepository");
const postRepository_1 = require("../repository/postRepository");
const viewModelsMapMethod_1 = require("../../../helpers/viewModelsMapMethod");
exports.postsService = {
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blogsRepository_1.blogRepository.getById(new mongodb_1.ObjectId(input.blogId));
            console.log(blog);
            if (!blog) {
                return null;
            }
            const newPost = Object.assign(Object.assign({}, input), { blogName: blog.name, blogId: blog._id.toString(), createdAt: new Date().toISOString() });
            const resultId = yield postRepository_1.postRepository.create(newPost);
            return resultId;
        });
    },
    // async getAll(queryParams:QueryParamsType){
    //    const totalCount = await postRepository.totalCountPosts()
    //    const paginationForBlogsPosts =  PaginationQueryParams(queryParams)
    //    let posts = await postRepository.getAll(paginationForBlogsPosts)
    //    posts = mapViewPostsModel(posts)
    //    return {
    //       pagesCount: Math.ceil(totalCount / paginationForBlogsPosts.pageSize),
    //       page: paginationForBlogsPosts.pageNumber,
    //       pageSize:paginationForBlogsPosts.pageSize ,
    //       totalCount: totalCount,
    //       items: posts
    //    }
    // },
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdPost = yield postRepository_1.postRepository.getById(new mongodb_1.ObjectId(id));
            if (createdPost) {
                return (0, viewModelsMapMethod_1.mapViewPostsModel)(createdPost);
            }
            return false;
        });
    },
    update(input, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existedPost = yield postRepository_1.postRepository.getById(new mongodb_1.ObjectId(id));
            if (!existedPost) {
                return false;
            }
            return yield postRepository_1.postRepository.update(input, new mongodb_1.ObjectId(id));
        });
    },
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield postRepository_1.postRepository.deleteById(new mongodb_1.ObjectId(id));
        });
    }
};
