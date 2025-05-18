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
exports.MarketingProfileService = void 0;
const marketingProfile_model_1 = require("./marketingProfile.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const queryBuilder_1 = __importDefault(require("../../utils/queryBuilder"));
const member_modele_1 = require("../member/member.modele");
// ✅ Create marketing profile
const createMarketingProfile = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate member exists
    const memberExists = yield member_modele_1.Member.findById(payload.addBy);
    if (!memberExists) {
        throw new AppError_1.default(404, 'Member (addBy) not found!');
    }
    const result = yield marketingProfile_model_1.MarketingProfile.create(payload);
    return result;
});
// ✅ Get all marketing profiles (with optional query filtering)
const getAllMarketingProfiles = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = {};
    if (query === null || query === void 0 ? void 0 : query.platform)
        filters.platform = { $regex: query.platform, $options: 'i' };
    if (query === null || query === void 0 ? void 0 : query.status)
        filters.status = query.status;
    if (query === null || query === void 0 ? void 0 : query.profileName)
        filters.profileName = { $regex: query.profileName, $options: 'i' };
    const queryBuilder = new queryBuilder_1.default(marketingProfile_model_1.MarketingProfile.find().populate('addBy'), filters)
        .search(['profileName', 'profileUsername', 'platform'])
        .filter()
        .sort()
        .paginate()
        .fieldsLimit();
    const data = yield queryBuilder.modelQuery;
    const meta = yield queryBuilder.countTotal();
    return { meta, data };
});
// ✅ Get a single marketing profile by ID
const getMarketingProfileById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const profile = yield marketingProfile_model_1.MarketingProfile.findById(id).populate('addBy');
    if (!profile) {
        throw new AppError_1.default(404, 'Marketing profile not found!');
    }
    return profile;
});
// ✅ Update marketing profile
const updateMarketingProfile = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.addBy) {
        const memberExists = yield member_modele_1.Member.findById(payload.addBy);
        if (!memberExists) {
            throw new AppError_1.default(404, 'Member (addBy) not found!');
        }
    }
    const updated = yield marketingProfile_model_1.MarketingProfile.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!updated) {
        throw new AppError_1.default(404, 'Marketing profile not found or update failed!');
    }
    return updated;
});
// ✅ Delete marketing profile
const deleteMarketingProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield marketingProfile_model_1.MarketingProfile.findByIdAndDelete(id);
    if (!deleted) {
        throw new AppError_1.default(404, 'Marketing profile not found!');
    }
    return deleted;
});
exports.MarketingProfileService = {
    createMarketingProfile,
    getAllMarketingProfiles,
    getMarketingProfileById,
    updateMarketingProfile,
    deleteMarketingProfile,
};
