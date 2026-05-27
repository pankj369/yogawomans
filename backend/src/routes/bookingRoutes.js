import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import {
  getLiveClasses,
  getUserBookings,
  bookClass,
  cancelBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

router.use(requireAuth); // Protect all booking/live class routes

router.get("/classes", getLiveClasses);
router.get("/", getUserBookings);
router.post("/", bookClass);
router.delete("/:classId", cancelBooking);

export default router;
