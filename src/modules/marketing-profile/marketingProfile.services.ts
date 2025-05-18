import { MarketingProfile } from './marketingProfile.model';
import AppError from '../../errors/AppError';
import { Types } from 'mongoose';
import QueryBuilder from '../../utils/queryBuilder';
import { Member } from '../member/member.modele';
import { IMarketingProfile } from './marketingProfile.interface';

// ✅ Create marketing profile
const createMarketingProfile = async (payload: IMarketingProfile) => {
  // Validate member exists
  const memberExists = await Member.findById(payload.addBy);
  if (!memberExists) {
    throw new AppError(404, 'Member (addBy) not found!');
  }

  const result = await MarketingProfile.create(payload);
  return result;
};

// ✅ Get all marketing profiles (with optional query filtering)
const getAllMarketingProfiles = async (query: Record<string, unknown>) => {
  const filters: Record<string, unknown> = {};

  if (query?.platform) filters.platform = { $regex: query.platform, $options: 'i' };
  if (query?.status) filters.status = query.status;
  if (query?.profileName) filters.profileName = { $regex: query.profileName, $options: 'i' };

  const queryBuilder = new QueryBuilder(
    MarketingProfile.find().populate('addBy'),
    filters
  )
    .search(['profileName', 'profileUsername', 'platform'])
    .filter()
    .sort()
    .paginate()
    .fieldsLimit();

  const data = await queryBuilder.modelQuery;
  const meta = await queryBuilder.countTotal();

  return { meta, data };
};

// ✅ Get a single marketing profile by ID
const getMarketingProfileById = async (id: string) => {
  const profile = await MarketingProfile.findById(id).populate('addBy');
  if (!profile) {
    throw new AppError(404, 'Marketing profile not found!');
  }
  return profile;
};

// ✅ Update marketing profile
const updateMarketingProfile = async (id: string, payload: Partial<IMarketingProfile>) => {
  if (payload.addBy) {
    const memberExists = await Member.findById(payload.addBy);
    if (!memberExists) {
      throw new AppError(404, 'Member (addBy) not found!');
    }
  }

  const updated = await MarketingProfile.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    throw new AppError(404, 'Marketing profile not found or update failed!');
  }

  return updated;
};

// ✅ Delete marketing profile
const deleteMarketingProfile = async (id: string) => {
  const deleted = await MarketingProfile.findByIdAndDelete(id);
  if (!deleted) {
    throw new AppError(404, 'Marketing profile not found!');
  }
  return deleted;
};

export const MarketingProfileService = {
  createMarketingProfile,
  getAllMarketingProfiles,
  getMarketingProfileById,
  updateMarketingProfile,
  deleteMarketingProfile,
};
