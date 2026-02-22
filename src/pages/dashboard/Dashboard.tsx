import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom"; 
import DashboardHeader from "../../components/layout/DashboardHeader";
import DashboardFooter from "../../components/layout/DashboardFooter";
import DashboardCard from "../../components/layout/DashboardCard";
import DashboardSidebar from "../../components/layout/DashboardSidebar"; // <-- Import it here

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const isOverview = location.pathname === "/dashboard" || location.pathname === "/dashboard/";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f6f8fb", position: "relative" }}>
      
      <DashboardHeader onOpenMenu={() => setIsSidebarOpen(true)} />

      {/* The New Clean Sidebar Component */}
      <DashboardSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: "24px", marginLeft: isSidebarOpen ? "250px" : "0", transition: "margin-left 0.3s ease-in-out" }}>
        {isOverview ? (
          <DashboardCard>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <h2 style={{ color: "#2aa7ff", margin: 0, fontSize: "24px" }}>Overview</h2>
              <p style={{ color: "#64748b", margin: 0, lineHeight: "1.6" }}>
                VocalLink is designed to bridge the communication gap for students with specialized needs. Here in the dashboard, you can manage your student roster, configure text-to-speech settings, and access various tools to enhance your teaching experience. Use the menu on the left to navigate through different sections of the dashboard. Each section is tailored to help you create a more inclusive and effective learning environment for all your students.
              </p>
            </div>
          </DashboardCard>
        ) : (
          <Outlet />
        )}
      </main>

      <DashboardFooter />
    </div>
  );
}