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
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const bcryptHelper_1 = require("../../../utils/bcrypt/bcryptHelper");
const userSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: [true, 'Please enter your username'],
        trim: true,
    },
    firstName: {
        type: String,
        required: [true, 'Please enter your first name'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your last name'],
        trim: true,
    },
    employeeId: {
        type: String,
        required: [true, 'Please enter employee ID'],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        trim: true,
        validate: [validator_1.default.isEmail, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false,
    },
    isPasswordChanged: {
        type: Boolean,
        default: false,
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please enter your phone number'],
        unique: true,
        validate: [validator_1.default.isMobilePhone, 'Please enter a valid phone number'],
    },
    avatar: {
        type: String,
        trim: true,
    },
    designation: {
        type: String,
        required: [true, 'Please enter your designation'],
        trim: true,
    },
    role: {
        type: String,
        enum: ['Admin', 'Management', 'Sells', 'Operation',],
        required: true,
        default: 'Operation',
    },
    userStatus: {
        type: String,
        enum: ['Active', 'Deactivate',],
        required: true,
        default: 'Active',
    },
    // team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    // teamLead: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            return ret;
        },
    },
});
// Middleware: Hash password before save
userSchema.pre('validate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password'))
            return next();
        this.password = yield (0, bcryptHelper_1.hashPassword)(this.password);
        next();
    });
});
// Middleware: Hash password before update
userSchema.pre('findOneAndUpdate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = this.getUpdate();
        if (update === null || update === void 0 ? void 0 : update.password) {
            update.password = yield (0, bcryptHelper_1.hashPassword)(update.password);
            this.setUpdate(update);
        }
        next();
    });
});
// Static methods
userSchema.statics.comparePassword = function (password, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, hashedPassword);
    });
};
userSchema.statics.isUserExists = function (id) {
    return this.findById(id);
};
userSchema.statics.findByEmail = function (email) {
    return this.findOne({ email });
};
userSchema.statics.findByPhone = function (phone) {
    return this.findOne({ phoneNumber: phone });
};
// Instance method
userSchema.methods.setProfilePictureUrl = function (url) {
    this.avatar = url;
};
exports.User = mongoose_1.default.model('User', userSchema);
