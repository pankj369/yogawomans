import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import wellnessRoutes from "./routes/wellnessRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import playlistRoutes from "./routes/playlistRoutes.js";

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "YogaWomans Backend Running",
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

// Legacy routes
app.use("/api", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);

// Undefined Route Handler
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

export default app;