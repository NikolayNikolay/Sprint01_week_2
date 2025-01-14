"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filter = void 0;
const filter = (params, Id) => {
    let id = {};
    if (Id) {
        if (typeof Id === 'string') {
            id = { blogId: Id };
        }
        else {
            id = { '_id': Id };
        }
    }
    const search = params.searchNameTerm && params.sortBy ? { [params.sortBy]: { $regex: params.searchNameTerm, $options: 'i' } } : {};
    return Object.assign(Object.assign({}, id), search);
};
exports.filter = filter;
