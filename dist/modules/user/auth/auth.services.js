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
exports.AuthServices = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../../../config"));
const user_model_1 = require("../user/user.model");
const jwt_1 = require("../../../utils/jwt");
const sendEmail_1 = __importDefault(require("../../../utils/lib/sendEmail"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
console.log(config_1.default.jwt.accessExpiresIn);
// Login User
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    // Check if user has given both password and either email or phone number
    if (!email) {
        throw new AppError_1.default(400, 'Email is required!');
    }
    if (!password) {
        throw new AppError_1.default(400, 'Password is required!');
    }
    // Determine if emailOrPhone is an email or a phone number
    const user = yield user_model_1.User.findOne({ email }).select('+password');
    if (!user) {
        throw new AppError_1.default(404, 'use is not found!');
    }
    const isPasswordMatched = yield user_model_1.User.comparePassword(password, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(401, 'Incorrect Password!');
    }
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
        accessToken,
    };
});
const forgotPassword = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email }) {
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        throw new AppError_1.default(404, 'User not found');
    }
    // console.log({ user, email });
    // Get ResetPassword Token
    const jwtPayloadData = {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
    };
    const resetToken = jwt_1.JwtHelpers.createToken(jwtPayloadData, config_1.default.jwt.accessSecret, '10m');
    yield user.save({ validateBeforeSave: false });
    const emailTemplate = fs_1.default.readFileSync(path_1.default.join(process.cwd(), 'src/data/passwordResetTemplate.html'), 'utf-8');
    // Function to replace placeholders with actual values
    function replacePlaceholders(template, replacements) {
        let output = template;
        for (const key in replacements) {
            output = output.replace(new RegExp(`{{${key}}}`, 'g'), replacements[key]);
        }
        return output;
    }
    // Replacements for the placeholders
    const replacements = {
        reset_link: `${config_1.default.rootUiURL}/auth/reset-password/${resetToken}`,
    };
    const emailContent = replacePlaceholders(emailTemplate, replacements);
    // const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
    yield (0, sendEmail_1.default)({
        email: user.email,
        subject: `${config_1.default.companyName} Password Recovery`,
        message: emailContent,
    });
    return { reset_link: `${config_1.default.rootUiURL}/reset-password/${resetToken}` };
});
// Reset Password
const resetPassword = (token_1, _a) => __awaiter(void 0, [token_1, _a], void 0, function* (token, { newPassword }) {
    token;
    // creating token hash
    const decodedUser = jwt_1.JwtHelpers.verifyToken(token, config_1.default.jwt.accessSecret);
    console.log({ decodedUser });
    const user = yield user_model_1.User.findById(decodedUser === null || decodedUser === void 0 ? void 0 : decodedUser.id);
    if (!user) {
        throw new AppError_1.default(400, 'Reset Password Token is invalid or has been expired');
    }
    user.password = newPassword;
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
exports.AuthServices = {
    loginUser,
    forgotPassword,
    resetPassword,
};
