import mongoose from "mongoose";

export interface ITeam extends Document {
  teamName: string;
  slug: string;
  teamNogo: string;
  teamNescription: string;
  status: 'Active' | 'Deactivate';
  teamLead: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
}