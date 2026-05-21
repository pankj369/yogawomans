export function isValidEmail(email) {
  if (!email || typeof email !== "string") return false;
  return /\S+@\S+\.\S+/.test(email);
}

export function isValidPassword(password) {
  if (!password || typeof password !== "string") return false;
  // minimum 8 chars for now
  return password.length >= 8;
}

export function sanitizeString(v) {
  if (typeof v !== "string") return v;
  return v.trim();
}
export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};