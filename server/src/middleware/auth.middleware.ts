import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

declare module "express" {
  interface Request {
    user?: any;
  }
}

dotenv.config();

const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization");
  if (!token) {
    res.status(401).json({ message: "Access denied" });
    return; // Ensure function exits after sending a response
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN as string);
    req.user = decoded;
    next(); // Call `next()` only if verification succeeds
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

export default authenticate;
