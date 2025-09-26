
import React, { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { ActionType, GameStatus } from '../types';

const SplashScreen: React.FC = () => {
  const { dispatch } = useGame();

  const handlePlay = () => {
    dispatch({ type: ActionType.SET_STATUS, payload: GameStatus.CHARACTER_CREATION });
  };
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-gray-900 to-black p-4 text-center">
      <div className="animate-pulse">
        <h1 className="text-6xl font-black text-white" style={{textShadow: '0 0 10px #0A84FF, 0 0 20px #0A84FF'}}>
          RapMaster
        </h1>
        <h2 className="text-4xl font-light text-ios-blue tracking-widest">
          SIMULATOR
        </h2>
      </div>
      
      <button 
        onClick={handlePlay}
        className="mt-24 px-12 py-4 bg-ios-blue text-white font-bold text-xl rounded-full shadow-lg shadow-blue-500/50 transform hover:scale-105 transition-transform duration-300 animate-bounce"
      >
        PLAY
      </button>

      <footer className="absolute bottom-5 text-xs text-ios-label-secondary">
        Powered by FHX STUDIOS
      </footer>
    </div>
  );
};

export default SplashScreen;
