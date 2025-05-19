import AppError from '../../errors/AppError';
import QueryBuilder from '../../utils/queryBuilder';
import { IProjectIssues } from './projectIssues.interface';
import { Types } from 'mongoose';
import { Project } from '../project/project.model';
import { Team } from '../team/team.model';
import { User } from '../user/user/user.model';
import { MarketingProfile } from '../marketing-profile/marketingProfile.model';
import { ProjectIssue } from './projectIssues.model';
import { onlineUsers } from '../../socket/socket';
import { Server } from 'socket.io';
import { Member } from '../member/member.modele';
// const createProjectIssue = async (payload: IProjectIssues) => {
//   const { projectId, teamId, memberId, marketingProfileId } = payload;

//   // Validate related references
//   const project = await Project.findById(projectId);
//   if (!project) throw new AppError(404, 'Project not found!');

//   const team = await Team.findById(teamId);
//   if (!team) throw new AppError(404, 'Team not found!');

//   const member = await User.findById(memberId);
//   if (!member) throw new AppError(404, 'User (memberId) not found!');

//   if (marketingProfileId) {
//     const marketingProfile = await MarketingProfile.findById(marketingProfileId);
//     if (!marketingProfile) throw new AppError(404, 'Marketing profile not found!');
//   }

//   const result = await ProjectIssue.create(payload);
//   return result;
// };

const createProjectIssue = async (payload: IProjectIssues, io: Server) => {
  const { projectId, teamId, memberId, marketingProfileId } = payload;

  const project = await Project.findById(projectId);
  if (!project) throw new AppError(404, 'Project not found!');

  const team = await Team.findById(teamId);
  if (!team) throw new AppError(404, 'Team not found!');

  const member = await Member.findById(memberId);
  if (!member) throw new AppError(404, 'Member not found!');

  if (marketingProfileId) {
    const marketingProfile = await MarketingProfile.findById(marketingProfileId);
    if (!marketingProfile) throw new AppError(404, 'Marketing profile not found!');
  }

  // ✅ Create issue
  const issue = await ProjectIssue.create(payload);

  // ✅ Notify all team members
  const teamMembers = await Member.find({ teamId: team._id }); 
  teamMembers.forEach((user) => {
    const socketId = onlineUsers.get(user._id.toString());
    if (socketId) {
      io.to(socketId).emit('new-project-issue', {
        message: `A new issue was created in your team: ${team.teamName}`,
        issue,
      });
    }
  });

  return issue;
};

const getAllProjectIssues = async (query: Record<string, unknown>) => {
  const newQuery: Record<string, unknown> = {};

  // Query parsing
  if (query?.issuesDate) newQuery.issuesDate = query.issuesDate;
  if (query?.status) newQuery.status = query.status;

  if (query?.projectId) newQuery.projectId = new Types.ObjectId(query.projectId as string);
  if (query?.teamId) newQuery.teamId = new Types.ObjectId(query.teamId as string);
  if (query?.memberId) newQuery.memberId = new Types.ObjectId(query.memberId as string);
  if (query?.marketingProfileId) newQuery.marketingProfileId = new Types.ObjectId(query.marketingProfileId as string);

  const issueQuery = new QueryBuilder(
    ProjectIssue.find().populate(['projectId', 'teamId', 'memberId', 'marketingProfileId']),
    newQuery
  )
    .search(['note']) // Optional, if needed
    .filter()
    .sort()
    .paginate()
    .fieldsLimit();

  const result = await issueQuery.modelQuery;
  const meta = await issueQuery.countTotal();

  return { meta, data: result };
};

const getProjectIssueById = async (id: string) => {
  const issue = await ProjectIssue.findById(id).populate(['projectId', 'teamId', 'memberId', 'marketingProfileId']);
  if (!issue) throw new AppError(404, 'Project issue not found!');
  return issue;
};

const updateProjectIssue = async (id: string, payload: Partial<IProjectIssues>) => {
  const updated = await ProjectIssue.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  if (!updated) throw new AppError(404, 'Project issue not found or could not be updated!');
  return updated;
};

const deleteProjectIssue = async (id: string) => {
  const deleted = await ProjectIssue.findByIdAndDelete(id);
  if (!deleted) throw new AppError(404, 'Project issue not found!');
  return deleted;
};

export const ProjectIssueService = {
  createProjectIssue,
  getAllProjectIssues,
  getProjectIssueById,
  updateProjectIssue,
  deleteProjectIssue,
};
