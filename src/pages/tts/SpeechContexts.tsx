import DashboardCard from "../../components/layout/DashboardCard";
import "../../styles/DashboardLayout.css";

export default function SpeechContexts() {
  return (
    <DashboardCard>
      <h2 className="page-title">Speech Contexts</h2>
      <p className="page-desc">
        This is where you configure text-to-speech and icon-based communication settings.
      </p>
    </DashboardCard>
  );
}