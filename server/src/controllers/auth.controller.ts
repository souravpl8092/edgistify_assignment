import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Joi from "joi";
import dotenv from "dotenv";
import User from "../models/user.model";

dotenv.config();

// POST REQUEST --> To create new user account
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // ✅ Joi validation schema
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    // ✅ Validate request body
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const { name, email, password } = req.body;

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    // ✅ Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Create new user with hashed password
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error",
      details: (err as Error).message,
    });
  }
};

// POST REQUEST --> To login user account
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json({ error: "Email not found" });
      return;
    }

    // Validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(400).json({ error: "Invalid password" });
      return;
    }

    // Ensure JWT_SECRET is defined
    const secret = process.env.TOKEN as string;
    if (!secret) {
      throw new Error("JWT secret is not defined in environment variables");
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, secret, { expiresIn: "1h" });

    // Send response with token
    res.header("Authorization", token).json({ token });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res
      .status(500)
      .json({ error: "Internal Server Error", details: errorMessage });
  }
};
