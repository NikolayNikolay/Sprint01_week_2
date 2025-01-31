"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const settings_1 = require("./settings");
const blog_post_router_1 = require("./endPoints/blogPosts/router/blog-post-router");
const users_router_1 = require("./endPoints/users/router/users-router");
const posts_router_1 = require("./endPoints/posts/router/posts-router");
const deleteAllDataController_1 = require("./endPoints/deleteAllData/controller/deleteAllDataController");
const blogs_router_1 = require("./endPoints/blogs/router/blogs-router");
const authLogin_router_1 = require("./endPoints/usersAuthorisation/router/authLogin-router");
const comments_router_1 = require("./endPoints/commentsAndPostsComments/rourer/comments-router");
const postsCommentsRouter_1 = require("./endPoints/commentsAndPostsComments/rourer/postsCommentsRouter");
exports.app = (0, express_1.default)(); // создать приложение
exports.app.use(express_1.default.json()); // создание свойств-объектов body и query во всех реквестах
exports.app.use((0, cors_1.default)()); // разрешить любым фронтам делать запросы на наш бэк
exports.app.use(settings_1.SETTINGS.PATH.blogs, blogs_router_1.blogsRouter);
exports.app.use(settings_1.SETTINGS.PATH.blogs, blog_post_router_1.blogPostRouter);
exports.app.use(settings_1.SETTINGS.PATH.posts, posts_router_1.postsRouter);
exports.app.use(settings_1.SETTINGS.PATH.users, users_router_1.usersRouter);
exports.app.use(settings_1.SETTINGS.PATH.authLogin, authLogin_router_1.authLoginRouter);
exports.app.use(settings_1.SETTINGS.PATH.comments, comments_router_1.commentsRouter);
exports.app.use(settings_1.SETTINGS.PATH.posts, postsCommentsRouter_1.postsCommentsRouter);
exports.app.delete(settings_1.SETTINGS.PATH.dellAllData, deleteAllDataController_1.deletAllDataController);
exports.app.get('/', (req, res) => {
    // эндпоинт, который будет показывать на верселе какая версия бэкэнда сейчас залита
    res.status(200).json({ version: '1.0' });
});
