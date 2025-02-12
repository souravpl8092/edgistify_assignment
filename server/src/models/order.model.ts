import mongoose, { Document, Schema, Model } from "mongoose";

interface IProduct {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
  title: string;
  image: string;
}

interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  products: IProduct[];
  totalPrice: number;
  shippingAddress: string;
  paymentStatus: "Pending" | "Paid" | "Failed";
  orderStatus: "Pending" | "Processing" | "Shipped" | "Delivered";
  orderId: string;
  date: Date;
}

const OrderSchema: Schema = new Schema<IOrder>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      title: { type: String, required: true },
      image: { type: String, required: true },
    },
  ],

  totalPrice: { type: Number, required: true },
  shippingAddress: { type: String, required: true },

  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending",
  },

  orderStatus: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered"],
    default: "Pending",
  },

  orderId: {
    type: String,
    required: true,
    default: () => new mongoose.Types.ObjectId().toString(),
  },

  date: { type: Date, default: Date.now },
});

const Order: Model<IOrder> = mongoose.model<IOrder>("Order", OrderSchema);
export default Order;
