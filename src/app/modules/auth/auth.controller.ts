import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import config from '../../config';

const createAuth = catchAsync(async (req, res) => {
  const body = req.body;
  console.log(body, 'From controllers');
  const result = await AuthServices.createAuthIntoDB(body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Registration is successful',
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const result = await AuthServices.loginFromDB(req.body);

  const { user, accessToken } = result;

  const isProduction = config.NODE_ENV === 'production';

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProduction,
    maxAge: 3600000,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: { user, token: accessToken },
  });
});

export const AuthControllers = {
  createAuth,
  login,
};
