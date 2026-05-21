import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import DashboardSection from "../sections/DashboardSection";
import SectionHeading from "../sections/SectionHeading";
import { moodOptions } from "../../../data/mentalHealthData";

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  const handleLog = () => {
    if (selectedMood) {
      setIsLogged(true);
      // Would dispatch to backend/context here
    }
  };

  return (
    <DashboardSection id="mood-tracker">
      <SectionHeading
        animate
        eyebrow="Emotional Check-in"
        title="How are you feeling today?"
        className="mb-8 text-center sm:text-left"
      />
      
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white/40 p-8 sm:p-12 border border-white/60 shadow-glass backdrop-blur-md">
        <AnimatePresence mode="wait">
          {!isLogged ? (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
              className="flex flex-col items-center sm:items-start"
            >
              <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                {moodOptions.map((mood) => {
                  const Icon = mood.icon;
                  const isSelected = selectedMood?.id === mood.id;
                  
                  return (
                    <motion.button
                      key={mood.id}
                      whileHover={{ scale: 1.05, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedMood(mood)}
                      className={`flex flex-col items-center gap-3 rounded-3xl border p-4 sm:p-5 transition-all duration-300 w-24 sm:w-28 ${
                        isSelected 
                          ? "bg-white shadow-lg border-white shadow-black/5" 
                          : "bg-white/50 border-white/40 hover:bg-white/80"
                      }`}
                    >
                      <div 
                        className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300 ${
                          isSelected ? "bg-opacity-20 shadow-sm" : "bg-transparent"
                        }`}
                        style={{ 
                          backgroundColor: isSelected ? mood.color : 'transparent',
                          color: isSelected ? mood.color : '#666'
                        }}
                      >
                        <Icon size={24} />
                      </div>
                      <span className={`text-xs font-bold transition-colors ${isSelected ? "text-wellness-dark" : "text-wellness-muted"}`}>
                        {mood.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: selectedMood ? 1 : 0, height: selectedMood ? "auto" : 0 }}
                className="mt-8 overflow-hidden w-full sm:w-auto"
              >
                <button
                  onClick={handleLog}
                  className="w-full sm:w-auto rounded-full bg-wellness-dark px-8 py-3.5 text-sm font-bold text-white transition hover:bg-black shadow-sm"
                >
                  Log my mood
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="logged"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ type: "spring", bounce: 0.4 }}
              className="flex flex-col items-center justify-center py-6 text-center"
            >
              <div 
                className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-wellness-greenLight text-wellness-green shadow-glow2"
              >
                <Check size={40} strokeWidth={3} />
              </div>
              <h3 className="font-heading text-2xl font-extrabold text-wellness-dark">Mood Logged</h3>
              <p className="mt-2 text-wellness-muted max-w-sm">
                Thank you for checking in. Awareness is the first step to emotional healing.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardSection>
  );
}
