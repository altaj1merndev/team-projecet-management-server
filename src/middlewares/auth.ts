import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { User } from '../modules/user/user/user.model';

import { JwtHelpers } from '../utils/jwt';
import handleAsyncRequest from '../utils/share/handleAsyncRequest';

type TUserRole = {};

const auth = (...requiredRoles: TUserRole[]) => {
  return handleAsyncRequest(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;

      // check if client has token
      if (!token) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized. please login.',
        );
      }

      // check if the token is valid
      const decodedUser = JwtHelpers.verifyToken(
        token,
        config.jwt.accessSecret as string,
      );

      // console.log(decodedUser);
      const { id, role, iat } = decodedUser;

      const user = await User.isUserExists(id);

      // check if user exists
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
      }

      //   // check if user is deleted
      if (user?.isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
      }

      //   // check if user is blocked
      if (user?.userStatus === 'suspicious') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
      }

      //   // check if the user is authorized for this task/operation
      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Authorization error.');
      }

      // add decoded data to global req.user
      req.user = decodedUser as JwtPayload;

      next();
    },
  );
};

export default auth;
