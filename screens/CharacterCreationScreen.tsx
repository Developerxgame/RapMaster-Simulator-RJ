import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { ActionType } from '../types';

const avatars = [
  { id: 1, url: 'https://api.dicebear.com/8.x/adventurer/svg?seed=male-1' },
  { id: 2, url: 'https://api.dicebear.com/8.x/adventurer/svg?seed=female-1' },
  { id: 3, url: 'https://api.dicebear.com/8.x/adventurer/svg?seed=male-2' },
  { id: 4, url: 'https://api.dicebear.com/8.x/adventurer/svg?seed=female-2' },
  { id: 5, url: 'https://api.dicebear.com/8.x/adventurer/svg?seed=male-3' },
  { id: 6, url: 'https://api.dicebear.com/8.x/adventurer/svg?seed=female-3' },
];

const CharacterCreationScreen: React.FC = () => {
  const { dispatch } = useGame();
  const [stageName, setStageName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0].url);

  const handleStartCareer = () => {
    if (stageName.trim()) {
      dispatch({ type: ActionType.START_GAME, payload: { stageName, avatarUrl: selectedAvatar } });
    }
  };

  return (
    <div className="w-full h-full max-w-md mx-auto bg-ios-bg flex flex-col items-center justify-center p-6 space-y-8">
      <h1 className="text-3xl font-bold text-ios-label">Create Your Rapper</h1>
      
      <div className="flex flex-col items-center space-y-4">
        <img src={selectedAvatar} alt="Selected Avatar" className="w-32 h-32 rounded-full border-4 border-ios-blue bg-gray-700" />
        <div className="grid grid-cols-3 gap-4">
          {avatars.map(avatar => (
            <img 
              key={avatar.id}
              src={avatar.url} 
              alt={`Avatar ${avatar.id}`}
              onClick={() => setSelectedAvatar(avatar.url)}
              className={`w-16 h-16 rounded-full cursor-pointer transition-all duration-200 bg-gray-700 ${selectedAvatar === avatar.url ? 'border-2 border-ios-blue scale-110' : 'border-2 border-transparent'}`}
            />
          ))}
        </div>
      </div>

      <div className="w-full">
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
    </div>
  );
};

export default CharacterCreationScreen;