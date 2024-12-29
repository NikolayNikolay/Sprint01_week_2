"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMIN_AUTH = exports.httpStatusCodes = exports.mongoURI = exports.SETTINGS = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)(); // добавление переменных из файла .env в process.env
exports.SETTINGS = {
    // все хардкодные значения должны быть здесь, для удобства их изменения
    PORT: process.env.PORT || 5000,
    PATH: {
        blogs: "/blogs",
        posts: "/posts",
        dellAllData: "/testing/all-data",
        DATA_BASE_NAME: 'Blogers_Platform',
        BLOG_COLLECTION_NAME: "blogs",
        POST_COLLECTION_NAME: "post"
    },
};
exports.mongoURI = process.env.MONGO_URL || 'mongodb://localhost:27017/';
exports.httpStatusCodes = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404
};
exports.ADMIN_AUTH = 'admin:qwerty';
