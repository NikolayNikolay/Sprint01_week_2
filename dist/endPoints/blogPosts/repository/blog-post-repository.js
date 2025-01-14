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
const mongo_db_1 = require("../../../db/mongo-db");
exports.blogPostsRepository = {
    createPostForBlog(newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongo_db_1.postCollection.insertOne(newPost);
            return result.insertedId.toString();
        });
    },
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundBlog = yield mongo_db_1.blogCollection.findOne({ '_id': id });
            return foundBlog;
        });
    }
};
