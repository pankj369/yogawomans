import { createContext, useContext, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheckCircle, FiInfo, FiX } from "react-icons/fi";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = (id) => setToasts((current) => current.filter((toast) => toast.id !== id));

  const showToast = ({ title, message, type = "info", duration = 3500 }) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const toast = { id, title, message, type };
    setToasts((current) => [...current, toast]);
    window.setTimeout(() => removeToast(id), duration);
    return id;
  };

  const value = useMemo(() => ({ showToast, removeToast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-full max-w-sm flex-col gap-3 p-2 sm:right-6 sm:top-6">
        <AnimatePresence>
          {toasts.map((toast) => {
            const Icon = toast.type === "success" ? FiCheckCircle : FiInfo;
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: -20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                className="pointer-events-auto rounded-[24px] border border-white/60 bg-white/90 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop-blur-2xl"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-[#eff7ea] p-2 text-[#2E7D32]">
                    <Icon />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#1a1a1a]">{toast.title}</p>
                    {toast.message && <p className="mt-1 text-sm text-[#666]">{toast.message}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeToast(toast.id)}
                    className="rounded-full p-1 text-[#666] transition hover:bg-black/5 hover:text-[#1a1a1a]"
                  >
                    <FiX />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
