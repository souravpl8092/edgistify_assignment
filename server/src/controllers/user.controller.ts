import { Request, Response } from "express";
import dotenv from "dotenv";
import User from "../models/user.model";

dotenv.config();

// GET REQUEST --> To get all users information
export const getAllUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch users.",
      details: (error as Error).message,
    });
  }
};

// DELETE REQUEST --> To delete user profile
export const removeUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete({ _id: id });
    res.json({ status: 200, message: "Deleted The user" });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch users.",
      details: (error as Error).message,
    });
  }
};
