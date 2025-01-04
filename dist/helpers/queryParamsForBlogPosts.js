"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filter = exports.PaginationForBlogsPosts = void 0;
const SortDirections_enum_1 = require("../enums/SortDirections.enum");
const PaginationForBlogsPosts = (queryParams) => {
    return {
        pageNumber: queryParams.pageNumber ? +queryParams.pageNumber : 1,
        pageSize: queryParams.pageSize !== undefined ? +queryParams.pageSize : 10,
        sortBy: queryParams.sortBy ? queryParams.sortBy : 'createdAt',
        sortDirection: SortDirections_enum_1.sortDirections.includes(queryParams.sortDirection) ? queryParams.sortDirection : 'desc',
        searchNameTerm: queryParams.searchNameTerm
    };
};
exports.PaginationForBlogsPosts = PaginationForBlogsPosts;
const filter = (params, blogId) => {
    const id = blogId ? { blogId: blogId } : {};
    const search = params.searchNameTerm && params.sortBy ? { [params.sortBy]: { $regex: params.searchNameTerm, $options: 'i' } } : {};
    return Object.assign(Object.assign({}, id), search);
};
exports.filter = filter;
