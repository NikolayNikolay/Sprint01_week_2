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
    create(newBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mongo_db_1.blogCollection.insertOne(newBlog);
        });
    },
    getAll(paginations) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(paginations);
            let items = null;
            if (paginations.searchNameTerm) {
                items = yield mongo_db_1.blogCollection.find({ [paginations.sortBy]: { $regex: paginations.searchNameTerm, $options: "i" } }, { projection: { _id: 0 } })
                    .sort(paginations.sortBy, paginations.sortDirection)
                    .skip((paginations.pageNumber - 1) * paginations.pageSize)
                    .limit(paginations.pageSize)
                    .toArray();
                return items;
            }
            items = yield mongo_db_1.blogCollection.find({}, { projection: { _id: 0 } })
                .sort(paginations.sortBy, paginations.sortDirection)
                .skip((paginations.pageNumber - 1) * paginations.pageSize)
                .limit(paginations.pageSize)
                .toArray();
            return items;
        });
    },
    // return blogCollection.find({},{projection:{_id:0}}).sort(paginations.sortBy, paginations.sortDirection as SortDirections)
    // .skip((paginations.pageNumber - 1) * paginations.pageSize)
    // .limit(paginations.pageSize).toArray()
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundBlog = yield mongo_db_1.blogCollection.findOne({ "id": id }, { projection: { _id: 0 } });
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
    },
    totalBlogs(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            if (params) {
                filter.blogId = params;
            }
            return yield mongo_db_1.blogCollection.countDocuments(filter);
        });
    }
};
