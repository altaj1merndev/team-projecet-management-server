import { ProjectResource } from './projectResource.model';
import { IProjectResource } from './projectResource.interface';
import AppError from '../../errors/AppError';
import { Types } from 'mongoose';
import { Project } from '../project/project.model';
import { User } from '../user/user/user.model';
import QueryBuilder from '../../utils/queryBuilder';

const createProjectResource = async (payload: IProjectResource) => {
  // Validate projectId
  const project = await Project.findById(payload.projectId);
  if (!project) throw new AppError(404, 'Project not found!');

  // Validate addby user
  const user = await User.findById(payload.addby);
  if (!user) throw new AppError(404, 'User (addedBy) not found!');

  const result = await ProjectResource.create(payload);
  return result;
};

const getAllProjectResources = async (query: Record<string, unknown>) => {
  const newQuery: Record<string, unknown> = {};

  if (query?.projectId) newQuery.projectId = new Types.ObjectId(query.projectId as string);
  if (query?.addby) newQuery.addby = new Types.ObjectId(query.addby as string);
  if (query?.resourceName) newQuery.resourceName = { $regex: query.resourceName, $options: 'i' };

  const resourceQuery = new QueryBuilder(
    ProjectResource.find().populate(['projectId', 'addby']),
    newQuery
  )
    .search(['resourceName', 'note'])
    .filter()
    .sort()
    .paginate()
    .fieldsLimit();

  const result = await resourceQuery.modelQuery;
  const meta = await resourceQuery.countTotal();

  return { meta, data: result };
};

const getProjectResourceById = async (id: string) => {
  const resource = await ProjectResource.findById(id).populate(['projectId', 'addby']);
  if (!resource) throw new AppError(404, 'Project resource not found!');
  return resource;
};

const getResourcesByProjectId = async (projectId: string) => {
  const resources = await ProjectResource.find({ projectId })
    .populate(['projectId', 'addby']);
  return resources;
};

const updateProjectResource = async (id: string, payload: Partial<IProjectResource>) => {
  const resource = await ProjectResource.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!resource) throw new AppError(404, 'Project resource not found or could not be updated!');
  return resource;
};

const deleteProjectResource = async (id: string) => {
  const resource = await ProjectResource.findByIdAndDelete(id);
  if (!resource) throw new AppError(404, 'Project resource not found!');
  return resource;
};

export const ProjectResourceService = {
  createProjectResource,
  getAllProjectResources,
  getProjectResourceById,
  getResourcesByProjectId,
  updateProjectResource,
  deleteProjectResource,
};
