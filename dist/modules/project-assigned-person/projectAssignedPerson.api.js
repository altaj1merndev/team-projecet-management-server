"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectAssignedPersonRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constants_1 = require("../user/auth/auth.constants");
const projectAssignedPerson_controller_1 = require("./projectAssignedPerson.controller");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(auth_constants_1.USER_ROLE.ADMIN, auth_constants_1.USER_ROLE.MANAGER), projectAssignedPerson_controller_1.ProjectAssignedPersonController.createAssignedPerson);
router.get('/', projectAssignedPerson_controller_1.ProjectAssignedPersonController.getAllAssignedPersons);
router.get('/:id', projectAssignedPerson_controller_1.ProjectAssignedPersonController.getAssignedPersonById);
router.get('/project/:projectId', projectAssignedPerson_controller_1.ProjectAssignedPersonController.getAssignedPersonsByProjectId);
router.put('/:id', (0, auth_1.default)(auth_constants_1.USER_ROLE.ADMIN, auth_constants_1.USER_ROLE.MANAGER), projectAssignedPerson_controller_1.ProjectAssignedPersonController.updateAssignedPerson);
router.delete('/:id', (0, auth_1.default)(auth_constants_1.USER_ROLE.ADMIN), projectAssignedPerson_controller_1.ProjectAssignedPersonController.deleteAssignedPerson);
exports.ProjectAssignedPersonRoutes = router;
