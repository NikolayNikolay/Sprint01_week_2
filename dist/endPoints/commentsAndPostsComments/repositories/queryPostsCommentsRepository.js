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
exports.queryPostsCommentsRepositotory = void 0;
const mongodb_1 = require("mongodb");
const mongo_db_1 = require("../../../db/mongo-db");
const resultResponsObject_1 = require("../../../helpers/resultResponsObject");
const resultStatus_1 = require("../../../enums/resultStatus");
const queryParamsPaginations_1 = require("../../../helpers/queryParamsPaginations");
const searchFilter_1 = require("../helpers/searchFilter");
const viewModelsMapMethod_1 = require("../../../helpers/viewModelsMapMethod");
exports.queryPostsCommentsRepositotory = {
    getAllcommentsForPost(queryParams, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkPost = yield mongo_db_1.postCollection.findOne({ _id: new mongodb_1.ObjectId(postId) });
            console.log(checkPost);
            if (!checkPost) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.NotFound, "Not found");
            }
            const searchFilter = (0, searchFilter_1.filterForCommentsPost)(queryParams, postId);
            const totalCount = yield this.totalCountCommentsForPost(searchFilter);
            const PaginationParams = (0, queryParamsPaginations_1.PaginationQueryParams)(queryParams);
            let comments = yield mongo_db_1.commentsCollection.find({ 'postId': postId }).sort(PaginationParams.sortBy, PaginationParams.sortDirection)
                .skip((PaginationParams.pageNumber - 1) * PaginationParams.pageSize)
                .limit(PaginationParams.pageSize)
                .toArray();
            comments = (0, viewModelsMapMethod_1.mapViewCommentsModel)(comments);
            const responsData = {
                pagesCount: Math.ceil(totalCount / PaginationParams.pageSize),
                page: PaginationParams.pageNumber,
                pageSize: PaginationParams.pageSize,
                totalCount,
                items: comments
            };
            return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.Success, 'Success', responsData);
        });
    },
    totalCountCommentsForPost(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return mongo_db_1.commentsCollection.countDocuments(params);
        });
    }
};
