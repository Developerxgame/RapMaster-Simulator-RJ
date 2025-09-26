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

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black p-8 text-center animated-gradient">
        <div className="mb-20">
            <h1 className="text-6xl font-black text-white" style={{textShadow: '0 0 15px #0A84FF, 0 0 25px #0A84FF'}}>
              RapMaster
            </h1>
            <h2 className="text-4xl font-light text-ios-blue tracking-widest">
              SIMULATOR
            </h2>
        </div>
        
        <div className="w-full max-w-xs space-y-5">
             <button 
                onClick={handleNewGame}
                className="w-full px-12 py-5 bg-ios-blue text-white font-bold text-xl rounded-xl shadow-lg shadow-blue-500/50 transform hover:scale-105 transition-transform duration-300"
              >
                New Game
            </button>
             <button 
                onClick={handleLoadGame}
                className="w-full px-12 py-5 bg-ios-bg-secondary text-white font-bold text-xl rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                Load Game
            </button>
        </div>

        <footer className="absolute bottom-5 text-xs text-ios-label-secondary">
            Powered by FHX STUDIOS
        </footer>
    </div>
  );
};

export default MainMenuScreen;