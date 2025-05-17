import { Request, Response } from 'express';
import handleAsyncRequest from '../../utils/share/handleAsyncRequest';
import sendResponse from '../../utils/share/sendResponse';
import { MemberService } from './member.service';

// Create Member
const createMember = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await MemberService.createMember(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Member added successfully',
    data: result,
  });
});

// Get All Members
const getAllMembers = handleAsyncRequest(async (_req: Request, res: Response) => {
  const result = await MemberService.getAllMembers();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'All members retrieved successfully',
    data: result,
  });
});

// Get Members by Team
const getMembersByTeam = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await MemberService.getMembersByTeam(req.params.teamId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Team members retrieved successfully',
    data: result,
  });
});

// Get Member by ID
const getMemberById = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await MemberService.getMemberById(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Member retrieved successfully',
    data: result,
  });
});

// Update Member
const updateMember = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await MemberService.updateMember(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Member updated successfully',
    data: result,
  });
});

// Delete Member
const deleteMember = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await MemberService.deleteMember(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Member deleted successfully',
    data: result,
  });
});

export const MemberController = {
  createMember,
  getAllMembers,
  getMembersByTeam,
  getMemberById,
  updateMember,
  deleteMember,
};
