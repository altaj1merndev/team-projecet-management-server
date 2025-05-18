"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectResourceRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constants_1 = require("../user/auth/auth.constants");
const projectResource_controller_1 = require("./projectResource.controller");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(auth_constants_1.USER_ROLE.ADMIN, auth_constants_1.USER_ROLE.MANAGER), projectResource_controller_1.ProjectResourceController.createProjectResource);
router.get('/', projectResource_controller_1.ProjectResourceController.getAllProjectResources);
router.get('/:id', projectResource_controller_1.ProjectResourceController.getProjectResourceById);
router.get('/project/:projectId', projectResource_controller_1.ProjectResourceController.getResourcesByProjectId);
router.put('/:id', (0, auth_1.default)(auth_constants_1.USER_ROLE.ADMIN, auth_constants_1.USER_ROLE.MANAGER), projectResource_controller_1.ProjectResourceController.updateProjectResource);
router.delete('/:id', (0, auth_1.default)(auth_constants_1.USER_ROLE.ADMIN), projectResource_controller_1.ProjectResourceController.deleteProjectResource);
exports.ProjectResourceRoutes = router;
