import mongoose, { Schema } from "mongoose";
import { IProject } from "./project.interface";
import e from "cors";
import { ref } from "process";

  const ProjectSchema: Schema = new Schema({
    clientName: { type: String, required: true },
    sellsBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderStartDate: { type: String, required: true },
    assignedTeam: [{ type: Schema.Types.ObjectId, ref: 'Team',  required: true }],
    assignedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    leadBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    deliveryDate: { type: String, required: true },
    platfrom: { 
      type: String,
      enum: ['Fiverr', 'Upwork'],
      required: true,
    },
    marketingProfile: { type: String,
      ref: 'MarketingProfile',
      required: true,
    },
    projectStatus: {
      type: String,
      enum: ['NRI', 'WIP', 'Hold', 'Cancel'],
      required: true,
      default: 'NRI'
    },
    orderSheet: { type: String },
    specialNote: { type: String }
  }, {
    timestamps: true
  });
  
  export const Project =  mongoose.model<IProject>('Project', ProjectSchema);