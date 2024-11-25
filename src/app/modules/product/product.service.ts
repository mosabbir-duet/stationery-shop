import { TProduct } from './product.interface';
import { Product } from './product.model';

// store product
const storeProductIntoDB = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};

// get all products
const getAllProductsFromDB = async (searchTerm?: string) => {
  const query = searchTerm
    ? {
        $or: [
          { category: { $regex: `^${searchTerm}$`, $options: 'i' } },
          { name: { $regex: `^${searchTerm}$`, $options: 'i' } },
          { brand: { $regex: `^${searchTerm}$`, $options: 'i' } },
        ],
      }
    : {}; // If no searchTerm, return all products

  // Fetch and return matching products
  const products = await Product.find(query);

  // Check if products are found
  if (products.length === 0) {
    return { message: 'No data found' }; // Return a message if no data is found
  }

  // Return the matching products
  return products;
};

// get all products

const geSpecificProductsFromDB = async (productId: string) => {
  // Fetch and return matching products
  const product = await Product.findOne({ _id: productId });

  // Check if product are found
  if (!product) {
    return { message: 'Product not found' };
  }
  // Return the product
  return product;
};

const updateProductFromDB = async (productId: string, updateData: object) => {
  // Update the product using updateOne
  const result = await Product.updateOne(
    { _id: productId },
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    },
  );

  return result;
};

export const ProductServices = {
  storeProductIntoDB,
  getAllProductsFromDB,
  geSpecificProductsFromDB,
  updateProductFromDB,
};
