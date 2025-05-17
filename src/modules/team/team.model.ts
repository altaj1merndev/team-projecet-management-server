import mongoose, { Schema } from "mongoose";
import { ITeam } from "./team.interface";

const TeamSchema: Schema = new Schema(
  {
    teamName: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    teamlogo: { type: String },
    teamDescription: { type: String },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
      required: true,
    },
    teamLead: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

export const Team = mongoose.model<ITeam>('Team', TeamSchema);