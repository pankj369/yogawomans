import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit3, Sparkles, Trash2, Calendar, Smile, AlertCircle } from "lucide-react";
import DashboardSection from "../ui/sections/DashboardSection";
import SectionHeading from "../ui/sections/SectionHeading";
import { useToast } from "../../context/ToastContext";

const journalPrompts = [
  "What made you feel light and happy today?",
  "How did your physical body feel during practice?",
  "Describe one worry you want to breathe out and let go.",
  "Write down three things you are deeply grateful for right now.",
];

const moodIcons = {
  excellent: { label: "Excellent", emoji: "✨" },
  good: { label: "Good", emoji: "😊" },
  neutral: { label: "Neutral", emoji: "😐" },
  tired: { label: "Tired", emoji: "😴" },
  stressed: { label: "Stressed", emoji: "😰" },
};

export default function JournalSection() {
  const toast = useToast();
  const [entries, setEntries] = useState([]);
  const [activePrompt, setActivePrompt] = useState(journalPrompts[0]);
  const [selectedMood, setSelectedMood] = useState("good");
  const [noteText, setNoteText] = useState("");

  // Load Entries
  useEffect(() => {
    const saved = localStorage.getItem("yogawomans_journal");
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  const handleSaveEntry = (e) => {
    e.preventDefault();
    if (!noteText.trim()) {
      toast.showToast({ type: "error", title: "Empty Note", message: "Please write something before saving." });
      return;
    }

    const newEntry = {
      id: `journal-${Date.now()}`,
      date: new Date().toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      prompt: activePrompt,
      mood: selectedMood,
      text: noteText,
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem("yogawomans_journal", JSON.stringify(updated));
    setNoteText("");
    toast.showToast({ type: "success", title: "Entry Saved", message: "Journal entry stored in your wellness log." });
  };

  const handleDeleteEntry = (id) => {
    const updated = entries.filter((entry) => entry.id !== id);
    setEntries(updated);
    localStorage.setItem("yogawomans_journal", JSON.stringify(updated));
    toast.showToast({ title: "Entry Deleted", message: "Journal entry removed." });
  };

  const handlePromptShuffle = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * journalPrompts.length);
    } while (journalPrompts[nextIndex] === activePrompt && journalPrompts.length > 1);
    setActivePrompt(journalPrompts[nextIndex]);
  };

  return (
    <div className="space-y-12">
      <DashboardSection id="journal-input">
        <div className="grid gap-8 lg:grid-cols-5 items-start">
          {/* Form Editor (Left 3 cols on lg) */}
          <div className="lg:col-span-3 relative overflow-hidden rounded-[2.5rem] bg-white/40 p-8 border border-white/60 shadow-glass backdrop-blur-md">
            <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-wellness-orange mb-4">
              <Edit3 size={12} /> Reflective Diary
            </span>

            <div className="flex items-center justify-between gap-4 mt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-wellness-muted">Reflection Prompt</h3>
              <button
                type="button"
                onClick={handlePromptShuffle}
                className="text-xs font-bold text-wellness-orange hover:underline flex items-center gap-1"
              >
                <Sparkles size={12} /> Change Prompt
              </button>
            </div>
            <p className="font-heading text-lg font-bold text-wellness-dark mt-1">
              {activePrompt}
            </p>

            <form onSubmit={handleSaveEntry} className="mt-6 space-y-6">
              {/* Mood picker */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-wellness-muted">Current Energy State</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {Object.entries(moodIcons).map(([key, item]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedMood(key)}
                      className={`px-4 py-2 text-xs font-bold rounded-2xl border transition-all ${
                        selectedMood === key
                          ? "bg-wellness-orange border-wellness-orange text-white shadow-md shadow-wellness-orange/15"
                          : "bg-white/60 border-white/30 text-wellness-muted hover:bg-white"
                      }`}
                    >
                      <span className="mr-1.5">{item.emoji}</span>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Textarea */}
              <div>
                <label htmlFor="journal-textarea" className="text-xs font-bold uppercase tracking-wider text-wellness-muted block mb-2">Write your reflections</label>
                <textarea
                  id="journal-textarea"
                  rows={6}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Pour your heart and thoughts here..."
                  className="w-full rounded-2xl border border-white/60 bg-white/70 p-4 text-sm text-wellness-dark placeholder-wellness-muted/50 focus:border-wellness-orange focus:bg-white focus:outline-none focus:ring-1 focus:ring-wellness-orange transition-all leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto rounded-full bg-wellness-dark hover:bg-black text-white px-8 py-3.5 text-sm font-bold transition-all shadow-sm"
              >
                Save Log Entry
              </button>
            </form>
          </div>

          {/* Past logs feed (Right 2 cols on lg) */}
          <div className="lg:col-span-2 rounded-[2.5rem] bg-white/40 border border-white/60 shadow-glass p-6 sm:p-8 backdrop-blur-md flex flex-col min-h-[400px]">
            <h3 className="font-heading text-lg font-bold text-wellness-dark flex items-center gap-2 mb-4">
              <Calendar size={18} className="text-wellness-orange" />
              Past Reflections ({entries.length})
            </h3>

            <div className="flex-1 overflow-y-auto max-h-[450px] no-scrollbar space-y-4 pr-1">
              <AnimatePresence>
                {entries.map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-white/60 border border-white/50 rounded-3xl relative group shadow-sm hover:shadow-liftSm transition-all"
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold text-wellness-muted mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} /> {entry.date} at {entry.time}
                      </span>
                      <span className="bg-wellness-orange/5 text-wellness-orange px-2 py-0.5 rounded-md flex items-center gap-1">
                        {moodIcons[entry.mood]?.emoji || "😊"} {moodIcons[entry.mood]?.label || "Good"}
                      </span>
                    </div>

                    <p className="text-xs text-wellness-muted font-bold line-clamp-1 border-b border-wellness-softcream pb-2 mb-2">
                      {entry.prompt}
                    </p>

                    <p className="text-xs text-wellness-dark leading-relaxed whitespace-pre-line">
                      {entry.text}
                    </p>

                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="absolute bottom-4 right-4 text-wellness-muted hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1 hover:bg-red-50 rounded-lg"
                      title="Delete log"
                    >
                      <Trash2 size={13} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {entries.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center py-20 text-wellness-muted">
                  <AlertCircle size={24} className="text-wellness-muted/40 mb-2" />
                  <p className="text-xs font-bold">Your journal is quiet.</p>
                  <p className="text-[10px] mt-1">Start writing to log your mindfulness journey.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardSection>
    </div>
  );
}
