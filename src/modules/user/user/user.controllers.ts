import { Request, Response } from 'express';

import { UserServices } from './user.services';
import handleAsyncRequest from '../../../utils/share/handleAsyncRequest';
import { setCookie } from '../../../utils/share/setCookie';
import sendResponse from '../../../utils/share/sendResponse';
import AppError from '../../../errors/AppError';

// Register a User
const registerUser = handleAsyncRequest(async (req: Request, res: Response) => {
  console.log(req.body);

  const result = await UserServices.registerUser(req.body, req.file);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User is registered successfully!',
    data: result,
  });
});

// Get User Detail
const getUserDetails = handleAsyncRequest(
  async (req: Request, res: Response) => {
    const result = await UserServices.getUserDetails(req.params?.id);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'User details is retrieved successfully!',
      data: result,
    });
  },
);

const getMe = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await UserServices.getUserDetails(req.user?.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User details is retrieved successfully!',
    data: result,
  });
});

// Update User
const updateUser = handleAsyncRequest(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const payload = req.body;
  const file = req.file;

  // Update the user
  const result = await UserServices.updateUser(userId, payload, file);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User data is updated successfully!',
    data: result,
  });
});

// Update User  Password
const updatePassword = handleAsyncRequest(
  async (req: Request, res: Response) => {
    const result = await UserServices.updatePassword(req.user.id, req.body);
    setCookie(result.accessToken, res);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Password is changed successfully!',
      data: result,
    });
  },
);




// Delete User
const deleteUser = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await UserServices.deleteUser(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User is deleted successfully!',
    data: result,
  });
});

// Get Users
const getUsers = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await UserServices.getUsers(req.query);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Users are retrieved successfully!',
    meta: result.meta,
    data: result.result,
  });
});

export const UserControllers = {
  registerUser,
  getUserDetails,
  updateUser,
  updatePassword,
  deleteUser,
  getUsers,
  getMe,
};
