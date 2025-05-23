import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { hashPassword } from '../../../utils/bcrypt/bcryptHelper';
import { TContact, TUser, UserModel } from './user.interface';
import config from '../../../config';



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
      validate: [validator.isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      minlength: [8, 'Password must be at least 8 characters'],
      default: config.defaultPass,
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
      enum: ['Admin', 'Management', 'Sells', 'Operation',],
      required: true,
      default: 'Operation',
    },
    userStatus: {
      type: String,
      enum: ['Active', 'Deactivate', ],
      required: true,
      default: 'Active',
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



// Hash password before save
userSchema.pre('save', async function (this: mongoose.Document & TUser, next) {
  if (this.isNew || this.isModified('password')) {
    this.password = await hashPassword(this.password);
  }
  next();
});

// Hash password on update
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
