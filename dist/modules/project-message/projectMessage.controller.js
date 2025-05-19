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
exports.ProjectMessageController = void 0;
const handleAsyncRequest_1 = __importDefault(require("../../utils/share/handleAsyncRequest"));
const sendResponse_1 = __importDefault(require("../../utils/share/sendResponse"));
const projectMessage_service_1 = require("./projectMessage.service");
const socket_1 = require("../../socket/socket");
// ✅ Create project message
const createProjectMessage = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield projectMessage_service_1.ProjectMessageService.createProjectMessage(req.body, socket_1.io);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: 'Project message created and team notified!',
        data: result,
    });
}));
// ✅ Get all project messages
const getAllProjectMessages = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield projectMessage_service_1.ProjectMessageService.getAllProjectMessages(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Project messages retrieved successfully!',
        data: result,
    });
}));
// ✅ Get project message by ID
const getProjectMessageById = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield projectMessage_service_1.ProjectMessageService.getProjectMessageById(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Project message retrieved successfully!',
        data: result,
    });
}));
// ✅ Update project message
const updateProjectMessage = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield projectMessage_service_1.ProjectMessageService.updateProjectMessage(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Project message updated successfully!',
        data: result,
    });
}));
// ✅ Delete project message
const deleteProjectMessage = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield projectMessage_service_1.ProjectMessageService.deleteProjectMessage(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Project message deleted successfully!',
        data: result,
    });
}));
exports.ProjectMessageController = {
    createProjectMessage,
    getAllProjectMessages,
    getProjectMessageById,
    updateProjectMessage,
    deleteProjectMessage,
};
