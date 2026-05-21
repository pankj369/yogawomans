export function safeJSONParse(value, fallback = null) {
  if (typeof value !== "string") return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function readStorage(storage, key, fallback = null) {
  if (typeof window === "undefined") return fallback;
  return safeJSONParse(storage.getItem(key), fallback);
}

export function writeStorage(storage, key, value) {
  if (typeof window === "undefined") return;
  storage.setItem(key, JSON.stringify(value));
}

export function removeStorage(storage, key) {
  if (typeof window === "undefined") return;
  storage.removeItem(key);
}
