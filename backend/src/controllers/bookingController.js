import { db } from "../config/firebaseAdmin.js";
import asyncHandler from "express-async-handler";
import { AppError } from "../middleware/errorMiddleware.js";

const DEFAULT_CLASSES = [
  {
    id: "live-1",
    title: "Gentle Flow for Energy",
    instructor: "Ananya Iyer",
    time: "07:00",
    category: "Morning Yoga",
    seatsLeft: 18,
    totalSeats: 20,
    meetingLink: "https://meet.google.com/placeholder-gentle-flow",
  },
  {
    id: "live-2",
    title: "Evening Reset Session",
    instructor: "Kavitha Rao",
    time: "18:30",
    category: "Stress Relief",
    seatsLeft: 9,
    totalSeats: 15,
    meetingLink: "https://meet.google.com/placeholder-evening-reset",
  },
  {
    id: "live-3",
    title: "Sleep Wind Down",
    instructor: "Meera Sharma",
    time: "21:00",
    category: "Night Relaxation",
    seatsLeft: 22,
    totalSeats: 25,
    meetingLink: "https://meet.google.com/placeholder-sleep-wind-down",
  },
];

/**
 * GET /api/bookings/classes
 * Fetch available live classes (auto-seed if empty)
 */
export const getLiveClasses = asyncHandler(async (req, res, next) => {
  const classesRef = db.collection("liveClasses");
  const snapshot = await classesRef.get();

  if (snapshot.empty) {
    // Auto-seed default classes
    console.log("Seeding default live classes in Firestore...");
    const batch = db.batch();
    DEFAULT_CLASSES.forEach((cls) => {
      const docRef = classesRef.doc(cls.id);
      batch.set(docRef, {
        ...cls,
        created_at: new Date().toISOString(),
      });
    });
    await batch.commit();

    return res.status(200).json({
      success: true,
      data: DEFAULT_CLASSES,
    });
  }

  const classes = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return res.status(200).json({
    success: true,
    data: classes,
  });
});

/**
 * GET /api/bookings
 * Fetch all bookings for the authenticated user
 */
export const getUserBookings = asyncHandler(async (req, res, next) => {
  const userId = req.user.uid;

  const bookingsSnapshot = await db
    .collection("liveBookings")
    .where("userId", "==", userId)
    .get();

  const bookings = bookingsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return res.status(200).json({
    success: true,
    data: bookings,
  });
});

/**
 * POST /api/bookings
 * Book a seat in a live class (using Firestore transaction for thread safety)
 */
export const bookClass = asyncHandler(async (req, res, next) => {
  const userId = req.user.uid;
  const { classId } = req.body;

  if (!classId) {
    return next(new AppError("Class ID is required to book a seat.", 400));
  }

  const classRef = db.collection("liveClasses").doc(classId);
  const bookingId = `${userId}_${classId}`;
  const bookingRef = db.collection("liveBookings").doc(bookingId);

  try {
    const result = await db.runTransaction(async (transaction) => {
      // 1. Read class document
      const classDoc = await transaction.get(classRef);
      if (!classDoc.exists) {
        throw new Error("Class not found");
      }

      const classData = classDoc.data();
      if (classData.seatsLeft <= 0) {
        throw new Error("No seats left in this class");
      }

      // 2. Read booking document to check if already booked
      const bookingDoc = await transaction.get(bookingRef);
      if (bookingDoc.exists) {
        throw new Error("You have already booked a seat in this class");
      }

      // 3. Decrement seat count
      const updatedSeats = classData.seatsLeft - 1;
      transaction.update(classRef, { seatsLeft: updatedSeats });

      // 4. Create booking document
      const newBooking = {
        userId,
        classId,
        title: classData.title,
        instructor: classData.instructor,
        time: classData.time,
        category: classData.category,
        meetingLink: classData.meetingLink,
        bookedAt: new Date().toISOString(),
      };
      transaction.set(bookingRef, newBooking);

      return { booking: { id: bookingId, ...newBooking }, updatedSeats };
    });

    return res.status(201).json({
      success: true,
      message: "Seat booked successfully",
      data: result.booking,
      seatsLeft: result.updatedSeats,
    });
  } catch (err) {
    return next(new AppError(err.message, 400));
  }
});

/**
 * DELETE /api/bookings/:classId
 * Cancel booking and release seat (using Firestore transaction)
 */
export const cancelBooking = asyncHandler(async (req, res, next) => {
  const userId = req.user.uid;
  const { classId } = req.params;

  if (!classId) {
    return next(new AppError("Class ID is required to cancel a booking.", 400));
  }

  const classRef = db.collection("liveClasses").doc(classId);
  const bookingId = `${userId}_${classId}`;
  const bookingRef = db.collection("liveBookings").doc(bookingId);

  try {
    const result = await db.runTransaction(async (transaction) => {
      // 1. Read booking document
      const bookingDoc = await transaction.get(bookingRef);
      if (!bookingDoc.exists) {
        throw new Error("No active booking found for this class");
      }

      // 2. Read class document
      const classDoc = await transaction.get(classRef);
      if (!classDoc.exists) {
        throw new Error("Class not found");
      }

      const classData = classDoc.data();
      const updatedSeats = Math.min(classData.seatsLeft + 1, classData.totalSeats);

      // 3. Increment seat count
      transaction.update(classRef, { seatsLeft: updatedSeats });

      // 4. Delete booking
      transaction.delete(bookingRef);

      return { updatedSeats };
    });

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      seatsLeft: result.updatedSeats,
    });
  } catch (err) {
    return next(new AppError(err.message, 400));
  }
});
