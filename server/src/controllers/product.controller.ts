import { Request, Response } from "express";
import dotenv from "dotenv";
import Product from "../models/product.model";

dotenv.config();

// GET REQUEST --> To get all product information
export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const { search, page = "1", limit = "20" } = req.query;

    // Convert page & limit to numbers
    const pageNumber = parseInt(page as string, 10) || 1;
    const limitNumber = parseInt(limit as string, 20) || 20;
    const skip = (pageNumber - 1) * limitNumber;

    // Search filter (if search query exists)
    const searchQuery = search
      ? { title: { $regex: search as string, $options: "i" } } // Case-insensitive regex search
      : {};

    // Fetch products with search & pagination
    const products = await Product.find(searchQuery)
      .skip(skip)
      .limit(limitNumber);

    // Total count for pagination
    const totalCount = await Product.countDocuments(searchQuery);

    res.status(200).json({
      totalPages: Math.ceil(totalCount / limitNumber),
      currentPage: pageNumber,
      totalProducts: totalCount,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET REQUEST --> To get a product by ID
export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
