import z from 'zod';

export const ProductValidationSchema = z.object({
  name: z.string().nonempty('Name is required'),
  brand: z.string().nonempty('Brand is required'),
  price: z.number().positive('Price must be a positive number'),
  category: z.enum([
    'Writing',
    'Office Supplies',
    'Art Supplies',
    'Educational',
    'Technology',
  ]),
  description: z.string().nonempty('Description is required'),
  quantity: z
    .number()
    .int('Quantity must be an integer')
    .nonnegative('Quantity cannot be negative'),
  inStock: z.boolean(),
});
