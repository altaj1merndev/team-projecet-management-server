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
exports.ProjectMessageService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const projectMessage_model_1 = require("./projectMessage.model");
const project_model_1 = require("../project/project.model");
const member_modele_1 = require("../member/member.modele");
const marketingProfile_model_1 = require("../marketing-profile/marketingProfile.model");
const socket_1 = require("../../socket/socket");
const queryBuilder_1 = __importDefault(require("../../utils/queryBuilder"));
const mongoose_1 = require("mongoose");
const projectIssues_model_1 = require("../project-issues/projectIssues.model");
const createProjectMessage = (payload, io) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId, issueId, marketingProfileId, messageBy } = payload;
    // ✅ Validate related entities
    const project = yield project_model_1.Project.findById(projectId);
    if (!project)
        throw new AppError_1.default(404, 'Project not found!');
    const issue = yield projectIssues_model_1.ProjectIssue.findById(issueId);
    if (!issue)
        throw new AppError_1.default(404, 'Issue not found!');
    const member = yield member_modele_1.Member.findById(messageBy);
    if (!member)
        throw new AppError_1.default(404, 'Member not found!');
    if (marketingProfileId) {
        const marketingProfile = yield marketingProfile_model_1.MarketingProfile.findById(marketingProfileId);
        if (!marketingProfile)
            throw new AppError_1.default(404, 'Marketing profile not found!');
    }
    // ✅ Create project message
    const message = yield projectMessage_model_1.ProjectMessage.create(payload);
    // ✅ Notify all team members of the project
    const teamIds = project.members || [];
    const members = yield member_modele_1.Member.find({ teamId: { $in: teamIds } });
    members.forEach(user => {
        const socketId = socket_1.onlineUsers.get(user._id.toString());
        if (socketId) {
            io.to(socketId).emit('new-project-message', {
                message: `New message on project ${project.clientName}`,
                data: message,
            });
        }
    });
    return message;
});
const getAllProjectMessages = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    if (query.projectId)
        filter.projectId = new mongoose_1.Types.ObjectId(query.projectId);
    if (query.issueId)
        filter.issueId = new mongoose_1.Types.ObjectId(query.issueId);
    if (query.marketingProfileId)
        filter.marketingProfileId = new mongoose_1.Types.ObjectId(query.marketingProfileId);
    if (query.messageBy)
        filter.messageBy = new mongoose_1.Types.ObjectId(query.messageBy);
    const queryBuilder = new queryBuilder_1.default(projectMessage_model_1.ProjectMessage.find().populate(['projectId', 'issueId', 'marketingProfileId', 'messageBy']), filter)
        .search(['message', 'note'])
        .filter()
        .sort()
        .paginate()
        .fieldsLimit();
    const data = yield queryBuilder.modelQuery;
    const meta = yield queryBuilder.countTotal();
    return { meta, data };
});
const getProjectMessageById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield projectMessage_model_1.ProjectMessage.findById(id).populate(['projectId', 'issueId', 'marketingProfileId', 'messageBy']);
    if (!message)
        throw new AppError_1.default(404, 'Project message not found!');
    return message;
});
const updateProjectMessage = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield projectMessage_model_1.ProjectMessage.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    if (!updated)
        throw new AppError_1.default(404, 'Project message not found or could not be updated!');
    return updated;
});
const deleteProjectMessage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield projectMessage_model_1.ProjectMessage.findByIdAndDelete(id);
    if (!deleted)
        throw new AppError_1.default(404, 'Project message not found!');
    return deleted;
});
exports.ProjectMessageService = {
    createProjectMessage,
    getAllProjectMessages,
    getProjectMessageById,
    updateProjectMessage,
    deleteProjectMessage,
};
