import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { ActionType, GameStatus } from '../types';
import { PaintBrushIcon } from '../components/Icons';

const themes = [
  {
    name: 'Cyberpunk Drip',
    bgClass: 'bg-gradient-to-br from-gray-900 via-purple-900 to-black animated-gradient',
    subtitleClass: 'text-ios-blue',
  },
  {
    name: 'Golden Era',
    bgClass: 'bg-gradient-to-br from-yellow-900 via-amber-700 to-stone-900',
    subtitleClass: 'text-yellow-400',
  },
  {
    name: 'Street King',
    bgClass: 'bg-cover bg-center',
    bgImage: 'https://images.unsplash.com/photo-1519750783826-e2420f4d687f?q=80&w=800&auto=format&fit=crop',
    subtitleClass: 'text-ios-red',
  },
];

const MainMenuScreen: React.FC = () => {
  const { dispatch } = useGame();
  const [themeIndex, setThemeIndex] = useState(0);

  const handleNewGame = () => {
    dispatch({ type: ActionType.SET_STATUS, payload: GameStatus.CHARACTER_CREATION });
  };

  const handleLoadGame = () => {
    dispatch({ type: ActionType.SET_STATUS, payload: GameStatus.LOAD_GAME });
  };

  const cycleTheme = () => {
    setThemeIndex((prevIndex) => (prevIndex + 1) % themes.length);
  };
  
  const currentTheme = themes[themeIndex];

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center p-8 text-center transition-all duration-500 ${currentTheme.bgClass}`}
         style={currentTheme.bgImage ? { backgroundImage: `url(${currentTheme.bgImage})` } : {}}>
        {currentTheme.bgImage && <div className="absolute inset-0 bg-black bg-opacity-50"></div>}

        <div className="absolute top-5 right-5 z-10">
            <button onClick={cycleTheme} className="p-3 bg-white/10 rounded-full text-white backdrop-blur-sm hover:bg-white/20 transition-colors">
                <PaintBrushIcon className="w-6 h-6" />
            </button>
        </div>

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