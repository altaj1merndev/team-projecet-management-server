import { NextFunction, Request, Response, Router } from 'express';
import auth from '../../../middlewares/auth';

import { USER_ROLE } from '../auth/auth.constants';
import { UserControllers } from './user.controllers';
import { upload } from '../../../utils/lib/sendImageToCloudinary';

const router = Router();

router.post(
  '/register',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req?.body?.data);
    next();
  },

  UserControllers.registerUser,
);


router.get('/me', auth(USER_ROLE.ADMIN, USER_ROLE.EMPLOYEE, USER_ROLE.MANAGER, USER_ROLE.TEAM_LEADER, USER_ROLE.TEAM_MEMBER ), UserControllers.getMe);

router.get('/', UserControllers.getUsers);

router.get('/:id', UserControllers.getUserDetails);

router.put(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.EMPLOYEE, USER_ROLE.MANAGER, USER_ROLE.TEAM_LEADER, USER_ROLE.TEAM_MEMBER ),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  UserControllers.updateUser,
);

router.delete(
  '/:id',
  auth(USER_ROLE.ADMIN),
  UserControllers.deleteUser,
);

export const UserRoutes = router;
