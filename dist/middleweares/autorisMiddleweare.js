"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const settings_1 = require("../settings");
const authMiddleware = (req, res, next) => {
    console.log('inside Authorization');
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
        console.log('No Authorization header');
        res.send(settings_1.httpStatusCodes.UNAUTHORIZED);
    }
    if (!authorizationHeader.startsWith('Basic ')) {
        console.log('Authorization header is not Basic');
        res.send(settings_1.httpStatusCodes.UNAUTHORIZED);
    }
    const encodedAuth = authorizationHeader.slice(6); // Extract the base64 part
    const expectedAuth = Buffer.from(settings_1.ADMIN_AUTH, 'utf8').toString('base64');
    if (encodedAuth !== expectedAuth) {
        console.log('Invalid credentials');
        res.send(settings_1.httpStatusCodes.UNAUTHORIZED);
    }
    next(); // Proceed to the next middleware or route handler
    //    const autorisHeader = req.headers
    //    const autoris = autorisHeader.authorization
    //    if (!autoris) {
    //       console.log(autoris)
    //       res.send(httpStatusCodes.UNAUTHORIZED)
    //       return
    //   }
    //   const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
    //   const codedAuth = buff2.toString('base64')
    //   // if (decodedAuth === ADMIN_AUTH || auth.slice(0, 5) !== 'Basic ') {
    //   if (autoris.slice(6) !== codedAuth || autoris.slice(0, 5) !== 'Basic ') {
    //    res.send(httpStatusCodes.UNAUTHORIZED)
    //       return
    //   }
};
exports.authMiddleware = authMiddleware;
