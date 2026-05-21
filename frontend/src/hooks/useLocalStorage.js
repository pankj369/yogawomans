import { useEffect, useState } from "react";
import { readStorage, writeStorage } from "../utils/storage";

export default function useLocalStorage(key, initialValue, storage = "localStorage") {
  const storageRef = typeof window !== "undefined" ? window[storage] : null;
  const [value, setValue] = useState(() =>
    storageRef ? readStorage(storageRef, key, initialValue) : initialValue
  );

  useEffect(() => {
    if (!storageRef) return;
    writeStorage(storageRef, key, value);
  }, [key, value, storageRef]);

  return [value, setValue];
}
