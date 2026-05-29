import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, CheckCircle, Loader2, Bug, Lightbulb, Palette, Zap, Heart, MoreHorizontal, Image as ImageIcon } from "lucide-react";
import fotlogo from "../../assets/images/fotlogo.png";
import { submitFeedback, uploadScreenshot } from "../../services/feedbackService";
import { useToast } from "../../context/ToastContext";

const CATEGORIES = [
  { id: "Bug Report", label: "Report a Bug", icon: Bug },
  { id: "Feature Request", label: "Suggest a Feature", icon: Lightbulb },
  { id: "UI / Design Suggestion", label: "Improve Design", icon: Palette },
  { id: "Performance Issue", label: "Performance", icon: Zap },
  { id: "Share Experience", label: "Experience", icon: Heart },
  { id: "Other", label: "Other", icon: MoreHorizontal },
];

const SECTIONS = [
  "Landing Page",
  "Dashboard",
  "Dosha Discovery",
  "Surya Namaskar",
  "Store",
  "Live Schedule",
  "AI Wellness Planner",
  "Authentication",
];

const LOADING_MESSAGES = [
  "Listening to your feedback...",
  "Capturing your thoughts...",
  "Helping us improve...",
  "Saving your suggestions...",
];

export default function FeedbackModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    category: "",
    section: "",
    message: "",
    priority: "Medium",
    email: "",
    anonymous: false,
  });
  const [screenshot, setScreenshot] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle"); // idle, uploading, sending, success, error
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const fileInputRef = useRef(null);
  const { showToast } = useToast();

  // Cycle loading messages
  useEffect(() => {
    let interval;
    if (isSubmitting) {
      interval = setInterval(() => {
        setLoadingMsgIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 1500);
    } else {
      setLoadingMsgIdx(0);
    }
    return () => clearInterval(interval);
  }, [isSubmitting]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setScreenshot(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setScreenshot(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category) {
      setErrorMsg("Please select a feedback category.");
      return;
    }
    if (!formData.message || formData.message.trim().length < 10) {
      setErrorMsg("Please tell us your thoughts in the message box (min 10 characters).");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      let uploadedScreenshotUrl = null;
      if (screenshot) {
        setSubmitStatus("uploading");
        try {
          uploadedScreenshotUrl = await uploadScreenshot(screenshot);
        } catch (uploadError) {
          setErrorMsg(uploadError.message || "Failed to upload screenshot.");
          setIsSubmitting(false);
          setSubmitStatus("error");
          showToast({ title: "Upload Failed", message: uploadError.message, type: "error" });
          return;
        }
      }

      setSubmitStatus("sending");
      
      const payload = {
        category: formData.category,
        section: formData.section,
        message: formData.message,
        priority: formData.priority,
        email: formData.email,
        anonymous: formData.anonymous,
        screenshotUrl: uploadedScreenshotUrl,
        pageUrl: window.location.href,
        userAgent: navigator.userAgent,
        deviceType: /Mobile|Android|iP(hone|od|ad)/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
        browser: navigator.vendor || "Unknown",
      };

      await submitFeedback(payload);
      
      setSubmitStatus("success");
      setIsSubmitting(false);
      
      showToast({ 
        title: "Feedback Submitted", 
        message: "Thank you for helping us improve YogaWomans!", 
        type: "success" 
      });

    } catch (error) {
      console.error("Feedback error:", error);
      setSubmitStatus("error");
      setErrorMsg(error.message || "Failed to submit feedback. Please try again.");
      setIsSubmitting(false);
      showToast({ title: "Submission Failed", message: error.message, type: "error" });
    }
  };

  const resetForm = () => {
    setFormData({
      category: "",
      section: "",
      message: "",
      priority: "Medium",
      email: "",
      anonymous: false,
    });
    setScreenshot(null);
    setSubmitStatus("idle");
    setErrorMsg("");
  };

  // Reset form when modal is fully closed so it's fresh next time
  useEffect(() => {
    if (!isOpen && submitStatus === "success") {
      // Small delay to allow exit animation to finish before resetting state
      const timer = setTimeout(() => {
        resetForm();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, submitStatus]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="feedback-modal-root"
          className="fixed inset-0 z-[9998] flex items-end md:items-center justify-center p-0 md:p-4"
        >
          {/* Backdrop with animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-luxury-text/20 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
              initial={{ opacity: 0, y: "100%", scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: "100%", scale: 0.95 }}
              transition={{ type: "spring", bounce: 0, duration: 0.6 }}
              className="pointer-events-auto w-full md:w-[90%] md:max-w-[720px] max-h-[90vh] md:max-h-[85vh] overflow-y-auto bg-[#FCFAF7] md:rounded-[32px] rounded-t-[32px] shadow-[0_20px_60px_rgba(200,155,60,0.1)] border border-luxury-surface hide-scrollbar"
              style={{ 
                backgroundImage: "radial-gradient(circle at top right, rgba(200,155,60,0.03), transparent 40%)" 
              }}
            >
              {/* Header Sticky Handle for Mobile */}
              <div className="sticky top-0 z-10 bg-[#FCFAF7]/90 backdrop-blur-lg border-b border-luxury-surface/50 px-6 py-5 flex justify-between items-start md:rounded-t-[32px] rounded-t-[32px]">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-luxury-surface to-[#FCFAF7] border border-white flex items-center justify-center shadow-sm p-1">
                    <img src={fotlogo} alt="Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif text-luxury-text">Share Your Experience</h2>
                  <p className="text-sm md:text-base text-luxury-muted mt-1 font-body">
                    Your feedback helps us create a more mindful and powerful wellness experience.
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-luxury-surface/50 rounded-full transition-colors group"
              >
                <X className="w-5 h-5 text-luxury-muted group-hover:text-luxury-text" />
              </button>
            </div>

            <div className="p-6 md:p-8">
              {submitStatus === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-24 h-24 bg-luxury-emerald/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-12 h-12 text-luxury-emerald" />
                  </div>
                  <h3 className="text-3xl font-serif text-luxury-text mb-4">Thank You 💚</h3>
                  <p className="text-luxury-muted text-lg max-w-sm mb-10">
                    Your feedback has been received and will help shape the future of YogaWomans.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <button
                      onClick={onClose}
                      className="px-8 py-3.5 bg-luxury-surface hover:bg-luxury-surface/80 text-luxury-text rounded-full font-medium transition-colors"
                    >
                      Close
                    </button>
                    <button
                      onClick={resetForm}
                      className="px-8 py-3.5 bg-gradient-to-r from-[#E8651A] to-[#FF8A3D] hover:shadow-[0_8px_30px_rgba(232,101,26,0.25)] hover:-translate-y-0.5 text-white rounded-full font-medium transition-all duration-300"
                    >
                      Send Another Feedback
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {errorMsg && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-50 text-red-600 text-sm rounded-2xl border border-red-100">
                      {errorMsg}
                    </motion.div>
                  )}

                  {/* Categories */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-luxury-text flex items-center gap-2">
                      What kind of feedback is this? <span className="text-luxury-gold">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        const isSelected = formData.category === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, category: cat.id }))}
                            className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all duration-300 border ${
                              isSelected 
                                ? 'bg-white border-luxury-emerald/30 shadow-[0_8px_30px_rgba(0,168,107,0.08)]' 
                                : 'bg-transparent border-luxury-surface hover:border-luxury-gold/30 hover:bg-white/50'
                            }`}
                          >
                            <Icon className={`w-6 h-6 ${isSelected ? 'text-luxury-emerald' : 'text-luxury-muted'}`} />
                            <span className={`text-sm font-medium text-center ${isSelected ? 'text-luxury-emerald' : 'text-luxury-muted'}`}>
                              {cat.label}
                            </span>
                            {isSelected && (
                              <motion.div layoutId="category-outline" className="absolute inset-0 border-2 border-luxury-emerald rounded-2xl pointer-events-none" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section Selection */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-luxury-text">Which area is this about?</label>
                    <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 -mx-6 px-6 md:mx-0 md:px-0">
                      {SECTIONS.map((sec) => (
                        <button
                          key={sec}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, section: sec === formData.section ? "" : sec }))}
                          className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                            formData.section === sec 
                              ? 'bg-luxury-text text-white border-luxury-text shadow-md' 
                              : 'bg-white text-luxury-muted border-luxury-surface hover:border-luxury-gold/40 hover:text-luxury-text'
                          }`}
                        >
                          {sec}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-luxury-text flex items-center gap-2">
                      Tell us more <span className="text-luxury-gold">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="5"
                      placeholder="• What felt confusing?&#10;• What should be improved?&#10;• Which feature would you love to see?&#10;• Did something break?"
                      className="w-full px-5 py-4 bg-white border border-luxury-surface rounded-2xl focus:ring-2 focus:ring-luxury-gold/50 focus:border-luxury-gold/50 outline-none transition-all resize-none text-luxury-text placeholder-luxury-muted/70 font-body shadow-sm"
                    />
                  </div>

                  {/* Screenshot Upload */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-luxury-text">Attach Screenshot (Optional)</label>
                    <div 
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-luxury-surface bg-white/50 hover:bg-white rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 group"
                    >
                      {screenshot ? (
                        <>
                          <div className="w-12 h-12 bg-luxury-surface rounded-full flex items-center justify-center mb-1">
                            <ImageIcon className="w-6 h-6 text-luxury-text" />
                          </div>
                          <span className="text-sm font-medium text-luxury-text text-center px-4">
                            {screenshot.name}
                          </span>
                          <span className="text-xs text-luxury-muted">Click to change</span>
                        </>
                      ) : (
                        <>
                          <div className="w-12 h-12 bg-luxury-bg rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Upload className="w-5 h-5 text-luxury-gold" />
                          </div>
                          <span className="text-sm font-medium text-luxury-text">
                            Drag & Drop or <span className="text-luxury-gold">Choose Image</span>
                          </span>
                        </>
                      )}
                    </div>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      accept="image/png, image/jpeg, image/jpg, image/webp" 
                      className="hidden" 
                    />
                  </div>

                  <div className="pt-4 border-t border-luxury-surface space-y-6">
                    {/* Stay Connected */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-luxury-text block">
                        Stay Connected (Optional)
                        <span className="block text-xs text-luxury-muted mt-1 font-normal">Leave your email if you would like a response from our team.</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={formData.anonymous}
                        placeholder="Email Address"
                        className="w-full px-5 py-4 bg-white border border-luxury-surface rounded-2xl focus:ring-2 focus:ring-luxury-gold/50 outline-none transition-all text-luxury-text placeholder-luxury-muted/70 disabled:opacity-50 disabled:bg-luxury-bg"
                      />
                    </div>

                    {/* Anonymous Toggle */}
                    <label className="flex items-start gap-4 cursor-pointer p-5 bg-white rounded-2xl border border-luxury-surface hover:shadow-sm transition-all">
                      <div className="relative mt-0.5">
                        <input
                          type="checkbox"
                          name="anonymous"
                          checked={formData.anonymous}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className={`block w-12 h-7 rounded-full transition-colors duration-300 ${formData.anonymous ? 'bg-luxury-emerald' : 'bg-luxury-surface'}`}></div>
                        <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform duration-300 shadow-sm ${formData.anonymous ? 'translate-x-5' : 'translate-x-0'}`}></div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-luxury-text block">Submit anonymously</span>
                        <span className="text-xs text-luxury-muted block mt-1">Your identity will not be attached to this feedback.</span>
                      </div>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 pb-6 md:pb-0 sticky bottom-0 bg-[#FCFAF7] md:static p-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-[#E8651A] to-[#FF8A3D] hover:shadow-[0_8px_30px_rgba(232,101,26,0.3)] hover:-translate-y-1 text-white rounded-2xl font-medium text-lg flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-80 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={loadingMsgIdx}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="text-white"
                            >
                              {LOADING_MESSAGES[loadingMsgIdx]}
                            </motion.span>
                          </AnimatePresence>
                        </>
                      ) : (
                        "Send Feedback"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
