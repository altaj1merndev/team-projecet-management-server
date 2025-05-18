import mongoose from "mongoose";

export interface IProjectAssignedPerson extends Document {
    projectId: mongoose.Types.ObjectId;
    assignedMembers: mongoose.Types.ObjectId[];
    teams: mongoose.Types.ObjectId[];
    role: 'developer' | 'designer' | 'tester' | 'manager'; 
  }