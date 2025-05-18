"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constants_1 = require("../user/auth/auth.constants");
const member_controller_1 = require("./member.controller");
const router = (0, express_1.Router)();
// auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),
router.post('/', member_controller_1.MemberController.createMember);
router.get('/', member_controller_1.MemberController.getAllMembers);
router.get('/team/:teamId', member_controller_1.MemberController.getMembersByTeam);
router.get('/:id', member_controller_1.MemberController.getMemberById);
router.put('/:id', member_controller_1.MemberController.updateMember);
router.delete('/:id', (0, auth_1.default)(auth_constants_1.USER_ROLE.ADMIN), member_controller_1.MemberController.deleteMember);
exports.MemberRoutes = router;
