import { useAuth } from "../../context/AuthContext";

export default function DashboardHeader() {
  const { logout } = useAuth();

  return (
    <header
      style={{
        background: "#ffffff",
        padding: "16px 24px",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 style={{ margin: 0 }}>Dashboard</h2>

      <button
        onClick={logout}
        style={{
          border: "none",
          padding: "10px 14px",
          borderRadius: 10,
          cursor: "pointer",
          background: "linear-gradient(135deg,#2f80ff,#00e1ff)",
          color: "#fff",
          fontWeight: 700,
        }}
      >
        Logout
      </button>
    </header>
  );
}