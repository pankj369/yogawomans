import express from "express";
import {
  savePlaylist,
  unsavePlaylist,
  getSavedPlaylists,
} from "../controllers/playlistController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(requireAuth);

router.post("/save", savePlaylist);
router.delete("/save/:playlistId", unsavePlaylist);
router.get("/saved", getSavedPlaylists);

export default router;
