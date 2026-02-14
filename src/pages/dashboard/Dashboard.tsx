import { useAuth } from "../../context/AuthContext";
import DashboardHeader from "../../components/layout/DashboardHeader";
import DashboardFooter from "../../components/layout/DashboardFooter";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f6f8fb",
      }}
    >
      {/* Header */}
      <DashboardHeader />

      {/* Main content */}
      <main
        style={{
          flex: 1,
          padding: 24,
          maxWidth: 1100,
          width: "100%",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: 20,
            borderRadius: 14,
            border: "1px solid #e5e7eb",
          }}
        >
          <h1 style={{ marginTop: 0 }}>Welcome to your Dashboard</h1>
          <p style={{ color: "#64748b" }}>
            Logged in as <b>{user?.username}</b> ({user?.email})
          </p>
        </div>

        <div
          style={{
            marginTop: 20,
            background: "#fff",
            padding: 20,
            borderRadius: 14,
            border: "1px solid #e5e7eb",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Quick Actions</h2>
          <ul style={{ margin: 0, color: "#334155" }}>
            <li>Create Activities</li>
            <li>Upload Lessons</li>
            <li>Manage Students</li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <DashboardFooter />
    </div>
  );
}