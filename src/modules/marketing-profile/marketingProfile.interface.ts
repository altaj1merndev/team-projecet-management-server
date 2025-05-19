import mongoose from "mongoose";

export interface IMarketingProfile extends Document {
    profileName: string;
    profileUsername: string;
    platform: "Fiverr"| "Upwork";
    profileUrl: string;
    status: 'Active' | 'Deactivate'; 
    addBy: mongoose.Types.ObjectId;
  }
  