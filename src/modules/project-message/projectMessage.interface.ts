import mongoose from "mongoose";

export interface IProjectMessage {
projectId: string;
messageType: "Update Message" | "Delivery Message"| "Follow Up" | "Extend Message" | " Answer Message" |  "Meeting Follow Up"
marketingProfileId: mongoose.Types.ObjectId
message: string;
note: string
messageStatus: "padding" | "delivered" | "cancel";
issueId: mongoose.Types.ObjectId;
messageBy: mongoose.Types.ObjectId;
}