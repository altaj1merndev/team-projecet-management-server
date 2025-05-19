
import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/auth/auth.constants';
import { MarketingProfileController } from './marketingProfile.controller';

const router = Router();

// auth(USER_ROLE.ADMIN, ),
// auth(USER_ROLE.ADMIN, ),
router.post('/',  MarketingProfileController.createMarketingProfile);
router.get('/', MarketingProfileController.getAllMarketingProfiles);
router.get('/:id', MarketingProfileController.getMarketingProfileById);
router.put('/:id',  MarketingProfileController.updateMarketingProfile);
router.delete('/:id', auth(USER_ROLE.ADMIN), MarketingProfileController.deleteMarketingProfile);

export const MarketingProfileRoutes = router;
