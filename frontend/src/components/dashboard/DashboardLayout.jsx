import { useState } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import GlobalAudioPlayer from "../ui/player/GlobalAudioPlayer";
import VideoPlayerOverlay from "../ui/player/VideoPlayerOverlay";

export default function DashboardLayout({
  children,
  userName = "Yogi",
  title,
  query,
  onQueryChange,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-wellness-bg text-wellness-dark">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area — offset for desktop sidebar (268px) */}
      <div className="lg:pl-[268px]">
        <TopNavbar
          onMenuClick={() => setSidebarOpen(true)}
          userName={userName}
          title={title}
          query={query}
          onQueryChange={onQueryChange}
        />

        <main className="space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-7">
          {children}
        </main>
      </div>

      {/* Global Media Players */}
      <GlobalAudioPlayer />
      <VideoPlayerOverlay />
    </div>
  );
}
