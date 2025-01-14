"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLoginRouter = void 0;
const express_1 = require("express");
const authLoginController_1 = require("../controller/authLoginController");
exports.authLoginRouter = (0, express_1.Router)();
exports.authLoginRouter.post('/', authLoginController_1.authLoginController.authLoginPost);
