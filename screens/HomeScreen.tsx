import React from 'react';
import { useGame } from '../context/GameContext';
import { ActionType } from '../types';
import StatCard from '../components/StatCard';
import { StarIcon, UserGroupIcon, ShieldCheckIcon, CashIcon } from '../components/Icons';

const HomeScreen: React.FC = () => {
  const { state, dispatch } = useGame();
  const { player, log } = state;

  const handleAdvanceWeek = () => {
    dispatch({ type: ActionType.ADVANCE_WEEK });
  };
  
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(Math.floor(num));
  };

  return (
    <div className="space-y-6">
      <div className="bg-ios-bg-secondary p-4 rounded-xl flex items-center space-x-4">
        <img src={player.avatarUrl} alt="Player Avatar" className="w-20 h-20 rounded-full bg-ios-gray" />
        <div>
          <h1 className="text-2xl font-bold">{player.stageName}</h1>
          <p className="text-ios-label-secondary">Up and coming artist</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard icon={<StarIcon className="w-8 h-8"/>} label="Fame" value={formatNumber(player.stats.fame)} colorClass="text-yellow-400" />
        <StatCard icon={<UserGroupIcon className="w-8 h-8"/>} label="Fans" value={formatNumber(player.stats.fans)} colorClass="text-cyan-400" />
        <StatCard icon={<ShieldCheckIcon className="w-8 h-8"/>} label="Reputation" value={formatNumber(player.stats.reputation)} colorClass="text-purple-400" />
        <StatCard icon={<CashIcon className="w-8 h-8"/>} label="Net Worth" value={`$${formatNumber(player.stats.netWorth)}`} colorClass="text-ios-green" />
      </div>

      <div className="bg-ios-bg-secondary p-4 rounded-xl space-y-2">
        <h2 className="text-lg font-semibold mb-2">News & Events</h2>
        <div className="h-24 overflow-y-auto text-sm text-ios-label-secondary font-mono">
          {log.slice().reverse().map((entry, index) => (
            <p key={index} className="opacity-75">{`> ${entry}`}</p>
          ))}
        </div>
      </div>
      
      <button
        onClick={handleAdvanceWeek}
        className="w-full py-4 text-lg bg-ios-blue text-white font-bold rounded-xl shadow-md transition-transform transform hover:scale-105"
      >
        Next Week
      </button>
    </div>
  );
};

export default HomeScreen;