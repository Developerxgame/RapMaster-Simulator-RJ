import React from 'react';
import { useGame } from '../context/GameContext';
import { ActionType } from '../types';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import { XP_THRESHOLDS } from '../context/GameContext';
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

  const currentLevelXp = player.careerXp - (XP_THRESHOLDS[player.careerLevel - 1] || 0);
  const nextLevelXpThreshold = XP_THRESHOLDS[player.careerLevel] - (XP_THRESHOLDS[player.careerLevel - 1] || 0);
  const isMaxLevel = player.careerLevel >= XP_THRESHOLDS.length - 1;


  return (
    <div className="space-y-6">
      <div className="bg-ios-bg-secondary p-4 rounded-xl flex items-center space-x-4">
        <img src={player.avatarUrl} alt="Player Avatar" className="w-20 h-20 rounded-full bg-ios-gray" />
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{player.stageName}</h1>
          <p className="text-ios-label-secondary font-semibold">Career Level: {player.careerLevel}</p>
           <div className="mt-2">
                <ProgressBar value={currentLevelXp} max={isMaxLevel ? currentLevelXp : nextLevelXpThreshold} colorClass="bg-purple-500" />
                <p className="text-xs text-right text-ios-label-secondary mt-1">
                    {isMaxLevel ? 'MAX LEVEL' : `${currentLevelXp.toLocaleString()} / ${nextLevelXpThreshold.toLocaleString()} XP`}
                </p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard icon={<StarIcon className="w-8 h-8"/>} label="Fame" value={`${formatNumber(player.stats.fame)} / 100`} colorClass="text-yellow-400" />
        <StatCard icon={<UserGroupIcon className="w-8 h-8"/>} label="Fans" value={formatNumber(player.stats.fans)} colorClass="text-cyan-400" />
        <StatCard icon={<ShieldCheckIcon className="w-8 h-8"/>} label="Reputation" value={`${formatNumber(player.stats.reputation)} / 100`} colorClass="text-purple-400" />
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