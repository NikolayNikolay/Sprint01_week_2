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
exports.queryBlogRepository = void 0;
const mongo_db_1 = require("../../../db/mongo-db");
const serchFilter_1 = require("../../../helpers/serchFilter");
const queryParamsPaginations_1 = require("../../../helpers/queryParamsPaginations");
const viewModelsMapMethod_1 = require("../../../helpers/viewModelsMapMethod");
exports.queryBlogRepository = {
    getAll(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const serchFilter = (0, serchFilter_1.filter)(queryParams);
            const totalCount = yield this.totalBlogs(serchFilter);
            const paginationForBlogs = (0, queryParamsPaginations_1.PaginationQueryParams)(queryParams);
            let blogs = null;
            if (paginationForBlogs.searchNameTerm) {
                blogs = yield mongo_db_1.blogCollection.find({ [paginationForBlogs.sortBy]: { $regex: paginationForBlogs.searchNameTerm, $options: "i" } })
                    .sort(paginationForBlogs.sortBy, paginationForBlogs.sortDirection)
                    .skip((paginationForBlogs.pageNumber - 1) * paginationForBlogs.pageSize)
                    .limit(paginationForBlogs.pageSize)
                    .toArray();
            }
            else {
                blogs = yield mongo_db_1.blogCollection.find({})
                    .sort(paginationForBlogs.sortBy, paginationForBlogs.sortDirection)
                    .skip((paginationForBlogs.pageNumber - 1) * paginationForBlogs.pageSize)
                    .limit(paginationForBlogs.pageSize)
                    .toArray();
            }
            blogs = (0, viewModelsMapMethod_1.mapViewBlogsModel)(blogs);
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
            const foundBlog = yield mongo_db_1.blogCollection.findOne({ '_id': id });
            if (!foundBlog) {
                return false;
            }
            return (0, viewModelsMapMethod_1.mapViewBlogsModel)(foundBlog);
        });
    },
    totalBlogs(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mongo_db_1.blogCollection.countDocuments(params);
        });
    }
};
