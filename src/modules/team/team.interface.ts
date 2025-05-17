import mongoose from "mongoose";

export interface ITeam extends Document {
  teamName: string;
  slug: string;
  teamNogo: string;
  teamNescription: string;
  status: 'active' | 'inactive';
  teamLead: mongoose.Types.ObjectId;
  teamMembers: mongoose.Types.ObjectId[];
  completedProjects: mongoose.Types.ObjectId[];
  assignProjects: mongoose.Types.ObjectId[];
  members: mongoose.Types.ObjectId[];
}