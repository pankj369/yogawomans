const rateLimitWindow = 15 * 60 * 1000; // 15 minutes window
const maxRequestsPerWindow = 300;
const ipRequests = new Map();

/**
 * Custom memory-safe sliding window rate-limiter middleware
 */
export const rateLimiter = (req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const now = Date.now();

  if (!ipRequests.has(ip)) {
    ipRequests.set(ip, []);
  }

  // Filter out timestamps outside the active window
  const timestamps = ipRequests.get(ip).filter((t) => now - t < rateLimitWindow);
  timestamps.push(now);
  ipRequests.set(ip, timestamps);

  if (timestamps.length > maxRequestsPerWindow) {
    return res.status(429).json({
      success: false,
      error: "Too Many Requests",
      message: "Too many requests from this IP, please try again after 15 minutes.",
    });
  }

  next();
};

export default rateLimiter;
