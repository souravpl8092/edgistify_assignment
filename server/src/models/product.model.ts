import mongoose, { Document, Schema, Model } from "mongoose";

// ✅ Define TypeScript Interface for Product
interface IProduct extends Document {
  id: number;
  brand: string;
  deviceModel: string;
  os: string;
  release: number;
  ip_address: string;
  price: number;
  quantity: number;
  image: string;
  brand_name: string;
  company_name: string;
  ram: string;
  internal_storage: string;
  processor: string;
  date_added: string;
}

// ✅ Define Mongoose Schema
const ProductSchema = new Schema<IProduct>(
  {
    id: { type: Number, required: true },
    brand: { type: String, required: true },
    deviceModel: { type: String, required: true },
    os: { type: String, required: true },
    release: { type: Number, required: true },
    ip_address: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    brand_name: { type: String, required: true },
    company_name: { type: String, required: true },
    ram: { type: String, required: true },
    internal_storage: { type: String, required: true },
    processor: { type: String, required: true },
    date_added: { type: String, required: true },
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
