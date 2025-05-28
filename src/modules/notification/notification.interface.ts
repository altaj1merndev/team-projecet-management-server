import { Types } from "mongoose";

export interface INotification {
  recipient: Types.ObjectId;
  type: "ProjectMessage" | "ProjectIssue";
  relatedProject: Types.ObjectId;
  relatedIssue?: Types.ObjectId;
  relatedMessage?: Types.ObjectId;
  content: string;
  read?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}