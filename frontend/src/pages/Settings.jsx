import { useState } from "react";
import { useDashboard } from "../context/DashboardContext";
import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../components/dashboard/DashboardLayout";

export default function Settings() {
  const { state, updateSetting, profile } = useDashboard();
  const auth = useAuth();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const deleteAccount = () => {
    auth.logout();
    window.localStorage.removeItem("yogawoman_dashboard_state");
    window.localStorage.removeItem("yogawoman_profile_setup_v1");
    window.location.href = "/login";
  };

  const userName = profile?.full_name || auth.user?.name || "Yogi";

  return (
    <DashboardLayout userName={userName} title="Settings">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-[2rem] border border-wellness-border bg-wellness-glass p-6 shadow-glass backdrop-blur-[18px]">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-wellness-orange">Settings</p>
          <h1 className="mt-2 text-3xl font-heading font-extrabold text-white">Manage your experience</h1>
        </div>

        <div className="rounded-[2rem] border border-wellness-border bg-wellness-glass p-6 shadow-glass backdrop-blur-[18px] space-y-5">
          <SettingRow label="Dark mode" value={state.settings.darkMode} onChange={(value) => updateSetting("darkMode", value)} type="toggle" />
          <SettingRow label="Notifications" value={state.settings.notifications} onChange={(value) => updateSetting("notifications", value)} type="toggle" />
          <SettingRow
            label="Language"
            value={state.settings.language}
            onChange={(value) => updateSetting("language", value)}
            type="select"
            options={["English", "Hindi", "Spanish"]}
          />
          <SettingRow
            label="Account privacy"
            value={state.settings.privateProfile}
            onChange={(value) => updateSetting("privateProfile", value)}
            type="toggle"
          />
        </div>

        <div className="rounded-[2rem] border border-red-500/20 bg-red-500/5 p-6 shadow-glass">
          <h2 className="text-xl font-semibold text-red-200">Delete account</h2>
          <p className="mt-2 text-sm text-red-300/80 font-medium">
            This removes the local auth session and dashboard state from this browser.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setConfirmDelete((current) => !current)}
              className="rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 transition"
            >
              {confirmDelete ? "Cancel" : "Delete account"}
            </button>
            {confirmDelete && (
              <button
                type="button"
                onClick={deleteAccount}
                className="rounded-full border border-red-500/30 px-5 py-3 text-sm font-semibold text-red-400 hover:bg-red-500/10 transition"
              >
                Confirm delete
              </button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function SettingRow({ label, value, onChange, type, options = [] }) {
  return (
    <div className="flex flex-col gap-3 border-b border-wellness-border pb-4 last:border-none last:pb-0 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-semibold text-white">{label}</p>
        <p className="text-sm text-wellness-muted font-medium">
          {type === "toggle" ? (value ? "Enabled" : "Disabled") : value}
        </p>
      </div>
      {type === "toggle" ? (
        <button
          type="button"
          onClick={() => onChange(!value)}
          className={`h-8 w-16 rounded-full p-1 transition ${value ? "bg-wellness-orange" : "bg-white/10"}`}
        >
          <span className={`block h-6 w-6 rounded-full bg-white transition ${value ? "translate-x-8" : "translate-x-0"}`} />
        </button>
      ) : (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-2xl border border-wellness-border bg-white/5 text-white px-4 py-2.5 outline-none focus:border-wellness-orange transition-colors font-medium"
        >
          {options.map((option) => (
            <option key={option} value={option} className="bg-wellness-bg text-white">
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
