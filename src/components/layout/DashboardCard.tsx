import React from 'react';
import "../../styles/DashboardComponent.css";

interface DashboardCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties; 
}

const DashboardCard: React.FC<DashboardCardProps> = ({ children, style }) => {
  return (
    <div className="dashboard-card" style={style}>
      {children}
    </div>
  );
};

export default DashboardCard;