"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.BlogController = void 0;
const blogQyeryRepository_1 = require("../repository/blogQyeryRepository");
const blogsService_1 = require("../domain/blogsService");
const settings_1 = require("../../../settings");
const mongodb_1 = require("mongodb");
const inversify_1 = require("inversify");
let BlogController = class BlogController {
    constructor(blogsService, queryBlogRepository) {
        this.blogsService = blogsService;
        this.queryBlogRepository = queryBlogRepository;
    }
    createBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdBlogId = yield this.blogsService.create(req.body);
            if (!createdBlogId) {
                res.send(settings_1.httpStatusCodes.BAD_REQUEST_400);
                return;
            }
            const getCreatedBlog = yield this.queryBlogRepository.getById(new mongodb_1.ObjectId(createdBlogId));
            res.status(settings_1.httpStatusCodes.CREATED_201).send(getCreatedBlog);
        });
    }
    getAllBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allBlogs = yield this.queryBlogRepository.getAll(req.query);
            res.status(settings_1.httpStatusCodes.OK_200).send(allBlogs);
        });
    }
    getBlogById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fuondBlog = yield this.queryBlogRepository.getById(new mongodb_1.ObjectId(req.params.id));
            if (!fuondBlog) {
                res.send(settings_1.httpStatusCodes.NOT_FOUND_404);
            }
            else {
                res.status(settings_1.httpStatusCodes.OK_200).send(fuondBlog);
            }
        });
    }
    updateById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updetedBlog = yield this.blogsService.update(req.body, req.params.id);
            if (!updetedBlog) {
                res.send(settings_1.httpStatusCodes.NOT_FOUND_404);
            }
            else {
                res.send(settings_1.httpStatusCodes.NO_CONTENT_204);
            }
        });
    }
    deletById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedBlog = yield this.blogsService.deleteById(req.params.id);
            if (!deletedBlog) {
                res.send(settings_1.httpStatusCodes.NOT_FOUND_404);
                return;
            }
            res.send(settings_1.httpStatusCodes.NO_CONTENT_204);
            return;
        });
    }
};
exports.BlogController = BlogController;
exports.BlogController = BlogController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(blogsService_1.BlogsService)),
    __param(1, (0, inversify_1.inject)(blogQyeryRepository_1.QueryBlogRepository)),
    __metadata("design:paramtypes", [blogsService_1.BlogsService, blogQyeryRepository_1.QueryBlogRepository])
], BlogController);
// export const blogController = new BlogController()
// export const createBlogController = async (req:Request , res:Response)=>{
//    const createdBlogId = await blogsService.create(req.body)
//    if (!createdBlogId) {
//       res.send(httpStatusCodes.BAD_REQUEST_400)
//       return
//    }
//    const getCreatedBlog = await queryBlogRepository.getById(new ObjectId(createdBlogId))
//    res.status(httpStatusCodes.CREATED_201).send(getCreatedBlog)
// }
// export const getAllBlogController = async (req:Request | any , res:Response)=>{
//    const allBlogs = await queryBlogRepository.getAll(req.query) 
//    res.status(httpStatusCodes.OK_200).send(allBlogs)
// }
// export const getByIdController = async (req:Request , res:Response)=>{
//    const fuondBlog = await queryBlogRepository.getById(new ObjectId(req.params.id))
//    if (!fuondBlog) {
//       res.send(httpStatusCodes.NOT_FOUND_404)
//    }
//    else {
//       res.status(httpStatusCodes.OK_200).send(fuondBlog)
//    }
// }
// export const updateByIdController = async (req:Request , res:Response)=>{
//    const updetedBlog = await blogsService.update(req.body , req.params.id)
//    if (!updetedBlog) {
//       res.send(httpStatusCodes.NOT_FOUND_404)
//    }
//    else{
//       res.send(httpStatusCodes.NO_CONTENT_204)
//    }
// }
// export const deletByIdController = async (req:Request , res:Response)=>{
//    const deletedBlog = await blogsService.deleteById(req.params.id)
//    if (!deletedBlog) {
//       res.send(httpStatusCodes.NOT_FOUND_404)
//       return
//    }
//     res.send(httpStatusCodes.NO_CONTENT_204)
//    return
// }
