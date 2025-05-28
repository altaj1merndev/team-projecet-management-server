import { Project } from './project.model';
import AppError from '../../errors/AppError';
import QueryBuilder from '../../utils/queryBuilder';
import { IProject } from './project.interface';
import { Types } from 'mongoose';
import { User } from '../user/user/user.model';
import { MarketingProfile } from '../marketing-profile/marketingProfile.model';
import { Member } from '../member/member.modele';

const createProject = async (payload: IProject) => {
  // Validate sellsBy
  const sellsByUser = await User.findById(payload.sellsBy);
  if (!sellsByUser) throw new AppError(404, 'SellsBy user not found!');
  if (sellsByUser.role !== "Sells") throw new AppError(400, 'SellsBy user must have the role "seller"!');

  // Validate assignedBy
  const assignedByUser = await User.findById(payload.assignedBy);
  if (!assignedByUser) throw new AppError(404, 'AssignedBy user not found!');
  if (assignedByUser.role !== "Management") {
    throw new AppError(400, 'AssignedBy user must have the role "manager" or "admin"!');
  }

  // Validate leadBy
  const leadByUser = await Member.findById(payload.leadBy);
  if (!leadByUser) throw new AppError(404, 'LeadBy user not found!');
  if (leadByUser.memberType !== "Leader") throw new AppError(400, 'LeadBy user must have the role "teamLeader"!');

  // Validate assigned members (if present)
  if (payload.members && payload.members.length > 0) {
    const validTeams = await Member.find({ _id: { $in: payload.members } });
    if (validTeams.length !== payload.members.length) {
      throw new AppError(404, 'One or more assigned member not found!');
    }
  }

  // Validate marketingProfile
  const profileExists = await MarketingProfile.findById(payload.marketingProfile);
  if (!profileExists) {
    throw new AppError(404, 'Marketing Profile not found!');
  }

  const result = await Project.create(payload);
  return result;
};

const getAllProjects = async (query: Record<string, unknown>) => {
  const newQuery: Record<string, unknown> = {};

  // Basic Fields
  if (query?.searchTerm) newQuery.searchTerm = query.searchTerm;
  if (query?.clientName) newQuery.clientName = query.clientName;
  if (query?.platform) newQuery.platform = query.platform;
  if (query?.marketingProfile) newQuery.marketingProfile = new Types.ObjectId(query.marketingProfile as string);
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
    Project.find().populate(['sellsBy', 'members', 'assignedBy', 'leadBy', 'marketingProfile']),
    newQuery
  )
    .search(['clientName', 'platform']) // Removed marketingProfile
    .filter()
    .sort()
    .paginate()
    .fieldsLimit();

  const result = await projectQuery.modelQuery;
  const meta = await projectQuery.countTotal();

  return { meta, data: result };
};

const getProjectById = async (id: string) => {
  const project = await Project.findById(id).populate(['sellsBy', 'members', 'assignedBy', 'leadBy', 'marketingProfile']);
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
