import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/auth/auth.constants';
import { ProjectAssignedPersonController } from './projectAssignedPerson.controller';

const router = Router();

router.post('/',auth(USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT),  ProjectAssignedPersonController.createAssignedPerson);
router.get('/', ProjectAssignedPersonController.getAllAssignedPersons);
router.get('/:id', ProjectAssignedPersonController.getAssignedPersonById);
router.get('/project/:projectId', ProjectAssignedPersonController.getAssignedPersonsByProjectId);
router.put('/:id', auth(USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT), ProjectAssignedPersonController.updateAssignedPerson);
router.delete('/:id', auth(USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT), ProjectAssignedPersonController.deleteAssignedPerson);

export const ProjectAssignedPersonRoutes = router;
