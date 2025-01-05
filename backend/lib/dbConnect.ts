import  EnvConfig  from '@/config/EnvConfig';
import mongoose from "mongoose";
import { logger } from "../logger";

// Environment variable for MongoDB URI
const MONGO_URI = EnvConfig.DATABASE_URL || "";

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

// A variable to store the mongoose connection globally in development mode
let isConnected = false;

const dbConnect = async () => {
  try {
    // If already connected, return the connection
    if (isConnected) {
      logger.info("MongoDB is already connected");
      return;
    }

    // If not connected, make a connection
    await mongoose.connect(MONGO_URI);

    isConnected = true;
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error("MongoDB connection failed", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default dbConnect;
