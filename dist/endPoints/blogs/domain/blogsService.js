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
exports.blogsService = void 0;
const mongodb_1 = require("mongodb");
const blogsRepository_1 = require("../repository/blogsRepository");
const viewModelsMapMethod_1 = require("../../../helpers/viewModelsMapMethod");
exports.blogsService = {
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = Object.assign(Object.assign({}, input), { createdAt: new Date().toISOString(), isMembership: false });
            const resultId = yield blogsRepository_1.blogRepository.create(newBlog);
            console.log(resultId);
            return resultId;
        });
    },
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blogsRepository_1.blogRepository.getById(new mongodb_1.ObjectId(id));
            if (blog) {
                return (0, viewModelsMapMethod_1.mapViewBlogsModel)(blog);
            }
            return false;
        });
    },
    update(input, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blogsRepository_1.blogRepository.getById(new mongodb_1.ObjectId(id));
            if (!blog) {
                return false;
            }
            return yield blogsRepository_1.blogRepository.update(input, new mongodb_1.ObjectId(id));
        });
    },
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogsRepository_1.blogRepository.deleteById(new mongodb_1.ObjectId(id));
        });
    }
};
