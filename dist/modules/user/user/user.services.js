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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const config_1 = __importDefault(require("../../../config"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const jwt_1 = require("../../../utils/jwt");
const sendImageToCloudinary_1 = require("../../../utils/lib/sendImageToCloudinary");
const queryBuilder_1 = __importDefault(require("../../../utils/queryBuilder"));
const user_model_1 = require("./user.model");
// Register a User
const registerUser = (payload, image) => __awaiter(void 0, void 0, void 0, function* () {
    const { avatar } = payload, remaining = __rest(payload, ["avatar"]);
    const userData = Object.assign({}, remaining);
    // if (payload?.role) {
    //   userData.role = payload.role;
    //   if (!payload.role ) {
    //     userData.userStatus = 'Active';
    //   }
    // }
    if (image) {
        // send image to cloudinary
        const imageName = `${userData === null || userData === void 0 ? void 0 : userData.email}-${new Date()}`;
        const path = image === null || image === void 0 ? void 0 : image.path;
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path, 'web_user');
        // update profile image in payload
        userData.avatar = secure_url;
    }
    console.log({ userData });
    // Create new user
    const result = yield user_model_1.User.create(userData);
    console.log({ result });
    return result;
});
// Get User Detail
const getUserDetails = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(userId);
    if (!result) {
        throw new AppError_1.default(404, 'User is not found!');
    }
    return result;
});
// Update User
const updateUser = (userId, payload, image) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = Object.assign({}, payload);
    if (image) {
        // send image to cloudinary
        const imageName = `${userData === null || userData === void 0 ? void 0 : userData.email}-${new Date()}`;
        const path = image === null || image === void 0 ? void 0 : image.path;
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path, 'web_user');
        // update profile image in payload
        userData.avatar = secure_url;
    }
    const result = yield user_model_1.User.findByIdAndUpdate(userId, userData, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.default(404, 'User is not found!');
    }
    return result;
});
// Update User  Password
const updatePassword = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId).select('+password');
    if (!user) {
        throw new AppError_1.default(403, 'Un authorized access');
    }
    const isPasswordMatched = yield user_model_1.User.comparePassword(payload.oldPassword, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(400, 'Old password is incorrect');
    }
    if (payload.newPassword !== payload.confirmPassword) {
        throw new AppError_1.default(400, 'password does not match');
    }
    user.password = payload.newPassword;
    user.isPasswordChanged = true;
    yield user.save();
    const jwtPayloadData = {
        id: user._id.toString(),
        role: user.role,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
    };
    const accessToken = jwt_1.JwtHelpers.createToken(jwtPayloadData, config_1.default.jwt.accessSecret, config_1.default.jwt.accessExpiresIn);
    return {
        user,
        accessToken,
    };
});
// Delete User
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findByIdAndUpdate(userId, { isDeleted: true }, { new: true, runValidators: true });
    if (!user) {
        throw new AppError_1.default(404, 'User is not found!');
    }
    return user;
});
// Get Users
const getUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = new queryBuilder_1.default(user_model_1.User.find({ isDeleted: false }), query)
        .search(['name', 'email', "designation"])
        .filter()
        .sort()
        .paginate()
        .fieldsLimit();
    const result = yield userQuery.modelQuery;
    const meta = yield userQuery.countTotal();
    return {
        meta,
        result,
    };
});
exports.UserServices = {
    registerUser,
    getUserDetails,
    updateUser,
    updatePassword,
    deleteUser,
    getUsers,
};
