import express from "express";
import { body, validationResult } from "express-validator";
import { register, login, getCurrentUser, logout } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { AppError } from "../middleware/errorMiddleware.js";

const router = express.Router();

// Middleware to check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return first error message
    return next(new AppError(errors.array()[0].msg, 400));
  }
  next();
};

// POST /api/auth/register
// Requires a valid Firebase token in the Authorization header
router.post(
  "/register",
  requireAuth,
  [
    body("username").optional().isString().trim().escape(),
  ],
  validate,
  register
);

// POST /api/auth/login
// Requires a valid Firebase token
router.post("/login", requireAuth, login);

// GET /api/auth/me
// Returns current user profile
router.get("/me", requireAuth, getCurrentUser);

// POST /api/auth/logout
router.post("/logout", requireAuth, logout);

export default router;