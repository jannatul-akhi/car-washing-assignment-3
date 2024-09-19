import { JwtPayload } from 'jsonwebtoken';
import { TBooking } from './booking.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Service } from '../service/service.model';
import { Slot } from '../slot/slot.model';
import { Booking } from './booking.model';

const createBookingIntoDB = async ({
  payLoad,
  userInfo,
}: {
  payLoad: TBooking;
  userInfo: JwtPayload;
}) => {
  const { user } = userInfo;
  console.log('From Booking service:', userInfo);
  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'You are not registered, first you make an account please.',
    );
  }

  console.log('PayLoad:', payLoad);

  const serviceId = payLoad.service ? payLoad.service.toString() : null;
  const slotId = payLoad.slot ? payLoad.slot.toString() : null;
  console.log('Service ID', serviceId);
  console.log('Slot ID', slotId);

  if (!serviceId || !slotId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Service ID and Slot ID are required.',
    );
  }

  const service = await Service.isServiceExistById(serviceId);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'This service is not in database');
  }

  const isDeleted = service?.isDeleted;
  if (isDeleted) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'This service request is not acceptable, because it is already deleted!!!',
    );
  }

  const slot = await Slot.isSlotExistById(slotId);
  if (!slot) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'This slot request is not in database!!!',
    );
  }

  const isBooked = slot?.isBooked === 'booked';
  if (isBooked) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'This slot request is already booked!!!',
    );
  }

  const result = await Booking.create({
    ...payLoad,
    customer: user,
    service: service,
    slot: slot,
  });

  return result;
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find();

  return result;
};

const getUserHisAllBookingsFromDB = async (userInfo: JwtPayload) => {
  console.log('userInfo', userInfo);
  const { user } = userInfo;
  if (!user || !user._id) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'User information is missing or invalid.',
    );
  }

  const result = await Booking.find({ user: user._id });
  // .populate('service')
  // .populate('slot');

  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getUserHisAllBookingsFromDB,
};
