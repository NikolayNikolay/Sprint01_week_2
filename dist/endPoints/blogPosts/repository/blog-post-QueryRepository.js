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
exports.blogPostsQueryRepository = void 0;
const mongo_db_1 = require("../../../db/mongo-db");
const queryParamsPaginations_1 = require("../../../helpers/queryParamsPaginations");
const serchFilter_1 = require("../../../helpers/serchFilter");
const viewModelsMapMethod_1 = require("../../../helpers/viewModelsMapMethod");
exports.blogPostsQueryRepository = {
    getAllPostsForBlog(blogId, queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchFilter = (0, serchFilter_1.filter)(queryParams, blogId);
            const totalCount = yield this.totalCountPostsforBlog(searchFilter);
            const PaginationParams = (0, queryParamsPaginations_1.PaginationQueryParams)(queryParams);
            let items = null;
            if (PaginationParams.searchNameTerm) {
                items = yield mongo_db_1.postCollection.find({ [PaginationParams.sortBy]: { $regex: PaginationParams.searchNameTerm, $options: "i" }, 'blogId': blogId })
                    .sort(PaginationParams.sortBy, PaginationParams.sortDirection)
                    .skip((PaginationParams.pageNumber - 1) * PaginationParams.pageSize)
                    .limit(PaginationParams.pageSize)
                    .toArray();
            }
            else {
                items = yield mongo_db_1.postCollection.find({ 'blogId': blogId })
                    .sort(PaginationParams.sortBy, PaginationParams.sortDirection)
                    .skip((PaginationParams.pageNumber - 1) * PaginationParams.pageSize)
                    .limit(PaginationParams.pageSize)
                    .toArray();
            }
            items = (0, viewModelsMapMethod_1.mapViewPostsModel)(items);
            return {
                pagesCount: Math.ceil(totalCount / PaginationParams.pageSize),
                page: PaginationParams.pageNumber,
                pageSize: PaginationParams.pageSize,
                totalCount,
                items: items
            };
        });
    },
    totalCountPostsforBlog(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mongo_db_1.postCollection.countDocuments(params);
        });
    },
    getPostforBlog(idPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield mongo_db_1.postCollection.findOne({ '_id': idPost });
            return (0, viewModelsMapMethod_1.mapViewPostsModel)(post);
        });
    }
};
