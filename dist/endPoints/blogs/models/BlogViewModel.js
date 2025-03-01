"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogViewModel = void 0;
class BlogViewModel {
    constructor(name, description, websiteUrl, createdAt, isMembership, id) {
        this.name = name;
        this.description = description;
        this.websiteUrl = websiteUrl;
        this.createdAt = createdAt;
        this.isMembership = isMembership;
        this.id = id;
    }
}
exports.BlogViewModel = BlogViewModel;
