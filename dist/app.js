"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const blogs_router_1 = require("./routers/blogs-router");
const settings_1 = require("./settings");
const blogsController_1 = require("./controllers/blogsController/blogsController");
exports.app = (0, express_1.default)(); // создать приложение
exports.app.use(express_1.default.json()); // создание свойств-объектов body и query во всех реквестах
exports.app.use((0, cors_1.default)()); // разрешить любым фронтам делать запросы на наш бэк
exports.app.use(settings_1.SETTINGS.PATH.blogs, blogs_router_1.blogsRouter);
exports.app.delete(settings_1.SETTINGS.PATH.dellAllData, blogsController_1.deletAllBlogsController);
exports.app.get('/', (req, res) => {
    console.log('1212121212121212121212121');
    // эндпоинт, который будет показывать на верселе какая версия бэкэнда сейчас залита
    res.status(200).json({ version: '1.0' });
});
