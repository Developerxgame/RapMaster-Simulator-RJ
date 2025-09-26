import React from 'react';
import { useGame } from '../context/GameContext';
import { ActionType } from '../types';
import { CashIcon, LightningBoltIcon, StarIcon } from '../components/Icons';

const jobs = [
    { name: 'Fast Food', money: 50, energyCost: 20, fameGain: 0, requiredFame: 0 },
    { name: 'Delivery Driver', money: 80, energyCost: 25, fameGain: 0, requiredFame: 5 },
    { name: 'Retail', money: 120, energyCost: 30, fameGain: 0, requiredFame: 10 },
    { name: 'Bartender', money: 200, energyCost: 35, fameGain: 1, requiredFame: 20 },
    { name: 'DJ', money: 350, energyCost: 40, fameGain: 2, requiredFame: 40 },
    { name: 'Studio Assistant', money: 500, energyCost: 40, fameGain: 3, requiredFame: 60 },
    { name: 'Ghostwriter', money: 1000, energyCost: 50, fameGain: 5, requiredFame: 80 },
];

const JobScreen: React.FC = () => {
    const { state, dispatch } = useGame();
    const { player } = state;

    const handleWork = (job: typeof jobs[0]) => {
        if (player.stats.energy >= job.energyCost) {
            dispatch({ type: ActionType.WORK_JOB, payload: { money: job.money, energyCost: job.energyCost, fameGain: job.fameGain } });
        }
    };

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Side Hustles</h1>
            <p className="text-ios-label-secondary">Earn some cash to fund your rap career. Each job costs energy but gives you money and a little fame.</p>

            <div className="space-y-4">
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
    );
};

export default JobScreen;