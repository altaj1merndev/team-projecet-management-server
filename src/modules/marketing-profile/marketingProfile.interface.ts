import mongoose from "mongoose";

export interface IMarketingProfile extends Document {
    profileName: string;
    profileUsername: string;
    platform: string;
    profileUrl: string;
    status: 'active' | 'inactive'; // You can add more options if needed
    addBy: mongoose.Types.ObjectId;
  }
  