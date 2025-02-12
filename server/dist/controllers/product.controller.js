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
exports.getProductById = exports.getAllProduct = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const product_model_1 = __importDefault(require("../models/product.model"));
dotenv_1.default.config();
// GET REQUEST --> To get all product information
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, page = "1", limit = "20" } = req.query;
        // Convert page & limit to numbers
        const pageNumber = parseInt(page, 10) || 1;
        const limitNumber = parseInt(limit, 20) || 20;
        const skip = (pageNumber - 1) * limitNumber;
        // Search filter (if search query exists)
        const searchQuery = search
            ? { title: { $regex: search, $options: "i" } } // Case-insensitive regex search
            : {};
        // Fetch products with search & pagination
        const products = yield product_model_1.default.find(searchQuery)
            .skip(skip)
            .limit(limitNumber);
        // Total count for pagination
        const totalCount = yield product_model_1.default.countDocuments(searchQuery);
        res.status(200).json({
            totalPages: Math.ceil(totalCount / limitNumber),
            currentPage: pageNumber,
            totalProducts: totalCount,
            products,
        });
    }
    catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getAllProduct = getAllProduct;
// GET REQUEST --> To get a product by ID
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.default.findById(req.params.id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getProductById = getProductById;
