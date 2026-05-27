import asyncHandler from "express-async-handler";
import { db } from "../config/firebaseAdmin.js";
import telemetry from "../utils/telemetry.js";
import { AppError } from "../middleware/errorMiddleware.js";

// GET /api/admin/metrics
export const getDashboardMetrics = asyncHandler(async (req, res) => {
  // 1. Fetch user counts & Premium conversion
  const usersSnapshot = await db.collection("users").get();
  const totalUsers = usersSnapshot.size;

  let premiumUsersCount = 0;
  usersSnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.premiumStatus === "Pro" || data.preferences?.activePlan === "Pro") {
      premiumUsersCount++;
    }
  });

  const conversionRate = totalUsers ? (premiumUsersCount / totalUsers) * 100 : 0;

  // 2. Fetch mock sales & cart stats from active Firestore collections
  const ordersSnapshot = await db.collection("orders").get();
  const totalOrders = ordersSnapshot.size;
  
  let totalSales = 0;
  ordersSnapshot.forEach((doc) => {
    const data = doc.data();
    totalSales += data.totalAmount || 0;
  });

  // 3. Compile telemetry observability reports
  const teleReport = telemetry.getReport();

  res.status(200).json({
    success: true,
    data: {
      users: {
        totalUsers,
        premiumCount: premiumUsersCount,
        conversionRatePercentage: Math.round(conversionRate * 100) / 100,
        dauEstimate: Math.max(Math.round(totalUsers * 0.45), 2), // active metrics simulation
        mauEstimate: Math.max(Math.round(totalUsers * 0.85), 5),
      },
      eCommerce: {
        totalOrders,
        totalRevenueAmountINR: totalSales,
        cartConversionPercentage: totalOrders ? 65.5 : 0,
      },
      system: teleReport,
    },
  });
});

// GET /api/admin/users
export const listUsers = asyncHandler(async (req, res) => {
  const usersSnapshot = await db.collection("users").limit(100).get();
  const users = [];

  usersSnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });

  res.status(200).json({
    success: true,
    data: users,
  });
});

// PUT /api/admin/users/:id/role
export const updateUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { premiumStatus, role } = req.body;

  const userRef = db.collection("users").doc(id);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    throw new AppError("User not found", 404);
  }

  const updates = {};
  if (premiumStatus !== undefined) updates.premiumStatus = premiumStatus;
  if (role !== undefined) updates.role = role;
  updates.updatedAt = new Date().toISOString();

  await userRef.update(updates);

  res.status(200).json({
    success: true,
    message: "User role / premium status updated successfully",
    data: { id, ...updates },
  });
});
