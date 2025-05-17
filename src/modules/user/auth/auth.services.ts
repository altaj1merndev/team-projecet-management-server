import fs from 'fs';
import { JwtPayload } from 'jsonwebtoken';
import path from 'path';
import config from '../../../config';

import { User } from '../user/user.model';
import { TLoginPayloadData } from './auth.interface';
import { JwtHelpers, TJwtPayload } from '../../../utils/jwt';
import sendEmail from '../../../utils/lib/sendEmail';
import AppError from '../../../errors/AppError';
console.log(config.jwt.accessExpiresIn)
// Login User
const loginUser = async (payload: TLoginPayloadData) => {
  const { email, password } = payload;
  // Check if user has given both password and either email or phone number
  if (!email) {
    throw new AppError(400, 'Email is required!');
  }

  if (!password) {
    throw new AppError(400, 'Password is required!');
  }

  // Determine if emailOrPhone is an email or a phone number

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new AppError(404, 'use is not found!');
  }

  const isPasswordMatched = await User.comparePassword(password, user.password);

  if (!isPasswordMatched) {
    throw new AppError(401, 'Incorrect Password!');
  }

  const jwtPayloadData: TJwtPayload = {
    id: user._id.toString(),
    role: user.role,
    email: user.email,
  };

  const accessToken = JwtHelpers.createToken(
    jwtPayloadData,
    config.jwt.accessSecret as string,
    config.jwt.accessExpiresIn,
  );

  return {
    accessToken,
  };
};


const forgotPassword = async ({ email }: { email: string }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(404, 'User not found');
  }
  // console.log({ user, email });
  // Get ResetPassword Token
  const jwtPayloadData: TJwtPayload = {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  const resetToken = JwtHelpers.createToken(
    jwtPayloadData,
    config.jwt.accessSecret as string,
    '10m',
  );

  await user.save({ validateBeforeSave: false });

  const emailTemplate = fs.readFileSync(
    path.join(process.cwd(), 'src/data/passwordResetTemplate.html'),
    'utf-8',
  );

  // Function to replace placeholders with actual values
  function replacePlaceholders(template: string, replacements: any) {
    let output = template;
    for (const key in replacements) {
      output = output.replace(new RegExp(`{{${key}}}`, 'g'), replacements[key]);
    }
    return output;
  }

  // Replacements for the placeholders
  const replacements = {
    reset_link: `${config.rootUiURL}/auth/reset-password/${resetToken}`,
  };
  const emailContent = replacePlaceholders(emailTemplate, replacements);

  // const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  await sendEmail({
    email: user.email,
    subject: `${config.companyName} Password Recovery`,
    message: emailContent,
  });

  return { reset_link: `${config.rootUiURL}/reset-password/${resetToken}` };
};

// Reset Password
const resetPassword = async (
  token: string,
  { newPassword }: { newPassword: string },
) => {
  token
  // creating token hash
  const decodedUser: JwtPayload = JwtHelpers.verifyToken(
    token,
    config.jwt.accessSecret as string,
  );
console.log({decodedUser})
  const user = await User.findById(decodedUser?.id);

  if (!user) {
    throw new AppError(
      400,
      'Reset Password Token is invalid or has been expired',
    );
  }

  user.password = newPassword;

  await user.save();

  const jwtPayloadData: TJwtPayload = {
    id: user._id.toString(),
    role: user.role,
    email: user.email,
  };

  const accessToken = JwtHelpers.createToken(
    jwtPayloadData,
    config.jwt.accessSecret as string,
    config.jwt.accessExpiresIn,
  );

  return {
    user,
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
  forgotPassword,
  resetPassword,
};
