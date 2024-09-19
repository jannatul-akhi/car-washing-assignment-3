import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import config from '../../config';
import sendResponse from '../../utils/sendResponse';
import { createToken } from './auth.utils';

const createAuthIntoDB = async (payLoad: TUser) => {
  const name = payLoad.name;
  const email = payLoad.email;

  const checkExistingUser = User.isUserExist(name, email);

  if (!checkExistingUser) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This name or email is already exist',
    );
  }

  payLoad.password = payLoad.password || (config.default_password as string);

  const result = await User.create(payLoad);

  return result;
};

const loginFromDB = async (payLoad: TUser) => {
  const user = await User.isUserExistByEmail(payLoad.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isDeleted = user.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is already deleted');
  }

  const isPasswordMatched = await User.isPasswordMatched(
    payLoad.password,
    user.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password did not match');
  }

  // create token

  const JwtPayload = {
    email: user.email,
    userRole: user.role,
  };

  const accessToken = createToken(
    JwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return { user, accessToken };
};

export const AuthServices = {
  createAuthIntoDB,
  loginFromDB,
};
