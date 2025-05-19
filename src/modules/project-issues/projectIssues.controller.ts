import { Request, Response } from 'express';
import handleAsyncRequest from '../../utils/share/handleAsyncRequest';
import sendResponse from '../../utils/share/sendResponse';
import { ProjectIssueService } from './projectIssues.services';
import { io } from '../../socket/socket';

// ✅ Create project issue
// const createProjectIssue = handleAsyncRequest(async (req: Request, res: Response) => {
//   const result = await ProjectIssueService.createProjectIssue(req.body);
//   sendResponse(res, {
//     success: true,
//     statusCode: 201,
//     message: 'Project issue created successfully!',
//     data: result,
//   });
// });

const createProjectIssue = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await ProjectIssueService.createProjectIssue(req.body, io);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Project issue created and team notified!',
    data: result,
  });
});

// ✅ Get all project issues
const getAllProjectIssues = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await ProjectIssueService.getAllProjectIssues(req.query);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Project issues retrieved successfully!',
    data: result,
  });
});

// ✅ Get project issue by ID
const getProjectIssueById = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await ProjectIssueService.getProjectIssueById(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Project issue retrieved successfully!',
    data: result,
  });
});

// ✅ Update project issue
const updateProjectIssue = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await ProjectIssueService.updateProjectIssue(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Project issue updated successfully!',
    data: result,
  });
});

// ✅ Delete project issue
const deleteProjectIssue = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await ProjectIssueService.deleteProjectIssue(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Project issue deleted successfully!',
    data: result,
  });
});

export const ProjectIssueController = {
  createProjectIssue,
  getAllProjectIssues,
  getProjectIssueById,
  updateProjectIssue,
  deleteProjectIssue,
};
