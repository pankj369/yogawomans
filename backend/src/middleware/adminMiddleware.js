import { db } from "../config/firebaseAdmin.js";
import { AppError } from "./errorMiddleware.js";
import asyncHandler from "express-async-handler";

export const requireAdmin = asyncHandler(async (req, res, next) => {
  if (!req.user || !req.user.uid) {
    return next(new AppError("You must be authenticated to access this resource.", 401));
  }

  const userDoc = await db.collection("users").doc(req.user.uid).get();

  // Fallback domain checks for startup seeding/testing
  const isCorporateAdmin = req.user.email && req.user.email.endsWith("@yogawomans.com");

  if (userDoc.exists) {
    const userData = userDoc.data();
    if (userData.role === "admin" || isCorporateAdmin) {
      return next();
    }
  } else if (isCorporateAdmin) {
    return next();
  }

  return next(new AppError("Forbidden: Administrative privileges required.", 403));
});

export default requireAdmin;
