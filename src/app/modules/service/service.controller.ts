import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ServiceServices } from './service.service';

const createService = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await ServiceServices.createServiceIntoDB(body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service created successfully',
    data: result,
  });
});

const getAllServices = catchAsync(async (req, res) => {
  const result = await ServiceServices.getAllServices();
  console.log('From controller', result);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Services retrieved successfully',
    data: result,
  });
});

const getSingleService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceServices.getSingleServiceFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service retrieved successfully',
    data: result,
  });
});



const updateService = catchAsync(async (req, res) => {
  // const id = req.params.id;   // another way to use id params
  const { id } = req.params;
  const body = req.body;
  const result = await ServiceServices.updateServiceInDB(id, body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service updated successfully',
    data: result,
  });
});

const deleteService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceServices.deleteServiceFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service deleted successfully',
    data: result,
  });
});

export const ServiceControllers = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};
