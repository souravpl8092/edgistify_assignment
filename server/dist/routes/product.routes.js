"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const productRouter = express_1.default.Router();
productRouter.get("/", product_controller_1.getAllProduct); // Handles GET request for fetching all products
productRouter.get("/:id", product_controller_1.getProductById); // Route to get a single product by ID
exports.default = productRouter;
