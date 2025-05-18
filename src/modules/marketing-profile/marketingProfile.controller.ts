import { Request, Response } from 'express';
import handleAsyncRequest from '../../utils/share/handleAsyncRequest';
import sendResponse from '../../utils/share/sendResponse';
import { MarketingProfileService } from './marketingProfile.services';

// ✅ Create
const createMarketingProfile = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await MarketingProfileService.createMarketingProfile(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Marketing profile created successfully!',
    data: result,
  });
});

// ✅ Get all
const getAllMarketingProfiles = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await MarketingProfileService.getAllMarketingProfiles(req.query);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Marketing profiles retrieved successfully!',
    data: result,
  });
});

// ✅ Get by ID
const getMarketingProfileById = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await MarketingProfileService.getMarketingProfileById(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Marketing profile retrieved successfully!',
    data: result,
  });
});

// ✅ Update
const updateMarketingProfile = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await MarketingProfileService.updateMarketingProfile(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Marketing profile updated successfully!',
    data: result,
  });
});

// ✅ Delete
const deleteMarketingProfile = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await MarketingProfileService.deleteMarketingProfile(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Marketing profile deleted successfully!',
    data: result,
  });
});

export const MarketingProfileController = {
  createMarketingProfile,
  getAllMarketingProfiles,
  getMarketingProfileById,
  updateMarketingProfile,
  deleteMarketingProfile,
};
