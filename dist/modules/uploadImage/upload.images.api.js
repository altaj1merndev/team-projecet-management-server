"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constants_1 = require("../user/auth/auth.constants");
const upload_image_controller_1 = require("./upload.image.controller");
const sendImageToCloudinary_1 = require("../../utils/lib/sendImageToCloudinary");
const router = (0, express_1.Router)();
router.post('/:folder', (0, auth_1.default)(auth_constants_1.USER_ROLE.ADMIN, auth_constants_1.USER_ROLE.EMPLOYEE, auth_constants_1.USER_ROLE.TEAM_LEADER, auth_constants_1.USER_ROLE.TEAM_MEMBER), sendImageToCloudinary_1.upload.array('file'), upload_image_controller_1.UploadImageControllers.uploadMultipleImages);
exports.UploadRoutes = router;
