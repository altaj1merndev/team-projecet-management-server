import { Router } from 'express';
import { TeamController } from './team.controllers';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/auth/auth.constants';

const router = Router();

// ✅ Create a new team (admin, manager only)
router.post(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT),
  TeamController.createTeam
);

// ✅ Get all teams (public or role-protected as needed)
router.get('/', TeamController.getAllTeams);

// ✅ Get a single team by slug (public or role-protected as needed)
router.get('/:slug', TeamController.getTeamBySlug);

// ✅ Get all teams led by a specific team lead
router.get('/lead/:teamLeadId',  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT), TeamController.getTeamsByTeamLead);

// ✅ Update a team using slug
router.put(
  '/:slug',
 auth(USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT),
  TeamController.updateTeam
);

// ✅ Delete a team using slug
router.delete(
  '/:slug',
  auth(USER_ROLE.ADMIN),
  TeamController.deleteTeam
);

export const TeamRoutes = router;
