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
exports.ProjectResourceController = void 0;
const handleAsyncRequest_1 = __importDefault(require("../../utils/share/handleAsyncRequest"));
const sendResponse_1 = __importDefault(require("../../utils/share/sendResponse"));
const projectResource_services_1 = require("./projectResource.services");
// ✅ Create project resource
const createProjectResource = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield projectResource_services_1.ProjectResourceService.createProjectResource(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: 'Project resource created successfully!',
        data: result,
    });
}));
// ✅ Get all project resources
const getAllProjectResources = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield projectResource_services_1.ProjectResourceService.getAllProjectResources(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Project resources retrieved successfully!',
        data: result,
    });
}));
// ✅ Get project resource by ID
const getProjectResourceById = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield projectResource_services_1.ProjectResourceService.getProjectResourceById(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Project resource retrieved successfully!',
        data: result,
    });
}));
const getResourcesByProjectId = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.params.projectId;
    const result = yield projectResource_services_1.ProjectResourceService.getResourcesByProjectId(projectId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Resources for the project retrieved successfully!',
        data: result,
    });
}));
// ✅ Update project resource
const updateProjectResource = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield projectResource_services_1.ProjectResourceService.updateProjectResource(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Project resource updated successfully!',
        data: result,
    });
}));
// ✅ Delete project resource
const deleteProjectResource = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield projectResource_services_1.ProjectResourceService.deleteProjectResource(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Project resource deleted successfully!',
        data: result,
    });
}));
exports.ProjectResourceController = {
    createProjectResource,
    getAllProjectResources,
    getProjectResourceById,
    getResourcesByProjectId,
    updateProjectResource,
    deleteProjectResource,
};
