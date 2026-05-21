import { auth } from "../config/firebaseAdmin.js";
import { AppError } from "./errorMiddleware.js";
import asyncHandler from "express-async-handler";

/**
 * Middleware to verify Firebase ID token from Authorization header
 * Expected format: "Bearer <token>"
 */
export const requireAuth = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("You are not logged in! Please log in to get access.", 401));
  }

  const idToken = authHeader.split(" ")[1];

  if (!idToken) {
    return next(new AppError("Authentication token is missing.", 401));
  }

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    
    // Attach the authenticated user's details to the request object
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name,
      picture: decodedToken.picture,
    };

    next();
  } catch (error) {
    if (error.code === "auth/id-token-expired") {
      return next(new AppError("Your token has expired. Please log in again.", 401));
    }
    return next(new AppError("Invalid authentication token.", 401));
  }
});

export default requireAuth;
