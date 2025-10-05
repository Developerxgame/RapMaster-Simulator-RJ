
import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  colorClass?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, colorClass = 'text-ios-label' }) => {
  return (
    <div className="ios-card p-4 flex items-center space-x-4">
      <div className="text-ios-blue">{icon}</div>
      <div>
        <p className="text-sm text-ios-label-secondary">{label}</p>
        <p className={`text-xl font-bold ${colorClass}`}>{value}</p>
      </div>
    </div>
  );
};

export default StatCard;