import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Send, Sparkles, MessageCircle, AlertCircle } from "lucide-react";
import DashboardSection from "../ui/sections/DashboardSection";
import SectionHeading from "../ui/sections/SectionHeading";
import { useToast } from "../../context/ToastContext";
import apiClient from "../../services/apiClient";
import { auth } from "../../config/firebase";
import VoiceGuide from "./VoiceGuide";
import { useMood } from "../../context/MoodContext";
import MoodSelector from "../common/MoodSelector";

const suggestionPrompts = [
  "Suggest a 5-minute desk stretch",
  "Help me reduce anxiety right now",
  "Explain pranayama breathwork",
  "How do I balance work and yoga?",
];

const presets = {
  "suggest a 5-minute desk stretch": 
    "Here is a quick, desk-friendly alignment routine:\n\n1. **Seated Cat-Cow (3 breaths):** Arch your back on inhalations, round your shoulders and chest on exhalations.\n2. **Clasp Chest Opener (3 breaths):** Interlace your fingers behind your chair, roll shoulders back, and lift the collarbones.\n3. **Seated Spinal Twist (3 breaths each side):** Place your right hand on your left knee, look back gently, and lengthen your spine.\n4. **Gentle Neck Release (3 breaths each side):** Tilt your right ear to your right shoulder, placing light pressure if desired.\n\nThis routine immediately frees up static energy built up in the shoulders and lower spine.",
  
  "help me reduce anxiety right now":
    "Let's breathe together. Try the **Box Breathing** technique:\n\n- **Inhale** through your nose for 4 seconds.\n- **Hold** the breath comfortably for 4 seconds.\n- **Exhale** slowly through your mouth for 4 seconds.\n- **Pause** at empty air for 4 seconds.\n\nRepeat this cycle 3 times. Focus your mind entirely on the physical sensation of air brushing your upper lip. You are grounded, safe, and present in this moment.",
  
  "explain pranayama breathwork":
    "**Pranayama** is the fourth limb of Ashtanga Yoga, translating from Sanskrit as 'breath control' or 'expansion of the life force' (Prana = life energy, Ayama = expansion).\n\nBy consciously regulating your inhale, exhale, and breath retention (Kumbhaka), you directly stimulate the vagus nerve. This triggers the parasympathetic nervous system to decrease heart rate, lower cortisol, and settle mental storm clouds. It is a powerful tool to bridge physical alignment and meditative focus.",
  
  "how do i balance work and yoga?":
    "True yoga doesn't start or stop at the edges of your mat—it is a state of integrated living.\n\nTo balance work and wellness:\n1. **Mindful Transitions:** Take three conscious breaths before opening emails or entering meetings.\n2. **Sahaja (Effortless Flow):** Do not hold tension in your jaw or shoulders while typing. Scan your body for physical holds hourly.\n3. **Micro-Sessions:** A 10-minute stretch or evening breathing session is infinitely better than skipping practice entirely.\n\nTreat your work space as a laboratory for patience and alignment."
};

