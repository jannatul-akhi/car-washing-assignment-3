import express from 'express';
import zodValidationMiddleware from '../../middleware/zodValidationMiddleware';
import { UserValidations } from '../user/user.validation';
import { AuthControllers } from './auth.controller';
import { AuthValidations } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  zodValidationMiddleware(UserValidations.userValidationSchema),
  AuthControllers.createAuth,
);

router.post(
  '/login',
  zodValidationMiddleware(AuthValidations.loginValidationSchema),
  AuthControllers.login,
);

export const AuthRoutes = router;
