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
exports.MemberController = void 0;
const handleAsyncRequest_1 = __importDefault(require("../../utils/share/handleAsyncRequest"));
const sendResponse_1 = __importDefault(require("../../utils/share/sendResponse"));
const member_service_1 = require("./member.service");
// Create Member
const createMember = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_service_1.MemberService.createMember(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: 'Member added successfully',
        data: result,
    });
}));
// Get All Members
const getAllMembers = (0, handleAsyncRequest_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_service_1.MemberService.getAllMembers();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'All members retrieved successfully',
        data: result,
    });
}));
// Get Members by Team
const getMembersByTeam = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_service_1.MemberService.getMembersByTeam(req.params.teamId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Team members retrieved successfully',
        data: result,
    });
}));
// Get Member by ID
const getMemberById = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_service_1.MemberService.getMemberById(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Member retrieved successfully',
        data: result,
    });
}));
// Update Member
const updateMember = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_service_1.MemberService.updateMember(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Member updated successfully',
        data: result,
    });
}));
// Delete Member
const deleteMember = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_service_1.MemberService.deleteMember(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Member deleted successfully',
        data: result,
    });
}));
exports.MemberController = {
    createMember,
    getAllMembers,
    getMembersByTeam,
    getMemberById,
    updateMember,
    deleteMember,
};
