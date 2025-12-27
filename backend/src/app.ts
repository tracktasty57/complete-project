import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import recipeRoutes from "./routes/recipe.routes";
import mealPlanRoutes from "./routes/mealPlan.routes";
import shoppingListRoutes from "./routes/shoppingList.routes";
import userRoutes from "./routes/user";
import errorMiddleware from "./middleware/error.middleware";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// 🚀 Database Connection Utility for Serverless
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI is missing from environment variables");
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Fail fast if can't connect
    });
    console.log("🟢 MongoDB connected");
  } catch (err: any) {
    console.error("🔴 MongoDB connection error:", err);
    throw err;
  }
};

// 🛰️ Middleware to ensure DB is connected before any request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err: any) {
    res.status(500).json({
      message: "Database Connection Error",
      details: err.message
    });
  }
});

// Add health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

// ✅ Routes
const mountRoutes = (base: string) => {
  app.use(`${base}/auth`, authRoutes);
  app.use(`${base}/recipes`, recipeRoutes);
  app.use(`${base}/meal-plans`, mealPlanRoutes);
  app.use(`${base}/shopping-list`, shoppingListRoutes);
  app.use(`${base}/users`, userRoutes);
};

mountRoutes("/api");
mountRoutes(""); // Fallback for when /api is stripped by a rewrite

// Diagnostic route
app.get("/api/diag", (req, res) => {
  res.json({
    status: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    readyState: mongoose.connection.readyState,
    uri: process.env.MONGO_URI ? "Set (Hidden)" : "Not Set"
  });
});

app.use(errorMiddleware);

export default app;
