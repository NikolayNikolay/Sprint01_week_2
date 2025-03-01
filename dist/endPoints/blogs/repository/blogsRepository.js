"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.blogRepository = exports.BlogRepository = void 0;
const inversify_1 = require("inversify");
const mongo_db_1 = require("../../../db/mongo-db");
let BlogRepository = class BlogRepository {
    create(newBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultCreated = yield mongo_db_1.blogCollection.insertOne(newBlog);
            return resultCreated.insertedId.toString();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundBlog = yield mongo_db_1.blogCollection.findOne({ '_id': id });
            if (!foundBlog) {
                return false;
            }
            return foundBlog;
        });
    }
    update(input, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUpdatedBlog = yield mongo_db_1.blogCollection.updateOne({ "_id": id }, { $set: Object.assign({}, input) });
            return isUpdatedBlog.acknowledged;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedBlog = yield mongo_db_1.blogCollection.deleteOne({ "_id": id });
            return deletedBlog.deletedCount === 1;
        });
    }
    totalBlogs(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mongo_db_1.blogCollection.countDocuments(params);
        });
    }
};
exports.BlogRepository = BlogRepository;
exports.BlogRepository = BlogRepository = __decorate([
    (0, inversify_1.injectable)()
], BlogRepository);
exports.blogRepository = new BlogRepository();
