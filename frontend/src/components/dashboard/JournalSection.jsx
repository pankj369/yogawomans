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
    const saved = localStorage.getItem("yogawoman_journal");
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
    localStorage.setItem("yogawoman_journal", JSON.stringify(updated));
    setNoteText("");
    toast.showToast({ type: "success", title: "Entry Saved", message: "Journal entry stored in your wellness log." });
  };

  const handleDeleteEntry = (id) => {
    const updated = entries.filter((entry) => entry.id !== id);
    setEntries(updated);
    localStorage.setItem("yogawoman_journal", JSON.stringify(updated));
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
          <div className="lg:col-span-3 relative overflow-hidden rounded-[2.5rem] border border-wellness-border bg-wellness-glass p-8 shadow-glass backdrop-blur-[18px]">
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
            <p className="font-heading text-lg font-bold text-white mt-1">
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
                          ? "bg-wellness-orange border-wellness-orange text-white shadow-md"
                          : "bg-white/5 border-wellness-border text-wellness-muted hover:bg-white/10 hover:text-white"
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
                  className="w-full rounded-2xl border border-wellness-border bg-white/5 p-4 text-sm text-white placeholder-wellness-muted/50 focus:border-wellness-orange focus:bg-white/10 focus:outline-none transition-all leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto rounded-full bg-wellness-glow hover:bg-wellness-glow/90 text-black px-8 py-3.5 text-sm font-extrabold transition-all shadow-glow2"
              >
                Save Log Entry
              </button>
            </form>
          </div>

          {/* Past logs feed (Right 2 cols on lg) */}
          <div className="lg:col-span-2 rounded-[2.5rem] border border-wellness-border bg-wellness-glass shadow-glass p-6 sm:p-8 backdrop-blur-[18px] flex flex-col min-h-[400px]">
            <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2 mb-4">
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
                    className="p-4 bg-white/5 border border-wellness-border rounded-3xl relative group shadow-glass transition-all hover:bg-white/10 hover:border-wellness-glow/30 duration-300"
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold text-wellness-muted mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} /> {entry.date} at {entry.time}
                      </span>
                      <span className="bg-white/5 border border-wellness-border text-wellness-orange px-2 py-0.5 rounded-md flex items-center gap-1">
                        {moodIcons[entry.mood]?.emoji || "😊"} {moodIcons[entry.mood]?.label || "Good"}
                      </span>
                    </div>

                    <p className="text-xs text-wellness-muted font-bold line-clamp-1 border-b border-wellness-border pb-2 mb-2">
                      {entry.prompt}
                    </p>

                    <p className="text-xs text-white leading-relaxed whitespace-pre-line font-medium">
                      {entry.text}
                    </p>

                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="absolute bottom-4 right-4 text-wellness-muted hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1 hover:bg-white/10 rounded-lg"
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
