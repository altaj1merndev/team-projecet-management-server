import mongoose, { Document } from "mongoose";

export interface IProjectResource extends Document {
    resourceName: string;
    resource: string;
    note: string;
    projectId: mongoose.Types.ObjectId;
    addby: mongoose.Types.ObjectId;
    images: string[];
  }