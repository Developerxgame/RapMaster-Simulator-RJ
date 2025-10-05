import React from 'react';
import { useGame } from '../context/GameContext';
import { ActionType, GameStatus } from '../types';

const MainMenuScreen: React.FC = () => {
  const { dispatch } = useGame();

  const handleNewGame = () => {
    dispatch({ type: ActionType.SET_STATUS, payload: GameStatus.CHARACTER_CREATION });
  };

  const handleLoadGame = () => {
    dispatch({ type: ActionType.SET_STATUS, payload: GameStatus.LOAD_GAME });
  };
  
  const currentTheme = {
    name: 'Cyberpunk Drip',
    bgClass: 'bg-gradient-to-br from-gray-900 via-purple-900 to-black animated-gradient',
    subtitleClass: 'text-ios-blue',
  };

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center p-8 text-center transition-all duration-500 ${currentTheme.bgClass}`}>
        <div className="relative mb-20">
            <h1 className="text-8xl text-rapmaster">
              RapMaster
            </h1>
            <h2 className={`text-4xl font-light tracking-widest ${currentTheme.subtitleClass}`} style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>
              SIMULATOR
            </h2>
        </div>
        
        <div className="relative w-full max-w-xs space-y-5">
             <button 
                onClick={handleNewGame}
                className="w-full text-xl ios-button-blue py-3 font-bold shadow-lg shadow-blue-500/50 transform hover:scale-105 transition-transform duration-300"
              >
                New Game
            </button>
             <button 
                onClick={handleLoadGame}
                className="w-full text-xl ios-button-gray py-3 font-bold shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                Load Game
            </button>
        </div>

        <footer className="absolute bottom-5 text-xs text-ios-label-secondary z-10">
            Powered by FHX STUDIOS
        </footer>
    </div>
  );
};

export default MainMenuScreen;
