import { Request, Response } from 'express';
import handleAsyncRequest from '../../utils/share/handleAsyncRequest';
import sendResponse from '../../utils/share/sendResponse';
import { ProjectMessageService } from './projectMessage.service';
import { io } from '../../socket/socket';

// ✅ Create project message
const createProjectMessage = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await ProjectMessageService.createProjectMessage(req.body, io);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Project message created and team notified!',
    data: result,
  });
});

// ✅ Get all project messages
const getAllProjectMessages = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await ProjectMessageService.getAllProjectMessages(req.query);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Project messages retrieved successfully!',
    data: result,
  });
});

// ✅ Get project message by ID
const getProjectMessageById = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await ProjectMessageService.getProjectMessageById(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Project message retrieved successfully!',
    data: result,
  });
});

// ✅ Update project message
const updateProjectMessage = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await ProjectMessageService.updateProjectMessage(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Project message updated successfully!',
    data: result,
  });
});

// ✅ Delete project message
const deleteProjectMessage = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await ProjectMessageService.deleteProjectMessage(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Project message deleted successfully!',
    data: result,
  });
});

export const ProjectMessageController = {
  createProjectMessage,
  getAllProjectMessages,
  getProjectMessageById,
  updateProjectMessage,
  deleteProjectMessage,
};
