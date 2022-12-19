"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const prefix = '/auth';
const auth = (app) => {
    // REGISTER
    app.use(`${prefix}/register`, async (req, res) => {
        try {
            const { password, displayName, birthday, phone, email } = req.body || {};
            if (!password || !email || !phone || !displayName) {
                throw Error('MISSING PARAMS');
            }
            const user = await models_1.UserModel.query().findOne({ email });
            if (user)
                throw Error('USERNAME_OR_EMAIL_EXISTED');
            const newUser = await models_1.UserModel.query().insert({
                email,
                emailConfirmed: false,
                displayName,
                password: models_1.UserModel.generateHash(password),
                birthday,
                phone,
            });
            if (!newUser)
                throw Error('SOMETHING WRONG!');
            return res.status(200).json({ success: true, token: models_1.UserModel.jsonToToken({ email, password }), user });
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(500).send({ success: false, code: 401, message: err.message });
            }
        }
    });
    // LOGIN
    app.use(`${prefix}/login`, async (req, res) => {
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
};
exports.default = auth;
//# sourceMappingURL=auth.js.map