import { Project } from './project.model';
import AppError from '../../errors/AppError';
import QueryBuilder from '../../utils/queryBuilder';
import { IProject } from './project.interface';
import { Types } from 'mongoose';
import { User } from '../user/user/user.model';
import { Team } from '../team/team.model';

const createProject = async (payload: IProject) => {
  // Validate sellsBy
  const sellsByUser = await User.findById(payload.sellsBy);
  if (!sellsByUser) {
    throw new AppError(404, 'SellsBy user not found!');
  }
  if (sellsByUser.role !== "seller") {
    throw new AppError(400, 'SellsBy user must have the role "seller"!');
  }

  // Validate assignedBy
  const assignedByUser = await User.findById(payload.assignedBy);
  if (!assignedByUser) {
    throw new AppError(404, 'AssignedBy user not found!');
  }
  if (assignedByUser.role !== "manager" && assignedByUser.role !== "admin") {
    throw new AppError(400, 'AssignedBy user must have the role "manager" or "admin"!');
  }
  // Validate leadBy
  const leadByUser = await User.findById(payload.leadBy);
  if (!leadByUser) {
    throw new AppError(404, 'LeadBy user not found!');
  }
  if (leadByUser.role !== "teamLeader") {
    throw new AppError(400, 'LeadBy user must have the role "teamLeader"!');
  }

  // Validate assignedTeam (if present)
  if (payload.assignedTeam && payload.assignedTeam.length > 0) {
    const validTeams = await Team.find({ _id: { $in: payload.assignedTeam } });
    if (validTeams.length !== payload.assignedTeam.length) {
      throw new AppError(404, 'One or more assigned teams not found!');
    }
  }

  // Create project
  const result = await Project.create(payload);
  return result;
};

const getAllProjects = async (query: Record<string, unknown>) => {
  const newQuery: Record<string, unknown> = {};

  // Basic Fields
  if (query?.searchTerm) newQuery.searchTerm = query.searchTerm;
  if (query?.clientName) newQuery.clientName = query.clientName;
  if (query?.platfrom) newQuery.platfrom = query.platfrom;
  if (query?.marketingProfile) newQuery.marketingProfile = query.marketingProfile;
  if (query?.projectStatus) newQuery.projectStatus = query.projectStatus;
  if (query?.orderStartDate) newQuery.orderStartDate = query.orderStartDate;
  if (query?.deliveryDate) newQuery.deliveryDate = query.deliveryDate;
  if (query?.orderSheet) newQuery.orderSheet = query.orderSheet;
  if (query?.specialNote) newQuery.specialNote = query.specialNote;

  // References (ObjectIds)
  if (query?.sellsBy) newQuery.sellsBy = new Types.ObjectId(query.sellsBy as string);
  if (query?.assignedBy) newQuery.assignedBy = new Types.ObjectId(query.assignedBy as string);
  if (query?.leadBy) newQuery.leadBy = new Types.ObjectId(query.leadBy as string);
  if (query?.assignedTeam) newQuery.assignedTeam = new Types.ObjectId(query.assignedTeam as string);

  const projectQuery = new QueryBuilder(
    Project.find().populate(['sellsBy', 'assignedTeam', 'assignedBy', 'leadBy']),
    newQuery
  )
    .search(['clientName', 'platfrom', 'marketingProfile']) // Optional search
    .filter()
    .sort()
    .paginate()
    .fieldsLimit();

  const result = await projectQuery.modelQuery;
  const meta = await projectQuery.countTotal();

  return { meta, data: result };
};

const getProjectById = async (id: string) => {
  const project = await Project.findById(id).populate(['sellsBy', 'assignedTeam', 'assignedBy', 'leadBy']);
  if (!project) throw new AppError(404, 'Project not found!');
  return project;
};

const updateProject = async (id: string, payload: Partial<IProject>) => {
  const project = await Project.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  if (!project) throw new AppError(404, 'Project not found or could not be updated!');
  return project;
};

const deleteProject = async (id: string) => {
  const project = await Project.findByIdAndDelete(id);
  if (!project) throw new AppError(404, 'Project not found!');
  return project;
};

export const ProjectService = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
