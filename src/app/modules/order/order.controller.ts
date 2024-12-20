/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { z } from 'zod';

import { calculateTotalOrderdRevenue, orderService } from './order.service';
import orderValidationSchema from './order.validation';

const createOrder = async (req: Request, res: Response): Promise<any> => {
  try {
    const order = req.body.order;
    // Validate the incoming request data using the Zod schema
    const validatedData = orderValidationSchema.parse(order); // This will throw if validation fails

    // Call the service function to create the order
    const result = await orderService.storeOrderIntoDB(validatedData);

    // Return a success response if the order was created successfully
    return res.status(200).json({
      message: 'Order created successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    // Handle validation errors from Zod
    if (error instanceof z.ZodError) {
      return res.status(403).json({
        message: 'Validation failed',
        success: false,
        error: error, // Detailed validation error messages from Zod
        stack: error.stack,
      });
    }

    // Handle custom errors thrown in the service (e.g., product not found or insufficient stock)
    return res.status(500).json({
      message: error.message || 'Something went wrong',
      success: false,
      error: error,
      stack: error.stack, // Include stack trace in development
    });
  }
};

// getTotalRevenue functionality

const getTotalRevenue = async (req: Request, res: Response): Promise<any> => {
  try {
    const revenue = await calculateTotalOrderdRevenue();

    return res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: revenue,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || 'Something went wrong',
      success: false,
      error: error,
      stack: error.stack,
    });
  }
};

export const orderController = {
  createOrder,
  getTotalRevenue,
};
