import mongoose, { Schema } from "mongoose";
import { IProjectIssues } from "./projectIssues.interface";

  const ProjectIssuesSchema: Schema = new Schema({
    issuesDate: { type: String, required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    memberId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    issueDate: { type: String, required: true },
    note: { type: String },
    status: {
      type: String,
      enum: ['NRI', 'WORK IN PROGRESS', 'SOLVE', "WRONG"], // Customize statuses
      default: 'NRI',
      required: true
    },
    marketingProfileId: { type: Schema.Types.ObjectId, ref: 'MarketingProfile' }
  }, {
    timestamps: true
  });
  
  export const ProjectIssue =  mongoose.model<IProjectIssues>('ProjectIssue', ProjectIssuesSchema);