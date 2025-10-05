import React, { useState, useMemo } from 'react';
import { useGame } from '../context/GameContext';
import { ActionType, GameStatus } from '../types';

const predefinedAvatars = [
    // 1. 3D Style Rapper with Sunglasses
    `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="grad1-bg-3d" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#2c3e50"/><stop offset="100%" stop-color="#000000"/></radialGradient><radialGradient id="skin1-3d" cx="45%" cy="40%" r="60%"><stop offset="0%" stop-color="#AF8363"/><stop offset="100%" stop-color="#64422A"/></radialGradient><filter id="shadow"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000" flood-opacity="0.5"/></filter></defs><rect width="512" height="512" rx="100" fill="url(#grad1-bg-3d)"/><g filter="url(#shadow)"><path d="M256 140 C 180 140 160 210 160 290 C 160 390 190 512 256 512 C 322 512 352 390 352 290 C 352 210 332 140 256 140" fill="url(#skin1-3d)"/><path d="M165 240 C 165 160, 347 160, 347 240 L 347 280 C 347 210, 165 210, 165 280 Z" fill="#1A1A1A"/><path d="M170 330 Q 256 360 342 330 L 330 400 H 182 Z" fill="#222"/><rect x="175" y="280" width="162" height="60" rx="30" fill="#000"/><rect x="185" y="285" width="60" height="50" fill="#1C1C1E" rx="20"/><rect x="267" y="285" width="60" height="50" fill="#1C1C1E" rx="20"/><line x1="246" y1="290" x2="266" y2="290" stroke="#333" stroke-width="8"/><path d="M200 380 Q 256 370 312 380" stroke="#000" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M130 512 C 150 400, 362 400, 382 512 Z" fill="#34495e"/><path d="M140 500 C 160 410, 352 410, 372 500 Z" fill="#2c3e50"/></g></svg>`,
    // 2. 3D Style Female Artist with Neon Green Hair
    `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="grad2-bg-3d" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#4a00e0"/><stop offset="100%" stop-color="#8e2de2"/></radialGradient><radialGradient id="skin2-3d" cx="45%" cy="40%" r="60%"><stop offset="0%" stop-color="#FAD7A0"/><stop offset="100%" stop-color="#C68642"/></radialGradient><linearGradient id="hair2-3d" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#00F260"/><stop offset="100%" stop-color="#0575E6"/></linearGradient><filter id="shadow2"><feDropShadow dx="2" dy="6" stdDeviation="5" flood-color="#000" flood-opacity="0.6"/></filter></defs><rect width="512" height="512" rx="100" fill="url(#grad2-bg-3d)"/><g filter="url(#shadow2)"><path d="M256 130 C 180 130 160 210 160 290 C 160 390 190 512 256 512 C 322 512 352 390 352 290 C 352 210 332 130 256 130" fill="url(#skin2-3d)"/><path d="M150 150 C 200 90, 312 90, 362 150 V 320 Q 256 350 150 320 Z" fill="url(#hair2-3d)"/><path d="M155 160 C 200 100, 307 100, 357 160 V 310 Q 256 340 155 310 Z" fill="rgba(255,255,255,0.2)"/><path d="M190 300 a 15 20 0 1 1 30 0 a 15 20 0 1 1 -30 0" fill="#222"/><circle cx="205" cy="300" r="8" fill="#FFF"/><path d="M292 300 a 15 20 0 1 1 30 0 a 15 20 0 1 1 -30 0" fill="#222"/><circle cx="307" cy="300" r="8" fill="#FFF"/><path d="M230 390 Q 256 380 282 390" stroke="#A569BD" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M130 512 C 150 400, 362 400, 382 512 Z" fill="#111"/><path d="M140 500 C 160 410, 352 410, 372 500 Z" fill="#222"/></g></svg>`,
    // 3. 3D Style Artist with Headphones
    `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="grad3-bg-3d" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#1D976C"/><stop offset="100%" stop-color="#93F9B9"/></radialGradient><radialGradient id="skin3-3d" cx="45%" cy="40%" r="60%"><stop offset="0%" stop-color="#f0c27b"/><stop offset="100%" stop-color="#a67c52"/></radialGradient><filter id="shadow3"><feDropShadow dx="0" dy="5" stdDeviation="4" flood-color="#000" flood-opacity="0.4"/></filter></defs><rect width="512" height="512" rx="100" fill="url(#grad3-bg-3d)"/><g filter="url(#shadow3)"><path d="M256 140 C 180 140 160 210 160 290 C 160 390 190 512 256 512 C 322 512 352 390 352 290 C 352 210 332 140 256 140" fill="url(#skin3-3d)"/><path d="M165 200 C 165 140, 347 140, 347 200 L 347 260 H 165 Z" fill="#333"/><path d="M190 280 a 18 15 0 1 1 36 0 a 18 15 0 1 1 -36 0" fill="#111" /><path d="M286 280 a 18 15 0 1 1 36 0 a 18 15 0 1 1 -36 0" fill="#111" /><path d="M230 360 Q 256 375 282 360" stroke="#000" stroke-width="4" fill="none" stroke-linecap="round" /><path d="M160 420 C 140 350, 372 350, 352 420" fill="none" stroke="#E0E0E0" stroke-width="25" stroke-linecap="round"/><path d="M150 420 C 130 360, 382 360, 362 420" fill="none" stroke="#C0C0C0" stroke-width="20" stroke-linecap="round"/><circle cx="150" cy="410" r="30" fill="#555"/><circle cx="362" cy="410" r="30" fill="#555"/><circle cx="150" cy="410" r="20" fill="#222"/><circle cx="362" cy="410" r="20" fill="#222"/><path d="M130 512 C 150 400, 362 400, 382 512 Z" fill="#27ae60"/><path d="M140 500 C 160 410, 352 410, 372 500 Z" fill="#2ecc71"/></g></svg>`,
    // 4. 3D Style Artist with Dreads
    `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="grad4-bg-3d" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FF4E50"/><stop offset="100%" stop-color="#F9D423"/></radialGradient><radialGradient id="skin4-3d" cx="45%" cy="40%" r="60%"><stop offset="0%" stop-color="#6E422A"/><stop offset="100%" stop-color="#3A2317"/></radialGradient><linearGradient id="dreads" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#A52A2A"/><stop offset="100%" stop-color="#5E2C04"/></linearGradient><filter id="shadow4"><feDropShadow dx="3" dy="3" stdDeviation="3" flood-color="#000" flood-opacity="0.5"/></filter></defs><rect width="512" height="512" rx="100" fill="url(#grad4-bg-3d)"/><g filter="url(#shadow4)"><path d="M256 130 C 180 130 160 210 160 290 C 160 390 190 512 256 512 C 322 512 352 390 352 290 C 352 210 332 130 256 130" fill="url(#skin4-3d)"/><g id="hair-group"><path d="M160 160 C 150 280, 180 280, 170 160" fill="url(#dreads)"/><path d="M180 150 C 170 290, 200 290, 190 150" fill="url(#dreads)"/><path d="M200 145 C 190 300, 220 300, 210 145" fill="url(#dreads)"/><path d="M220 140 C 210 310, 240 310, 230 140" fill="url(#dreads)"/><path d="M240 140 C 230 320, 260 320, 250 140" fill="url(#dreads)"/><path d="M260 140 C 250 320, 280 320, 270 140" fill="url(#dreads)"/><path d="M280 140 C 270 310, 300 310, 290 140" fill="url(#dreads)"/><path d="M300 145 C 290 300, 320 300, 310 145" fill="url(#dreads)"/><path d="M320 150 C 310 290, 340 290, 330 150" fill="url(#dreads)"/><path d="M340 160 C 330 280, 360 280, 350 160" fill="url(#dreads)"/></g><path d="M190 300 a 15 18 0 1 1 30 0 a 15 18 0 1 1 -30 0" fill="#FFF"/><circle cx="205" cy="300" r="7" fill="#000"/><path d="M292 300 a 15 18 0 1 1 30 0 a 15 18 0 1 1 -30 0" fill="#FFF"/><circle cx="307" cy="300" r="7" fill="#000"/><path d="M230 390 Q 256 405 282 390" stroke="#000" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M130 512 C 150 400, 362 400, 382 512 Z" fill="#787878"/><path d="M140 500 C 160 410, 352 410, 372 500 Z" fill="#505050"/></g></svg>`
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
          className="w-full py-4 bg-ios-blue text-white font-bold rounded-lg shadow-md disabled:bg-ios-gray disabled:cursor-not-allowed transition-colors"
        >
          Start Career
        </button>
        <button
          onClick={handleBack}
          className="w-full py-3 bg-ios-gray text-white font-semibold rounded-lg"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default CharacterCreationScreen;