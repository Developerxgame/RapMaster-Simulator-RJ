import React from 'react';
import { useGame } from '../context/GameContext';
import { ActionType } from '../types';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import { XP_THRESHOLDS } from '../context/GameContext';
import { StarIcon, UserGroupIcon, ShieldCheckIcon, CashIcon, GlobeIcon } from '../components/Icons';

const HomeScreen: React.FC = () => {
  const { state, dispatch } = useGame();
  const { player, log, weeklyIncome, weeklyExpenses } = state;

  const handleAdvanceWeek = () => {
    dispatch({ type: ActionType.ADVANCE_WEEK });
  };
  
  const formatNumber = (num: number) => {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + 'B';
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  const currentLevelXp = player.careerXp - (XP_THRESHOLDS[player.careerLevel - 1] || 0);
  const nextLevelXpThreshold = XP_THRESHOLDS[player.careerLevel] - (XP_THRESHOLDS[player.careerLevel - 1] || 0);
  const isMaxLevel = player.careerLevel >= XP_THRESHOLDS.length - 1;

  const totalFollowers = player.socialMedia.rapGramFollowers + player.socialMedia.rapifyFollowers + player.socialMedia.rapTubeFollowers;
  const weeklyProfit = (weeklyIncome || 0) - (weeklyExpenses || 0);

  return (
    <div className="space-y-6">
      <div className="ios-card p-4 flex items-center space-x-4">
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
        <StatCard icon={<StarIcon className="w-8 h-8"/>} label="Fame" value={`${formatNumber(player.stats.fame)} / 100`} colorClass="text-yellow-400" progressValue={player.stats.fame} progressMax={100} />
        <StatCard icon={<ShieldCheckIcon className="w-8 h-8"/>} label="Reputation" value={`${formatNumber(player.stats.reputation)} / 100`} colorClass="text-purple-400" progressValue={player.stats.reputation} progressMax={100} />
        <StatCard icon={<UserGroupIcon className="w-8 h-8"/>} label="Fans" value={formatNumber(player.stats.fans)} colorClass="text-cyan-400" />
        <StatCard icon={<GlobeIcon className="w-8 h-8"/>} label="Followers" value={formatNumber(totalFollowers)} colorClass="text-blue-400" />
      </div>

       <div className="ios-card p-4 space-y-2">
        <h2 className="text-lg font-semibold">Weekly Report</h2>
        <div className="flex justify-around text-center">
            <div>
                <p className="text-sm text-ios-label-secondary">Income</p>
                <p className="text-lg font-bold text-ios-green">${(weeklyIncome || 0).toFixed(2)}</p>
            </div>
            <div>
                <p className="text-sm text-ios-label-secondary">Expenses</p>
                <p className="text-lg font-bold text-ios-red">${(weeklyExpenses || 0).toFixed(2)}</p>
            </div>
            <div>
                <p className="text-sm text-ios-label-secondary">Profit/Loss</p>
                <p className={`text-lg font-bold ${weeklyProfit >= 0 ? 'text-ios-green' : 'text-ios-red'}`}>
                    {weeklyProfit >= 0 ? `+$${weeklyProfit.toFixed(2)}` : `-$${Math.abs(weeklyProfit).toFixed(2)}`}
                </p>
            </div>
        </div>
      </div>

      <div className="ios-card p-4 space-y-2">
        <h2 className="text-lg font-semibold mb-2">News & Events</h2>
        <div className="h-24 overflow-y-auto text-sm text-ios-label-secondary font-mono">
          {log.slice().reverse().map((entry, index) => (
            <p key={index} className="opacity-75">{`> ${entry}`}</p>
          ))}
        </div>
      </div>
      
      <button
        onClick={handleAdvanceWeek}
        className="w-full text-lg ios-button-blue font-bold transition-transform transform hover:scale-105"
      >
        Next Week
      </button>
    </div>
  );
};

export default HomeScreen;