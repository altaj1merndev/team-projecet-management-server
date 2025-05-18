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
const AppError_1 = __importDefault(require("../../errors/AppError"));
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
const getAllMembers = () => __awaiter(void 0, void 0, void 0, function* () {
    const members = yield member_modele_1.Member.find().populate(['userId', 'teamId']);
    return members;
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
