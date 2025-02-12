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
exports.createOrder = exports.getOrdersByUserId = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
const paymentStatuses = ["Pending", "Paid", "Failed"];
const orderStatuses = ["Pending", "Processing", "Shipped", "Delivered"];
const getRandomStatus = (statuses) => {
    return statuses[Math.floor(Math.random() * statuses.length)];
};
// ✅ GET orders by user ID
const getOrdersByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const orders = yield order_model_1.default.find({ userId });
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
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const { products, shippingAddress } = req.body;
        if (!products || products.length === 0) {
            res.status(400).json({ message: "No products in the order" });
            return;
        }
        const createdOrders = [];
        for (const product of products) {
            const newOrder = new order_model_1.default({
                userId,
                products: [
                    {
                        productId: product.productId,
                        quantity: product.quantity,
                        price: product.price,
                        title: product.title,
                        image: product.image,
                    },
                ],
                totalPrice: product.price * product.quantity,
                shippingAddress,
                paymentStatus: getRandomStatus(paymentStatuses),
                orderStatus: getRandomStatus(orderStatuses),
            });
            const savedOrder = yield newOrder.save();
            createdOrders.push(savedOrder);
        }
        res.status(201).json({
            message: "Orders created successfully",
            orders: createdOrders,
        });
    }
    catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createOrder = createOrder;
