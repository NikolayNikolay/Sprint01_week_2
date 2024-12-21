"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const settings_1 = require("../settings");
const authMiddleware = (req, res, next) => {
    const autoris = req.headers['authorisation'];
    if (!autoris) {
        console.log(autoris);
        res.send(settings_1.httpStatusCodes.UNAUTHORIZED);
        return;
    }
    const buff2 = Buffer.from(settings_1.ADMIN_AUTH, 'utf8');
    const codedAuth = buff2.toString('base64');
    // if (decodedAuth === ADMIN_AUTH || auth.slice(0, 5) !== 'Basic ') {
    if (!autoris.includes(codedAuth) || !autoris.includes('Basic ')) {
        res.send(settings_1.httpStatusCodes.UNAUTHORIZED);
        return;
    }
    next();
};
exports.authMiddleware = authMiddleware;
