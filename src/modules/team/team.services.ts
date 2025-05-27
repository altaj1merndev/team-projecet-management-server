import { Team } from './team.model';
import AppError from '../../errors/AppError';
import QueryBuilder from '../../utils/queryBuilder';
import { User } from '../user/user/user.model';
import { ITeam } from './team.interface';
import { stringToSlug } from '../../utils/lib/stringToSlug';
import { Types } from 'mongoose';
import { Member } from '../member/member.modele';

// ✅ Create a new team
const createTeam = async (payload: ITeam) => {
  // Check if the team lead exists

  const teamLead = await User.findById(payload.teamLead);
  if (!teamLead) {
    throw new AppError(404, 'Team Lead not found!');
  }

  // Generate a unique slug
  const slug = stringToSlug(payload.teamName);
  const existing = await Team.findOne({ slug });
  if (existing) {
    throw new AppError(400, 'Team with this slug already exists!');
  }

  // Create the team
  const result = await Team.create({ ...payload, slug });
  return result;
};

// ✅ Get all teams



const getAllTeams = async (query: Record<string, unknown>) => {
  const newQuery: Record<string, unknown> = {};

  // Direct field filters
  if (query?.teamName) newQuery.teamName = query.teamName;
  if (query?.status) newQuery.status = query.status;
  if (query?.teamLead) newQuery.teamLead = new Types.ObjectId(query.teamLead as string);
  if (query?.completedProjects)
    newQuery.completedProjects = new Types.ObjectId(query.completedProjects as string);
  if (query?.assignProjects)
    newQuery.assignProjects = new Types.ObjectId(query.assignProjects as string);

  const teamQuery = new QueryBuilder(
    Team.find(newQuery).populate(["teamLead"]),
    query
  )
    .search(['teamName', 'status'])
    .filter()
    .sort()
    .paginate()
    .fieldsLimit();

  const result = await teamQuery.modelQuery;
  const meta = await teamQuery.countTotal();

  // Add project counts to each team
  const dataWithCounts = result.map((team: any) => ({
    ...team.toObject(),
    assignProjectCount: team.assignProjects?.length || 0,
    completedProjectCount: team.completedProjects?.length || 0,
  }));

  return {
    meta,
    data: dataWithCounts,
  };
};


// ✅ Get team by slug
const getTeamBySlug = async (slug: string) => {
  const team = await Team.findOne({ slug }).populate('teamLead');

  if (!team) {
    throw new AppError(404, 'Team not found!');
  }

  const members = await Member.find({ teamId: team._id })
    .populate({
      path: 'userId',
      select: 'userName firstName lastName email phoneNumber avatar designation role userStatus'
    });

  return {
    ...team.toObject(),
    members, // attach members list to the response
  };
};

// ✅ Get teams by teamLead
const getTeamsByTeamLead = async (teamLeadId: string) => {
  const result = await Team.find({ teamLead: teamLeadId }).populate('teamLead');

  return result;
};

// ✅ Update a team by slug
const updateTeam = async (slug: string, payload: Partial<ITeam>) => {
  if (payload.teamName) {
    const newSlug = stringToSlug(payload.teamName);
    const existing = await Team.findOne({ slug: newSlug });
    if (existing && existing.slug !== slug) {
      throw new AppError(400, 'Another team with this name already exists!');
    }
    payload.slug = newSlug;
  }

  const result = await Team.findOneAndUpdate({ slug }, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(404, 'Team not found or could not be updated!');
  }

  return result;
};

// ✅ Delete a team by slug
const deleteTeam = async (slug: string) => {
  const result = await Team.findOneAndDelete({ slug });

  if (!result) {
    throw new AppError(404, 'Team not found!');
  }

  return result;
};

export const TeamService = {
  createTeam,
  getAllTeams,
  getTeamBySlug,
  getTeamsByTeamLead,
  updateTeam,
  deleteTeam,
};
