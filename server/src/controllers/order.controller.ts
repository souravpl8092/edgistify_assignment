import { Request, Response } from "express";
import Order from "../models/order.model";

const paymentStatuses = ["Pending", "Paid", "Failed"];
const orderStatuses = ["Pending", "Processing", "Shipped", "Delivered"];
const getRandomStatus = (statuses: string[]) => {
  return statuses[Math.floor(Math.random() * statuses.length)];
};

// ✅ GET orders by user ID
export const getOrdersByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?._id;
    const orders = await Order.find({ userId });

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
    const userId = req.user?._id;
    const { products, shippingAddress } = req.body;

    if (!products || products.length === 0) {
      res.status(400).json({ message: "No products in the order" });
      return;
    }

    const createdOrders = [];

    for (const product of products) {
      const newOrder = new Order({
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
      const savedOrder = await newOrder.save();
      createdOrders.push(savedOrder);
    }

    res.status(201).json({
      message: "Orders created successfully",
      orders: createdOrders,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
