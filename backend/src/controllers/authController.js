import { supabase, supabaseAdmin } from "../config/supabaseClient.js";
import generateToken from "../utils/generateToken.js";
import { isValidEmail, isValidPassword, sanitizeString } from "../utils/validators.js";
import { info, warn, error as logError } from "../utils/logger.js";

const signupAttempts = new Map();
const MAX_ATTEMPTS = 6;
const WINDOW_MS = 60 * 60 * 1000;

/**
 * Signup controller - Creates new user with rate limiting
 * Uses admin API to bypass email confirmation during development
 */
export const signup = async (req, res) => {
  try {
    info("Signup API Hit");

    let { email, password } = req.body || {};
    email = sanitizeString(email);

    const ip = req.ip || req.connection?.remoteAddress || "unknown";
    const now = Date.now();
    const record = signupAttempts.get(ip) || { count: 0, firstAt: now };

    if (now - record.firstAt > WINDOW_MS) {
      record.count = 0;
      record.firstAt = now;
    }

    record.count += 1;
    signupAttempts.set(ip, record);

    if (record.count > MAX_ATTEMPTS) {
      warn(`Signup rate limit exceeded for IP ${ip}`);
      return res.status(429).json({
        success: false,
        message: "Too many signup attempts, try again later",
      });
    }

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const createPayload = {
      email,
      password,
      email_confirm: true,
    };

    const { data, error } = await supabaseAdmin.auth.admin.createUser(createPayload);
    logError("Signup response", data, error);

    if (error) {
      const msg = error.message || String(error);
      if (msg.includes("over_email_send_rate_limit")) {
        return res.status(429).json({
          success: false,
          message: "Email provider rate limit reached. Try again later.",
        });
      }
      if (msg.includes("already exists")) {
        return res.status(409).json({
          success: false,
          message: "Email already registered",
        });
      }
      logError("Supabase signup error:", error);
      return res.status(400).json({
        success: false,
        message: msg,
      });
    }

    if (!data || !data.user) {
      return res.status(500).json({
        success: false,
        message: "User creation failed",
      });
    }

    const token = generateToken({
      id: data.user.id,
      email: data.user.email,
    });

    info(`User created successfully: ${data.user.id}`);

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: data.user.id,
        email: data.user.email,
        created_at: data.user.created_at,
      },
    });
  } catch (err) {
    logError("Signup controller error:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Server error during signup",
    });
  }
};

/**
 * Login controller - Authenticates user and returns JWT
 * Uses standard client auth for secure server-side authentication
 */
export const login = async (req, res) => {
  try {
    let { email, password } = req.body || {};
    email = sanitizeString(email);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      logError("Login error:", error);
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!data || !data.user) {
      return res.status(401).json({
        success: false,
        message: "Login failed",
      });
    }

    const token = generateToken({
      id: data.user.id,
      email: data.user.email,
    });

    info(`User logged in: ${data.user.id}`);

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: data.user.id,
        email: data.user.email,
        created_at: data.user.created_at,
      },
    });
  } catch (err) {
    logError("Login controller error:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Server error during login",
    });
  }
};
