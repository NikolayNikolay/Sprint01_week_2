"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const blogs_router_1 = require("./routers/blogs-router");
const posts_router_1 = require("./routers/posts-router");
const settings_1 = require("./settings");
const deleteAllDataController_1 = require("./controllers/deleteAllDataController/deleteAllDataController");
exports.app = (0, express_1.default)(); // создать приложение
exports.app.use(express_1.default.json()); // создание свойств-объектов body и query во всех реквестах
exports.app.use((0, cors_1.default)()); // разрешить любым фронтам делать запросы на наш бэк
exports.app.use(settings_1.SETTINGS.PATH.blogs, blogs_router_1.blogsRouter);
exports.app.use(settings_1.SETTINGS.PATH.posts, posts_router_1.postsRouter);
exports.app.delete(settings_1.SETTINGS.PATH.dellAllData, deleteAllDataController_1.deletAllDataController);
exports.app.get('/', (req, res) => {
    // эндпоинт, который будет показывать на верселе какая версия бэкэнда сейчас залита
    res.status(200).json({ version: '1.0' });
});
