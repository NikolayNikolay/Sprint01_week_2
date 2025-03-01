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
        postsForBlog: "/:id/posts",
        users: '/users',
        authLogin: '/auth',
        comments: '/comments',
        security: '/security',
        passwordRecovery: '/password-recovery',
        newPassword: '/new-password',
        DATA_BASE_NAME: 'Blogers_Platform',
        BLOG_COLLECTION_NAME: "blogs",
        POST_COLLECTION_NAME: "posts",
        USERS_COLLECTION_NAME: "users",
        COMMENTS_COLLECTION_NAME: 'comments',
        ALL_REQUESTS_API_COLLECTION_NAME: 'allRequestsApi'
    },
    SECRET_KEY: process.env.SECRET_KEY || 12345
};
exports.mongoURI = process.env.MONGO_URL || 'mongodb://localhost:27017/';
exports.httpStatusCodes = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    UNAUTHORIZED_401: 401,
    NOT_FOUND_404: 404,
    FORBIDDEN_403: 403,
    Too_Many_Requests_429: 429
};
exports.ADMIN_AUTH = 'admin:qwerty';
