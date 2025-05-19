"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_api_1 = require("../modules/user/user/user.api");
const auth_api_1 = require("../modules/user/auth/auth.api");
const upload_images_api_1 = require("../modules/uploadImage/upload.images.api");
const team_api_1 = require("../modules/team/team.api");
const member_api_1 = require("../modules/member/member.api");
const project_api_1 = require("../modules/project/project.api");
const projectResource_api_1 = require("../modules/projectResource/projectResource.api");
const projectAssignedPerson_api_1 = require("../modules/project-assigned-person/projectAssignedPerson.api");
const projectIssues_api_1 = require("../modules/project-issues/projectIssues.api");
const marketingProfile_api_1 = require("../modules/marketing-profile/marketingProfile.api");
const projectMessage_api_1 = require("../modules/project-message/projectMessage.api");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/users',
        route: user_api_1.UserRoutes,
    },
    {
        path: '/auth',
        route: auth_api_1.AuthRoutes,
    },
    {
        path: '/teams',
        route: team_api_1.TeamRoutes,
    },
    {
        path: '/teams-members',
        route: member_api_1.MemberRoutes,
    },
    {
        path: '/projects',
        route: project_api_1.ProjectRoutes,
    },
    {
        path: '/projects-resources',
        route: projectResource_api_1.ProjectResourceRoutes,
    },
    {
        path: '/projects-assigned',
        route: projectAssignedPerson_api_1.ProjectAssignedPersonRoutes,
    },
    {
        path: '/marketing-profile',
        route: marketingProfile_api_1.MarketingProfileRoutes,
    },
    {
        path: '/projects-issues',
        route: projectIssues_api_1.ProjectIssueRoutes,
    },
    {
        path: '/projects-messages',
        route: projectMessage_api_1.ProjectMessageRoutes,
    },
    {
        path: '/upload-images',
        route: upload_images_api_1.UploadRoutes,
    },
];
moduleRoutes.forEach((routeObj) => router.use(routeObj.path, routeObj.route));
exports.default = router;
