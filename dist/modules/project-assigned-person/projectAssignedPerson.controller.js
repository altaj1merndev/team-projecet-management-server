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
exports.ProjectAssignedPersonController = void 0;
const handleAsyncRequest_1 = __importDefault(require("../../utils/share/handleAsyncRequest"));
const sendResponse_1 = __importDefault(require("../../utils/share/sendResponse"));
const projectAssignedPerson_services_1 = require("./projectAssignedPerson.services");
// ✅ Create
const createAssignedPerson = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield projectAssignedPerson_services_1.ProjectAssignedPersonService.createAssignedPerson(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: 'Person assigned to project successfully!',
        data: result,
    });
}));
// ✅ Get All
const getAllAssignedPersons = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield projectAssignedPerson_services_1.ProjectAssignedPersonService.getAllAssignedPersons(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'All assigned persons retrieved!',
        data: result,
    });
}));
// ✅ Get By ID
const getAssignedPersonById = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield projectAssignedPerson_services_1.ProjectAssignedPersonService.getAssignedPersonById(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Assigned person retrieved!',
        data: result,
    });
}));
// ✅ Get by Project ID
const getAssignedPersonsByProjectId = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield projectAssignedPerson_services_1.ProjectAssignedPersonService.getAssignedPersonsByProjectId(req.params.projectId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Assigned persons for project retrieved!',
        data: result,
    });
}));
// ✅ Update
const updateAssignedPerson = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield projectAssignedPerson_services_1.ProjectAssignedPersonService.updateAssignedPerson(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Assigned person updated successfully!',
        data: result,
    });
}));
// ✅ Delete
const deleteAssignedPerson = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield projectAssignedPerson_services_1.ProjectAssignedPersonService.deleteAssignedPerson(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Assigned person removed successfully!',
        data: result,
    });
}));
exports.ProjectAssignedPersonController = {
    createAssignedPerson,
    getAllAssignedPersons,
    getAssignedPersonById,
    getAssignedPersonsByProjectId,
    updateAssignedPerson,
    deleteAssignedPerson,
};
