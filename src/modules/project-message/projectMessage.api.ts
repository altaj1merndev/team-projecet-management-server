import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/auth/auth.constants';
import { ProjectMessageController } from './projectMessage.controller';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT, USER_ROLE.OPERTION, USER_ROLE.SELLS),
  ProjectMessageController.createProjectMessage
);

router.get('/',auth(USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT, USER_ROLE.OPERTION, USER_ROLE.SELLS), 
ProjectMessageController.getAllProjectMessages);

router.get('/:id',auth(USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT, USER_ROLE.OPERTION, USER_ROLE.SELLS), 
ProjectMessageController.getProjectMessageById);

router.put(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT, USER_ROLE.OPERTION, USER_ROLE.SELLS),
  ProjectMessageController.updateProjectMessage
);

router.delete(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT, USER_ROLE.OPERTION, USER_ROLE.SELLS),
  ProjectMessageController.deleteProjectMessage
);

export const ProjectMessageRoutes = router;
