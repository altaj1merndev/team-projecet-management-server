"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectMessageRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constants_1 = require("../user/auth/auth.constants");
const projectMessage_controller_1 = require("./projectMessage.controller");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(auth_constants_1.USER_ROLE.ADMIN, auth_constants_1.USER_ROLE.MANAGEMENT, auth_constants_1.USER_ROLE.OPERTION, auth_constants_1.USER_ROLE.SELLS), projectMessage_controller_1.ProjectMessageController.createProjectMessage);
router.get('/', (0, auth_1.default)(auth_constants_1.USER_ROLE.ADMIN, auth_constants_1.USER_ROLE.MANAGEMENT, auth_constants_1.USER_ROLE.OPERTION, auth_constants_1.USER_ROLE.SELLS), projectMessage_controller_1.ProjectMessageController.getAllProjectMessages);
router.get('/:id', (0, auth_1.default)(auth_constants_1.USER_ROLE.ADMIN, auth_constants_1.USER_ROLE.MANAGEMENT, auth_constants_1.USER_ROLE.OPERTION, auth_constants_1.USER_ROLE.SELLS), projectMessage_controller_1.ProjectMessageController.getProjectMessageById);
router.put('/:id', (0, auth_1.default)(auth_constants_1.USER_ROLE.ADMIN, auth_constants_1.USER_ROLE.MANAGEMENT, auth_constants_1.USER_ROLE.OPERTION, auth_constants_1.USER_ROLE.SELLS), projectMessage_controller_1.ProjectMessageController.updateProjectMessage);
router.delete('/:id', (0, auth_1.default)(auth_constants_1.USER_ROLE.ADMIN, auth_constants_1.USER_ROLE.MANAGEMENT, auth_constants_1.USER_ROLE.OPERTION, auth_constants_1.USER_ROLE.SELLS), projectMessage_controller_1.ProjectMessageController.deleteProjectMessage);
exports.ProjectMessageRoutes = router;
