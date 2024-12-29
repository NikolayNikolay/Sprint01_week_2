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
const mongo_db_2 = require("../../db/mongo-db");
exports.postRepository = {
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield mongo_db_2.blogCollection.findOne({ 'id': input.blogId });
            if (blog) {
                const newPost = Object.assign(Object.assign({}, input), { id: Date.now() + Math.random().toString(), blogName: blog.name, createdAt: new Date().toISOString() });
                const result = yield mongo_db_1.postCollection.insertOne(newPost);
                if (result.acknowledged) {
                    return newPost;
                }
                return false;
            }
            else {
                return false;
            }
        });
    },
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return mongo_db_1.postCollection.find({}).toArray();
        });
    },
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundPost = yield mongo_db_1.postCollection.findOne({ 'id': id });
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
            yield mongo_db_1.postCollection.updateOne({ "id": id }, { $set: Object.assign({}, input) });
            return true;
        });
    },
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedPost = yield mongo_db_1.postCollection.deleteOne({ "id": id });
            return deletedPost.deletedCount === 1;
        });
    }
};
