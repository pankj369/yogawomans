import asyncHandler from "express-async-handler";
import supportService from "../services/supportService.js";

// POST /api/support/tickets
export const createTicket = asyncHandler(async (req, res) => {
  const uid = req.user.uid;
  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    res.status(400);
    throw new Error("Please provide email, subject, and message");
  }

  const ticket = await supportService.createTicket(uid, email, subject, message);

  res.status(201).json({
    success: true,
    message: "Support ticket created successfully",
    data: ticket,
  });
});

// GET /api/support/tickets
export const getUserTickets = asyncHandler(async (req, res) => {
  const uid = req.user.uid;
  const tickets = await supportService.getUserTickets(uid);

  res.status(200).json({
    success: true,
    data: tickets,
  });
});
