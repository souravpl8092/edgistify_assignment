import express from "express";
import {
  getAllOrders,
  getOrdersByUserId,
  createOrder,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/order.controller";
import authenticate from "../middleware/auth.middleware";

const orderRouter = express.Router();
orderRouter.use(authenticate);

orderRouter
  .route("/")
  .get(getAllOrders) // ✅ Public: Get all orders (Admin only)
  .post(createOrder); // ✅ User: Place a new order

orderRouter.route("/user").get(getOrdersByUserId); // ✅ User: Get orders by logged-in user

orderRouter
  .route("/:orderId")
  .patch(updateOrderStatus) // ✅ Admin: Update order status
  .delete(cancelOrder); // ✅ User: Cancel order

export default orderRouter;
