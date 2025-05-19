import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/auth/auth.constants';
import { ProjectResourceController } from './projectResource.controller';

const router = Router();

router.post('/', auth(USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT),  ProjectResourceController.createProjectResource);
router.get('/', ProjectResourceController.getAllProjectResources);
router.get('/:id', ProjectResourceController.getProjectResourceById);
router.get('/project/:projectId', ProjectResourceController.getResourcesByProjectId);
router.put('/:id', auth(USER_ROLE.ADMIN,USER_ROLE.MANAGEMENT), ProjectResourceController.updateProjectResource);
router.delete('/:id', auth(USER_ROLE.ADMIN), ProjectResourceController.deleteProjectResource);

export const ProjectResourceRoutes = router;
