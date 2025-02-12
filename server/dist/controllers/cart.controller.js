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
exports.clearCart = exports.removeCartItem = exports.updateCartItem = exports.addToCart = exports.getCartByUser = exports.getAllCarts = void 0;
const cart_model_1 = __importDefault(require("../models/cart.model"));
// ✅ GET all carts (Admin Only)
const getAllCarts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carts = yield cart_model_1.default.find().populate("products.productId");
        res.json(carts);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getAllCarts = getAllCarts;
// ✅ GET cart of logged-in user
const getCartByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const cart = yield cart_model_1.default.findOne({ userId });
        if (!cart) {
            res.status(404).json({ message: "Cart not found" });
            return;
        }
        res.json(cart);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getCartByUser = getCartByUser;
// ✅ POST - Add item to cart
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const { productId, title, price, image, quantity } = req.body;
    try {
        let cart = yield cart_model_1.default.findOne({ userId });
        if (!cart) {
            cart = new cart_model_1.default({
                userId,
                products: [{ productId, title, price, image, quantity }],
            });
        }
        else {
            const existingProduct = cart.products.find((p) => p.productId.toString() === productId);
            if (existingProduct) {
                existingProduct.quantity += quantity;
            }
            else {
                cart.products.push({ productId, title, price, image, quantity });
            }
        }
        yield cart.save();
        res.status(201).json(cart);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.addToCart = addToCart;
// ✅ PATCH - Update cart item quantity
const updateCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const { productId, quantity } = req.body;
        const cart = yield cart_model_1.default.findOne({ userId });
        if (!cart) {
            res.status(404).json({ message: "Cart not found" });
            return;
        }
        const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId);
        if (productIndex === -1) {
            res.status(404).json({ message: "Product not found in cart" });
            return;
        }
        if (quantity === 0) {
            cart.products.splice(productIndex, 1);
        }
        else {
            cart.products[productIndex].quantity = quantity;
        }
        yield cart.save();
        res.json(cart);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.updateCartItem = updateCartItem;
// ✅ DELETE - Remove product from cart
const removeCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const { productId } = req.params;
        const cart = yield cart_model_1.default.findOne({ userId });
        if (!cart) {
            res.status(404).json({ message: "Cart not found" });
            return;
        }
        cart.products = cart.products.filter((p) => p.productId.toString() !== productId);
        yield cart.save();
        res.json({ message: "Product removed from cart", cart });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.removeCartItem = removeCartItem;
// ✅ DELETE - Clear entire cart
const clearCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const cart = yield cart_model_1.default.findOne({ userId });
        if (!cart) {
            res.status(404).json({ message: "Cart not found" });
            return;
        }
        cart.products = [];
        yield cart.save();
        res.json({ message: "Cart cleared successfully", cart });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.clearCart = clearCart;
