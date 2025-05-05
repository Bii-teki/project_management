"use client";
import { useState } from "react";
import Navbar from "./navbar/navbar";
import MainContent from "./navbar/maincontent";

export default function DashboardPage() {
  const [activePage, setActivePage] = useState("overview");

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sticky Left Navbar (auto height) */}
      <div className="sticky top-0 left-0 h-fit">
        <Navbar activePage={activePage} setActivePage={setActivePage} />
      </div>

      {/* Scrollable Main Content (right side) */}
      <div className="flex-1 p-8 overflow-y-auto">
        <MainContent activePage={activePage} />
      </div>
    </div>
  );
}