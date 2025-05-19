import mongoose, { Schema } from "mongoose";
import { IMember } from "./member.interface";

  
  const MemberSchema: Schema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true
    },
    memberType: {
      type: String,
      enum: ['Leader', 'Member'], 
      default: 'Member',
      required: true
    },
    status: {
      type: String,
      enum: ['Active', 'Deactivate'], 
      default: 'active',
      required: true
    }
  }, {
    timestamps: true
  });
  
  export const Member =  mongoose.model<IMember>('Member', MemberSchema);