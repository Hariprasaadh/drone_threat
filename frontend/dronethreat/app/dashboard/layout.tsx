"use client"; // Ensure client-side state works

import { useState } from "react";
import Navbar from "@/components/DasNavbar";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <html lang="en">
      <body className="relative flex">
        {/* Sidebar with toggle */}
        <Sidebar isOpen={false}  />

        {/* Overlay (Only visible when sidebar is open on mobile) */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 md:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 min-h-screen transition-all">
          <Navbar toggleSidebar={toggleSidebar} />
          <main className="p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
