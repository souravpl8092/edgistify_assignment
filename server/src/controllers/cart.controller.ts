import { Request, Response } from "express";
import Cart from "../models/cart.model";

// ✅ GET all carts (Admin Only)
export const getAllCarts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const carts = await Cart.find().populate("products.productId");
    res.json(carts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET cart of logged-in user
export const getCartByUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id; // Extract userId from token
    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ POST - Add item to cart
export const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [{ productId, quantity }] });
    } else {
      const existingProduct = cart.products.find(
        (p) => p.productId.toString() === productId
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ PATCH - Update cart item quantity
export const updateCartItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    // Find the product in the cart
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex === -1) {
      res.status(404).json({ message: "Product not found in cart" });
      return;
    }

    if (quantity === 0) {
      // Remove the product from the cart if quantity is 0
      cart.products.splice(productIndex, 1);
    } else {
      // Update quantity if it's greater than 0
      cart.products[productIndex].quantity = quantity;
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ DELETE - Remove product from cart
export const removeCartItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    cart.products = cart.products.filter(
      (p) => p.productId.toString() !== productId
    );
    await cart.save();

    res.json({ message: "Product removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ DELETE - Clear entire cart
export const clearCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    cart.products = [];
    await cart.save();

    res.json({ message: "Cart cleared successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
