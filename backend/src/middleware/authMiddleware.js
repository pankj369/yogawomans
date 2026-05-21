import jwt from "jsonwebtoken";
import env from "../config/env.js";

/**
 * Middleware to verify JWT token from Authorization header
 * Expected format: "Bearer <token>"
 */
export const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Missing or invalid Authorization header",
      });
    }

    const token = authHeader.slice(7);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Missing auth token",
      });
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

export default requireAuth;
