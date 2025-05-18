import mongoose, { Schema } from "mongoose";
import { IProjectResource } from "./projectResource.interface";

  const ProjectResourceSchema: Schema = new Schema({
    resourceName: { type: String, required: true },
    resource: { type: String, required: true }, 
    note: { type: String },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    addby: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    images: {
      type: [String],
        default: []     
    },
  }, {
    timestamps: true
  });
  
  export const ProjectResource =  mongoose.model<IProjectResource>('ProjectResource', ProjectResourceSchema); 