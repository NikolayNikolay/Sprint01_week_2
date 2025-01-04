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
exports.postRepository = void 0;
const mongo_db_1 = require("../../db/mongo-db");
exports.postRepository = {
    create(newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongo_db_1.postCollection.insertOne(newPost);
            if (result.acknowledged) {
                return yield mongo_db_1.postCollection.findOne({ 'id': newPost.id }, { projection: { _id: 0 } });
            }
            return false;
        });
    },
    getAll(paginations) {
        return __awaiter(this, void 0, void 0, function* () {
            return mongo_db_1.postCollection.find({}, { projection: { _id: 0 } }).sort(paginations.sortBy, paginations.sortDirection)
                .skip((paginations.pageNumber - 1) * paginations.pageSize)
                .limit(paginations.pageSize).toArray();
        });
    },
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundPost = yield mongo_db_1.postCollection.findOne({ 'id': id }, { projection: { _id: 0 } });
            if (!foundPost) {
                return false;
            }
            return foundPost;
        });
    },
    update(input, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existedPost = yield mongo_db_1.postCollection.findOne({ "id": id });
            if (!existedPost) {
                return false;
            }
            const result = yield mongo_db_1.postCollection.updateOne({ "id": id }, { $set: Object.assign({}, input) });
            return result.acknowledged;
        });
    },
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedPost = yield mongo_db_1.postCollection.deleteOne({ "id": id });
            return deletedPost.deletedCount === 1;
        });
    },
    totalCountPostsforBlog(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mongo_db_1.postCollection.countDocuments(params);
        });
    }
};
