import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createTicket, getUserTickets } from "../controllers/supportController.js";

const router = express.Router();

// Apply auth protection to all support routes
router.use(authMiddleware);

router.post("/tickets", createTicket);
router.get("/tickets", getUserTickets);

export default router;
