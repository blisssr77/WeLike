import { Outlet } from "react-router-dom";

import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import GuestBanner from "@/components/shared/GuestBanner";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      {/* 1. TOPBAR (Mobile Only) */}
      {/* This component usually has 'md:hidden' in its CSS, so it vanishes on desktop */}
      <Topbar />

      {/* 2. LEFT SIDEBAR (Desktop Only) */}
      {/* This usually has 'hidden md:flex' so it vanishes on mobile */}
      <LeftSidebar />

      {/* 3. MAIN CONTENT AREA */}
      <section className="flex flex-1 h-full flex-col">
        {/* Banner sits here so it pushes the page content down */}
        <GuestBanner />
        
        <div className="flex-1 overflow-y-scroll custom-scrollbar">
           <Outlet />
        </div>
      </section>

      {/* 4. BOTTOMBAR (Mobile Only) */}
      <Bottombar />
    </div>
  );
};

export default RootLayout;