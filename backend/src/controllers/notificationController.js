import asyncHandler from "express-async-handler";
import notificationService from "../services/notificationService.js";

// GET /api/notifications
export const getNotifications = asyncHandler(async (req, res) => {
  const uid = req.user.uid;
  const notifications = await notificationService.getUserNotifications(uid);

  res.status(200).json({
    success: true,
    data: notifications,
  });
});

// GET /api/notifications/unread-count
export const getUnreadCount = asyncHandler(async (req, res) => {
  const uid = req.user.uid;
  const count = await notificationService.getUnreadCount(uid);

  res.status(200).json({
    success: true,
    data: { count },
  });
});

// PUT /api/notifications/:id/read
export const markNotificationRead = asyncHandler(async (req, res) => {
  const uid = req.user.uid;
  const notificationId = req.params.id;
  await notificationService.markAsRead(uid, notificationId);

  res.status(200).json({
    success: true,
    message: "Notification marked as read",
  });
});

// PUT /api/notifications/read-all
export const markAllNotificationsRead = asyncHandler(async (req, res) => {
  const uid = req.user.uid;
  await notificationService.markAllAsRead(uid);

  res.status(200).json({
    success: true,
    message: "All notifications marked as read",
  });
});
