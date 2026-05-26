// src/components/dashboard/VoiceGuide.jsx
import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function VoiceGuide({ text, size = 16, className = "" }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Stop speaking if component unmounts
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeak = () => {
    if (!window.speechSynthesis) {
      console.warn("Text-to-speech is not supported in this browser.");
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Clean text: strip markdown patterns, bullet points, headers
    const cleanedText = text
      .replace(/[*#_`[\]]/g, "")
      .replace(/\d+\.\s+/g, "")
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanedText);
    
    // Find a calming voice (prefers Google or Natural English voices if available)
    const voices = window.speechSynthesis.getVoices();
    const calmingVoice = voices.find(
      (v) =>
        v.name.includes("Google US English") ||
        v.name.includes("Natural") ||
        (v.lang === "en-US" && v.name.includes("Zira")) ||
        (v.lang.startsWith("en") && v.name.toLowerCase().includes("female")) ||
        v.lang.startsWith("en")
    );

    if (calmingVoice) {
      utterance.voice = calmingVoice;
    }
    
    // Soothing slow rate (0.85) and standard pleasant pitch
    utterance.rate = 0.85; 
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSpeak();
      }}
      className={`p-2 rounded-full bg-white/5 border border-white/10 text-wellness-glow hover:bg-white/10 hover:border-wellness-glow/30 transition-all flex items-center justify-center ${className}`}
      title={isPlaying ? "Mute Aria voice guide" : "Listen to Aria's voice guide"}
      aria-label={isPlaying ? "Stop Voice Guide" : "Start Voice Guide"}
    >
      {isPlaying ? (
        <VolumeX size={size} className="animate-pulse text-wellness-orange" />
      ) : (
        <Volume2 size={size} />
      )}
    </button>
  );
}
