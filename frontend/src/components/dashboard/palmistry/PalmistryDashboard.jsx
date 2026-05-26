import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UploadCloud, PlayCircle, Bell, ChevronRight, CheckCircle, BrainCircuit, Shield, Star, Heart, RefreshCw, Sparkles, Upload
} from "lucide-react";
import { usePalmistry } from "../../../hooks/usePalmistry";
import { useAuth } from "../../../context/AuthContext";
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer 
} from "recharts";
import palmImage from "../../../assets/images/palmimage.png";

// Helper function to convert Base64 Data URL to a File object
function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

// Orbit animation component for the visualization card
function OrbitRing({ size, duration, reverse = false, dashed = false, color = "#00E676", opacity = "opacity-50" }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      <motion.div
        className={`rounded-full ${size} border ${dashed ? 'border-dashed' : 'border-solid'} ${opacity}`}
        style={{ borderColor: color, boxShadow: dashed ? 'none' : `0 0 15px ${color}40 inset` }}
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

const radarData = [
  { subject: 'Mind', A: 85, fullMark: 100 },
  { subject: 'Body', A: 70, fullMark: 100 },
  { subject: 'Energy', A: 90, fullMark: 100 },
  { subject: 'Emotions', A: 65, fullMark: 100 },
  { subject: 'Spirit', A: 88, fullMark: 100 },
];

export default function PalmistryDashboard() {
  const { 
    history, 
    isUploading, 
    isAnalyzing, 
    currentImage, 
    currentReport, 
    error, 
    processPalmImage 
  } = usePalmistry();

  const { user } = useAuth();
  const fileInputRef = useRef(null);
  const [isHoveringDrop, setIsHoveringDrop] = useState(false);

  useEffect(() => {
    const pendingPalmImage = sessionStorage.getItem("pending_palm_image");
    if (pendingPalmImage && user) {
      sessionStorage.removeItem("pending_palm_image");
      sessionStorage.removeItem("pending_action_type");
      try {
        const file = dataURLtoFile(pendingPalmImage, "palm_image.png");
        processPalmImage(file);
      } catch (err) {
        console.error("Failed to convert cached palm image:", err);
      }
    }
  }, [user, processPalmImage]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processPalmImage(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsHoveringDrop(true);
  };

  const handleDragLeave = () => setIsHoveringDrop(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsHoveringDrop(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processPalmImage(file);
  };

  // The visualization displays the uploaded image, or defaults to the reference palm
  const displayImage = currentImage || palmImage;

  return (
    <div className="space-y-6 animate-fade-in pb-12 font-sans text-white bg-transparent">
      
      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-white flex items-center gap-2">
            Palmistry <span className="text-[#D4A64F] text-xl">✨</span>
          </h1>
          <p className="text-white/50 text-sm mt-1">
            AI-Powered Palm Reading for Your Life Guidance
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:bg-white/5 transition-colors text-xs font-medium">
            <PlayCircle size={16} /> How it works?
          </button>
          <button className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/5 transition-colors relative">
            <Bell size={16} />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      {/* ─── Top Grid (3 Columns) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 1. Upload Card */}
        <div className="bg-wellness-glass border border-wellness-border shadow-glass backdrop-blur-[18px] rounded-[2rem] p-6 flex flex-col h-[400px]">
          <h3 className="text-lg font-semibold text-white mb-2">Upload Your Palm</h3>
          <p className="text-white/50 text-xs mb-6 max-w-[200px]">
            Upload a clear image of your palm for accurate AI analysis.
          </p>
          
          <div 
            className={`flex-1 relative rounded-xl border border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center p-6 mb-4
              ${isHoveringDrop ? 'border-[#00E676] bg-[#00E676]/5' : 'border-[#1E7A46] bg-transparent hover:bg-white/5'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !isUploading && !isAnalyzing && fileInputRef.current?.click()}
          >
            {isUploading ? (
              <div className="flex flex-col items-center justify-center">
                <RefreshCw className="animate-spin text-[#00E676] mb-3" size={32} />
                <p className="text-white/70 text-sm">Uploading...</p>
              </div>
            ) : isAnalyzing ? (
              <div className="flex flex-col items-center justify-center">
                <Sparkles className="text-[#00E676] mb-3 animate-pulse" size={32} />
                <p className="text-[#00E676] text-sm">Analyzing...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center cursor-pointer">
                <UploadCloud size={32} className="text-[#00E676] mb-4" />
                <p className="text-white/80 text-sm mb-4 max-w-[200px]">
                  Drag & Drop your palm image here or click to upload
                </p>
                <p className="text-white/40 text-xs uppercase tracking-wider">
                  JPG, PNG up to 10MB
                </p>
              </div>
            )}
            <input type="file" ref={fileInputRef} className="hidden" accept="image/png, image/jpeg" onChange={handleFileChange} />
          </div>

          <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#0d4f29] to-[#0a381d] border border-[#1E7A46] text-white text-sm font-semibold hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            <Upload size={16} /> Upload Image
          </button>
        </div>

        {/* 2. Palm Visualization Card */}
        <div className="bg-wellness-glass border border-wellness-border shadow-glass backdrop-blur-[18px] rounded-[2rem] p-6 flex flex-col h-[400px] relative overflow-hidden items-center justify-center group">
          {/* Background Concentric Circles */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <div className="w-[320px] h-[320px] rounded-full border border-[#00E676]/20" />
            <div className="w-[260px] h-[260px] absolute rounded-full border border-dashed border-[#00E676]/30" />
            <div className="w-[200px] h-[200px] absolute rounded-full border border-[#00E676]/40" />
          </div>
          
          {/* Animated rings */}
          <OrbitRing size="w-[260px] h-[260px]" duration={40} dashed color="#00E676" opacity="opacity-30" />
          <OrbitRing size="w-[200px] h-[200px]" duration={25} reverse color="#00E676" opacity="opacity-20" />

          {/* Brackets */}
          <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-[#00E676]" />
          <div className="absolute top-6 right-6 w-4 h-4 border-t-2 border-r-2 border-[#00E676]" />
          <div className="absolute bottom-6 left-6 w-4 h-4 border-b-2 border-l-2 border-[#00E676]" />
          <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-[#00E676]" />

          {/* Palm Image */}
          <div className="relative z-10 w-[160px] sm:w-[180px] h-full flex items-center justify-center mix-blend-lighten">
            <img src={displayImage} alt="Palm Scan" className="w-full h-auto object-contain filter contrast-125 saturate-50 sepia-[0.3]" />
            {(isAnalyzing) && (
               <div className="absolute inset-0 overflow-hidden rounded-full">
                 <motion.div className="w-full h-1 bg-[#00E676] shadow-[0_0_20px_#00E676]" animate={{ y: ["0%", "400%", "0%"] }} transition={{ duration: 2, ease: "linear", repeat: Infinity }} />
               </div>
            )}
          </div>
          
          <div className="absolute bottom-8 px-3 py-1 bg-[#00E676]/10 border border-[#00E676]/30 rounded-full flex items-center gap-1.5 z-20">
            <CheckCircle size={12} className="text-[#00E676]" />
            <span className="text-[#00E676] text-xs font-medium">Image Ready</span>
          </div>
        </div>

        {/* 3. AI Analysis Summary */}
        <div className="bg-wellness-glass border border-wellness-border shadow-glass backdrop-blur-[18px] rounded-[2rem] p-6 flex flex-col h-[400px]">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-white">AI Analysis Summary</h3>
            <span className="px-2 py-0.5 rounded-full bg-[#00E676]/20 text-[#00E676] text-[10px] font-bold uppercase tracking-wider">New</span>
          </div>
          <p className="text-white/50 text-xs leading-relaxed mb-6">
            Your palm holds unique stories.<br/>Let's decode your inner blueprint.
          </p>

          <div className="flex-1 space-y-2">
            <SummaryRow icon={Heart} label="Emotional Energy" value={currentReport?.metrics?.emotionalEnergy || "Balanced"} color="#00E676" />
            <SummaryRow icon={BrainCircuit} label="Stress Levels" value={currentReport?.metrics?.stressLevels || "Moderate"} color="#D4A64F" />
            <SummaryRow icon={Shield} label="Inner Strength" value={currentReport?.metrics?.innerStrength || "Strong"} color="#00E676" />
            <SummaryRow icon={Star} label="Life Potential" value="High" color="#00E676" />
            <SummaryRow icon={Sparkles} label="Wellness Aura" value={currentReport?.metrics?.wellnessAura || "Positive"} color="#00E676" />
          </div>

          <button className="w-full py-3 mt-4 rounded-full border border-white/20 bg-transparent text-white/80 text-sm font-semibold hover:bg-white/5 transition-all flex items-center justify-center gap-2">
            View Full Analysis <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ─── Second Grid (3 Columns) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Analysis History */}
        <div className="bg-wellness-glass border border-wellness-border shadow-glass backdrop-blur-[18px] rounded-[2rem] p-6 h-[320px] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-white">Recent Analysis History</h3>
            <button className="text-white/50 text-xs px-3 py-1 border border-white/10 rounded-full hover:bg-white/5 transition-colors">
              View All
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto no-scrollbar space-y-2">
            {history.length > 0 ? history.map((reading, idx) => (
              <HistoryItem 
                key={reading.id} 
                image={reading.imageUrl}
                date={new Date(reading.date).toLocaleString()}
                isLatest={idx === 0}
                insight="You are entering a period of growth and emotional clarity. Stay focused on your goals."
              />
            )) : (
              <>
                <HistoryItem image={palmImage} date="Today, 10:30 AM" isLatest insight="You are entering a period of growth and emotional clarity. Stay focused on your goals." />
                <HistoryItem image={palmImage} date="18 May 2026, 09:15 AM" insight="A time of transformation and new opportunities. Trust your inner voice." />
                <HistoryItem image={palmImage} date="10 May 2026, 08:45 AM" insight="Your energy is strong. Maintain balance between work and rest." />
              </>
            )}
          </div>
        </div>

        {/* Palm Insights Cards (2x2 Grid) */}
        <div className="bg-wellness-glass border border-wellness-border shadow-glass backdrop-blur-[18px] rounded-[2rem] p-6 h-[320px] flex flex-col">
          <h3 className="text-base font-semibold text-white mb-4">Palm Insights</h3>
          <div className="flex-1 grid grid-cols-2 gap-3">
            <InsightStatCard value="84%" label="Emotional Balance" icon={Heart} color="#00E676" />
            <InsightStatCard value="72%" label="Mental Clarity" icon={BrainCircuit} color="#D4A64F" />
            <InsightStatCard value="88%" label="Inner Strength" icon={Shield} color="#00E676" />
            <InsightStatCard value="90%" label="Life Potential" icon={Star} color="#D4A64F" />
          </div>
        </div>

        {/* Energy Chart */}
        <div className="bg-wellness-glass border border-wellness-border shadow-glass backdrop-blur-[18px] rounded-[2rem] p-6 h-[320px] flex flex-col relative">
          <div className="flex items-center justify-between mb-2 z-10">
            <h3 className="text-base font-semibold text-white">Your Energy Chart</h3>
            <select className="bg-transparent border border-white/10 text-white/60 text-xs rounded-md px-2 py-1 outline-none">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          
          <div className="flex-1 min-h-[200px] w-full relative z-10 -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }} />
                <Radar name="Energy" dataKey="A" stroke="#00E676" strokeWidth={1.5} fill="#00E676" fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-6 text-[10px] text-white/50">
            <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-[#00E676]"></span> Current</span>
            <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-white/20 border-t border-dashed border-white/40"></span> Previous</span>
          </div>
        </div>
      </div>

      {/* ─── Bottom Premium Banner ─── */}
      <div className="relative overflow-hidden rounded-[2rem] border border-[#D4A64F]/35 bg-wellness-glass backdrop-blur-[18px] shadow-glass flex flex-col md:flex-row items-center justify-between p-6">
        <div className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-lighten" style={{ backgroundImage: "url('/path/to/mystic-hands.png')" }} />
        
        <div className="relative z-10 flex items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-full border border-[#D4A64F]/30 bg-[#D4A64F]/10 flex items-center justify-center shrink-0">
            <Star className="text-[#D4A64F]" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#D4A64F] mb-1">Want Deeper Insights?</h2>
            <p className="text-white/60 text-sm max-w-xl">
              Unlock advanced palm reading with personalized remedies, timing guidance and life path analysis.
            </p>
          </div>
        </div>
        
        <button className="relative z-10 shrink-0 mt-4 md:mt-0 px-6 py-3 rounded-full bg-gradient-to-r from-[#8e6b23] to-[#cba343] text-black text-sm font-bold shadow-[0_0_15px_rgba(212,166,79,0.2)] hover:shadow-[0_0_25px_rgba(212,166,79,0.4)] transition-all flex items-center gap-2">
           Unlock Premium Insights <ChevronRight size={16} />
        </button>
      </div>

    </div>
  );
}

// ─── Helper Components ───

function SummaryRow({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <div className="flex items-center gap-3">
        <Icon size={14} style={{ color }} />
        <span className="text-xs text-white/80">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-white font-medium">{value}</span>
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      </div>
    </div>
  );
}

function HistoryItem({ image, date, isLatest, insight }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/10 hover:border-wellness-border transition-all cursor-pointer border border-transparent">
      <img src={image} alt="Thumb" className="w-12 h-12 object-cover rounded-lg shrink-0 filter contrast-125 saturate-50 sepia-[0.3]" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs text-white/60">{date}</p>
          {isLatest && <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-[#00E676]/20 text-[#00E676]">Latest</span>}
        </div>
        <p className="text-[11px] text-white/80 leading-relaxed line-clamp-2">AI Insight: {insight}</p>
      </div>
      <ChevronRight size={14} className="text-white/20 self-center" />
    </div>
  );
}

function InsightStatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="border border-wellness-border rounded-2xl flex flex-col items-center justify-center p-4 bg-white/5 hover:bg-white/10 hover:border-wellness-glow/20 transition-colors group relative overflow-hidden">
      <div className="absolute inset-0 border border-transparent group-hover:border-wellness-border rounded-2xl transition-colors" />
      <Icon size={20} style={{ color }} className="mb-2" />
      <p className="text-xl font-semibold text-white mb-1">{value}</p>
      <p className="text-[10px] text-white/50 text-center">{label}</p>
    </div>
  );
}
