import { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import QueryBuilder from '../../utils/queryBuilder';
import { IMember } from './member.interface';
import { Member } from './member.modele';

// Create a member
const createMember = async (payload: IMember) => {
  const existing = await Member.findOne({
    userId: payload.userId,
    teamId: payload.teamId,
  });

  if (existing) {
    throw new AppError(400, 'User is already a member of this team!');
  }

  const result = await Member.create(payload);
  return result;
};

// Get all members
const getAllMembers = async (query: Record<string, unknown>) => {
  const newQuery: Record<string, unknown> = {};

  // Direct field filters
  if (query?.memberType) newQuery.memberType = query.memberType;
  if (query?.status) newQuery.status = query.status;

  // References (ObjectIds)
  if (query?.userId) newQuery.userId = new Types.ObjectId(query.userId as string);
  if (query?.teamId) newQuery.teamId = new Types.ObjectId(query.teamId as string);

  const memberQuery = new QueryBuilder(
    Member.find().populate(['userId', 'teamId']),
    newQuery
  )
    .search(['memberType', 'status']) // If you want search support
    .filter()
    .sort()
    .paginate()
    .fieldsLimit();

  const result = await memberQuery.modelQuery;
  const meta = await memberQuery.countTotal();

  return { meta, data: result };
};


// Get members by teamId
const getMembersByTeam = async (teamId: string) => {
  return await Member.find({ teamId }).populate(['userId', 'teamId']);
};

// Get a single member by ID
const getMemberById = async (id: string) => {
  const member = await Member.findById(id).populate(['userId', 'teamId']);
  if (!member) {
    throw new AppError(404, 'Member not found!');
  }
  return member;
};

// Update member by ID
const updateMember = async (id: string, payload: Partial<IMember>) => {
  const updated = await Member.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    throw new AppError(404, 'Member not found!');
  }

  return updated;
};

// Delete member by ID
const deleteMember = async (id: string) => {
  const deleted = await Member.findByIdAndDelete(id);
  if (!deleted) {
    throw new AppError(404, 'Member not found!');
  }
  return deleted;
};

export const MemberService = {
  createMember,
  getAllMembers,
  getMembersByTeam,
  getMemberById,
  updateMember,
  deleteMember,
};
