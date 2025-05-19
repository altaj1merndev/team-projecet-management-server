import mongoose from "mongoose";

export interface IProjectIssues extends Document {
    issuesDate: string;
    projectId: mongoose.Types.ObjectId;
    teamId: mongoose.Types.ObjectId;
    memberId: mongoose.Types.ObjectId;
    issueDate: string;
    note: string;
    status: 'NRI' | 'WORK IN PROGRESS' | 'SOLVE'| "WRONG"; 
    marketingProfileId: mongoose.Types.ObjectId;
  }