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
exports.TeamService = void 0;
const team_model_1 = require("./team.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const queryBuilder_1 = __importDefault(require("../../utils/queryBuilder"));
const user_model_1 = require("../user/user/user.model");
const stringToSlug_1 = require("../../utils/lib/stringToSlug");
// ✅ Create a new team
const createTeam = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the team lead exists
    const teamLead = yield user_model_1.User.findById(payload.teamLead);
    if (!teamLead) {
        throw new AppError_1.default(404, 'Team Lead not found!');
    }
    // Generate a unique slug
    const slug = (0, stringToSlug_1.stringToSlug)(payload.teamName);
    const existing = yield team_model_1.Team.findOne({ slug });
    if (existing) {
        throw new AppError_1.default(400, 'Team with this slug already exists!');
    }
    // Create the team
    const result = yield team_model_1.Team.create(Object.assign(Object.assign({}, payload), { slug }));
    return result;
});
// ✅ Get all teams
// const getAllTeams = async (query: Record<string, unknown>) => {
//   const teamQuery = new QueryBuilder(
//     Team.find().populate('teamLead'),
//     query
//   )
//     .search(['teamName', 'status'])
//     .filter()
//     .sort()
//     .paginate()
//     .fieldsLimit();
//   const result = await teamQuery.modelQuery;
//   const meta = await teamQuery.countTotal();
//   return {
//     meta,
//     data: result,
//   };
// };
const mongoose_1 = require("mongoose");
const getAllTeams = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const newQuery = {};
    // Direct field filters
    if (query === null || query === void 0 ? void 0 : query.teamName)
        newQuery.teamName = query.teamName;
    if (query === null || query === void 0 ? void 0 : query.status)
        newQuery.status = query.status;
    if (query === null || query === void 0 ? void 0 : query.teamLead)
        newQuery.teamLead = new mongoose_1.Types.ObjectId(query.teamLead);
    if (query === null || query === void 0 ? void 0 : query.completedProjects)
        newQuery.completedProjects = new mongoose_1.Types.ObjectId(query.completedProjects);
    if (query === null || query === void 0 ? void 0 : query.assignProjects)
        newQuery.assignProjects = new mongoose_1.Types.ObjectId(query.assignProjects);
    const populateOptions = [
        { path: 'teamLead' },
        { path: 'completedProjects', match: {} },
        { path: 'assignProjects', match: {} },
    ];
    // Filtering nested projects by status
    if (query === null || query === void 0 ? void 0 : query.completedProjectStatus) {
        populateOptions[1].match = { projectStatus: query.completedProjectStatus };
    }
    if (query === null || query === void 0 ? void 0 : query.assignedProjectStatus) {
        populateOptions[2].match = { projectStatus: query.assignedProjectStatus };
    }
    const teamQuery = new queryBuilder_1.default(team_model_1.Team.find(newQuery).populate(populateOptions), query)
        .search(['teamName', 'status'])
        .filter()
        .sort()
        .paginate()
        .fieldsLimit();
    const result = yield teamQuery.modelQuery;
    const meta = yield teamQuery.countTotal();
    // Add project counts to each team
    const dataWithCounts = result.map((team) => {
        var _a, _b;
        return (Object.assign(Object.assign({}, team.toObject()), { assignProjectCount: ((_a = team.assignProjects) === null || _a === void 0 ? void 0 : _a.length) || 0, completedProjectCount: ((_b = team.completedProjects) === null || _b === void 0 ? void 0 : _b.length) || 0 }));
    });
    return {
        meta,
        data: dataWithCounts,
    };
});
// ✅ Get team by slug
const getTeamBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield team_model_1.Team.findOne({ slug }).populate('teamLead');
    if (!result) {
        throw new AppError_1.default(404, 'Team not found!');
    }
    return result;
});
// ✅ Get teams by teamLead
const getTeamsByTeamLead = (teamLeadId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield team_model_1.Team.find({ teamLead: teamLeadId }).populate('teamLead');
    return result;
});
// ✅ Update a team by slug
const updateTeam = (slug, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.teamName) {
        const newSlug = (0, stringToSlug_1.stringToSlug)(payload.teamName);
        const existing = yield team_model_1.Team.findOne({ slug: newSlug });
        if (existing && existing.slug !== slug) {
            throw new AppError_1.default(400, 'Another team with this name already exists!');
        }
        payload.slug = newSlug;
    }
    const result = yield team_model_1.Team.findOneAndUpdate({ slug }, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.default(404, 'Team not found or could not be updated!');
    }
    return result;
});
// ✅ Delete a team by slug
const deleteTeam = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield team_model_1.Team.findOneAndDelete({ slug });
    if (!result) {
        throw new AppError_1.default(404, 'Team not found!');
    }
    return result;
});
exports.TeamService = {
    createTeam,
    getAllTeams,
    getTeamBySlug,
    getTeamsByTeamLead,
    updateTeam,
    deleteTeam,
};
