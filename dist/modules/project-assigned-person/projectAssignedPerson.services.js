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
exports.ProjectAssignedPersonService = void 0;
const projectAssignedPerson_model_1 = require("./projectAssignedPerson.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const mongoose_1 = require("mongoose");
const project_model_1 = require("../project/project.model");
const team_model_1 = require("../team/team.model");
const queryBuilder_1 = __importDefault(require("../../utils/queryBuilder"));
const member_modele_1 = require("../member/member.modele");
// ✅ Create assigned persons with validation
const createAssignedPerson = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId, assignedMembers, teams } = payload;
    // Validate project
    const project = yield project_model_1.Project.findById(projectId);
    if (!project)
        throw new AppError_1.default(404, 'Project not found!');
    // Validate assigned members
    for (const memberId of assignedMembers) {
        const member = yield member_modele_1.Member.findById(memberId);
        if (!member)
            throw new AppError_1.default(404, `Member with ID ${memberId} not found!`);
    }
    // Validate teams
    for (const teamId of teams) {
        const team = yield team_model_1.Team.findById(teamId);
        if (!team)
            throw new AppError_1.default(404, `Team with ID ${teamId} not found!`);
    }
    const result = yield projectAssignedPerson_model_1.ProjectAssignedPerson.create(payload);
    return result;
});
// ✅ Get all with advanced query support
const getAllAssignedPersons = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const newQuery = {};
    if (query === null || query === void 0 ? void 0 : query.projectId)
        newQuery.projectId = new mongoose_1.Types.ObjectId(query.projectId);
    if (query === null || query === void 0 ? void 0 : query.role)
        newQuery.role = query.role;
    const searchQuery = new queryBuilder_1.default(projectAssignedPerson_model_1.ProjectAssignedPerson.find().populate(['projectId', 'assignedMembers', 'teams']), newQuery)
        .search([])
        .filter()
        .sort()
        .paginate()
        .fieldsLimit();
    const result = yield searchQuery.modelQuery;
    const meta = yield searchQuery.countTotal();
    return { meta, data: result };
});
// ✅ Get by ID
const getAssignedPersonById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const person = yield projectAssignedPerson_model_1.ProjectAssignedPerson.findById(id).populate(['projectId', 'assignedMembers', 'teams']);
    if (!person)
        throw new AppError_1.default(404, 'Assigned person not found!');
    return person;
});
// ✅ Get assigned persons by project ID
const getAssignedPersonsByProjectId = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    const persons = yield projectAssignedPerson_model_1.ProjectAssignedPerson.find({ projectId })
        .populate(['assignedMembers', 'teams']);
    return persons;
});
// ✅ Update with validation
const updateAssignedPerson = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.assignedMembers) {
        for (const memberId of payload.assignedMembers) {
            const member = yield member_modele_1.Member.findById(memberId);
            if (!member)
                throw new AppError_1.default(404, `Member with ID ${memberId} not found!`);
        }
    }
    if (payload.teams) {
        for (const teamId of payload.teams) {
            const team = yield team_model_1.Team.findById(teamId);
            if (!team)
                throw new AppError_1.default(404, `Team with ID ${teamId} not found!`);
        }
    }
    const updated = yield projectAssignedPerson_model_1.ProjectAssignedPerson.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!updated)
        throw new AppError_1.default(404, 'Assigned person not found or could not be updated!');
    return updated;
});
// ✅ Delete
const deleteAssignedPerson = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield projectAssignedPerson_model_1.ProjectAssignedPerson.findByIdAndDelete(id);
    if (!deleted)
        throw new AppError_1.default(404, 'Assigned person not found!');
    return deleted;
});
exports.ProjectAssignedPersonService = {
    createAssignedPerson,
    getAllAssignedPersons,
    getAssignedPersonById,
    getAssignedPersonsByProjectId,
    updateAssignedPerson,
    deleteAssignedPerson,
};
