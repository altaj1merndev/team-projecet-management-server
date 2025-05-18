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
exports.TeamController = void 0;
const handleAsyncRequest_1 = __importDefault(require("../../utils/share/handleAsyncRequest"));
const sendResponse_1 = __importDefault(require("../../utils/share/sendResponse"));
const team_services_1 = require("./team.services");
// ✅ Create Team
const createTeam = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield team_services_1.TeamService.createTeam(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: 'Team created successfully!',
        data: result,
    });
}));
// ✅ Get All Teams
const getAllTeams = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield team_services_1.TeamService.getAllTeams(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Teams retrieved successfully!',
        data: result,
    });
}));
// ✅ Get Team By Slug (was getTeamById)
const getTeamBySlug = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield team_services_1.TeamService.getTeamBySlug(req.params.slug);
    if (!result) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: 404,
            message: 'Team not found!',
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Team retrieved successfully!',
        data: result,
    });
}));
// ✅ Get Teams by Team Lead
const getTeamsByTeamLead = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield team_services_1.TeamService.getTeamsByTeamLead(req.params.teamLeadId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Teams by team lead retrieved successfully!',
        data: result,
    });
}));
// ✅ Update Team by Slug
const updateTeam = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield team_services_1.TeamService.updateTeam(req.params.slug, req.body);
    if (!result) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: 404,
            message: 'Team not found or could not be updated!',
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Team updated successfully!',
        data: result,
    });
}));
// ✅ Delete Team by Slug
const deleteTeam = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield team_services_1.TeamService.deleteTeam(req.params.slug);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Team deleted successfully!',
        data: result,
    });
}));
exports.TeamController = {
    createTeam,
    getAllTeams,
    getTeamBySlug,
    getTeamsByTeamLead,
    updateTeam,
    deleteTeam,
};
