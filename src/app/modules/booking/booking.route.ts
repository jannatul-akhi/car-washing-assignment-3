import express from 'express';
import zodValidationMiddleware from '../../middleware/zodValidationMiddleware';
import { BookingValidations } from './booking.validation';
import { BookingControllers } from './booking.controller';
import authMiddleware from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/',
  authMiddleware(USER_ROLE.user),
  // zodValidationMiddleware(BookingValidations.createBookingValidationSchema),
  BookingControllers.createBooking,
);

export const BookingRoutes = router;
