import { Request, Response } from 'express';
import handleAsyncRequest from '../../utils/share/handleAsyncRequest';
import sendResponse from '../../utils/share/sendResponse';
import { TeamService } from './team.services';

// ✅ Create Team
const createTeam = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await TeamService.createTeam(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Team created successfully!',
    data: result,
  });
});

// ✅ Get All Teams
const getAllTeams = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await TeamService.getAllTeams(req.query);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Teams retrieved successfully!',
    data: result,
  });
});

// ✅ Get Team By Slug (was getTeamById)
const getTeamBySlug = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await TeamService.getTeamBySlug(req.params.slug);

  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: 404,
      message: 'Team not found!',
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Team retrieved successfully!',
    data: result,
  });
});

// ✅ Get Teams by Team Lead
const getTeamsByTeamLead = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await TeamService.getTeamsByTeamLead(req.params.teamLeadId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Teams by team lead retrieved successfully!',
    data: result,
  });
});

// ✅ Update Team by Slug
const updateTeam = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await TeamService.updateTeam(req.params.slug, req.body);

  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: 404,
      message: 'Team not found or could not be updated!',
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Team updated successfully!',
    data: result,
  });
});

// ✅ Delete Team by Slug
const deleteTeam = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await TeamService.deleteTeam(req.params.slug);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Team deleted successfully!',
    data: result,
  });
});

export const TeamController = {
  createTeam,
  getAllTeams,
  getTeamBySlug,
  getTeamsByTeamLead,
  updateTeam,
  deleteTeam,
};
