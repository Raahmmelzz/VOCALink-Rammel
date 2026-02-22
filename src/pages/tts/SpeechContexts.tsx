import DashboardCard from "../../components/layout/DashboardCard";

export default function SpeechContexts() {
  return (
    <DashboardCard>
      <h2 style={{ color: "#2aa7ff", margin: 0, fontSize: "24px" }}>
        Speech Contexts
      </h2>
      <p style={{ color: "#64748b", margin: 0 }}>
        This is where you configure text-to-speech and icon-based communication settings.
      </p>
    </DashboardCard>
  );
}