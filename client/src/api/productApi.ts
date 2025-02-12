import axios from "axios";
import { Product } from "../types/Product";

// const apiUrl = process.env.REACT_APP_API_URL;

const apiUrl = "http://localhost:8080";

export const fetchProducts = async (
  searchQuery: string,
  page: number,
  limit: number
): Promise<Product[]> => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/product?search=${searchQuery}`
    );
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products.");
  }
};
