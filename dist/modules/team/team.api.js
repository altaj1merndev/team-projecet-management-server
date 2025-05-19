"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamRoutes = void 0;
const express_1 = require("express");
const team_controllers_1 = require("./team.controllers");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constants_1 = require("../user/auth/auth.constants");
const router = (0, express_1.Router)();
// ✅ Create a new team (admin, manager only)
router.post('/', (0, auth_1.default)(auth_constants_1.USER_ROLE.ADMIN, auth_constants_1.USER_ROLE.MANAGEMENT), team_controllers_1.TeamController.createTeam);
// ✅ Get all teams (public or role-protected as needed)
router.get('/', team_controllers_1.TeamController.getAllTeams);
// ✅ Get a single team by slug (public or role-protected as needed)
router.get('/:slug', team_controllers_1.TeamController.getTeamBySlug);
// ✅ Get all teams led by a specific team lead
router.get('/lead/:teamLeadId', (0, auth_1.default)(auth_constants_1.USER_ROLE.ADMIN, auth_constants_1.USER_ROLE.MANAGEMENT), team_controllers_1.TeamController.getTeamsByTeamLead);
// ✅ Update a team using slug
router.put('/:slug', (0, auth_1.default)(auth_constants_1.USER_ROLE.ADMIN, auth_constants_1.USER_ROLE.MANAGEMENT), team_controllers_1.TeamController.updateTeam);
// ✅ Delete a team using slug
router.delete('/:slug', (0, auth_1.default)(auth_constants_1.USER_ROLE.ADMIN), team_controllers_1.TeamController.deleteTeam);
exports.TeamRoutes = router;
