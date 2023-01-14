"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../models");
const routes = (0, express_1.Router)();
// REGISTER
routes.post('/register', async (req, res) => {
    try {
        const { password, email, username } = req.body || {};
        if (!password || !email || !username) {
            throw Error('MISSING PARAMS');
        }
        const user = await models_1.UserModel.query().findOne({ email });
        if (user)
            throw Error('USERNAME_OR_EMAIL_EXISTED');
        const newUser = await models_1.UserModel.query().insert({
            email,
            emailConfirmed: false,
            username,
            displayName: username,
            password: models_1.UserModel.generateHash(password),
            lastActive: new Date(),
        });
        if (!newUser)
            throw Error('USER NOT EXIST');
        return res.status(200).json({ success: true, token: models_1.UserModel.jsonToToken({ email, password }), user: newUser });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send({ success: false, code: 401, message: err.message });
        }
    }
});
// LOGIN
routes.post('/login', async (req, res) => {
    try {
        const { password, email } = req.body;
        if (!password || !email)
            throw Error('MISSING PARAMS');
        const user = await models_1.UserModel.query().findOne({ email });
        if (!user || !models_1.UserModel.validPassword(password, user.password)) {
            throw new Error('INVALID_USER');
        }
        await models_1.UserModel.query().findById(user?.id).patch({ lastActive: new Date() });
        return res.status(200).json({ success: true, token: models_1.UserModel.jsonToToken({ email, password }), user });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send({ success: false, code: 401, message: err.message });
        }
    }
});
exports.default = routes;
//# sourceMappingURL=auth.js.map