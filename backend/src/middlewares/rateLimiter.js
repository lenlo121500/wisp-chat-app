import rateLimit from "express-rate-limit";

// Configuration for different rate limiters
const rateLimiterConfig = {
  // For sensitive endpoints like login/signup
  sensitive: {
    windowMs: 15 * 60 * 1000,
    max: 10,
    message:
      "Too many attempts from this IP, please try again after 15 minutes",
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
  },

  // For regular API endpoints
  api: {
    windowMs: 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again after a minute",
    standardHeaders: true,
    legacyHeaders: false,
  },

  // Global rate limiter as a safety net
  global: {
    windowMs: 60 * 60 * 1000,
    max: 1000,
    message: "Too many requests from this IP, please try again after an hour",
    standardHeaders: true,
    legacyHeaders: false,
  },
};

// Create the rate limiters
export const sensitiveLimiter = rateLimit(rateLimiterConfig.sensitive);
export const apiLimiter = rateLimit(rateLimiterConfig.api);
export const globalLimiter = rateLimit(rateLimiterConfig.global);
