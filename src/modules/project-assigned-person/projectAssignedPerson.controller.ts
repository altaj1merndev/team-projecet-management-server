import { Request, Response } from 'express';
import handleAsyncRequest from '../../utils/share/handleAsyncRequest';
import sendResponse from '../../utils/share/sendResponse';
import { ProjectAssignedPersonService } from './projectAssignedPerson.services';

// ✅ Create
const createAssignedPerson = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await ProjectAssignedPersonService.createAssignedPerson(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Person assigned to project successfully!',
    data: result,
  });
});

// ✅ Get All
const getAllAssignedPersons = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await ProjectAssignedPersonService.getAllAssignedPersons(req.query);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'All assigned persons retrieved!',
    data: result,
  });
});

// ✅ Get By ID
const getAssignedPersonById = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await ProjectAssignedPersonService.getAssignedPersonById(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Assigned person retrieved!',
    data: result,
  });
});

// ✅ Get by Project ID
const getAssignedPersonsByProjectId = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await ProjectAssignedPersonService.getAssignedPersonsByProjectId(req.params.projectId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Assigned persons for project retrieved!',
    data: result,
  });
});

// ✅ Update
const updateAssignedPerson = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await ProjectAssignedPersonService.updateAssignedPerson(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Assigned person updated successfully!',
    data: result,
  });
});

// ✅ Delete
const deleteAssignedPerson = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await ProjectAssignedPersonService.deleteAssignedPerson(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Assigned person removed successfully!',
    data: result,
  });
});

export const ProjectAssignedPersonController = {
  createAssignedPerson,
  getAllAssignedPersons,
  getAssignedPersonById,
  getAssignedPersonsByProjectId,
  updateAssignedPerson,
  deleteAssignedPerson,
};
