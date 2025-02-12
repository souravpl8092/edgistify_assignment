import express from "express";
import {
  getOrdersByUserId,
  createOrder,
} from "../controllers/order.controller";
import authenticate from "../middleware/auth.middleware";

const orderRouter = express.Router();
orderRouter.use(authenticate);

orderRouter
  .route("/")
  .get(getOrdersByUserId) // ✅ User: Get orders by logged-in user
  .post(createOrder); // ✅ User: Place a new order

export default orderRouter;
