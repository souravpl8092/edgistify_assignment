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
exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const joi_1 = __importDefault(require("joi"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = __importDefault(require("../models/user.model"));
dotenv_1.default.config();
// POST REQUEST --> To create new user account
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // ✅ Joi validation schema
        const schema = joi_1.default.object({
            name: joi_1.default.string().min(3).max(30).required(),
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().min(8).required(),
        });
        // ✅ Validate request body
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }
        const { name, email, password } = req.body;
        // ✅ Check if user already exists
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: "User already exists" });
            return;
        }
        // ✅ Hash the password using bcrypt
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        // ✅ Create new user with hashed password
        const newUser = new user_model_1.default({ name, email, password: hashedPassword });
        yield newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (err) {
        res.status(500).json({
            error: "Internal Server Error",
            details: err.message,
        });
    }
});
exports.registerUser = registerUser;
// POST REQUEST --> To login user account
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if email exists
        const user = yield user_model_1.default.findOne({ email: req.body.email });
        if (!user) {
            res.status(400).json({ error: "Email not found" });
            return;
        }
        // Validate password
        const validPassword = yield bcrypt_1.default.compare(req.body.password, user.password);
        if (!validPassword) {
            res.status(400).json({ error: "Invalid password" });
            return;
        }
        // Ensure JWT_SECRET is defined
        const secret = process.env.TOKEN;
        if (!secret) {
            throw new Error("JWT secret is not defined in environment variables");
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, secret, { expiresIn: "1h" });
        // Send response with token
        res.header("Authorization", token).json({ token });
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        res
            .status(500)
            .json({ error: "Internal Server Error", details: errorMessage });
    }
});
exports.loginUser = loginUser;
