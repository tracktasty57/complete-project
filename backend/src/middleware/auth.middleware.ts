import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload as DefaultJwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

interface JwtPayload extends DefaultJwtPayload {
  id: string;
}

// Extend Express Request to include userId
declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

/**
 * Middleware to verify JWT token from Authorization header
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.userId = decoded.id; // ✅ strongly typed now
    (req as any).user = { userId: decoded.id }; // For compatibility with controllers
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

export const authenticate = verifyToken;
