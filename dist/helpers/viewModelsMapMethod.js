"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapViewUsersModel = exports.mapViewPostsModel = exports.mapViewBlogsModel = void 0;
const mapViewBlogsModel = (data) => {
    if (Array.isArray(data)) {
        return data.map((blog) => {
            const { _id } = blog, item = __rest(blog, ["_id"]);
            return { id: _id.toString(),
                name: item.name,
                description: item.description,
                websiteUrl: item.websiteUrl,
                createdAt: item.createdAt,
                isMembership: item.isMembership
            };
        });
    }
    else {
        const { _id } = data, item = __rest(data, ["_id"]);
        return { id: _id.toString(),
            name: item.name,
            description: item.description,
            websiteUrl: item.websiteUrl,
            createdAt: item.createdAt,
            isMembership: item.isMembership
        };
    }
};
exports.mapViewBlogsModel = mapViewBlogsModel;
const mapViewPostsModel = (data) => {
    if (Array.isArray(data)) {
        return data.map((post) => {
            const { _id } = post, item = __rest(post, ["_id"]);
            return { id: _id.toString(),
                title: item.title,
                shortDescription: item.shortDescription,
                content: item.content,
                blogId: item.blogId,
                blogName: item.blogName,
                createdAt: item.createdAt
            };
        });
    }
    else {
        const { _id } = data, item = __rest(data, ["_id"]);
        return { id: _id.toString(),
            title: item.title,
            shortDescription: item.shortDescription,
            content: item.content,
            blogId: item.blogId,
            blogName: item.blogName,
            createdAt: item.createdAt
        };
    }
};
exports.mapViewPostsModel = mapViewPostsModel;
const mapViewUsersModel = (data) => {
    if (Array.isArray(data)) {
        return data.map((post) => {
            const { _id } = post, item = __rest(post, ["_id"]);
            return { id: _id.toString(),
                login: item.login,
                email: item.email,
                createdAt: item.createdAt
            };
        });
    }
    else {
        const { _id } = data, item = __rest(data, ["_id"]);
        return { id: _id.toString(),
            login: item.login,
            email: item.email,
            createdAt: item.createdAt
        };
    }
};
exports.mapViewUsersModel = mapViewUsersModel;
