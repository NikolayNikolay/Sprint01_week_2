"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationQueryParams = void 0;
const SortDirections_enum_1 = require("../enums/SortDirections.enum");
const PaginationQueryParams = (queryParams) => {
    return {
        pageNumber: queryParams.pageNumber ? +queryParams.pageNumber : 1,
        pageSize: queryParams.pageSize !== undefined ? +queryParams.pageSize : 10,
        sortBy: queryParams.sortBy ? queryParams.sortBy : 'createdAt',
        sortDirection: SortDirections_enum_1.sortDirections.includes(queryParams.sortDirection) ? queryParams.sortDirection : 'desc',
        searchNameTerm: queryParams.searchNameTerm
    };
};
exports.PaginationQueryParams = PaginationQueryParams;
