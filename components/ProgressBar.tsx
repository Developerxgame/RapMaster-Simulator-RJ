
import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  colorClass?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max, colorClass = 'bg-ios-blue' }) => {
  const percentage = Math.max(0, Math.min(100, (value / max) * 100));

  return (
    <div className="w-full bg-gray-700 rounded-full h-2.5">
      <div
        className={`${colorClass} h-2.5 rounded-full transition-all duration-300 ease-in-out`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