export default function AICoachSection() {
  const toast = useToast();
  const { mood, setMood } = useMood();
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "coach",
      text: "Namaste. I am Aria, your personal wellness coach. How can I help align your physical body, breathing, or mental focus today?",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Hydrate history from backend
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await apiClient.get("/coach/history");
        if (res.data?.success && res.data.data?.length > 0) {
          setMessages(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load coach history:", err);
      }
    };
    loadHistory();
  }, []);

  // Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const streamResponse = async (userMsgText, currentMessages) => {
    setIsTyping(true);
    
    // Add a placeholder message for the AI
    const newMsgId = `coach-${Date.now()}`;
    setMessages((prev) => [...prev, {
      id: newMsgId,
      sender: "coach",
      text: "",
    }]);

    try {
      const token = auth.currentUser ? await auth.currentUser.getIdToken() : "";
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
      
      const response = await fetch(`${baseUrl}/coach/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ message: userMsgText, mood }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ') && line !== 'data: [DONE]') {
              try {
                const data = JSON.parse(line.slice(6));
                setMessages(prev => prev.map(msg => 
                  msg.id === newMsgId ? { ...msg, text: msg.text + data.text } : msg
                ));
              } catch (e) {
                // Ignore parse errors on partial chunks
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Coach API Error:", error);
      setMessages((prev) => prev.map(msg => 
        msg.id === newMsgId ? { ...msg, text: "I'm having a little trouble connecting right now. Let's take a deep breath and try again in a moment." } : msg
      ));
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    // Add User Message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // Prepare new message list for the API
    const newMessagesList = [...messages, userMsg];

    // Stream Response from backend
    streamResponse(text, newMessagesList);
  };

  return (
    <div className="space-y-12">
      <DashboardSection id="ai-coach-hub">
        <div className="grid gap-8 lg:grid-cols-5 items-start">
          {/* Chat Interface (Left 3 cols on lg) */}
          <div className="lg:col-span-3 rounded-[2.5rem] border border-wellness-border bg-wellness-glass p-6 shadow-glass backdrop-blur-[18px] flex flex-col h-[520px] justify-between">
            {/* Coach Header */}
            <div className="flex items-center justify-between border-b border-wellness-border pb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-wellness-orange/80 to-wellness-green flex items-center justify-center text-white shadow-glow2">
                  <Cpu size={18} />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-white">Aria</h4>
                  <p className="text-[10px] text-wellness-green font-semibold uppercase tracking-wider">Online • Wellness Coach</p>
                </div>
              </div>
              <MoodSelector currentMood={mood} onMoodSelect={setMood} />
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto no-scrollbar py-4 space-y-4 pr-1">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "coach" ? (
                    <div className="flex flex-col items-start max-w-[85%]">
                      <div className="rounded-[1.8rem] px-5 py-3.5 text-xs leading-relaxed bg-white/5 border border-wellness-border text-white rounded-bl-sm shadow-sm whitespace-pre-line font-medium">
                        {msg.text}
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 pl-2 text-[10px] text-wellness-muted font-bold uppercase tracking-wider">
                        <span>Aria</span>
                        <span>•</span>
                        <VoiceGuide text={msg.text} size={11} className="!p-1 border-none bg-transparent hover:bg-white/5" />
                      </div>
                    </div>
                  ) : (
                    <div className="max-w-[85%] rounded-[1.8rem] px-5 py-3.5 text-xs leading-relaxed bg-wellness-orange text-white rounded-br-sm shadow-sm">
                      {msg.text}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-wellness-border rounded-[1.8rem] rounded-bl-sm px-5 py-3.5 shadow-sm flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-wellness-muted animate-bounce" />
                    <span className="h-1.5 w-1.5 rounded-full bg-wellness-muted animate-bounce delay-150" />
                    <span className="h-1.5 w-1.5 rounded-full bg-wellness-muted animate-bounce delay-300" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Prompt Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2 border-t border-wellness-border pt-4"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask Aria about yoga postures, breathing, or mindfulness..."
                className="flex-1 rounded-2xl border border-wellness-border bg-white/5 px-4 py-3 text-xs text-white placeholder-wellness-muted/55 focus:border-wellness-orange focus:bg-white/10 focus:outline-none transition-all"
              />
              <button
                type="submit"
                className="h-11 w-11 rounded-2xl bg-wellness-glow hover:bg-wellness-glow/90 text-black flex items-center justify-center transition-colors shadow-glow"
              >
                <Send size={15} />
              </button>
            </form>
          </div>

          {/* Quick suggestions & Tips (Right 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-wellness-orange mb-2">
                <Sparkles size={12} /> Prompt Library
              </span>
              <h3 className="font-heading text-xl font-bold text-white">Suggested Inquiries</h3>
              <p className="text-xs text-wellness-muted mt-1 font-medium">Tap a quick-start question to chat with Aria instantly.</p>
            </div>

            <div className="grid gap-3">
              {suggestionPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="w-full text-left p-4 rounded-2xl border border-wellness-border bg-wellness-glass hover:bg-white/5 hover:border-wellness-glow/30 transition-all duration-300 text-xs font-bold text-white flex items-center gap-2 group shadow-glass"
                >
                  <MessageCircle size={14} className="text-wellness-orange flex-shrink-0 group-hover:scale-105 transition-transform" />
                  <span className="truncate">{prompt}</span>
                </button>
              ))}
            </div>

            <div className="rounded-3xl border border-wellness-border bg-wellness-glass p-5 flex items-start gap-3 backdrop-blur-[18px] shadow-glass">
              <AlertCircle size={18} className="text-wellness-orange mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="text-xs font-bold text-white">AI Coach Guidelines</h5>
                <p className="text-[11px] text-wellness-muted mt-1 leading-relaxed font-medium">
                  Aria is designed for general lifestyle guidance, breath resets, and alignment tips. Speak naturally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DashboardSection>
    </div>
  );
}
