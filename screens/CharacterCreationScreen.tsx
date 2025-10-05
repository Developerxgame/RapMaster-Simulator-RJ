import React, { useState, useMemo } from 'react';
import { useGame } from '../context/GameContext';
import { ActionType, GameStatus } from '../types';

const avatarSeeds = [
  'Midnight', 'Vibe', 'Lyrical', 'Rhyme', 'Flow', 'Beat', 'Groove', 'Verse'
];

const ChevronLeftIcon: React.FC = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
);
const ChevronRightIcon: React.FC = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
);

const CharacterCreationScreen: React.FC = () => {
  const { dispatch } = useGame();
  const [stageName, setStageName] = useState('');
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(() => 
      Math.floor(Math.random() * avatarSeeds.length)
  );

  const avatarUrl = useMemo(() => {
    return `https://api.dicebear.com/8.x/adventurer/svg?seed=${avatarSeeds[selectedAvatarIndex]}`;
  }, [selectedAvatarIndex]);
  
  const handleAvatarChange = (direction: 1 | -1) => {
    setSelectedAvatarIndex(prev => {
        let nextIndex = prev + direction;
        if (nextIndex < 0) {
            nextIndex = avatarSeeds.length - 1;
        } else if (nextIndex >= avatarSeeds.length) {
            nextIndex = 0;
        }
        return nextIndex;
    });
  };
  
  const handleStartCareer = () => {
    if (stageName.trim() && avatarUrl) {
      dispatch({ type: ActionType.START_GAME, payload: { stageName: stageName.trim(), avatarUrl: avatarUrl } });
    }
  };

  const handleBack = () => {
    dispatch({ type: ActionType.SET_STATUS, payload: GameStatus.MAIN_MENU });
  }

  return (
    <div className="w-full h-full max-w-md mx-auto bg-ios-bg flex flex-col p-6 space-y-6">
      <h1 className="text-3xl font-bold text-ios-label text-center flex-shrink-0">Create Your Rapper</h1>
      
      <div className="flex flex-col items-center space-y-4 flex-shrink-0">
        <div className="flex items-center justify-center space-x-2">
            <button onClick={() => handleAvatarChange(-1)} className="p-2 text-ios-label-secondary hover:text-ios-blue transition-colors rounded-full hover:bg-ios-bg-secondary"><ChevronLeftIcon /></button>
            <div className="w-40 h-40 rounded-full border-4 border-ios-blue bg-ios-bg-secondary flex items-center justify-center overflow-hidden">
                <img 
                  src={avatarUrl} 
                  alt="Selected Avatar" 
                  className="w-full h-full object-cover"
                />
            </div>
            <button onClick={() => handleAvatarChange(1)} className="p-2 text-ios-label-secondary hover:text-ios-blue transition-colors rounded-full hover:bg-ios-bg-secondary"><ChevronRightIcon /></button>
        </div>
        <p className="font-semibold text-ios-label-secondary">{`Style ${selectedAvatarIndex + 1} of ${avatarSeeds.length}`}</p>
      </div>

      <div className="w-full space-y-4 flex-shrink-0">
        <div>
          <label htmlFor="stageName" className="block text-sm font-medium text-ios-label-secondary mb-2">Stage Name</label>
          <input
            type="text"
            id="stageName"
            value={stageName}
            onChange={(e) => setStageName(e.target.value)}
            placeholder="e.g. MC Flow"
            className="w-full bg-ios-bg-secondary text-ios-label p-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-ios-blue focus:outline-none"
          />
        </div>

        <button
          onClick={handleStartCareer}
          disabled={!stageName.trim()}
          className="w-full ios-button-blue font-bold"
        >
          Start Career
        </button>
        <button
          onClick={handleBack}
          className="w-full ios-button-gray font-semibold"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default CharacterCreationScreen;
