import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { ActionType, GameStatus } from '../types';
import { SaveIcon } from '../components/Icons';

const SettingsScreen: React.FC = () => {
    const { state, dispatch } = useGame();
    const [showSavePrompt, setShowSavePrompt] = useState(false);

    const SettingRow: React.FC<{label: string, children: React.ReactNode}> = ({label, children}) => (
        <div className="flex justify-between items-center py-3">
            <span className="text-ios-label text-lg">{label}</span>
            <div>{children}</div>
        </div>
    );

    const CreditRow: React.FC<{label: string, value: string}> = ({label, value}) => (
         <div className="flex justify-between items-center py-1 text-base">
            <span className="text-ios-label-secondary">{label}</span>
            <span className="text-ios-label">{value}</span>
        </div>
    );

    const handleSave = (slotId: string) => {
        dispatch({ type: ActionType.SAVE_GAME, payload: { slotId } });
        setShowSavePrompt(false);
    }

    const handleSaveAndQuit = () => {
        dispatch({ type: ActionType.SAVE_GAME, payload: { slotId: '1' }}); // Default to slot 1 for now
        dispatch({ type: ActionType.SET_STATUS, payload: GameStatus.MAIN_MENU });
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Settings</h1>
            
             <div className="bg-ios-bg-secondary rounded-xl p-4 space-y-2">
                <h2 className="text-xl font-semibold text-ios-label mb-2">Game</h2>
                <button onClick={() => setShowSavePrompt(true)} className="w-full text-lg py-3 bg-ios-blue text-white font-semibold rounded-lg">
                    Manual Save
                </button>
                 <button onClick={handleSaveAndQuit} className="w-full text-lg py-3 bg-ios-red text-white font-semibold rounded-lg">
                    Save & Quit to Menu
                </button>
            </div>
            
            {showSavePrompt && (
                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-ios-bg-secondary rounded-xl p-6 space-y-4 w-11/12 max-w-sm">
                        <h3 className="text-xl font-bold">Select a Save Slot</h3>
                        <div className="flex flex-col space-y-3">
                           <button onClick={() => handleSave('1')} className="w-full py-3 bg-ios-blue text-white font-semibold rounded-lg">Slot 1</button>
                           <button onClick={() => handleSave('2')} className="w-full py-3 bg-ios-blue text-white font-semibold rounded-lg">Slot 2</button>
                           <button onClick={() => handleSave('3')} className="w-full py-3 bg-ios-blue text-white font-semibold rounded-lg">Slot 3</button>
                        </div>
                        <button onClick={() => setShowSavePrompt(false)} className="w-full py-3 bg-ios-gray text-white font-semibold rounded-lg mt-2">
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <div className="bg-ios-bg-secondary rounded-xl p-4">
                 <div className="space-y-2 divide-y divide-gray-700">
                    <SettingRow label="Language">
                        <span className="text-ios-label-secondary">English</span>
                    </SettingRow>
                     <SettingRow label="Sound">
                        <span className="text-ios-label-secondary">On</span>
                    </SettingRow>
                     <SettingRow label="Graphics">
                        <span className="text-ios-label-secondary">High</span>
                    </SettingRow>
                </div>
            </div>

            <div className="bg-ios-bg-secondary p-4 rounded-xl space-y-2">
                <h2 className="text-xl font-semibold text-ios-label mb-2">Credits</h2>
                <CreditRow label="Publisher" value="FHX STUDIOS" />
                <CreditRow label="Concept" value="Fahim" />
                <CreditRow label="Developer" value="Fhx Studios" />
                <CreditRow label="UI/UX" value="Fahim" />
            </div>

             <div className="bg-ios-bg-secondary p-4 rounded-xl space-y-2">
                <h2 className="text-xl font-semibold text-ios-label mb-2">Support Us</h2>
                <a href="https://x.com/Fhx_Studios" target="_blank" rel="noopener noreferrer" className="flex justify-between items-center text-ios-blue py-2 text-base">
                    <span>Twitter (X)</span>
                    <span>@Fhx_Studios</span>
                </a>
                <a href="https://www.patreon.com/FhxStudios" target="_blank" rel="noopener noreferrer" className="flex justify-between items-center text-ios-blue py-2 text-base">
                    <span>Patreon</span>
                    <span>FHX Studios</span>
                </a>
            </div>
        </div>
    );
};

export default SettingsScreen;