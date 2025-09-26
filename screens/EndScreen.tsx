import React from 'react';
import { useGame } from '../context/GameContext';
import { ActionType, GameStatus } from '../types';

const EndScreen: React.FC = () => {
    const { state, dispatch } = useGame();
    const { player, discography } = state;

    const handlePlayAgain = () => {
        dispatch({ type: ActionType.SET_STATUS, payload: GameStatus.SPLASH });
    };

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat().format(Math.floor(num));
    };

    return (
        <div className="w-full h-full max-w-md mx-auto bg-ios-bg flex flex-col items-center justify-center p-6 text-center space-y-6">
            <h1 className="text-4xl font-bold text-ios-label">Career Over</h1>
            <p className="text-ios-label-secondary">
                After a long and successful career, {player.stageName} has retired at age 60. Here's the final summary.
            </p>

            <div className="w-full bg-ios-bg-secondary p-6 rounded-xl space-y-4">
                <h2 className="text-xl font-semibold">Final Stats</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-2 rounded-lg bg-black">
                        <p className="text-sm text-ios-label-secondary">Career Level</p>
                        <p className="text-2xl font-bold text-purple-400">{player.careerLevel}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-black">
                        <p className="text-sm text-ios-label-secondary">Fame</p>
                        <p className="text-2xl font-bold text-yellow-400">{formatNumber(player.stats.fame)}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-black">
                        <p className="text-sm text-ios-label-secondary">Fans</p>
                        <p className="text-2xl font-bold text-cyan-400">{formatNumber(player.stats.fans)}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-black">
                        <p className="text-sm text-ios-label-secondary">Net Worth</p>
                        <p className="text-2xl font-bold text-ios-green">${formatNumber(player.stats.netWorth)}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-black">
                        <p className="text-sm text-ios-label-secondary">Tracks Made</p>
                        <p className="text-2xl font-bold">{discography.tracks.length}</p>
                    </div>
                     <div className="p-2 rounded-lg bg-black">
                        <p className="text-sm text-ios-label-secondary">Albums Made</p>
                        <p className="text-2xl font-bold">{discography.albums.length}</p>
                    </div>
                </div>
            </div>

            <button
                onClick={handlePlayAgain}
                className="w-full py-4 bg-ios-blue text-white font-bold rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
                Play Again
            </button>
        </div>
    );
};

export default EndScreen;