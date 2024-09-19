import express from 'express';
import zodValidationMiddleware from '../../middleware/zodValidationMiddleware';
import { SlotValidations } from './slot.validation';
import { SlotControllers } from './slot.controller';

const router = express.Router();

router.post(
  '/',
  zodValidationMiddleware(SlotValidations.createSlotValidationSchema),
  SlotControllers.createSlot,
);

router.get('/availability', SlotControllers.getAllAvailableSlot);

export const SlotRoutes = router;
