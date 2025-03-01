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
exports.BlogsService = void 0;
const mongodb_1 = require("mongodb");
const BlogViewModel_1 = require("../models/BlogViewModel");
const blogsRepository_1 = require("../repository/blogsRepository");
const viewModelsMapMethod_1 = require("../../../helpers/viewModelsMapMethod");
const inversify_1 = require("inversify");
let BlogsService = class BlogsService {
    constructor(blogRepository) {
        this.blogRepository = blogRepository;
    }
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = new BlogViewModel_1.BlogViewModel(input.name, input.description, input.websiteUrl, new Date().toISOString(), false);
            const resultId = yield this.blogRepository.create(newBlog);
            return resultId;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield this.blogRepository.getById(new mongodb_1.ObjectId(id));
            if (blog) {
                return (0, viewModelsMapMethod_1.mapViewBlogsModel)(blog);
            }
            return false;
        });
    }
    update(input, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield this.blogRepository.getById(new mongodb_1.ObjectId(id));
            if (!blog) {
                return false;
            }
            return yield this.blogRepository.update(input, new mongodb_1.ObjectId(id));
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.blogRepository.deleteById(new mongodb_1.ObjectId(id));
        });
    }
};
exports.BlogsService = BlogsService;
exports.BlogsService = BlogsService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(blogsRepository_1.BlogRepository)),
    __metadata("design:paramtypes", [blogsRepository_1.BlogRepository])
], BlogsService);
// export const blogsService = new BlogsService()
