import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/auth/auth.constants';
import { ProjectController } from './project.controllers';

const router = Router();
// auth(USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT, USER_ROLE.SELLS, USER_ROLE.OPERTION),
router.post('/',  ProjectController.createProject);
router.get('/', ProjectController.getAllProjects);
router.get('/:id', ProjectController.getProjectById);
router.put('/:id', auth(USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT), ProjectController.updateProject);
router.delete('/:id', auth(USER_ROLE.ADMIN), ProjectController.deleteProject);

export const ProjectRoutes = router;
