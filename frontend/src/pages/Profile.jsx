import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useDashboard } from "../context/DashboardContext";
import DashboardLayout from "../components/dashboard/DashboardLayout";

const tabs = ["Personal", "Goals", "Health", "Sessions", "Favorites"];

export default function Profile() {
  const auth = useAuth();
  const { profile, state, dashboardInsights, featuredSessions } = useDashboard();
  const [activeTab, setActiveTab] = useState("Personal");
  const [draftName, setDraftName] = useState(auth.user?.name || "");
  const [draftEmail, setDraftEmail] = useState(auth.user?.email || "");

  const favorites = useMemo(
    () => featuredSessions.filter((session) => state.favorites.includes(session.id)),
    [featuredSessions, state.favorites]
  );

  const savePersonal = () => {
    auth.updateUser({ name: draftName, email: draftEmail });
  };

  const userName = profile?.full_name || auth.user?.name || "Yogi";

  return (
    <DashboardLayout userName={userName} title="Profile">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-[2rem] border border-wellness-border bg-wellness-glass p-6 shadow-glass backdrop-blur-[18px]">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-wellness-orange">Profile</p>
          <h1 className="mt-2 text-3xl font-heading font-extrabold text-white">Your wellness profile</h1>
          <p className="mt-2 text-sm text-wellness-muted font-medium">Edit your personal details, goals, saved sessions, and favorite classes.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                activeTab === tab ? "bg-wellness-orange text-white shadow-md" : "bg-white/5 border border-wellness-border text-wellness-muted hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] border border-wellness-border bg-wellness-glass p-6 shadow-glass backdrop-blur-[18px]"
        >
          {activeTab === "Personal" && (
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-bold text-white block">Full name</span>
                <input value={draftName} onChange={(e) => setDraftName(e.target.value)} className="w-full rounded-2xl border border-wellness-border bg-white/5 text-white px-4 py-3 outline-none focus:border-wellness-orange focus:bg-white/10 transition-all font-medium" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-bold text-white block">Email</span>
                <input value={draftEmail} onChange={(e) => setDraftEmail(e.target.value)} className="w-full rounded-2xl border border-wellness-border bg-white/5 text-white px-4 py-3 outline-none focus:border-wellness-orange focus:bg-white/10 transition-all font-medium" />
              </label>
              <div className="md:col-span-2 flex gap-3 mt-4">
                <button type="button" onClick={savePersonal} className="rounded-full bg-wellness-glow hover:bg-wellness-glow/90 px-5 py-3 text-sm font-extrabold text-black transition-all shadow-glow">
                  Save changes
                </button>
                <button type="button" className="rounded-full border border-wellness-border bg-white/5 px-5 py-3 text-sm font-bold text-white hover:bg-white/10 transition-all">
                  Change avatar
                </button>
              </div>
            </div>
          )}

          {activeTab === "Goals" && (
            <div className="flex flex-wrap gap-2">
              {(profile?.data?.goals || []).map((goal) => (
                <span key={goal} className="rounded-full bg-white/5 border border-wellness-border px-4 py-2 text-sm font-bold text-wellness-glow">
                  {goal}
                </span>
              ))}
              {!profile?.data?.goals?.length && <p className="text-sm text-wellness-muted font-medium">No goals set yet.</p>}
            </div>
          )}

          {activeTab === "Health" && (
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["Conditions", profile?.data?.medicalConditions || "Not provided"],
                ["Injuries", profile?.data?.injuries || "Not provided"],
                ["Stress level", profile?.data?.stressLevel || "Not provided"],
                ["Sleep quality", profile?.data?.sleepQuality || "Not provided"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-wellness-border bg-white/5 p-4 shadow-glass">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-wellness-orange">{label}</p>
                  <p className="mt-2 text-sm font-bold text-white">{value}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Sessions" && (
            <div className="grid gap-4 md:grid-cols-2">
              {dashboardInsights.map((item) => (
                <div key={item.id} className="rounded-2xl border border-wellness-border bg-white/5 p-4 shadow-glass">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-wellness-orange">{item.label}</p>
                  <p className="mt-2 text-2xl font-heading font-extrabold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Favorites" && (
            <div className="grid gap-4 md:grid-cols-2">
              {favorites.map((item) => (
                <div key={item.id} className="overflow-hidden rounded-[1.5rem] border border-wellness-border bg-white/5 shadow-glass group transition-all duration-300 hover:border-wellness-glow/20">
                  <img src={item.image} alt={item.title} className="h-40 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="p-4">
                    <p className="font-semibold text-white group-hover:text-wellness-glow transition-colors">{item.title}</p>
                    <p className="text-sm text-wellness-muted font-medium mt-1">{item.instructor}</p>
                  </div>
                </div>
              ))}
              {!favorites.length && <p className="text-sm text-wellness-muted font-medium">No favorites yet.</p>}
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
