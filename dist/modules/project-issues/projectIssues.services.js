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
exports.ProjectIssueService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const queryBuilder_1 = __importDefault(require("../../utils/queryBuilder"));
const mongoose_1 = require("mongoose");
const project_model_1 = require("../project/project.model");
const team_model_1 = require("../team/team.model");
const marketingProfile_model_1 = require("../marketing-profile/marketingProfile.model");
const projectIssues_model_1 = require("./projectIssues.model");
const socket_1 = require("../../socket/socket");
const member_modele_1 = require("../member/member.modele");
// const createProjectIssue = async (payload: IProjectIssues) => {
//   const { projectId, teamId, memberId, marketingProfileId } = payload;
//   // Validate related references
//   const project = await Project.findById(projectId);
//   if (!project) throw new AppError(404, 'Project not found!');
//   const team = await Team.findById(teamId);
//   if (!team) throw new AppError(404, 'Team not found!');
//   const member = await User.findById(memberId);
//   if (!member) throw new AppError(404, 'User (memberId) not found!');
//   if (marketingProfileId) {
//     const marketingProfile = await MarketingProfile.findById(marketingProfileId);
//     if (!marketingProfile) throw new AppError(404, 'Marketing profile not found!');
//   }
//   const result = await ProjectIssue.create(payload);
//   return result;
// };
const createProjectIssue = (payload, io) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId, teamId, memberId, marketingProfileId } = payload;
    const project = yield project_model_1.Project.findById(projectId);
    if (!project)
        throw new AppError_1.default(404, 'Project not found!');
    const team = yield team_model_1.Team.findById(teamId);
    if (!team)
        throw new AppError_1.default(404, 'Team not found!');
    const member = yield member_modele_1.Member.findById(memberId);
    if (!member)
        throw new AppError_1.default(404, 'Member not found!');
    if (marketingProfileId) {
        const marketingProfile = yield marketingProfile_model_1.MarketingProfile.findById(marketingProfileId);
        if (!marketingProfile)
            throw new AppError_1.default(404, 'Marketing profile not found!');
    }
    // ✅ Create issue
    const issue = yield projectIssues_model_1.ProjectIssue.create(payload);
    // ✅ Notify all team members
    const teamMembers = yield member_modele_1.Member.find({ teamId: team._id });
    teamMembers.forEach((user) => {
        const socketId = socket_1.onlineUsers.get(user._id.toString());
        if (socketId) {
            io.to(socketId).emit('new-project-issue', {
                message: `A new issue was created in your team: ${team.teamName}`,
                issue,
            });
        }
    });
    return issue;
});
const getAllProjectIssues = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const newQuery = {};
    // Query parsing
    if (query === null || query === void 0 ? void 0 : query.issuesDate)
        newQuery.issuesDate = query.issuesDate;
    if (query === null || query === void 0 ? void 0 : query.status)
        newQuery.status = query.status;
    if (query === null || query === void 0 ? void 0 : query.projectId)
        newQuery.projectId = new mongoose_1.Types.ObjectId(query.projectId);
    if (query === null || query === void 0 ? void 0 : query.teamId)
        newQuery.teamId = new mongoose_1.Types.ObjectId(query.teamId);
    if (query === null || query === void 0 ? void 0 : query.memberId)
        newQuery.memberId = new mongoose_1.Types.ObjectId(query.memberId);
    if (query === null || query === void 0 ? void 0 : query.marketingProfileId)
        newQuery.marketingProfileId = new mongoose_1.Types.ObjectId(query.marketingProfileId);
    const issueQuery = new queryBuilder_1.default(projectIssues_model_1.ProjectIssue.find().populate(['projectId', 'teamId', 'memberId', 'marketingProfileId']), newQuery)
        .search(['note']) // Optional, if needed
        .filter()
        .sort()
        .paginate()
        .fieldsLimit();
    const result = yield issueQuery.modelQuery;
    const meta = yield issueQuery.countTotal();
    return { meta, data: result };
});
const getProjectIssueById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const issue = yield projectIssues_model_1.ProjectIssue.findById(id).populate(['projectId', 'teamId', 'memberId', 'marketingProfileId']);
    if (!issue)
        throw new AppError_1.default(404, 'Project issue not found!');
    return issue;
});
const updateProjectIssue = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield projectIssues_model_1.ProjectIssue.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    if (!updated)
        throw new AppError_1.default(404, 'Project issue not found or could not be updated!');
    return updated;
});
const deleteProjectIssue = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield projectIssues_model_1.ProjectIssue.findByIdAndDelete(id);
    if (!deleted)
        throw new AppError_1.default(404, 'Project issue not found!');
    return deleted;
});
exports.ProjectIssueService = {
    createProjectIssue,
    getAllProjectIssues,
    getProjectIssueById,
    updateProjectIssue,
    deleteProjectIssue,
};
