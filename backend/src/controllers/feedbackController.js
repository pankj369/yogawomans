import asyncHandler from "express-async-handler";
import { db } from "../config/firebaseAdmin.js";
import { AppError } from "../middleware/errorMiddleware.js";
import fetch from "node-fetch";

/**
 * @desc    Submit user feedback
 * @route   POST /api/feedback
 * @access  Public (Optional Auth)
 */
export const submitFeedback = asyncHandler(async (req, res, next) => {
  const {
    category,
    section,
    message,
    priority,
    email,
    anonymous,
    screenshotUrl,
    userAgent,
    deviceType,
    browser,
    pageUrl,
  } = req.body;

  if (!category || !section || !message || !priority) {
    return next(new AppError("Please provide all required fields.", 400));
  }

  const isAnonymous = anonymous === true;
  
  const feedbackData = {
    timestamp: new Date().toISOString(),
    category,
    section,
    message,
    priority,
    email: email || null,
    anonymous: isAnonymous,
    screenshotUrl: screenshotUrl || null,
    userId: (!isAnonymous && req.user) ? req.user.uid : null,
    userName: (!isAnonymous && req.user) ? req.user.name : null,
    userAgent: userAgent || null,
    deviceType: deviceType || null,
    browser: browser || null,
    pageUrl: pageUrl || null,
    status: "open", // Initial status for admin dashboard
  };

  try {
    // 1. Save to Firebase Firestore
    const docRef = await db.collection("feedbacks").add(feedbackData);
    const feedbackId = docRef.id;
    
    // Add feedbackId back to the object for Google Sheets
    const fullData = { ...feedbackData, feedbackId };

    // 2. Push to Google Sheets via Apps Script (if configured)
    const googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    if (googleAppsScriptUrl) {
      try {
        await fetch(googleAppsScriptUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fullData),
        });
      } catch (sheetError) {
        console.error("Failed to push feedback to Google Sheets:", sheetError.message);
        // We do not fail the request if just the Sheets integration fails.
      }
    }

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully.",
      data: fullData,
    });
  } catch (error) {
    console.error("Feedback submission error:", error);
    return next(new AppError("Failed to submit feedback. Please try again.", 500));
  }
});
