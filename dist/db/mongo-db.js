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
exports.runDB = exports.postCollection = exports.blogCollection = exports.db = void 0;
const mongodb_1 = require("mongodb");
const settings_1 = require("../settings");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// const { MongoClient} = require('mongodb');
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
let client = null;
// export const db: Db = client.db(SETTINGS.PATH.DATA_BASE_NAME)
// export const blogCollection:Collection<BlogViewModelType> = db.collection(SETTINGS.PATH.BLOG_COLLECTION_NAME);
// export const postCollection:Collection<PostViewModelType> = db.collection(SETTINGS.PATH.POST_COLLECTION_NAME);
const runDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(process.env.MONGO_URL);
        client = new mongodb_1.MongoClient(process.env.MONGO_URL || 'mongodb://localhost:27017/');
        // Connect the client to the server	(optional starting in v4.7)
        yield client.connect();
        exports.db = client.db(settings_1.SETTINGS.PATH.DATA_BASE_NAME);
        exports.blogCollection = exports.db.collection(settings_1.SETTINGS.PATH.BLOG_COLLECTION_NAME);
        exports.postCollection = exports.db.collection(settings_1.SETTINGS.PATH.POST_COLLECTION_NAME);
        yield client.db("admin").command({ ping: 1 });
        console.log("You successfully connected to MongoDB!");
        return true;
    }
    catch (e) {
        console.log(e);
        yield client.close();
        return false;
    }
});
exports.runDB = runDB;
