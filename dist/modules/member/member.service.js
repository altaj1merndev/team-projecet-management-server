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
exports.MemberService = void 0;
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const queryBuilder_1 = __importDefault(require("../../utils/queryBuilder"));
const member_modele_1 = require("./member.modele");
// Create a member
const createMember = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield member_modele_1.Member.findOne({
        userId: payload.userId,
        teamId: payload.teamId,
    });
    if (existing) {
        throw new AppError_1.default(400, 'User is already a member of this team!');
    }
    const result = yield member_modele_1.Member.create(payload);
    return result;
});
// Get all members
const getAllMembers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const newQuery = {};
    // Direct field filters
    if (query === null || query === void 0 ? void 0 : query.memberType)
        newQuery.memberType = query.memberType;
    if (query === null || query === void 0 ? void 0 : query.status)
        newQuery.status = query.status;
    // References (ObjectIds)
    if (query === null || query === void 0 ? void 0 : query.userId)
        newQuery.userId = new mongoose_1.Types.ObjectId(query.userId);
    if (query === null || query === void 0 ? void 0 : query.teamId)
        newQuery.teamId = new mongoose_1.Types.ObjectId(query.teamId);
    const memberQuery = new queryBuilder_1.default(member_modele_1.Member.find().populate(['userId', 'teamId']), newQuery)
        .search(['memberType', 'status']) // If you want search support
        .filter()
        .sort()
        .paginate()
        .fieldsLimit();
    const result = yield memberQuery.modelQuery;
    const meta = yield memberQuery.countTotal();
    return { meta, data: result };
});
// Get members by teamId
const getMembersByTeam = (teamId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield member_modele_1.Member.find({ teamId }).populate(['userId', 'teamId']);
});
// Get a single member by ID
const getMemberById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const member = yield member_modele_1.Member.findById(id).populate(['userId', 'teamId']);
    if (!member) {
        throw new AppError_1.default(404, 'Member not found!');
    }
    return member;
});
// Update member by ID
const updateMember = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield member_modele_1.Member.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!updated) {
        throw new AppError_1.default(404, 'Member not found!');
    }
    return updated;
});
// Delete member by ID
const deleteMember = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield member_modele_1.Member.findByIdAndDelete(id);
    if (!deleted) {
        throw new AppError_1.default(404, 'Member not found!');
    }
    return deleted;
});
exports.MemberService = {
    createMember,
    getAllMembers,
    getMembersByTeam,
    getMemberById,
    updateMember,
    deleteMember,
};
