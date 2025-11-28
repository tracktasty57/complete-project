// src/routes/auth.ts
import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

// 🧩 Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ Protected test route (you can remove later)
router.get("/check", verifyToken, (req, res) => {
  res.json({ message: "Token is valid", userId: (req as any).userId });
});

export default router;
