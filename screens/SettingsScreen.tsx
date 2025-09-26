import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { ActionType, GameStatus } from '../types';
import { ChevronRightIcon } from '../components/Icons';

const SettingsScreen: React.FC = () => {
    const { dispatch } = useGame();
    const [showSavePrompt, setShowSavePrompt] = useState(false);

    const SettingRow: React.FC<{label: string, value: string}> = ({label, value}) => (
        <div className="flex justify-between items-center py-4">
            <span className="text-ios-label text-base">{label}</span>
            <div className="flex items-center space-x-2">
                <span className="text-ios-label-secondary text-base">{value}</span>
                <ChevronRightIcon className="w-4 h-4 text-ios-gray" />
            </div>
        </div>
    );
    
    const LinkRow: React.FC<{href: string, label: string, value: string}> = ({href, label, value}) => (
        <a href={href} target="_blank" rel="noopener noreferrer" className="flex justify-between items-center py-4">
            <span className="text-ios-label text-base">{label}</span>
            <div className="flex items-center space-x-2">
                <span className="text-ios-blue text-base">{value}</span>
                <ChevronRightIcon className="w-4 h-4 text-ios-gray" />
            </div>
        </a>
    )

    const CreditRow: React.FC<{label: string, value: string}> = ({label, value}) => (
        <div className="flex justify-between items-center py-2 text-base">
           <span className="text-ios-label-secondary">{label}</span>
           <span className="text-ios-label font-medium">{value}</span>
       </div>
   );

    const handleSave = (slotId: string) => {
        dispatch({ type: ActionType.SAVE_GAME, payload: { slotId } });
        setShowSavePrompt(false);
    }

    const handleSaveAndQuit = () => {
        dispatch({ type: ActionType.SAVE_GAME, payload: { slotId: 'auto' }});
        dispatch({ type: ActionType.SET_STATUS, payload: GameStatus.MAIN_MENU });
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Settings</h1>
            
            <div className="space-y-2">
                <button onClick={() => setShowSavePrompt(true)} className="w-full text-lg py-3 bg-ios-blue text-white font-semibold rounded-xl">
                    Manual Save
                </button>
                 <button onClick={handleSaveAndQuit} className="w-full text-lg py-3 bg-ios-red text-white font-semibold rounded-xl">
                    Save & Quit to Menu
                </button>
            </div>
            
            {showSavePrompt && (
                 <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
                    <div className="bg-ios-bg-secondary rounded-xl p-4 space-y-4 w-full max-w-sm">
                        <h3 className="text-xl font-bold text-center">Select a Save Slot</h3>
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
            
            <div className="bg-ios-bg-secondary rounded-xl divide-y divide-gray-700 px-4">
                <SettingRow label="Language" value="English" />
                <SettingRow label="Sound" value="On" />
                <SettingRow label="Graphics" value="High" />
            </div>

            <div className="bg-ios-bg-secondary rounded-xl p-4">
                <h2 className="text-lg font-semibold text-ios-label mb-2 px-0">Credits</h2>
                <div className="divide-y divide-gray-700">
                    <CreditRow label="Publisher" value="FHX STUDIOS" />
                    <CreditRow label="Concept" value="Fahim" />
                    <CreditRow label="Developer" value="Fhx Studios" />
                    <CreditRow label="UI/UX" value="Fahim" />
                </div>
            </div>

            <div className="bg-ios-bg-secondary rounded-xl divide-y divide-gray-700 px-4">
                <h2 className="text-lg font-semibold text-ios-label pt-4">Support Us</h2>
                <LinkRow href="https://x.com/Fhx_Studios" label="Twitter (X)" value="@Fhx_Studios" />
                <LinkRow href="https://www.patreon.com/FhxStudios" label="Patreon" value="FHX Studios" />
            </div>
        </div>
    );
};

export default SettingsScreen;