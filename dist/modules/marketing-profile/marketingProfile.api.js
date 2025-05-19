"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketingProfileRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constants_1 = require("../user/auth/auth.constants");
const marketingProfile_controller_1 = require("./marketingProfile.controller");
const router = (0, express_1.Router)();
// auth(USER_ROLE.ADMIN, ),
// auth(USER_ROLE.ADMIN, ),
router.post('/', marketingProfile_controller_1.MarketingProfileController.createMarketingProfile);
router.get('/', marketingProfile_controller_1.MarketingProfileController.getAllMarketingProfiles);
router.get('/:id', marketingProfile_controller_1.MarketingProfileController.getMarketingProfileById);
router.put('/:id', marketingProfile_controller_1.MarketingProfileController.updateMarketingProfile);
router.delete('/:id', (0, auth_1.default)(auth_constants_1.USER_ROLE.ADMIN), marketingProfile_controller_1.MarketingProfileController.deleteMarketingProfile);
exports.MarketingProfileRoutes = router;
