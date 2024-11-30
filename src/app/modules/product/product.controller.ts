/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import { ProductValidationSchema } from './product.validation';

// create product controller
const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body.product;

    // zod validation

    const validatedProduct = ProductValidationSchema.parse(product);

    // call service function to send this data
    const result = await ProductServices.storeProductIntoDB(validatedProduct);

    // response
    res.status(200).json({
      message: 'Product created successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.issues[0].message || 'something went wrong',
      success: false,
      error: error,
      stack: error.stack,
    });
  }
};

// get all product controller
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm }: { searchTerm?: string } = req.query;
    // console.log(searchTerm);
    // call service function to send this data
    const result = await ProductServices.getAllProductsFromDB(searchTerm);

    // response
    res.status(200).json({
      message: 'Products retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    //
    console.log(error);
  }
};

// get specific product controller
const getSpecificProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { productId } = req.params;
    // call service function to send this data
    const result = await ProductServices.getSpecificProductsFromDB(productId);

    // response
    res.status(200).json({
      message: 'Products retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    //
    res.status(500).json({
      message: error.message,
      success: false,
      error: error.name,
      stack: error.stack,
    });
  }
};

// get specific product controller
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params; // Getting productId from the request parameters
    const updateData = req.body;
    // console.log(updateData);
    const result = await ProductServices.updateProductFromDB(
      productId,
      updateData,
    );

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    // response
    res.status(200).json({
      message: 'Products Updated successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      success: false,
      error: error.name,
      stack: error.stack,
    });
  }
};

// delete product

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    ProductServices.deleteProductFromDB(productId);

    return res.status(200).json({
      message: 'Product deleted successfully',
      status: true,
      data: {},
    });
  } catch (error: any) {
    if (error.message == 'Product not found') {
      return res.status(404).json({
        message: 'Product not found',
        status: false,
      });
    }

    res.status(500).json({
      message: 'An error occurred while deleting the product',
      status: false,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getSpecificProduct,
  updateProduct,
  deleteProduct,
};
