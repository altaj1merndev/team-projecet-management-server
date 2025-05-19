"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectIssue = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ProjectIssuesSchema = new mongoose_1.Schema({
    issuesDate: { type: String, required: true },
    projectId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Project', required: true },
    teamId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team', required: true },
    memberId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    issueDate: { type: String, required: true },
    note: { type: String },
    status: {
        type: String,
        enum: ['NRI', 'WORK IN PROGRESS', 'SOLVE', "WRONG"], // Customize statuses
        default: 'NRI',
        required: true
    },
    marketingProfileId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'MarketingProfile' }
}, {
    timestamps: true
});
exports.ProjectIssue = mongoose_1.default.model('ProjectIssue', ProjectIssuesSchema);
