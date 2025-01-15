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
    const loginOrEmail = params.searchLoginTerm || params.searchEmailTerm ? { "login": { "$regex": params.searchLoginTerm, "$options": "i" },
        "email": { "$regex": params.searchEmailTerm, "$options": "i" } } : {};
    return Object.assign(Object.assign(Object.assign({}, id), search), loginOrEmail);
};
exports.filter = filter;
