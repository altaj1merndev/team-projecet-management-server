import { Router } from 'express';
import { UserRoutes } from '../modules/user/user/user.api';
import { AuthRoutes } from '../modules/user/auth/auth.api';
import { UploadRoutes } from '../modules/uploadImage/upload.images.api';
import { TeamRoutes } from '../modules/team/team.api';
import { MemberRoutes } from '../modules/member/member.api';
import { ProjectRoutes } from '../modules/project/project.api';
import { ProjectResourceRoutes } from '../modules/projectResource/projectResource.api';
import { ProjectAssignedPersonRoutes } from '../modules/project-assigned-person/projectAssignedPerson.api';


const router = Router();

const moduleRoutes = [
    {
      path: '/users',
      route: UserRoutes,
    },
    {
      path: '/auth',
      route: AuthRoutes,
    },
    {
      path: '/teams',
      route: TeamRoutes,
    },
    {
      path: '/teams-members',
      route: MemberRoutes,
    },
    {
      path: '/projects',
      route: ProjectRoutes,
    },
    {
      path: '/projects-resources',
      route: ProjectResourceRoutes,
    },
    {
      path: '/projects-assigned',
      route: ProjectAssignedPersonRoutes,
    },
    {
      path: '/upload-images',
      route: UploadRoutes,
    },
]

moduleRoutes.forEach((routeObj) => router.use(routeObj.path, routeObj.route));

export default router;
