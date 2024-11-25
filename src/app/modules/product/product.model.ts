import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product Name is Required'],
    },

    brand: {
      type: String,
      required: [true, 'Brand Name is Required'],
    },

    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    category: {
      type: String,
      enum: {
        values: [
          'Writing',
          'Office Supplies',
          'Art Supplies',
          'Educational',
          'Technology',
        ],
        message: '{VALUE} is not a valid blood group',
      },
    },
    description: {
      type: String,
      required: [true, 'Description of product is Required'],
    },

    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
    },

    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false, // Disable the __v field
  },
);

export const Product = model<TProduct>('Product', productSchema);
