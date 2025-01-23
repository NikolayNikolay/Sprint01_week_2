"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterForCommentsPost = void 0;
const filterForCommentsPost = (params, Id) => {
    let id = {};
    if (Id) {
        if (typeof Id === 'string') {
            id = { postId: Id };
        }
        else {
            id = { '_id': Id };
        }
    }
    const search = params.searchNameTerm && params.sortBy ? { [params.sortBy]: { $regex: params.searchNameTerm, $options: 'i' } } : {};
    return Object.assign(Object.assign({}, id), search);
};
exports.filterForCommentsPost = filterForCommentsPost;
