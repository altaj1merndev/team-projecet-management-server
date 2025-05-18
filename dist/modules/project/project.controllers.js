"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const handleAsyncRequest_1 = __importDefault(require("../../utils/share/handleAsyncRequest"));
const sendResponse_1 = __importDefault(require("../../utils/share/sendResponse"));
const project_services_1 = require("./project.services");
// ✅ Create project
const createProject = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_services_1.ProjectService.createProject(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: 'Project created successfully!',
        data: result,
    });
}));
// ✅ Get all projects
const getAllProjects = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_services_1.ProjectService.getAllProjects(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Projects retrieved successfully!',
        data: result,
    });
}));
// ✅ Get project by ID
const getProjectById = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_services_1.ProjectService.getProjectById(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Project retrieved successfully!',
        data: result,
    });
}));
// ✅ Update project
const updateProject = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_services_1.ProjectService.updateProject(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Project updated successfully!',
        data: result,
    });
}));
// ✅ Delete project
const deleteProject = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_services_1.ProjectService.deleteProject(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Project deleted successfully!',
        data: result,
    });
}));
exports.ProjectController = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
};
