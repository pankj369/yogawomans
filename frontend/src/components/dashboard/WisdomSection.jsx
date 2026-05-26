import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Sparkles, Heart, ChevronRight, Bookmark, X, BookMarked } from "lucide-react";
import DashboardSection from "../ui/sections/DashboardSection";
import SectionHeading from "../ui/sections/SectionHeading";
import { useToast } from "../../context/ToastContext";

const wisdomQuotes = [
  { id: "q1", text: "Yoga is the cessation of the movements of the mind.", author: "Patanjali" },
  { id: "q2", text: "Quiet the mind and the soul will speak.", author: "Ma Jaya Sati Bhagavati" },
  { id: "q3", text: "The nature of yoga is to shine the light of awareness into the darkest corners of the body.", author: "B.K.S. Iyengar" },
  { id: "q4", text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.", author: "Thich Nhat Hanh" },
  { id: "q5", text: "Rule your mind or it will rule you.", author: "Buddha" },
  { id: "q6", text: "You are not a drop in the ocean. You are the entire ocean in a drop.", author: "Rumi" },
];

const wisdomArticles = [
  {
    id: "art-1",
    title: "The Eight Limbs of Yoga",
    excerpt: "Discover Patanjali's classical yoga blueprint, extending far beyond physical postures.",
    readTime: 6,
    content: "Patanjali's Yoga Sutras define an eightfold path called Ashtanga (eight limbs). These form a systematic plan to live a purposeful, ethical, and mindful life. The limbs are: 1. Yamas (ethical standards), 2. Niyamas (self-discipline), 3. Asanas (postures), 4. Pranayama (breath control), 5. Pratyahara (sensory withdrawal), 6. Dharana (concentration), 7. Dhyana (meditation), and 8. Samadhi (integration or bliss). Yoga practitioners learn that while postures build strength, aligning all eight limbs is what truly leads to inner liberation.",
  },
  {
    id: "art-2",
    title: "Pranayama: Breath as Life Force",
    excerpt: "Uncover how controlled breathing techniques direct vital energy and soothe nerves.",
    readTime: 4,
    content: "Prana means vital life force, and Ayama means extension. Pranayama is the yogic art of breathing, which serves as a bridge between the conscious and unconscious mind. When we consciously alter our breath patterns (for example, using box breathing or alternate nostril breathing), we send signals to the vagus nerve to down-regulate the nervous system, shifting the body out of 'fight or flight' into 'rest and digest' mode. Just five minutes of daily pranayama can radically reduce stress hormones.",
  },
  {
    id: "art-3",
    title: "A Beginner's Guide to Mindfulness",
    excerpt: "Learn simple, non-judgmental habits to keep your attention in the present moment.",
    readTime: 5,
    content: "Mindfulness is simply the quality of being fully present, aware of where we are and what we're doing, and not overly reactive or overwhelmed by what's going on around us. You don't need a meditation cushion to practice mindfulness. It can be done while walking, drinking tea, or washing dishes. The secret is focusing entirely on sensory details: the warm water on your hands, the flavor of the tea, or the feeling of your feet touching the earth. Whenever the mind drifts, gently bring it back without judgment.",
  },
];

export default function WisdomSection() {
  const toast = useToast();
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const [savedQuotes, setSavedQuotes] = useState([]);
  const [readingArticle, setReadingArticle] = useState(null);

  // Load Saved Quotes
  useEffect(() => {
    const saved = localStorage.getItem("yogawomans_saved_quotes");
    if (saved) {
      setSavedQuotes(JSON.parse(saved));
    }
  }, []);

  const generateNewQuote = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * wisdomQuotes.length);
    } while (nextIndex === activeQuoteIndex && wisdomQuotes.length > 1);
    setActiveQuoteIndex(nextIndex);
  };

  const handleSaveQuote = (quote) => {
    const isAlreadySaved = savedQuotes.some((q) => q.id === quote.id);
    let newSaved;
    if (isAlreadySaved) {
      newSaved = savedQuotes.filter((q) => q.id !== quote.id);
      toast.showToast({ title: "Removed Quote", message: "Quote removed from your wisdom journal." });
    } else {
      newSaved = [...savedQuotes, quote];
      toast.showToast({ type: "success", title: "Saved Quote", message: "Quote added to your wisdom journal!" });
    }
    setSavedQuotes(newSaved);
    localStorage.setItem("yogawomans_saved_quotes", JSON.stringify(newSaved));
  };

  const currentQuote = wisdomQuotes[activeQuoteIndex];
  const isQuoteBookmarked = savedQuotes.some((q) => q.id === currentQuote.id);

  return (
    <div className="space-y-12">
      {/* Wisdom Quote and Saved Quotes Workspace */}
      <DashboardSection id="wisdom-essence">
        <div className="grid gap-6 lg:grid-cols-5 items-start">
          {/* Quote Card (Left 3 cols on lg) */}
          <div className="lg:col-span-3 relative overflow-hidden rounded-[2.5rem] border border-wellness-border bg-wellness-glass p-8 sm:p-10 shadow-glass backdrop-blur-[18px] flex flex-col justify-between min-h-[300px]">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-wellness-orange">
                <Sparkles size={12} /> Quote of the Day
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeQuoteIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="mt-6"
                >
                  <blockquote className="font-heading text-xl sm:text-2xl font-bold text-white leading-relaxed">
                    "{currentQuote.text}"
                  </blockquote>
                  <cite className="block text-sm font-semibold text-wellness-muted mt-4 not-italic">
                    — {currentQuote.author}
                  </cite>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex gap-3 pt-6 border-t border-wellness-border">
              <button
                onClick={generateNewQuote}
                className="rounded-full bg-wellness-glow hover:bg-wellness-glow/90 text-black px-6 py-3 text-xs font-extrabold transition-all shadow-sm"
              >
                Reflect Again
              </button>
              <button
                onClick={() => handleSaveQuote(currentQuote)}
                className={`rounded-full px-5 py-3 text-xs font-bold transition-all flex items-center gap-2 border ${
                  isQuoteBookmarked
                    ? "bg-wellness-orange border-wellness-orange text-white"
                    : "bg-white/5 border-wellness-border text-white hover:bg-white/10"
                }`}
              >
                <Bookmark size={14} fill={isQuoteBookmarked ? "white" : "none"} />
                {isQuoteBookmarked ? "Saved" : "Save to Journal"}
              </button>
            </div>
          </div>

          {/* Saved Wisdom Bookmarks (Right 2 cols on lg) */}
          <div className="lg:col-span-2 rounded-[2.5rem] border border-wellness-border bg-wellness-glass shadow-glass p-6 sm:p-8 backdrop-blur-[18px] h-full min-h-[300px] flex flex-col">
            <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
              <BookMarked size={18} className="text-wellness-orange" />
              Wisdom Journal ({savedQuotes.length})
            </h3>
            <div className="mt-4 flex-1 overflow-y-auto max-h-56 no-scrollbar space-y-3">
              {savedQuotes.map((q) => (
                <div key={q.id} className="p-3 bg-white/5 border border-wellness-border rounded-2xl relative group">
                  <p className="text-xs text-white font-medium italic pr-6">"{q.text}"</p>
                  <p className="text-[10px] text-wellness-muted font-bold mt-1.5">— {q.author}</p>
                  <button
                    onClick={() => handleSaveQuote(q)}
                    className="absolute top-2 right-2 text-wellness-muted hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              {savedQuotes.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center py-10 text-wellness-muted">
                  <p className="text-xs font-bold">Your Journal is empty.</p>
                  <p className="text-[10px] mt-1">Bookmarked quotes will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardSection>

      {/* Wisdom Readings */}
      <DashboardSection id="wisdom-readings">
        <SectionHeading
          animate
          eyebrow="Spiritual Study"
          title="Yogic Wisdom Readings"
          description="Expand your mindfulness practice with short essays explaining yogic roots."
          className="mb-8"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {wisdomArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => setReadingArticle(art)}
              className="p-6 rounded-3xl border border-wellness-border bg-wellness-glass hover:bg-white/5 hover:border-wellness-glow/30 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-glass group"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-wellness-orange bg-white/5 border border-wellness-border px-2.5 py-1 rounded-md">
                  {art.readTime} min read
                </span>
                <h4 className="font-heading text-lg font-bold text-white mt-4 group-hover:text-wellness-glow transition-colors">
                  {art.title}
                </h4>
                <p className="text-xs text-wellness-muted mt-2 leading-relaxed font-medium">{art.excerpt}</p>
              </div>

              <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-wellness-orange border-t border-wellness-border pt-4">
                Open Article <ChevronRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </DashboardSection>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {readingArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 px-4 py-8 backdrop-blur-md flex items-center justify-center"
          >
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.98 }}
              className="mx-auto w-full max-w-2xl overflow-hidden rounded-[2.5rem] border border-wellness-border bg-wellness-glass p-8 shadow-glass relative max-h-[90vh] flex flex-col backdrop-blur-xl"
            >
              <button
                onClick={() => setReadingArticle(null)}
                className="absolute right-5 top-5 p-2.5 rounded-full bg-white/5 border border-wellness-border text-wellness-muted hover:text-white transition-all"
              >
                <X size={18} />
              </button>

              <div className="overflow-y-auto no-scrollbar pr-2 mt-4 space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-wellness-orange bg-white/5 border border-wellness-border px-2.5 py-1 rounded-md">
                  {readingArticle.readTime} min read • Wisdom Lecture
                </span>
                <h3 className="font-heading text-3xl font-extrabold text-white leading-tight">{readingArticle.title}</h3>
                <p className="text-sm text-wellness-muted leading-relaxed whitespace-pre-line pt-2 font-medium">{readingArticle.content}</p>
              </div>

              <div className="mt-8 pt-4 border-t border-wellness-border flex justify-end">
                <button
                  onClick={() => setReadingArticle(null)}
                  className="rounded-full bg-wellness-glow hover:bg-wellness-glow/90 text-black px-6 py-2.5 text-xs font-extrabold transition-all"
                >
                  Done Reading
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
