import mongoose, { Model } from 'mongoose';

type TUserStatus = 'Active' | 'Deactivate' 

type TRole = 'Admin' | 'Management' | 'Sells'| "Operation"

export type TContact = {
  address: string;
  subArea: string;
  district: string;
  state: string;
  country: string;
};

export type TUser = {
  userName: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  email: string;
  password: string;
  phoneNumber: string;
  avatar: string;
  designation: string;
  role: TRole;
  userStatus: TUserStatus;
  teamLead: mongoose.Types.ObjectId
  team: mongoose.Types.ObjectId
  isBlocked: boolean;
  isDeleted: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExists(id: string): Promise<TUser | null>;
  findByEmail(email: string): Promise<TUser | null>;
  findByPhone(phone: string): Promise<TUser | null>;
  comparePassword(password: string, hashedPassword: string): Promise<boolean>;
  setProfilePictureUrl(url: string): void;
}

export type TChangePassword = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
