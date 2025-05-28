import AppError from '../../errors/AppError';
import { ProjectMessage } from './projectMessage.model';
import { Project } from '../project/project.model';
import { Member } from '../member/member.modele';
import { MarketingProfile } from '../marketing-profile/marketingProfile.model';
import { IProjectMessage } from './projectMessage.interface';
import { Server } from 'socket.io';
import { onlineUsers } from '../../socket/socket';
import QueryBuilder from '../../utils/queryBuilder';
import { Types } from 'mongoose';
import { ProjectIssue } from '../project-issues/projectIssues.model';

const createProjectMessage = async (payload: IProjectMessage, io: Server) => {
  const { projectId, issueId, marketingProfileId, messageBy } = payload;

  // ✅ Validate related entities
  const project = await Project.findById(projectId);
  if (!project) throw new AppError(404, 'Project not found!');

  const issue = await ProjectIssue.findById(issueId);
  if (!issue) throw new AppError(404, 'Issue not found!');

  const member = await Member.findById(messageBy);
  if (!member) throw new AppError(404, 'Member not found!');

  if (marketingProfileId) {
    const marketingProfile = await MarketingProfile.findById(marketingProfileId);
    if (!marketingProfile) throw new AppError(404, 'Marketing profile not found!');
  }

  // ✅ Create project message
  const message = await ProjectMessage.create(payload);

  // ✅ Notify all team members of the project
  const teamIds = project.members || [];
  const members = await Member.find({ teamId: { $in: teamIds } });

  members.forEach(user => {
    const socketId = onlineUsers.get(user._id.toString());
    if (socketId) {
      io.to(socketId).emit('new-project-message', {
        message: `New message on project ${project.clientName}`,
        data: message,
      });
    }
  });

  return message;
};

const getAllProjectMessages = async (query: Record<string, unknown>) => {
  const filter: Record<string, unknown> = {};

  if (query.projectId) filter.projectId = new Types.ObjectId(query.projectId as string);
  if (query.issueId) filter.issueId = new Types.ObjectId(query.issueId as string);
  if (query.marketingProfileId) filter.marketingProfileId = new Types.ObjectId(query.marketingProfileId as string);
  if (query.messageBy) filter.messageBy = new Types.ObjectId(query.messageBy as string);

  const queryBuilder = new QueryBuilder(
    ProjectMessage.find().populate(['projectId', 'issueId', 'marketingProfileId', 'messageBy']),
    filter
  )
    .search(['message', 'note'])
    .filter()
    .sort()
    .paginate()
    .fieldsLimit();

  const data = await queryBuilder.modelQuery;
  const meta = await queryBuilder.countTotal();

  return { meta, data };
};

const getProjectMessageById = async (id: string) => {
  const message = await ProjectMessage.findById(id).populate(['projectId', 'issueId', 'marketingProfileId', 'messageBy']);
  if (!message) throw new AppError(404, 'Project message not found!');
  return message;
};

const updateProjectMessage = async (id: string, payload: Partial<IProjectMessage>) => {
  const updated = await ProjectMessage.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  if (!updated) throw new AppError(404, 'Project message not found or could not be updated!');
  return updated;
};

const deleteProjectMessage = async (id: string) => {
  const deleted = await ProjectMessage.findByIdAndDelete(id);
  if (!deleted) throw new AppError(404, 'Project message not found!');
  return deleted;
};

export const ProjectMessageService = {
  createProjectMessage,
  getAllProjectMessages,
  getProjectMessageById,
  updateProjectMessage,
  deleteProjectMessage,
};
