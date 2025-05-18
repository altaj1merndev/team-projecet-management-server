import { ProjectAssignedPerson } from './projectAssignedPerson.model';
import { IProjectAssignedPerson } from './projectAssignedPerson.interface';
import AppError from '../../errors/AppError';
import { Types } from 'mongoose';
import { Project } from '../project/project.model';
import { Team } from '../team/team.model';
import QueryBuilder from '../../utils/queryBuilder';
import { Member } from '../member/member.modele';

// ✅ Create assigned persons with validation
const createAssignedPerson = async (payload: IProjectAssignedPerson) => {
  const { projectId, assignedMembers, teams } = payload;

  // Validate project
  const project = await Project.findById(projectId);
  if (!project) throw new AppError(404, 'Project not found!');

  // Validate assigned members
  for (const memberId of assignedMembers) {
    const member = await Member.findById(memberId);
    if (!member) throw new AppError(404, `Member with ID ${memberId} not found!`);
  }

  // Validate teams
  for (const teamId of teams) {
    const team = await Team.findById(teamId);
    if (!team) throw new AppError(404, `Team with ID ${teamId} not found!`);
  }

  const result = await ProjectAssignedPerson.create(payload);
  return result;
};

// ✅ Get all with advanced query support
const getAllAssignedPersons = async (query: Record<string, unknown>) => {
  const newQuery: Record<string, unknown> = {};

  if (query?.projectId) newQuery.projectId = new Types.ObjectId(query.projectId as string);
  if (query?.role) newQuery.role = query.role;

  const searchQuery = new QueryBuilder(
    ProjectAssignedPerson.find().populate(['projectId', 'assignedMembers', 'teams']),
    newQuery
  )
    .search([])
    .filter()
    .sort()
    .paginate()
    .fieldsLimit();

  const result = await searchQuery.modelQuery;
  const meta = await searchQuery.countTotal();

  return { meta, data: result };
};

// ✅ Get by ID
const getAssignedPersonById = async (id: string) => {
  const person = await ProjectAssignedPerson.findById(id).populate(['projectId', 'assignedMembers', 'teams']);
  if (!person) throw new AppError(404, 'Assigned person not found!');
  return person;
};

// ✅ Get assigned persons by project ID
const getAssignedPersonsByProjectId = async (projectId: string) => {
  const persons = await ProjectAssignedPerson.find({ projectId })
    .populate(['assignedMembers', 'teams']);
  return persons;
};

// ✅ Update with validation
const updateAssignedPerson = async (
  id: string,
  payload: Partial<IProjectAssignedPerson>
) => {
  if (payload.assignedMembers) {
    for (const memberId of payload.assignedMembers) {
      const member = await Member.findById(memberId);
      if (!member) throw new AppError(404, `Member with ID ${memberId} not found!`);
    }
  }

  if (payload.teams) {
    for (const teamId of payload.teams) {
      const team = await Team.findById(teamId);
      if (!team) throw new AppError(404, `Team with ID ${teamId} not found!`);
    }
  }

  const updated = await ProjectAssignedPerson.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!updated) throw new AppError(404, 'Assigned person not found or could not be updated!');
  return updated;
};

// ✅ Delete
const deleteAssignedPerson = async (id: string) => {
  const deleted = await ProjectAssignedPerson.findByIdAndDelete(id);
  if (!deleted) throw new AppError(404, 'Assigned person not found!');
  return deleted;
};

export const ProjectAssignedPersonService = {
  createAssignedPerson,
  getAllAssignedPersons,
  getAssignedPersonById,
  getAssignedPersonsByProjectId,
  updateAssignedPerson,
  deleteAssignedPerson,
};
