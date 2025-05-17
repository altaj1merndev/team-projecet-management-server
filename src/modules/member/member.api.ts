import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/auth/auth.constants';
import { MemberController } from './member.controller';

const router = Router();
// auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),
router.post('/',  MemberController.createMember);
router.get('/', MemberController.getAllMembers);
router.get('/team/:teamId', MemberController.getMembersByTeam);
router.get('/:id', MemberController.getMemberById);
router.put('/:id',  MemberController.updateMember);
router.delete('/:id', auth(USER_ROLE.ADMIN), MemberController.deleteMember);

export const MemberRoutes = router;
