

import express, { NextFunction, Request, Response, Router } from 'express';
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


router.get('/me', auth(USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT, USER_ROLE.OPERTION, USER_ROLE.SELLS ), UserControllers.getMe);

router.get('/',auth(USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT),  UserControllers.getUsers);

router.get('/:id',auth(USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT), UserControllers.getUserDetails);

router.put(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT, USER_ROLE.OPERTION, USER_ROLE.SELLS ),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  UserControllers.updateUser,
);

router.put(
  '/update-password/:id',
  // auth(USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT, USER_ROLE.OPERTION, USER_ROLE.SELLS ),
  UserControllers.updatePassword,
);



router.delete(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT,),
  UserControllers.deleteUser,
);

export const UserRoutes = router;
