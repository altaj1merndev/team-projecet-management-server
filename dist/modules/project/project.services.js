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
exports.ProjectService = void 0;
const project_model_1 = require("./project.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const queryBuilder_1 = __importDefault(require("../../utils/queryBuilder"));
const mongoose_1 = require("mongoose");
const user_model_1 = require("../user/user/user.model");
const marketingProfile_model_1 = require("../marketing-profile/marketingProfile.model");
const member_modele_1 = require("../member/member.modele");
const createProject = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate sellsBy
    const sellsByUser = yield user_model_1.User.findById(payload.sellsBy);
    if (!sellsByUser)
        throw new AppError_1.default(404, 'SellsBy user not found!');
    if (sellsByUser.role !== "Sells")
        throw new AppError_1.default(400, 'SellsBy user must have the role "seller"!');
    // Validate assignedBy
    const assignedByUser = yield user_model_1.User.findById(payload.assignedBy);
    if (!assignedByUser)
        throw new AppError_1.default(404, 'AssignedBy user not found!');
    if (assignedByUser.role !== "Management") {
        throw new AppError_1.default(400, 'AssignedBy user must have the role "manager" or "admin"!');
    }
    // Validate leadBy
    const leadByUser = yield member_modele_1.Member.findById(payload.leadBy);
    if (!leadByUser)
        throw new AppError_1.default(404, 'LeadBy user not found!');
    if (leadByUser.memberType !== "Leader")
        throw new AppError_1.default(400, 'LeadBy user must have the role "teamLeader"!');
    // Validate assigned members (if present)
    if (payload.members && payload.members.length > 0) {
        const validTeams = yield member_modele_1.Member.find({ _id: { $in: payload.members } });
        if (validTeams.length !== payload.members.length) {
            throw new AppError_1.default(404, 'One or more assigned member not found!');
        }
    }
    // Validate marketingProfile
    const profileExists = yield marketingProfile_model_1.MarketingProfile.findById(payload.marketingProfile);
    if (!profileExists) {
        throw new AppError_1.default(404, 'Marketing Profile not found!');
    }
    const result = yield project_model_1.Project.create(payload);
    return result;
});
const getAllProjects = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const newQuery = {};
    // Basic Fields
    if (query === null || query === void 0 ? void 0 : query.searchTerm)
        newQuery.searchTerm = query.searchTerm;
    if (query === null || query === void 0 ? void 0 : query.clientName)
        newQuery.clientName = query.clientName;
    if (query === null || query === void 0 ? void 0 : query.platform)
        newQuery.platform = query.platform;
    if (query === null || query === void 0 ? void 0 : query.marketingProfile)
        newQuery.marketingProfile = new mongoose_1.Types.ObjectId(query.marketingProfile);
    if (query === null || query === void 0 ? void 0 : query.projectStatus)
        newQuery.projectStatus = query.projectStatus;
    if (query === null || query === void 0 ? void 0 : query.orderStartDate)
        newQuery.orderStartDate = query.orderStartDate;
    if (query === null || query === void 0 ? void 0 : query.deliveryDate)
        newQuery.deliveryDate = query.deliveryDate;
    if (query === null || query === void 0 ? void 0 : query.orderSheet)
        newQuery.orderSheet = query.orderSheet;
    if (query === null || query === void 0 ? void 0 : query.specialNote)
        newQuery.specialNote = query.specialNote;
    // References (ObjectIds)
    if (query === null || query === void 0 ? void 0 : query.sellsBy)
        newQuery.sellsBy = new mongoose_1.Types.ObjectId(query.sellsBy);
    if (query === null || query === void 0 ? void 0 : query.assignedBy)
        newQuery.assignedBy = new mongoose_1.Types.ObjectId(query.assignedBy);
    if (query === null || query === void 0 ? void 0 : query.leadBy)
        newQuery.leadBy = new mongoose_1.Types.ObjectId(query.leadBy);
    if (query === null || query === void 0 ? void 0 : query.assignedTeam)
        newQuery.assignedTeam = new mongoose_1.Types.ObjectId(query.assignedTeam);
    const projectQuery = new queryBuilder_1.default(project_model_1.Project.find().populate(['sellsBy', 'members', 'assignedBy', 'leadBy', 'marketingProfile']), newQuery)
        .search(['clientName', 'platform']) // Removed marketingProfile
        .filter()
        .sort()
        .paginate()
        .fieldsLimit();
    const result = yield projectQuery.modelQuery;
    const meta = yield projectQuery.countTotal();
    return { meta, data: result };
});
const getProjectById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_model_1.Project.findById(id).populate(['sellsBy', 'members', 'assignedBy', 'leadBy', 'marketingProfile']);
    if (!project)
        throw new AppError_1.default(404, 'Project not found!');
    return project;
});
const updateProject = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_model_1.Project.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    if (!project)
        throw new AppError_1.default(404, 'Project not found or could not be updated!');
    return project;
});
const deleteProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_model_1.Project.findByIdAndDelete(id);
    if (!project)
        throw new AppError_1.default(404, 'Project not found!');
    return project;
});
exports.ProjectService = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
};
