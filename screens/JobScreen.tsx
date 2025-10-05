import React from 'react';
import { useGame } from '../context/GameContext';
import { ActionType } from '../types';
import { CashIcon, LightningBoltIcon, StarIcon } from '../components/Icons';

const jobs = [
    { name: 'Fast Food', money: 50, energyCost: 20, fameGain: 0, requiredFame: 0 },
    { name: 'Delivery Driver', money: 80, energyCost: 25, fameGain: 0, requiredFame: 5 },
    { name: 'Retail', money: 120, energyCost: 30, fameGain: 0, requiredFame: 10 },
    { name: 'Bartender', money: 200, energyCost: 35, fameGain: 1, requiredFame: 20 },
];

const concerts = [
    { name: 'Open Mic Night', money: 500, energyCost: 50, fameGain: 5, requiredFame: 25 },
    { name: 'Local Club', money: 2500, energyCost: 60, fameGain: 10, requiredFame: 40 },
    { name: 'Opening Act', money: 10000, energyCost: 70, fameGain: 20, requiredFame: 60 },
    { name: 'Headliner Tour', money: 50000, energyCost: 80, fameGain: 40, requiredFame: 80 },
    { name: 'Arena Show', money: 250000, energyCost: 90, fameGain: 60, requiredFame: 95 },
];

const JobScreen: React.FC = () => {
    const { state, dispatch } = useGame();
    const { player } = state;

    const handleWork = (job: typeof jobs[0]) => {
        if (player.stats.energy >= job.energyCost) {
            dispatch({ type: ActionType.WORK_JOB, payload: { money: job.money, energyCost: job.energyCost, fameGain: job.fameGain } });
        }
    };

    const handlePerform = (concert: typeof concerts[0]) => {
        if (player.stats.energy >= concert.energyCost) {
            dispatch({ type: ActionType.PERFORM_CONCERT, payload: { money: concert.money, energyCost: concert.energyCost, fameGain: concert.fameGain } });
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Concerts</h1>
                <p className="text-ios-label-secondary mt-1">Perform live shows to earn big money and fame. The bigger the venue, the bigger the payout.</p>
                <div className="space-y-4 mt-4">
                    {concerts.map(concert => {
                        const canAfford = player.stats.energy >= concert.energyCost;
                        const isUnlocked = player.stats.fame >= concert.requiredFame;

                        return (
                            <div key={concert.name} className={`bg-ios-bg-secondary p-4 rounded-xl ${!isUnlocked && 'opacity-50'}`}>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-lg font-semibold">{concert.name}</h2>
                                        <div className="flex items-center space-x-4 text-sm mt-1">
                                            <div className="flex items-center space-x-1 text-ios-green">
                                                <CashIcon className="w-4 h-4" /> <span>${concert.money.toLocaleString()}</span>
                                            </div>
                                            <div className="flex items-center space-x-1 text-yellow-400">
                                                <LightningBoltIcon className="w-4 h-4" /> <span>{concert.energyCost}</span>
                                            </div>
                                            <div className="flex items-center space-x-1 text-yellow-400">
                                                <StarIcon className="w-4 h-4" /> <span>+{concert.fameGain}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handlePerform(concert)}
                                        disabled={!canAfford || !isUnlocked}
                                        className="px-6 py-3 bg-ios-blue text-white font-bold rounded-lg shadow-md disabled:bg-ios-gray disabled:cursor-not-allowed transition-colors text-base"
                                    >
                                        Perform
                                    </button>
                                </div>
                                {!isUnlocked && <p className="text-xs text-ios-red mt-2">Requires {concert.requiredFame} Fame</p>}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div>
                <h1 className="text-2xl font-bold">Side Hustles</h1>
                <p className="text-ios-label-secondary mt-1">Earn some extra cash to fund your rap career.</p>

                <div className="space-y-4 mt-4">
                    {jobs.map(job => {
                        const canAfford = player.stats.energy >= job.energyCost;
                        const isUnlocked = player.stats.fame >= job.requiredFame;

                        return (
                            <div key={job.name} className={`bg-ios-bg-secondary p-4 rounded-xl ${!isUnlocked && 'opacity-50'}`}>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-lg font-semibold">{job.name}</h2>
                                        <div className="flex items-center space-x-4 text-sm mt-1">
                                            <div className="flex items-center space-x-1 text-ios-green">
                                                <CashIcon className="w-4 h-4" /> <span>${job.money}</span>
                                            </div>
                                            <div className="flex items-center space-x-1 text-yellow-400">
                                                <LightningBoltIcon className="w-4 h-4" /> <span>{job.energyCost}</span>
                                            </div>
                                            <div className="flex items-center space-x-1 text-yellow-400">
                                                <StarIcon className="w-4 h-4" /> <span>+{job.fameGain}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleWork(job)}
                                        disabled={!canAfford || !isUnlocked}
                                        className="px-6 py-3 bg-ios-blue text-white font-bold rounded-lg shadow-md disabled:bg-ios-gray disabled:cursor-not-allowed transition-colors text-base"
                                    >
                                        Work
                                    </button>
                                </div>
                                {!isUnlocked && <p className="text-xs text-ios-red mt-2">Requires {job.requiredFame} Fame</p>}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default JobScreen;