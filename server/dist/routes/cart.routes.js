"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("../controllers/cart.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const cartRouter = express_1.default.Router();
// Only logged-in users can access cart routes
cartRouter.use(auth_middleware_1.default);
cartRouter
    .route("/")
    .get(cart_controller_1.getCartByUser)
    .post(cart_controller_1.addToCart)
    .patch(cart_controller_1.updateCartItem)
    .delete(cart_controller_1.clearCart);
cartRouter.route("/:productId").delete(cart_controller_1.removeCartItem);
exports.default = cartRouter;
