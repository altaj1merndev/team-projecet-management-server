import mongoose, { Schema } from "mongoose";
import { IProject } from "./project.interface";

  const ProjectSchema: Schema = new Schema({
    clientName: { type: String, required: true },
    sellsBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderStartDate: { type: String, required: true },
    assignedTeam: [{ type: Schema.Types.ObjectId, ref: 'Team',  required: true }],
    assignedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    leadBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    deliveryDate: { type: String, required: true },
    platfrom: { type: String },
    marketingProfile: { type: String },
    projectStatus: {
      type: String,
      enum: ['pending', 'in_progress', 'completed', 'on_hold'], 
      default: 'pending'
    },
    orderSheet: { type: String },
    specialNote: { type: String }
  }, {
    timestamps: true
  });
  
  export const Project =  mongoose.model<IProject>('Project', ProjectSchema);