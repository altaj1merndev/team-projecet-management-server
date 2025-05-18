import { Request, Response } from 'express';
import handleAsyncRequest from '../../utils/share/handleAsyncRequest';
import sendResponse from '../../utils/share/sendResponse';
import { ProjectResourceService } from './projectResource.services';

// ✅ Create project resource
const createProjectResource = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await ProjectResourceService.createProjectResource(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Project resource created successfully!',
    data: result,
  });
});

// ✅ Get all project resources
const getAllProjectResources = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await ProjectResourceService.getAllProjectResources(req.query);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Project resources retrieved successfully!',
    data: result,
  });
});

// ✅ Get project resource by ID
const getProjectResourceById = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await ProjectResourceService.getProjectResourceById(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Project resource retrieved successfully!',
    data: result,
  });
});

const getResourcesByProjectId = handleAsyncRequest(async (req: Request, res: Response) => {
  const projectId = req.params.projectId;
  const result = await ProjectResourceService.getResourcesByProjectId(projectId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Resources for the project retrieved successfully!',
    data: result,
  });
});

// ✅ Update project resource
const updateProjectResource = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await ProjectResourceService.updateProjectResource(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Project resource updated successfully!',
    data: result,
  });
});

// ✅ Delete project resource
const deleteProjectResource = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await ProjectResourceService.deleteProjectResource(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Project resource deleted successfully!',
    data: result,
  });
});

export const ProjectResourceController = {
  createProjectResource,
  getAllProjectResources,
  getProjectResourceById,
  getResourcesByProjectId, 
  updateProjectResource,
  deleteProjectResource,
};
