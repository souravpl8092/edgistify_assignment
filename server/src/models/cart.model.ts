import mongoose, { Document, Schema, Model } from "mongoose";

interface IProduct {
  productId: mongoose.Types.ObjectId;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  products: IProduct[];
}

const CartSchema: Schema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
});

const Cart: Model<ICart> = mongoose.model<ICart>("Cart", CartSchema);
export default Cart;
