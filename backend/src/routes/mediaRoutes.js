import express from "express";
import {
  getMedia,
  getMediaById,
  createMedia,
  saveMediaItem,
  unsaveMediaItem,
  getSavedMediaItems
} from "../controllers/mediaController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Specific routes first to avoid matching /:id
router.get("/saved", requireAuth, getSavedMediaItems);
router.post("/save", requireAuth, saveMediaItem);
router.delete("/save/:mediaId", requireAuth, unsaveMediaItem);

router.get("/", getMedia);
router.get("/:id", getMediaById);
router.post("/", requireAuth, createMedia);

export default router;
