import express from "express";
import {
  getMedia,
  getMediaById,
  createMedia,
} from "../controllers/mediaController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getMedia);
router.get("/:id", getMediaById);
router.post("/", requireAuth, createMedia);

export default router;
