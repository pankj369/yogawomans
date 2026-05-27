import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import {
  getDashboardMetrics,
  listUsers,
  updateUserRole,
} from "../controllers/adminController.js";

const router = express.Router();

// Apply auth and admin checks on all admin paths
router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/metrics", getDashboardMetrics);
router.get("/users", listUsers);
router.put("/users/:id/role", updateUserRole);

export default router;
