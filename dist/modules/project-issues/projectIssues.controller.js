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
exports.ProjectIssueController = void 0;
const handleAsyncRequest_1 = __importDefault(require("../../utils/share/handleAsyncRequest"));
const sendResponse_1 = __importDefault(require("../../utils/share/sendResponse"));
const projectIssues_services_1 = require("./projectIssues.services");
const socket_1 = require("../../socket/socket");
// ✅ Create project issue
// const createProjectIssue = handleAsyncRequest(async (req: Request, res: Response) => {
//   const result = await ProjectIssueService.createProjectIssue(req.body);
//   sendResponse(res, {
//     success: true,
//     statusCode: 201,
//     message: 'Project issue created successfully!',
//     data: result,
//   });
// });
const createProjectIssue = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield projectIssues_services_1.ProjectIssueService.createProjectIssue(req.body, socket_1.io);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: 'Project issue created and team notified!',
        data: result,
    });
}));
// ✅ Get all project issues
const getAllProjectIssues = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield projectIssues_services_1.ProjectIssueService.getAllProjectIssues(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Project issues retrieved successfully!',
        data: result,
    });
}));
// ✅ Get project issue by ID
const getProjectIssueById = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield projectIssues_services_1.ProjectIssueService.getProjectIssueById(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Project issue retrieved successfully!',
        data: result,
    });
}));
// ✅ Update project issue
const updateProjectIssue = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield projectIssues_services_1.ProjectIssueService.updateProjectIssue(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Project issue updated successfully!',
        data: result,
    });
}));
// ✅ Delete project issue
const deleteProjectIssue = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield projectIssues_services_1.ProjectIssueService.deleteProjectIssue(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Project issue deleted successfully!',
        data: result,
    });
}));
exports.ProjectIssueController = {
    createProjectIssue,
    getAllProjectIssues,
    getProjectIssueById,
    updateProjectIssue,
    deleteProjectIssue,
};
