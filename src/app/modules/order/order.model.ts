import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

const OrderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product', // Reference to the Product model
      required: [true, 'Product ID is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
    },
  },
  {
    timestamps: true,
    versionKey: false, // Disable the __v field
  },
);

export const Order = model<TOrder>('Order', OrderSchema);
