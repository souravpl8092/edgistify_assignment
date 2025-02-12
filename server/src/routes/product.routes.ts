import express from "express";
import {
  getAllProduct,
  getProductById,
} from "../controllers/product.controller";

const productRouter = express.Router();

productRouter.get("/", getAllProduct); // Handles GET request for fetching all products
productRouter.get("/:id", getProductById); // Route to get a single product by ID

export default productRouter;
