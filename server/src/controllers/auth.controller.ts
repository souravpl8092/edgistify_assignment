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
    const { email, password } = req.body;

    // ✅ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ error: "Invalid email or password" });
      return;
    }

    // ✅ Validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(400).json({ error: "Invalid email or password" });
      return;
    }

    // ✅ Ensure JWT_SECRET is defined
    const secret = process.env.TOKEN as string;
    if (!secret) {
      throw new Error("JWT secret is not defined in environment variables");
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { _id: user._id, name: user.name, email: user.email },
      secret
    );

    // ✅ Send response with token & username
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error",
      details: (err as Error).message,
    });
  }
};
