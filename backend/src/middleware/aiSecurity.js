import rateLimit from "express-rate-limit";

// Limit general AI endpoints to 20 requests per 15 minutes per IP
export const aiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 20, 
  message: { error: "Too many requests to the AI service, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter limits for heavy operations like Palmistry Vision API (5 per 15 mins)
export const visionRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "You've reached the limit for palm analysis. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Basic payload validation to prevent massive prompt injection attacks
 */
export const promptInjectionGuard = (req, res, next) => {
  const { message } = req.body;
  
  if (message && message.length > 1000) {
    return res.status(400).json({ error: "Message too long. Please keep it under 1000 characters." });
  }

  // Very basic rudimentary check, can be expanded
  const suspiciousKeywords = ["ignore previous instructions", "system prompt", "you are now"];
  if (message && suspiciousKeywords.some(kw => message.toLowerCase().includes(kw))) {
    return res.status(400).json({ error: "Invalid request content." });
  }

  next();
};
