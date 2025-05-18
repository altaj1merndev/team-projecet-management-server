import mongoose, { Schema } from "mongoose";
import { IMarketingProfile } from "./marketingProfile.interface";

  const MarketingProfileSchema: Schema = new Schema({
    profileName: { type: String, required: true },
    profileUsername: { type: String, required: true },
    platform: { type: String, required: true }, // e.g., 'Facebook', 'Instagram'
    profileUrl: { type: String, required: true },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
      required: true
    },
    addBy: {
      type: Schema.Types.ObjectId,
      ref: 'Member',
      required: true
    }
  }, {
    timestamps: true
  });
  
  export const MarketingProfile =  mongoose.model<IMarketingProfile>('MarketingProfile', MarketingProfileSchema);
