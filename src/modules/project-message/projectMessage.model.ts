import mongoose, { Schema } from "mongoose";
import { IProjectMessage } from "./projectMessage.interface";

const ProjectMessageSchema: Schema = new Schema(
  {
    projectId: { type: String, required: true },
    messageType: {
      type: String,
      enum: [
        "Update Message",
        "Delivery Message",
        "Follow Up",
        "Extend Message",
        "Answer Message",
        "Meeting Follow Up",
      ],
      required: true,
    },
    marketingProfileId: {
      type: Schema.Types.ObjectId,
      ref: "MarketingProfile",
      required: true,
    },
    message: { type: String, required: true },
    note: { type: String },
    messageStatus: {
      type: String,
      enum: ["padding", "delivered", "cancel"],
      default: "padding",
      required: true,
    },
    issueId: {
      type: Schema.Types.ObjectId,
      ref: "ProjectIssue",
      required: true,
    },
    messageBy: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ProjectMessage = mongoose.model<IProjectMessage>(
  "ProjectMessage",
  ProjectMessageSchema
);