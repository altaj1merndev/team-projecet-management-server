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
exports.MarketingProfileController = void 0;
const handleAsyncRequest_1 = __importDefault(require("../../utils/share/handleAsyncRequest"));
const sendResponse_1 = __importDefault(require("../../utils/share/sendResponse"));
const marketingProfile_services_1 = require("./marketingProfile.services");
// ✅ Create
const createMarketingProfile = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield marketingProfile_services_1.MarketingProfileService.createMarketingProfile(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: 'Marketing profile created successfully!',
        data: result,
    });
}));
// ✅ Get all
const getAllMarketingProfiles = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield marketingProfile_services_1.MarketingProfileService.getAllMarketingProfiles(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Marketing profiles retrieved successfully!',
        data: result,
    });
}));
// ✅ Get by ID
const getMarketingProfileById = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield marketingProfile_services_1.MarketingProfileService.getMarketingProfileById(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Marketing profile retrieved successfully!',
        data: result,
    });
}));
// ✅ Update
const updateMarketingProfile = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield marketingProfile_services_1.MarketingProfileService.updateMarketingProfile(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Marketing profile updated successfully!',
        data: result,
    });
}));
// ✅ Delete
const deleteMarketingProfile = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield marketingProfile_services_1.MarketingProfileService.deleteMarketingProfile(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Marketing profile deleted successfully!',
        data: result,
    });
}));
exports.MarketingProfileController = {
    createMarketingProfile,
    getAllMarketingProfiles,
    getMarketingProfileById,
    updateMarketingProfile,
    deleteMarketingProfile,
};
