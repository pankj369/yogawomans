import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import { ENABLE_PALMISTRY } from "./config/features.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import wellnessRoutes from "./routes/wellnessRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import playlistRoutes from "./routes/playlistRoutes.js";
import generatedPlanRoutes from "./routes/generatedPlanRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import coachRoutes from "./routes/coachRoutes.js";
import palmistryRoutes from "./routes/palmistryRoutes.js";
import suryaRoutes from "./routes/suryaRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import supportRoutes from "./routes/supportRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import rateLimiter from "./middleware/rateLimiter.js";

import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";

const app = express();

// CORS dynamic check configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : [];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or postman)
    if (!origin) return callback(null, true);

    // Always allow localhost in non-production environments
    const isLocal =
      origin.startsWith("http://localhost:") ||
      origin.startsWith("http://127.0.0.1:") ||
      origin.startsWith("http://[::1]:");

    if (isLocal) {
      return callback(null, true);
    }

    // Check allowed origins list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Default: allow all in development if not listed, but block in production
    if (process.env.NODE_ENV !== "production") {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

// Security Middlewares
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
import telemetry from "./utils/telemetry.js";

app.use(morgan("dev"));

// Telemetry monitoring middleware to trace request latency
app.use((req, res, next) => {
  const startTime = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - startTime;
    if (!req.originalUrl.includes("/api/telemetry")) {
      telemetry.trackApiMetric(req.method, req.originalUrl, res.statusCode, duration);
    }
  });
  next();
});

// Rate limiting on all API endpoints
app.use("/api", rateLimiter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "YogaWoman Backend Running",
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/wellness", wellnessRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/plans", generatedPlanRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/coach", coachRoutes);
if (ENABLE_PALMISTRY) {
  app.use("/api/palmistry", palmistryRoutes);
}
app.use("/api/surya", suryaRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/feedback", feedbackRoutes);

// Telemetry dashboard reporting endpoint
app.get("/api/telemetry/report", (req, res) => {
  res.json({
    success: true,
    data: telemetry.getReport(),
  });
});

// Legacy routes
app.use("/api", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);

// Undefined Route Handler
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

export default app;