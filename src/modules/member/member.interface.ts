import mongoose from "mongoose";

export interface IMember extends Document {
    userId: mongoose.Types.ObjectId;
    teamId: mongoose.Types.ObjectId;
    memberType: 'Leader' | 'Member'| "Co-leader" | "Core-member"
    status: 'Active' | 'Deactivate'; 
  }