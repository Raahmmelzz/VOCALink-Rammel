import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom"; 
import DashboardHeader from "../../components/layout/DashboardHeader";
import DashboardFooter from "../../components/layout/DashboardFooter";
import DashboardCard from "../../components/layout/DashboardCard";
import DashboardSidebar from "../../components/layout/DashboardSidebar"; 
import "../../styles/DashboardLayout.css";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const isOverview = location.pathname === "/dashboard" || location.pathname === "/dashboard/";
  
  return (
    <div className="dashboard-layout">
      
      <DashboardHeader onOpenMenu={() => setIsSidebarOpen(true)} />

      <DashboardSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <main className={`dashboard-main ${isSidebarOpen ? "sidebar-open" : ""}`}>
        {isOverview ? (
          <DashboardCard>
            <div className="manage-students-container">
              <h2 className="page-title">Overview</h2>
              <p className="page-desc">
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