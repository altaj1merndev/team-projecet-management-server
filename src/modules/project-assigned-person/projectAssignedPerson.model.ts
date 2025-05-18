import mongoose, { Schema } from "mongoose";
import { IProjectAssignedPerson } from "./projectAssignedPerson.interface";

 const ProjectAssignedPersonSchema: Schema = new Schema({
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    assignedMembers: [{
      type: Schema.Types.ObjectId,
      ref: 'Member',
      required: true
    }],
  
    teams: [{
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true
    }],
    role: {
      type: String,
      enum: ['developer', 'designer', 'tester', 'manager'], 
      required: true
    }
  }, {
    timestamps: true
  });
  
  export const ProjectAssignedPerson =  mongoose.model<IProjectAssignedPerson>('ProjectAssignedPerson', ProjectAssignedPersonSchema);
