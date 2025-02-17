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
exports.deleteAllDataBaseRepositoriry = void 0;
const mongo_db_1 = require("../../../db/mongo-db");
const deleteAllDataBaseRepositoriry = () => __awaiter(void 0, void 0, void 0, function* () {
    // const resultAllBlogsDel = await blogCollection.deleteMany({});
    // const resultAllPostsDel = await postCollection.deleteMany({});
    // const resultAllUsersDel = await usersCollection.deleteMany({});
    // const resultAllCommentsDel = await commentsCollection.deleteMany({});
    const collections = yield mongo_db_1.db.listCollections().toArray();
    for (const colletion of collections) {
        yield mongo_db_1.db.collection(colletion.name).deleteMany({});
    }
    // return [resultAllBlogsDel.acknowledged , resultAllPostsDel.acknowledged,resultAllUsersDel.acknowledged]
});
exports.deleteAllDataBaseRepositoriry = deleteAllDataBaseRepositoriry;
