import { Request, Response } from "express";
import dotenv from "dotenv";
import Product from "../models/product.model";

dotenv.config();

// GET REQUEST --> To get all product information
export const getAllProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
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
