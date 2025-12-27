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

// ✅ Add this line to mount the routes
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/meal-plans", mealPlanRoutes);
app.use("/api/shopping-list", shoppingListRoutes);
app.use("/api/users", userRoutes);

app.use(errorMiddleware);

const mongoUri = process.env.MONGO_URI;
if (mongoUri) {
  mongoose.connect(mongoUri)
    .then(() => console.log("🟢 MongoDB connected"))
    .catch((err) => console.error("🔴 MongoDB connection error:", err));
} else {
  console.warn("⚠️ MONGO_URI is missing. Backend may not work correctly.");
}

export default app;
