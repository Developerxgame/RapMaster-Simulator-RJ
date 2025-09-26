import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider, useGame } from './context/GameContext';
import TopBar from './components/TopBar';
import BottomNav from './components/BottomNav';
import SplashScreen from './screens/SplashScreen';
import MainMenuScreen from './screens/MainMenuScreen';
import LoadGameScreen from './screens/LoadGameScreen';
import CharacterCreationScreen from './screens/CharacterCreationScreen';
import HomeScreen from './screens/HomeScreen';
import JobScreen from './screens/JobScreen';
import StudioScreen from './screens/StudioScreen';
import SocialScreen from './screens/SocialScreen';
import ShopScreen from './screens/ShopScreen';
import StatsScreen from './screens/StatsScreen';
import SkillsScreen from './screens/SkillsScreen';
import SettingsScreen from './screens/SettingsScreen';
import EndScreen from './screens/EndScreen';
import EventModal from './components/EventModal';
import { GameStatus } from './types';

const App: React.FC = () => {
  return (
    <GameProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </GameProvider>
  );
};

const AppContent: React.FC = () => {
  const { state } = useGame();

  const renderContent = () => {
    switch (state.gameStatus) {
      case GameStatus.SPLASH:
        return <SplashScreen />;
      case GameStatus.MAIN_MENU:
        return <MainMenuScreen />;
      case GameStatus.LOAD_GAME:
        return <LoadGameScreen />;
      case GameStatus.CHARACTER_CREATION:
        return <CharacterCreationScreen />;
      case GameStatus.ENDED:
        return <EndScreen />;
      case GameStatus.PLAYING:
        return (
          <div className="w-full h-full max-w-md mx-auto bg-ios-bg flex flex-col font-sans relative">
            <TopBar />
            <main className="flex-grow overflow-y-auto pb-24 pt-20 px-4">
              <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<HomeScreen />} />
                <Route path="/job" element={<JobScreen />} />
                <Route path="/studio" element={<StudioScreen />} />
                <Route path="/social" element={<SocialScreen />} />
                <Route path="/shop" element={<ShopScreen />} />
                <Route path="/stats" element={<StatsScreen />} />
                <Route path="/skills" element={<SkillsScreen />} />
                <Route path="/settings" element={<SettingsScreen />} />
              </Routes>
            </main>
            <BottomNav />
            {state.activeEvent && <EventModal event={state.activeEvent} />}
          </div>
        );
      default:
        return <SplashScreen />;
    }
  };

  return (
    <div className="w-screen h-screen bg-ios-bg overflow-hidden">
      {renderContent()}
    </div>
  );
};

export default App;