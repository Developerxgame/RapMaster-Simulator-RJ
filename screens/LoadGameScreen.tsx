import React, { useState, useEffect, useCallback } from 'react';
import { useGame } from '../context/GameContext';
import { ActionType, GameStatus, SaveSlot, GameState } from '../types';
import { ChevronRightIcon, TrashIcon } from '../components/Icons';

const LoadGameScreen: React.FC = () => {
    const { dispatch } = useGame();
    const [saveSlots, setSaveSlots] = useState<SaveSlot[]>([]);
    const [confirmingDelete, setConfirmingDelete] = useState<string | null>(null);


    const fetchSaveSlots = useCallback(() => {
        const slots: SaveSlot[] = [];
        const slotIds = ['auto', '1', '2', '3'];
        slotIds.forEach(id => {
            try {
                const metaJson = localStorage.getItem(`saveSlot_${id}_meta`);
                if (metaJson) {
                    slots.push(JSON.parse(metaJson));
                }
            } catch (e) {
                console.error(`Failed to parse save slot ${id}`, e);
            }
        });
        setSaveSlots(slots);
    }, []);

    useEffect(() => {
        fetchSaveSlots();
    }, [fetchSaveSlots]);

    const handleLoad = (slotId: string) => {
        try {
            const gameJson = localStorage.getItem(`saveSlot_${slotId}`);
            if (gameJson) {
                const gameState: GameState = JSON.parse(gameJson);
                dispatch({ type: ActionType.LOAD_GAME, payload: { state: gameState } });
            }
        } catch (e) {
            console.error(`Failed to load game from slot ${slotId}`, e);
        }
    };

    const handleDelete = (slotId: string) => {
        dispatch({ type: ActionType.DELETE_SAVE, payload: { slotId }});
        setConfirmingDelete(null);
        fetchSaveSlots(); // Refresh the list
    }

    const handleBack = () => {
        dispatch({ type: ActionType.SET_STATUS, payload: GameStatus.MAIN_MENU });
    };
    
    const formatNetWorth = (num: number) => {
        if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + 'B';
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
        if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
        return num.toFixed(0);
    };

    return (
        <div className="w-full h-full max-w-md mx-auto bg-ios-bg flex flex-col p-6">
            <h1 className="text-3xl font-bold text-ios-label mb-6">Load Career</h1>

            <div className="flex-grow space-y-4 overflow-y-auto">
                {saveSlots.length > 0 ? saveSlots.map(slot => (
                    <div key={slot.slotId} className="bg-ios-bg-secondary p-4 rounded-xl flex items-center justify-between">
                        <div className="flex-grow" onClick={() => handleLoad(slot.slotId)}>
                            <p className="font-bold text-lg text-ios-blue">
                                {slot.slotId === 'auto' ? `[AUTOSAVE] ${slot.stageName}` : `SLOT ${slot.slotId} - ${slot.stageName}`}
                            </p>
                            <div className="text-sm text-ios-label-secondary mt-1">
                                <span>Year: {slot.year}</span> | <span>Net Worth: ${formatNetWorth(slot.netWorth)}</span>
                                <p className="text-xs mt-1">Saved: {slot.saveDate}</p>
                            </div>
                        </div>
                         <div className="flex items-center">
                            <button onClick={() => setConfirmingDelete(slot.slotId)} className="p-2 text-ios-red hover:bg-red-500/20 rounded-full">
                                <TrashIcon className="w-6 h-6"/>
                            </button>
                             <button onClick={() => handleLoad(slot.slotId)} className="p-2 text-ios-label-secondary">
                                <ChevronRightIcon className="w-7 h-7"/>
                            </button>
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-10">
                        <p className="text-ios-label-secondary">No saved games found.</p>
                    </div>
                )}
            </div>

            <button
                onClick={handleBack}
                className="w-full py-4 mt-6 text-lg bg-ios-gray text-white font-bold rounded-xl shadow-md"
            >
                Back to Menu
            </button>

            {confirmingDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-ios-bg-secondary rounded-2xl p-6 w-full max-w-sm mx-auto shadow-lg border border-gray-700 space-y-4">
                        <h2 className="text-xl font-bold text-center text-ios-label">Delete Save?</h2>
                        <p className="text-base text-ios-label-secondary text-center">
                            Are you sure you want to permanently delete this save file? This action cannot be undone.
                        </p>
                        <div className="flex justify-between space-x-3 pt-2">
                            <button
                                onClick={() => setConfirmingDelete(null)}
                                className="w-full py-3 px-4 bg-ios-gray text-white font-semibold rounded-lg"
                            >
                                Cancel
                            </button>
                             <button
                                onClick={() => handleDelete(confirmingDelete)}
                                className="w-full py-3 px-4 bg-ios-red text-white font-semibold rounded-lg"
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoadGameScreen;