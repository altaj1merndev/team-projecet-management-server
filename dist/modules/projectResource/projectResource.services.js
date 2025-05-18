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
exports.ProjectResourceService = void 0;
const projectResource_model_1 = require("./projectResource.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const mongoose_1 = require("mongoose");
const project_model_1 = require("../project/project.model");
const user_model_1 = require("../user/user/user.model");
const queryBuilder_1 = __importDefault(require("../../utils/queryBuilder"));
const createProjectResource = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate projectId
    const project = yield project_model_1.Project.findById(payload.projectId);
    if (!project)
        throw new AppError_1.default(404, 'Project not found!');
    // Validate addby user
    const user = yield user_model_1.User.findById(payload.addby);
    if (!user)
        throw new AppError_1.default(404, 'User (addedBy) not found!');
    const result = yield projectResource_model_1.ProjectResource.create(payload);
    return result;
});
const getAllProjectResources = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const newQuery = {};
    if (query === null || query === void 0 ? void 0 : query.projectId)
        newQuery.projectId = new mongoose_1.Types.ObjectId(query.projectId);
    if (query === null || query === void 0 ? void 0 : query.addby)
        newQuery.addby = new mongoose_1.Types.ObjectId(query.addby);
    if (query === null || query === void 0 ? void 0 : query.resourceName)
        newQuery.resourceName = { $regex: query.resourceName, $options: 'i' };
    const resourceQuery = new queryBuilder_1.default(projectResource_model_1.ProjectResource.find().populate(['projectId', 'addby']), newQuery)
        .search(['resourceName', 'note'])
        .filter()
        .sort()
        .paginate()
        .fieldsLimit();
    const result = yield resourceQuery.modelQuery;
    const meta = yield resourceQuery.countTotal();
    return { meta, data: result };
});
const getProjectResourceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const resource = yield projectResource_model_1.ProjectResource.findById(id).populate(['projectId', 'addby']);
    if (!resource)
        throw new AppError_1.default(404, 'Project resource not found!');
    return resource;
});
const getResourcesByProjectId = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    const resources = yield projectResource_model_1.ProjectResource.find({ projectId })
        .populate(['projectId', 'addby']);
    return resources;
});
const updateProjectResource = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const resource = yield projectResource_model_1.ProjectResource.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!resource)
        throw new AppError_1.default(404, 'Project resource not found or could not be updated!');
    return resource;
});
const deleteProjectResource = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const resource = yield projectResource_model_1.ProjectResource.findByIdAndDelete(id);
    if (!resource)
        throw new AppError_1.default(404, 'Project resource not found!');
    return resource;
});
exports.ProjectResourceService = {
    createProjectResource,
    getAllProjectResources,
    getProjectResourceById,
    getResourcesByProjectId,
    updateProjectResource,
    deleteProjectResource,
};
