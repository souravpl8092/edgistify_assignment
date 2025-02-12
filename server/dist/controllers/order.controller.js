"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelOrder = exports.updateOrderStatus = exports.createOrder = exports.getOrdersByUserId = exports.getAllOrders = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
// ✅ GET all orders (Admin only)
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_model_1.default.find().populate("products.productId");
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getAllOrders = getAllOrders;
// ✅ GET orders by user ID
const getOrdersByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const orders = yield order_model_1.default.find({ userId }).populate("products.productId");
        if (!orders.length) {
            res.status(404).json({ message: "No orders found" });
            return;
        }
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getOrdersByUserId = getOrdersByUserId;
// ✅ POST - Create a new order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { products, shippingAddress, totalPrice } = req.body;
        if (!products || products.length === 0) {
            res.status(400).json({ message: "No products in the order" });
            return;
        }
        const newOrder = new order_model_1.default({
            userId,
            products,
            totalPrice,
            shippingAddress,
            paymentStatus: "Pending",
            orderStatus: "Pending",
        });
        yield newOrder.save();
        res.status(201).json(newOrder);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.createOrder = createOrder;
// ✅ PUT - Update order status (Admin only)
const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const { orderStatus, paymentStatus } = req.body;
        const order = yield order_model_1.default.findById(orderId);
        if (!order) {
            res.status(404).json({ message: "Order not found" });
            return;
        }
        if (orderStatus)
            order.orderStatus = orderStatus;
        if (paymentStatus)
            order.paymentStatus = paymentStatus;
        yield order.save();
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.updateOrderStatus = updateOrderStatus;
// ✅ DELETE - Cancel order
const cancelOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const order = yield order_model_1.default.findById(orderId);
        if (!order) {
            res.status(404).json({ message: "Order not found" });
            return;
        }
        yield order_model_1.default.findByIdAndDelete(orderId);
        res.json({ message: "Order cancelled successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.cancelOrder = cancelOrder;
