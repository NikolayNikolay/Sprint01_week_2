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
exports.blogPostsRepository = void 0;
const mongo_db_1 = require("../../db/mongo-db");
exports.blogPostsRepository = {
    getAllPostsForBlog(blogId, paginations) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield mongo_db_1.postCollection.find({ 'blogId': blogId }, { projection: { _id: 0 } })
                .sort(paginations.sortBy, paginations.sortDirection)
                .skip((paginations.pageNumber - 1) * paginations.pageSize)
                .limit(paginations.pageSize)
                .toArray();
            return items;
        });
    }
};
