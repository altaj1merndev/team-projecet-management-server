import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/auth/auth.constants';
import { UploadImageControllers } from './upload.image.controller';
import { upload } from '../../utils/lib/sendImageToCloudinary';

const router = Router();

router.post(
  '/:folder',
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT, USER_ROLE.OPERTION , USER_ROLE.SELLS),
  upload.array('file'),
  UploadImageControllers.uploadMultipleImages,
);

export const UploadRoutes = router;
