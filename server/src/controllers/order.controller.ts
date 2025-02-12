import { Request, Response } from "express";
import Order from "../models/order.model";

// ✅ GET all orders (Admin only)
export const getAllOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orders = await Order.find().populate("products.productId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET orders by user ID
export const getOrdersByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const orders = await Order.find({ userId }).populate("products.productId");

    if (!orders.length) {
      res.status(404).json({ message: "No orders found" });
      return;
    }

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ POST - Create a new order
export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { products, shippingAddress, totalPrice } = req.body;

    if (!products || products.length === 0) {
      res.status(400).json({ message: "No products in the order" });
      return;
    }

    const newOrder = new Order({
      userId,
      products,
      totalPrice,
      shippingAddress,
      paymentStatus: "Pending",
      orderStatus: "Pending",
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ PUT - Update order status (Admin only)
export const updateOrderStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { orderId } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ DELETE - Cancel order
export const cancelOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    await Order.findByIdAndDelete(orderId);
    res.json({ message: "Order cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
