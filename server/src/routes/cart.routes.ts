import express from "express";
import {
  getCartByUser,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controllers/cart.controller";
import authenticate from "../middleware/auth.middleware";

const cartRouter = express.Router();

// Only logged-in users can access cart routes
cartRouter.use(authenticate);
cartRouter
  .route("/")
  .get(getCartByUser)
  .post(addToCart)
  .patch(updateCartItem)
  .delete(clearCart);

cartRouter.route("/:productId").delete(removeCartItem);

export default cartRouter;
