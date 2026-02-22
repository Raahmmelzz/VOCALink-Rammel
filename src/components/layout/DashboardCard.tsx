// DashboardCard.tsx
import React from 'react';

interface DashboardCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties; 
}

const DashboardCard: React.FC<DashboardCardProps> = ({ children, style }) => {
  return (
    <div 
      className="dashboard-card" 
      style={{ 
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid #2c2020',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'flex-start',
        // -----------------------------------
        ...style 
      }}
    >
      {children}
    </div>
  );
};

export default DashboardCard;