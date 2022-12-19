"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const axios_1 = __importDefault(require("axios"));
const IMGBB_KEY = 'bf9c4d05da8a8720af92ce0d42404b80';
function uploadEndpoint() {
    const upload = (0, multer_1.default)({
        limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
    });
    console.log({ upload });
    const uploadFileMiddleware = upload.single('image');
    return uploadFileMiddleware;
}
const routes = (0, express_1.Router)();
routes.post('/image', uploadEndpoint(), async (req, res) => {
    const response = await axios_1.default.post(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, req.body, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (response?.data?.status === 200) {
        res.status(200).json({ success: true, data: response?.data?.data?.display_url });
    }
    else {
        res.status(response?.data?.status).json(response?.data);
    }
});
exports.default = routes;
//# sourceMappingURL=upload.js.map