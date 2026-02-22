import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  const { user, logout } = useAuth();

  const navStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? "#646cff" : "#334155",
    fontWeight: isActive ? "bold" : "normal", 
    textDecoration: "none",
    padding: "8px 0", 
    display: "block" 
  });

  return (
    <>
      {/* Sidebar Overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 999, cursor: "pointer" }}
        />
      )}

      {/* Sidebar Navigation */}
      <nav 
        style={{
          position: "fixed",
          top: 0,
          left: isOpen ? "0" : "-300px", 
          width: "250px",
          height: "100vh",
          background: "#fff",
          padding: "80px 20px 20px", 
          boxShadow: "4px 0 15px rgba(0,0,0,0.1)",
          transition: "left 0.3s ease-in-out",
          zIndex: 1000, 
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}
      >
        <button 
          onClick={onClose}
          style={{ position: "absolute", top: "20px", right: "20px", background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}
        >
          ✕
        </button>

        <h3 style={{ marginTop: 0, marginBottom: "10px" }}>System Menu</h3>
        
        <NavLink end onClick={onClose} to="/dashboard" style={navStyle}>
          Overview
        </NavLink>
        
        <NavLink onClick={onClose} to="/dashboard/students" style={navStyle}>
          Manage Students
        </NavLink>
        
        <NavLink onClick={onClose} to="/dashboard/tts" style={navStyle}>
          Text-to-Speech Config
        </NavLink> 
        
        <div style={{ marginTop: "auto", borderTop: "1px solid #e5e7eb", paddingTop: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: "bold", color: "#213547", fontSize: "1rem" }}>
              {user?.username || "Educator"}
            </span>
            <span style={{ color: "#64748b", fontSize: "0.85rem", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user?.email || "user@vocalink.edu"}
            </span>
          </div>

          <button 
            onClick={() => {
              onClose();
              logout();
            }}
            style={{ 
              background: "#fee2e2", border: "none", color: "#ef4444", fontWeight: "bold", 
              cursor: "pointer", padding: "10px 12px", borderRadius: "8px", fontSize: "0.95rem",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", transition: "background 0.2s"
            }}
          >
            Log Out
          </button>
        </div>
      </nav>
    </>
  );
}