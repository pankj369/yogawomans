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
    <div className="h-screen w-full bg-wellness-black text-white relative overflow-hidden flex">
      {/* Immersive cinematic background glows for the command center */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top_left,_rgba(0,230,118,0.15),_transparent_50%)] pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_top_right,_rgba(233,120,31,0.1),_transparent_40%)] pointer-events-none z-0" />
      
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area — offset for desktop sidebar (268px) and independently scrollable */}
      <div className="flex-1 h-full overflow-y-auto lg:pl-[268px] relative z-10 no-scrollbar">
        <TopNavbar
          onMenuClick={() => setSidebarOpen(true)}
          userName={userName}
          title={title}
          query={query}
          onQueryChange={onQueryChange}
        />

        <main className="space-y-6 px-4 py-6 pb-32 sm:px-6 lg:px-8 lg:py-7 lg:pb-32">
          {children}
        </main>
      </div>

      {/* Global Media Players */}
      <div className="relative z-50">
        <GlobalAudioPlayer />
        <VideoPlayerOverlay />
      </div>
    </div>
  );
}
