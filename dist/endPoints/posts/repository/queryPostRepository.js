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
exports.postQueryRepository = void 0;
const mongo_db_1 = require("../../../db/mongo-db");
const serchFilter_1 = require("../../../helpers/serchFilter");
const queryParamsPaginations_1 = require("../../../helpers/queryParamsPaginations");
const viewModelsMapMethod_1 = require("../../../helpers/viewModelsMapMethod");
exports.postQueryRepository = {
    getAll(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const serchFilter = (0, serchFilter_1.filter)(queryParams);
            const totalCount = yield this.totalPosts(serchFilter);
            const paginationForPosts = (0, queryParamsPaginations_1.PaginationQueryParams)(queryParams);
            let posts = null;
            if (paginationForPosts.searchNameTerm) {
                posts = yield mongo_db_1.postCollection.find({ [paginationForPosts.sortBy]: { $regex: paginationForPosts.searchNameTerm, $options: "i" } }).sort(paginationForPosts.sortBy, paginationForPosts.sortDirection)
                    .skip((paginationForPosts.pageNumber - 1) * paginationForPosts.pageSize)
                    .limit(paginationForPosts.pageSize).toArray();
            }
            else {
                posts = yield mongo_db_1.postCollection.find({}).sort(paginationForPosts.sortBy, paginationForPosts.sortDirection)
                    .skip((paginationForPosts.pageNumber - 1) * paginationForPosts.pageSize)
                    .limit(paginationForPosts.pageSize).toArray();
            }
            posts = (0, viewModelsMapMethod_1.mapViewPostsModel)(posts);
            return {
                pagesCount: Math.ceil(totalCount / paginationForPosts.pageSize),
                page: paginationForPosts.pageNumber,
                pageSize: paginationForPosts.pageSize,
                totalCount: totalCount,
                items: posts
            };
        });
    },
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundPost = yield mongo_db_1.postCollection.findOne({ '_id': id });
            if (!foundPost) {
                return false;
            }
            return (0, viewModelsMapMethod_1.mapViewPostsModel)(foundPost);
        });
    },
    totalPosts(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mongo_db_1.postCollection.countDocuments(params);
        });
    }
};
