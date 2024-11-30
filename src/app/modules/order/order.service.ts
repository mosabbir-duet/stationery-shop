/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from '../product/product.model';
import { Order } from './order.model';

// Create a new order and update the product stock
const storeOrderIntoDB = async (orderData: any) => {
  // Validate the incoming order data using Zod schema

  const { product: productId, quantity } = orderData;

  // Check if the product exists
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  // Check if there is enough stock
  if (product.quantity < quantity) {
    throw new Error(
      `Insufficient stock. Available quantity: ${product.quantity}`,
    );
  }

  // Create and save the new order

  const result = await Order.create(orderData);

  //if order create successfully then Deduct the quantity from the product and update inStock if necessary

  if (product.quantity - quantity === 0) {
    product.inStock = false;
  }
  product.quantity -= quantity;
  await product.save();

  return result;
};

// calculate orderd total revenue fancationality
export const calculateTotalOrderdRevenue = async () => {
  try {
    const totalRevenue = await Order.aggregate([
      // stege 1: Join the Order collection with Product collection
      {
        $lookup: {
          from: 'products',
          localField: 'product',
          foreignField: '_id',
          as: 'orderProductDetails',
        },
      },

      // stege 2: Unwind the product details to access the price field
      {
        $unwind: '$orderProductDetails',
      },

      // stege 3: Add revenue field to calculate the revenue for each order
      {
        $addFields: {
          revenue: { $multiply: ['$orderProductDetails.price', '$quantity'] }, // price * quantity
        },
      },
      // stege 4: Group the results to sum up the total revenue
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$revenue' }, // Sum the revenue field
        },
      },

      // stege 5: project to show only revenue
      {
        $project: {
          _id: 0, // Exclude _id field
          totalRevenue: 1, // Include totalRevenue field
        },
      },
    ]);

    // If no revenue is found, default to 0
    return totalRevenue.length > 0 ? totalRevenue[0] : { totalRevenue: 0 };
  } catch (error: any) {
    throw new Error('Error calculating total revenue: ' + error.message);
  }
};

export const orderService = {
  storeOrderIntoDB,
  calculateTotalOrderdRevenue,
};
