import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/auth/auth.constants';
import { ProjectIssueController } from './projectIssues.controller';

const router = Router();

router.post('/',auth(USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT, USER_ROLE.OPERTION, USER_ROLE.SELLS),  ProjectIssueController.createProjectIssue);
router.get('/',auth(USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT, USER_ROLE.OPERTION, USER_ROLE.SELLS), ProjectIssueController.getAllProjectIssues);
router.get('/:id',auth(USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT, USER_ROLE.OPERTION, USER_ROLE.SELLS), ProjectIssueController.getProjectIssueById);
router.put('/:id', auth(USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT, USER_ROLE.OPERTION, USER_ROLE.SELLS),  ProjectIssueController.updateProjectIssue);
router.delete('/:id', auth(USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT, USER_ROLE.OPERTION, USER_ROLE.SELLS), ProjectIssueController.deleteProjectIssue);

export const ProjectIssueRoutes = router;
