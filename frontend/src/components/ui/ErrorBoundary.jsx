import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("YogaWoman App Crash:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-wellness-bg px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex max-w-md flex-col items-center gap-6 rounded-3xl bg-white/60 p-8 shadow-glass backdrop-blur-md"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-wellness-orange/10 text-wellness-orange">
              <AlertCircle size={32} />
            </div>
            
            <div className="space-y-2">
              <h2 className="font-heading text-2xl font-bold text-wellness-dark">
                Let's take a deep breath.
              </h2>
              <p className="text-sm font-light leading-relaxed text-wellness-muted">
                Our system encountered an unexpected disruption. Don't worry, your progress is safe.
              </p>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-wellness-orange px-6 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-lift transition-transform hover:scale-105"
            >
              <RefreshCw size={14} /> Restore Session
            </button>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
