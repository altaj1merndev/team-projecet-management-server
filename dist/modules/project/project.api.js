"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constants_1 = require("../user/auth/auth.constants");
const project_controllers_1 = require("./project.controllers");
const router = (0, express_1.Router)();
// auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),
router.post('/', project_controllers_1.ProjectController.createProject);
router.get('/', project_controllers_1.ProjectController.getAllProjects);
router.get('/:id', project_controllers_1.ProjectController.getProjectById);
router.put('/:id', (0, auth_1.default)(auth_constants_1.USER_ROLE.ADMIN, auth_constants_1.USER_ROLE.MANAGER), project_controllers_1.ProjectController.updateProject);
router.delete('/:id', (0, auth_1.default)(auth_constants_1.USER_ROLE.ADMIN), project_controllers_1.ProjectController.deleteProject);
exports.ProjectRoutes = router;
