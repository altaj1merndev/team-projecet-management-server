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
exports.Project = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ProjectSchema = new mongoose_1.Schema({
    clientName: { type: String, required: true },
    sellsBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    orderStartDate: { type: String, required: true },
    members: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Member', required: true }],
    assignedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    leadBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Member', required: true },
    deliveryDate: { type: String, required: true },
    platform: {
        type: String,
        enum: ['Fiverr', 'Upwork'],
        required: true,
    },
    marketingProfile: {
        type: mongoose_1.Schema.Types.ObjectId, // fixed type
        ref: 'MarketingProfile',
        required: true,
    },
    projectStatus: {
        type: String,
        enum: ['NRI', 'WIP', 'Hold', 'Cancel'],
        required: true,
        default: 'NRI',
    },
    orderSheet: { type: String },
    specialNote: { type: String },
}, {
    timestamps: true
});
exports.Project = mongoose_1.default.model('Project', ProjectSchema);
