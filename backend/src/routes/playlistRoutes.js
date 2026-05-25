import express from "express";
import {
  savePlaylist,
  unsavePlaylist,
  getSavedPlaylists,
  createPlaylist,
  getUserPlaylists
} from "../controllers/playlistController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(requireAuth);

router.post("/save", savePlaylist);
router.delete("/save/:playlistId", unsavePlaylist);
router.get("/saved", getSavedPlaylists);

router.post("/", createPlaylist);
router.get("/user", getUserPlaylists);

export default router;
