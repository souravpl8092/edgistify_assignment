"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controllers/order.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const orderRouter = express_1.default.Router();
orderRouter.use(auth_middleware_1.default);
orderRouter
    .route("/")
    .get(order_controller_1.getAllOrders) // ✅ Public: Get all orders (Admin only)
    .post(order_controller_1.createOrder); // ✅ User: Place a new order
orderRouter.route("/user").get(order_controller_1.getOrdersByUserId); // ✅ User: Get orders by logged-in user
orderRouter
    .route("/:orderId")
    .patch(order_controller_1.updateOrderStatus) // ✅ Admin: Update order status
    .delete(order_controller_1.cancelOrder); // ✅ User: Cancel order
exports.default = orderRouter;
