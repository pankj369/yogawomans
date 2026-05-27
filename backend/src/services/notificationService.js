import { db } from "../config/firebaseAdmin.js";
import logger from "../utils/logger.js";

class NotificationService {
  /**
   * Creates an in-app notification in Firestore.
   */
  async createNotification(uid, title, message, type = "info") {
    const notificationId = Date.now().toString();
    const notification = {
      id: notificationId,
      title,
      message,
      type, // 'info', 'milestone', 'alert', 'upgrade'
      unread: true,
      createdAt: new Date().toISOString(),
    };

    const notifRef = db.collection("users").doc(uid).collection("notifications").doc(notificationId);
    await notifRef.set(notification);

    logger.info(`Notification created for user [${uid}]: "${title}"`);
    return notification;
  }

  /**
   * Retrieves all notifications for a user.
   */
  async getUserNotifications(uid) {
    const notifsRef = db.collection("users").doc(uid).collection("notifications");
    const snapshot = await notifsRef.orderBy("createdAt", "desc").limit(30).get();

    const notifications = [];
    snapshot.forEach((doc) => {
      notifications.push(doc.data());
    });

    return notifications;
  }

  /**
   * Marks a single notification as read.
   */
  async markAsRead(uid, notificationId) {
    const notifRef = db.collection("users").doc(uid).collection("notifications").doc(notificationId);
    await notifRef.update({ unread: false });
    return true;
  }

  /**
   * Marks all notifications as read.
   */
  async markAllAsRead(uid) {
    const notifsRef = db.collection("users").doc(uid).collection("notifications").where("unread", "==", true);
    const snapshot = await notifsRef.get();

    if (snapshot.empty) return true;

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.update(doc.ref, { unread: false });
    });

    await batch.commit();
    return true;
  }

  /**
   * Returns count of unread notifications.
   */
  async getUnreadCount(uid) {
    const notifsRef = db.collection("users").doc(uid).collection("notifications").where("unread", "==", true);
    const snapshot = await notifsRef.get();
    return snapshot.size;
  }
}

export const notificationService = new NotificationService();
export default notificationService;
