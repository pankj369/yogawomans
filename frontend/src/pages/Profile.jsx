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
        <div className="rounded-[2rem] border border-white/60 bg-white/70 p-6 shadow-[0_20px_60px_rgba(72,42,8,0.1)]">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b6c48]">Profile</p>
          <h1 className="mt-2 text-3xl font-heading font-extrabold">Your wellness profile</h1>
          <p className="mt-2 text-sm text-[#666]">Edit your personal details, goals, saved sessions, and favorite classes.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold ${
                activeTab === tab ? "bg-[#2E7D32] text-white" : "bg-white/70 text-[#5f5347]"
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
          className="rounded-[2rem] border border-white/60 bg-white/70 p-6 shadow-[0_20px_60px_rgba(72,42,8,0.1)]"
        >
          {activeTab === "Personal" && (
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-semibold text-[#4a3a2b]">Full name</span>
                <input value={draftName} onChange={(e) => setDraftName(e.target.value)} className="w-full rounded-2xl border border-[#ead7be] bg-white px-4 py-3 outline-none" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-semibold text-[#4a3a2b]">Email</span>
                <input value={draftEmail} onChange={(e) => setDraftEmail(e.target.value)} className="w-full rounded-2xl border border-[#ead7be] bg-white px-4 py-3 outline-none" />
              </label>
              <div className="md:col-span-2 flex gap-3">
                <button type="button" onClick={savePersonal} className="rounded-full bg-[#2E7D32] px-5 py-3 text-sm font-semibold text-white">
                  Save changes
                </button>
                <button type="button" className="rounded-full border border-[#d6c5af] px-5 py-3 text-sm font-semibold text-[#6c5847]">
                  Change avatar
                </button>
              </div>
            </div>
          )}

          {activeTab === "Goals" && (
            <div className="flex flex-wrap gap-2">
              {(profile?.data?.goals || []).map((goal) => (
                <span key={goal} className="rounded-full bg-[#eff7ea] px-4 py-2 text-sm font-semibold text-[#215c28]">
                  {goal}
                </span>
              ))}
              {!profile?.data?.goals?.length && <p className="text-sm text-[#666]">No goals set yet.</p>}
            </div>
          )}

          {activeTab === "Health" && (
            <div className="grid gap-3 md:grid-cols-2">
              {[
                ["Conditions", profile?.data?.medicalConditions || "Not provided"],
                ["Injuries", profile?.data?.injuries || "Not provided"],
                ["Stress level", profile?.data?.stressLevel || "Not provided"],
                ["Sleep quality", profile?.data?.sleepQuality || "Not provided"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-[#faf4ec] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b6c48]">{label}</p>
                  <p className="mt-2 text-sm font-semibold text-[#2c251d]">{value}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Sessions" && (
            <div className="grid gap-3 md:grid-cols-2">
              {dashboardInsights.map((item) => (
                <div key={item.id} className="rounded-2xl bg-[#faf4ec] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b6c48]">{item.label}</p>
                  <p className="mt-2 text-2xl font-heading font-extrabold text-[#2c251d]">{item.value}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Favorites" && (
            <div className="grid gap-4 md:grid-cols-2">
              {favorites.map((item) => (
                <div key={item.id} className="overflow-hidden rounded-[1.5rem] border border-[#ead7be] bg-white">
                  <img src={item.image} alt={item.title} className="h-40 w-full object-cover" />
                  <div className="p-4">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-[#666]">{item.instructor}</p>
                  </div>
                </div>
              ))}
              {!favorites.length && <p className="text-sm text-[#666]">No favorites yet.</p>}
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
