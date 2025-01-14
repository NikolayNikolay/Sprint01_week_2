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
const mongo_db_1 = require("../../../db/mongo-db");
exports.blogRepository = {
    create(newBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultCreated = yield mongo_db_1.blogCollection.insertOne(newBlog);
            return resultCreated.insertedId.toString();
        });
    },
    // async getAll(paginations:QueryParamsType):Promise<BlogViewModelType[]>{
    //    console.log(paginations);
    //    let items= null
    //    if(paginations.searchNameTerm){
    //       items = await blogCollection.find({[paginations.sortBy]: { $regex: paginations.searchNameTerm, $options: "i" }})
    //       .sort(paginations.sortBy,paginations.sortDirection as SortDirections)
    //       .skip((paginations.pageNumber - 1) * paginations.pageSize)
    //       .limit(paginations.pageSize)
    //       .toArray()
    //       return items
    //    }
    //    items = await blogCollection.find({})
    //       .sort(paginations.sortBy,paginations.sortDirection as SortDirections)
    //       .skip((paginations.pageNumber - 1) * paginations.pageSize)
    //       .limit(paginations.pageSize)
    //       .toArray()
    //       return items
    // },
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundBlog = yield mongo_db_1.blogCollection.findOne({ '_id': id });
            if (!foundBlog) {
                return false;
            }
            return foundBlog;
        });
    },
    update(input, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUpdatedBlog = yield mongo_db_1.blogCollection.updateOne({ "_id": id }, { $set: Object.assign({}, input) });
            return isUpdatedBlog.acknowledged;
        });
    },
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedBlog = yield mongo_db_1.blogCollection.deleteOne({ "_id": id });
            return deletedBlog.deletedCount === 1;
        });
    },
    totalBlogs(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mongo_db_1.blogCollection.countDocuments(params);
        });
    }
};
