import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { hashPassword } from '../../../utils/bcrypt/bcryptHelper';
import { TContact, TUser, UserModel } from './user.interface';



const userSchema = new Schema<TUser, UserModel>(
  {
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
    employeId: {
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
      validate: [validator.isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please enter your phone number'],
      unique: true,
      validate: [validator.isMobilePhone, 'Please enter a valid phone number'],
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
      enum: ['admin', 'employee', 'manager', 'teamLeader', 'teamMember', "seller"],
      required: true,
      default: 'employee',
    },
    userStatus: {
      type: String,
      enum: ['intern', 'profession', 'permanent'],
      required: true,
      default: 'intern',
    },
    // team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    // teamLead: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

// Middleware: Hash password before save
userSchema.pre('validate', async function (this: mongoose.Document & TUser, next) {
  if (!this.isModified('password')) return next();
  this.password = await hashPassword(this.password);
  next();
});

// Middleware: Hash password before update
userSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate() as Record<string, any>;
  if (update?.password) {
    update.password = await hashPassword(update.password);
    this.setUpdate(update);
  }
  next();
});

// Static methods
userSchema.statics.comparePassword = async function (password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
};

userSchema.statics.isUserExists = function (id: string) {
  return this.findById(id);
};

userSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email });
};

userSchema.statics.findByPhone = function (phone: string) {
  return this.findOne({ phoneNumber: phone });
};

// Instance method
userSchema.methods.setProfilePictureUrl = function (url: string) {
  this.avatar = url;
};

export const User = mongoose.model<TUser, UserModel>('User', userSchema);
