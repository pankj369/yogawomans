import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const moods = [
  { id: 'calm', label: 'Calm', emoji: '😌', color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
  { id: 'stressed', label: 'Stressed', emoji: '😣', color: 'bg-rose-100 text-rose-700 border-rose-300' },
  { id: 'anxious', label: 'Anxious', emoji: '😰', color: 'bg-amber-100 text-amber-700 border-amber-300' },
  { id: 'focused', label: 'Focused', emoji: '🎯', color: 'bg-blue-100 text-blue-700 border-blue-300' },
  { id: 'tired', label: 'Tired', emoji: '🥱', color: 'bg-indigo-100 text-indigo-700 border-indigo-300' },
];

const MoodSelector = ({ currentMood, onMoodSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (mood) => {
    onMoodSelect(mood.id);
    setIsOpen(false);
  };

  const activeMood = moods.find(m => m.id === currentMood) || moods[0];

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-full border shadow-sm transition-colors duration-300 ${activeMood.color}`}
      >
        <span className="text-xl">{activeMood.emoji}</span>
        <span className="font-medium text-sm">Feeling {activeMood.label}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 overflow-hidden"
          >
            <div className="mb-2 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              How are you feeling?
            </div>
            <div className="flex flex-col space-y-1">
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => handleSelect(mood)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-xl transition-colors hover:bg-gray-50 ${currentMood === mood.id ? 'bg-gray-50 font-medium' : 'text-gray-600'}`}
                >
                  <span className="text-lg">{mood.emoji}</span>
                  <span className="text-sm">{mood.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MoodSelector;
