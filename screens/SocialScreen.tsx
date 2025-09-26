import React from 'react';
import { useGame } from '../context/GameContext';
import { ActionType } from '../types';
import { GlobeIcon, RapGramIcon, StarIcon, LightningBoltIcon } from '../components/Icons';

const SocialScreen: React.FC = () => {
    const { state, dispatch } = useGame();
    const { player } = state;

    const energyCost = 10;
    const fameGain = Math.floor(5 * (1 + state.player.skills.marketing / 20));

    const handlePost = () => {
        if (player.stats.energy >= energyCost) {
            dispatch({ type: ActionType.POST_ON_SOCIAL_MEDIA, payload: { energyCost, fameGain } });
        }
    };

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Social Media</h1>
            <p className="text-ios-label-secondary">Manage your online presence to grow your fanbase.</p>
            
            <div className="bg-ios-bg-secondary p-4 rounded-xl">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 p-1 rounded-lg" style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285aeb 90%)' }}>
                        <RapGramIcon className="w-full h-full text-white" fill="white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold">RapGram</h2>
                        <p className="text-sm text-ios-label-secondary">Share your lifestyle.</p>
                    </div>
                </div>

                <div className="bg-black p-4 rounded-lg space-y-3">
                    <p className="text-sm">Post a photo of your new studio equipment to flex on your rivals and connect with fans.</p>
                    <div className="flex justify-between items-center text-xs text-ios-label-secondary">
                        <div className="flex items-center space-x-1">
                            <StarIcon className="w-4 h-4 text-yellow-400" />
                            <span>+{fameGain} Fame</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <LightningBoltIcon className="w-4 h-4 text-yellow-400" />
                            <span>-{energyCost} Energy</span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handlePost}
                    disabled={player.stats.energy < energyCost}
                    className="w-full mt-4 py-3 bg-ios-blue text-white font-bold rounded-lg shadow-md disabled:bg-ios-gray transition-colors"
                >
                    Post on RapGram
                </button>
            </div>

             <div className="bg-ios-bg-secondary p-4 rounded-xl opacity-50">
                 <h2 className="text-lg font-bold">RapTube & RikTok</h2>
                 <p className="text-sm text-ios-label-secondary">(Coming Soon)</p>
            </div>
        </div>
    );
};

export default SocialScreen;