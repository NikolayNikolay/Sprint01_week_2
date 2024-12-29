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
exports.blogRepository = void 0;
const mongo_db_1 = require("../../db/mongo-db");
exports.blogRepository = {
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = Object.assign(Object.assign({}, input), { id: Date.now() + Math.random().toString(), createdAt: new Date().toISOString(), isMembership: false });
            const result = yield mongo_db_1.blogCollection.insertOne(newBlog);
            if (result.acknowledged) {
                return newBlog;
            }
            return false;
        });
    },
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const blogs = mongo_db_1.blogCollection.find({}).toArray();
            return blogs;
        });
    },
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundBlog = yield mongo_db_1.blogCollection.findOne({ "id": id });
            if (!foundBlog) {
                return false;
            }
            return foundBlog;
        });
    },
    update(input, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existedBlog = yield mongo_db_1.blogCollection.findOne({ "id": id });
            if (!existedBlog) {
                return false;
            }
            yield mongo_db_1.blogCollection.updateOne({ "id": id }, { $set: Object.assign({}, input) });
            return true;
        });
    },
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedBlog = yield mongo_db_1.blogCollection.deleteOne({ "id": id });
            return deletedBlog.deletedCount === 1;
        });
    }
};
