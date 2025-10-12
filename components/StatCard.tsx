
import React from 'react';
import ProgressBar from './ProgressBar';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  colorClass?: string;
  progressValue?: number;
  progressMax?: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, colorClass = 'text-ios-label', progressValue, progressMax }) => {
  return (
    <div className="ios-card p-4 flex flex-col justify-between">
      <div className="flex items-center space-x-4">
        <div className="text-ios-blue">{icon}</div>
        <div>
          <p className="text-sm text-ios-label-secondary">{label}</p>
          <p className={`text-xl font-bold ${colorClass}`}>{value}</p>
        </div>
      </div>
      {(progressValue !== undefined && progressMax !== undefined) && (
        <div className="mt-2">
           <ProgressBar value={progressValue} max={progressMax} />
        </div>
      )}
    </div>
  );
};

export default StatCard;