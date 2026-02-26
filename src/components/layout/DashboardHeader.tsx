import "../../styles/DashboardComponent.css";

export default function DashboardHeader({ onOpenMenu }: { onOpenMenu?: () => void }) {
  return (
    <header className="dashboard-header">
      {onOpenMenu && (
        <button onClick={onOpenMenu} className="burger-btn" aria-label="Open Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      )}
      <h2 className="header-title">VocaLink</h2>
    </header>
  );
}