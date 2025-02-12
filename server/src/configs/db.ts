import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

export const connectToDatabase = async (): Promise<void> => {
  try {
    if (!MONGO_URI) {
      throw new Error("MongoDB URI is not defined in environment variables.");
    }

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);

    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", (error as Error).message);
    process.exit(1);
  }
};
