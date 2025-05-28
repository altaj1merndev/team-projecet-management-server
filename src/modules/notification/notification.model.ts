import mongoose, { Schema } from "mongoose";
import { INotification } from "./notification.interface";

const NotificationSchema: Schema = new Schema(
  {
    recipient: [{ type: Schema.Types.ObjectId, ref: "Member", required: true }],
    type: {
      type: String,
      enum: ["ProjectMessage", "ProjectIssue"],
      required: true,
    },
    relatedProject: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    relatedIssue: {
      type: Schema.Types.ObjectId,
      ref: "ProjectIssue",
    },
    relatedMessage: {
      type: Schema.Types.ObjectId,
      ref: "ProjectMessage",
    },
    content: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Notification = mongoose.model<INotification>(
  "Notification",
  NotificationSchema
);
