import mongoose, { Document, Schema, Model } from "mongoose";

// ✅ Define TypeScript Interface for Product
interface IProduct extends Document {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity: number;
}

// ✅ Define Mongoose Schema
const ProductSchema = new Schema<IProduct>(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    rating: {
      rate: { type: Number, required: true },
      count: { type: Number, required: true },
    },
    quantity: { type: Number, required: true, default: 1 },
  },
  {
    timestamps: true,
  }
);

// ✅ Create & Export Mongoose Model
const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  ProductSchema
);

export default Product;
