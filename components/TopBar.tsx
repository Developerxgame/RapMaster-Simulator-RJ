import React from 'react';
import { NavLink } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { CashIcon, LightningBoltIcon, CalendarIcon, CogIcon } from './Icons';
import ProgressBar from './ProgressBar';

const TopBar: React.FC = () => {
  const { state } = useGame();
  const { player, gameDate } = state;

  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const monthIndex = Math.floor(((gameDate.week - 1) / 52) * 12);
  const month = monthNames[monthIndex];
  
  const weekDots = Array.from({ length: 4 }).map((_, i) => (
    <div
      key={i}
      className={`w-1.5 h-1.5 rounded-full ${
        (gameDate.week % 4) > i || (gameDate.week % 4 === 0 && i < 4) ? 'bg-ios-blue' : 'bg-ios-gray bg-opacity-30'
      }`}
    />
  ));

  const formatNumber = (num: number) => {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + 'B';
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
    return num.toFixed(0);
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 max-w-md mx-auto bg-ios-bg-secondary bg-opacity-80 backdrop-blur-md border-b border-gray-700 z-10 p-2">
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-5 h-5 text-ios-label-secondary" />
          <span className="font-semibold text-sm">{`${month} ${gameDate.year}`}</span>
          <div className="flex space-x-1 ml-1">{weekDots}</div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <CashIcon className="w-5 h-5 text-ios-green" />
            <span className="font-mono font-bold text-sm text-ios-label">{formatNumber(player.stats.netWorth)}</span>
          </div>
          <NavLink to="/settings" aria-label="Settings">
            <CogIcon className="w-6 h-6 text-ios-label-secondary hover:text-ios-label transition-colors" />
          </NavLink>
        </div>
      </div>
      <div className="flex items-center space-x-2 px-2">
         <LightningBoltIcon className="w-5 h-5 text-yellow-400" />
         <ProgressBar value={player.stats.energy} max={100} colorClass="bg-yellow-400" />
      </div>
    </header>
  );
};

export default TopBar;