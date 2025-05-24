import { Request, Response } from 'express';
import handleAsyncRequest from '../../utils/share/handleAsyncRequest';
import sendResponse from '../../utils/share/sendResponse';
import { ProjectService } from './project.services';

// ✅ Create project
const createProject = handleAsyncRequest(async (req: Request, res: Response) => {
  console.log(req.body)
  const result = await ProjectService.createProject(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Project created successfully!',
    data: result,
  });
});

// ✅ Get all projects
const getAllProjects = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await ProjectService.getAllProjects(req.query);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Projects retrieved successfully!',
    data: result,
  });
});

// ✅ Get project by ID
const getProjectById = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await ProjectService.getProjectById(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Project retrieved successfully!',
    data: result,
  });
});

// ✅ Update project
const updateProject = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await ProjectService.updateProject(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Project updated successfully!',
    data: result,
  });
});

// ✅ Delete project
const deleteProject = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await ProjectService.deleteProject(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Project deleted successfully!',
    data: result,
  });
});

export const ProjectController = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
