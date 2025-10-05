import React, { useState, useMemo } from 'react';
import { useGame } from '../context/GameContext';
import { ActionType, GameStatus } from '../types';

const predefinedAvatars = [
    // BitLife Style Avatars
    `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><g><circle cx="100" cy="100" r="100" fill="#f0c27b"/><path d="M100 135 c 20 0 40 20 40 40 L 60 175 C 60 155 80 135 100 135" fill="#e0a36b"/><g transform="translate(0 -10)"><circle cx="100" cy="100" r="50" fill="#2d2d2d"/><path d="M50 100 A 50 50 0 0 1 150 100 L 140 100 A 40 40 0 0 0 60 100 Z" fill="#404040"/></g><g transform="translate(0 5)"><circle cx="70" cy="95" r="8" fill="#2d2d2d"/><circle cx="130" cy="95" r="8" fill="#2d2d2d"/></g><path d="M90 125 a 10 5 0 0 1 20 0" fill="none" stroke="#2d2d2d" stroke-width="3"/><path d="M60 90 L 50 80" stroke="#2d2d2d" stroke-width="3" stroke-linecap="round"/><path d="M140 90 L 150 80" stroke="#2d2d2d" stroke-width="3" stroke-linecap="round"/></g></svg>`,
    `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><g><circle cx="100" cy="100" r="100" fill="#8d5524"/><path d="M100 135 c 20 0 40 20 40 40 L 60 175 C 60 155 80 135 100 135" fill="#66391d"/><g transform="translate(0 -5)"><rect x="65" y="80" width="70" height="40" rx="20" fill="#111"/><rect x="70" y="85" width="25" height="30" rx="10" fill="#333"/><rect x="105" y="85" width="25" height="30" rx="10" fill="#333"/></g><g transform="translate(0, -10)"><path d="M100 140 C 70 140 70 120 100 120 C 130 120 130 140 100 140" fill="#44240f"/><path d="M95 130 a 5 5 0 0 1 10 0" fill="#fff"/></g><path d="M50 70 C 50 40, 150 40, 150 70 L 150 80 L 50 80 Z" fill="#1a1a1a"/></g></svg>`,
    `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><g><circle cx="100" cy="100" r="100" fill="#f2d5a0"/><path d="M100 135 c 20 0 40 20 40 40 L 60 175 C 60 155 80 135 100 135" fill="#e1c18c"/><g transform="translate(0 -30)"><path d="M70 100 S 100 70, 130 100 S 100 130, 70 100" fill="#e53935"/><path d="M60 105 S 100 80, 140 105 S 100 140, 60 105" fill="#f44336"/></g><g transform="translate(0 5)"><circle cx="70" cy="95" r="8" fill="#2d2d2d"/><circle cx="130" cy="95" r="8" fill="#2d2d2d"/></g><path d="M95 130 h 10" stroke="#2d2d2d" stroke-width="3" stroke-linecap="round"/><path d="M60 90 L 50 80" stroke="#2d2d2d" stroke-width="3" stroke-linecap="round"/><path d="M140 90 L 150 80" stroke="#2d2d2d" stroke-width="3" stroke-linecap="round"/></g></svg>`,
    `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><g><circle cx="100" cy="100" r="100" fill="#c68642"/><path d="M100 135 c 20 0 40 20 40 40 L 60 175 C 60 155 80 135 100 135" fill="#a56a31"/><path d="M50 70 C 50 30, 150 30, 150 70 L 130 70 C 130 45, 70 45, 70 70 Z" fill="#673ab7"/><g transform="translate(0 5)"><circle cx="70" cy="95" r="10" fill="white"/><circle cx="70" cy="95" r="5" fill="black"/><circle cx="130" cy="95" r="10" fill="white"/><circle cx="130" cy="95" r="5" fill="black"/></g><path d="M85 130 C 100 140, 115 130, 85 130" stroke="#000" stroke-width="3" stroke-linecap="round"/><path d="M100 110 c 5 -10, -5 -10, 0 0" fill="#8d5524"/></g></svg>`
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
      Math.floor(Math.random() * predefinedAvatars.length)
  );

  const avatarUrl = useMemo(() => {
    const svgString = predefinedAvatars[selectedAvatarIndex];
    // Use btoa for Base64 encoding, which is supported in all target browsers.
    return `data:image/svg+xml;base64,${btoa(svgString)}`;
  }, [selectedAvatarIndex]);
  
  const handleAvatarChange = (direction: 1 | -1) => {
    setSelectedAvatarIndex(prev => {
        let nextIndex = prev + direction;
        if (nextIndex < 0) {
            nextIndex = predefinedAvatars.length - 1;
        } else if (nextIndex >= predefinedAvatars.length) {
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
        <p className="font-semibold text-ios-label-secondary">{`Style ${selectedAvatarIndex + 1} of ${predefinedAvatars.length}`}</p>
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