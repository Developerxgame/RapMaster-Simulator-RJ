import React from 'react';
import { useGame } from '../context/GameContext';
import { ActionType, GameStatus } from '../types';

const SplashScreen: React.FC = () => {
  const { dispatch } = useGame();

  const handlePlay = () => {
    if (window.navigator.vibrate) {
        window.navigator.vibrate(100);
    }
    dispatch({ type: ActionType.SET_STATUS, payload: GameStatus.MAIN_MENU });
  };
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black p-4 text-center animated-gradient">
      <div className="animate-fade-in-down">
        <h1 className="text-8xl text-rapmaster">
          RapMaster
        </h1>
        <h2 className="text-4xl font-light text-ios-blue tracking-widest" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>
          SIMULATOR
        </h2>
      </div>
      
      <button 
        onClick={handlePlay}
        className="mt-32 ios-button-blue text-xl px-16 py-3 font-bold shadow-lg shadow-blue-500/50 transform hover:scale-105 transition-transform duration-300"
      >
        TAP TO START
      </button>

      <footer className="absolute bottom-5 text-xs text-ios-label-secondary">
        Powered by FHX STUDIOS
      </footer>
    </div>
  );
};

export default SplashScreen;