import { isValidObjectId } from 'mongoose';
import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address' })
    .trim(),

  product: z
    .string({ required_error: 'Product ID is required' })
    .refine((id) => isValidObjectId(id), {
      message: 'Invalid Product ID',
    }),
  quantity: z
    .number({ required_error: 'Quantity is required' })
    .positive({ message: 'Quantity must be greater than 0' }),
  totalPrice: z
    .number({ required_error: 'Total price is required' })
    .positive({ message: 'Total price must be greater than 0' }),
});

export default orderValidationSchema;
