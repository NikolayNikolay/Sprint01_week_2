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
exports.blogPostsController = void 0;
const blogsPostsService_1 = require("../../domain/blogsPostsService");
const settings_1 = require("../../settings");
exports.blogPostsController = {
    getAllPostsForBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const paginationsPostResult = yield blogsPostsService_1.blogPostsService.getAllPostsForBlog(req.params.id, req.query);
            if (!paginationsPostResult.items) {
                res.send(settings_1.httpStatusCodes.NOT_FOUND);
                return;
            }
            res.status(settings_1.httpStatusCodes.OK).send(paginationsPostResult);
        });
    }
};
