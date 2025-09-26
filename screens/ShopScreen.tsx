import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { ShopItem, ItemCategory, ActionType } from '../types';

export const shopItems: ShopItem[] = [
    // Lifestyle
    { id: 'ls1', name: 'Designer Sneakers', category: ItemCategory.LIFESTYLE, cost: 2000, description: "Look fresh. +5 Reputation.", repBonus: 5 },
    { id: 'ls2', name: 'Gold Chain', category: ItemCategory.LIFESTYLE, cost: 10000, description: "A classic rapper accessory. +2 weekly fame.", repBonus: 10, fameBonus: 2 },
    { id: 'ls3', name: 'Luxury Watch', category: ItemCategory.LIFESTYLE, cost: 50000, description: "Flex on 'em. +5 weekly fame.", repBonus: 25, fameBonus: 5 },
    { id: 'ls4', name: 'Sports Car', category: ItemCategory.LIFESTYLE, cost: 250000, description: "Ride in style. +20 weekly fame.", repBonus: 100, fameBonus: 20 },
    { id: 'ls5', name: 'Penthouse Apartment', category: ItemCategory.LIFESTYLE, cost: 1000000, description: "The view from the top. +50 weekly fame.", repBonus: 250, fameBonus: 50 },
    
    // Studio Equipment - Mic
    { id: 'se_mic1', name: 'Basic USB Mic', category: ItemCategory.STUDIO, cost: 500, description: "A solid start. +2 track quality.", equipmentType: 'mic', qualityBonus: 2 },
    { id: 'se_mic2', name: 'Condenser Mic', category: ItemCategory.STUDIO, cost: 5000, description: "Crisp vocals. +5 track quality.", equipmentType: 'mic', qualityBonus: 5 },
    { id: 'se_mic3', name: 'Pro Studio Mic', category: ItemCategory.STUDIO, cost: 25000, description: "Industry standard. +10 track quality.", equipmentType: 'mic', qualityBonus: 10 },
    
    // Studio Equipment - Audio Interface
    { id: 'se_aud1', name: '2-Channel Interface', category: ItemCategory.STUDIO, cost: 1000, description: "Clean sound. +2 track quality.", equipmentType: 'audio', qualityBonus: 2 },
    { id: 'se_aud2', name: 'Multi-Channel Rack', category: ItemCategory.STUDIO, cost: 7500, description: "Professional routing. +5 track quality.", equipmentType: 'audio', qualityBonus: 5 },
    { id: 'se_aud3', name: 'High-End Converter', category: ItemCategory.STUDIO, cost: 30000, description: "Pristine conversion. +10 track quality.", equipmentType: 'audio', qualityBonus: 10 },

    // Studio Equipment - Software/DAW
    { id: 'se_soft1', name: 'Free DAW', category: ItemCategory.STUDIO, cost: 200, description: "Gotta start somewhere. +1 track quality.", equipmentType: 'software', qualityBonus: 1 },
    { id: 'se_soft2', name: 'Standard DAW', category: ItemCategory.STUDIO, cost: 2000, description: "Better plugins. +4 track quality.", equipmentType: 'software', qualityBonus: 4 },
    { id: 'se_soft3', name: 'Pro DAW Suite', category: ItemCategory.STUDIO, cost: 15000, description: "All the bells and whistles. +8 track quality.", equipmentType: 'software', qualityBonus: 8 },
];


const ShopScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ItemCategory>(ItemCategory.LIFESTYLE);
    const { state, dispatch } = useGame();
    const { player } = state;

    const handleBuyItem = (item: ShopItem) => {
        dispatch({ type: ActionType.BUY_ITEM, payload: { item } });
    }

    const isOwned = (item: ShopItem): boolean => {
        if(item.category === ItemCategory.LIFESTYLE) {
            return player.ownedItemIds.includes(item.id);
        }
        if(item.category === ItemCategory.STUDIO && item.equipmentType && item.qualityBonus) {
            return player.studioEquipment[item.equipmentType] >= item.qualityBonus;
        }
        return false;
    }

    const TabButton: React.FC<{tab: ItemCategory, label: string}> = ({tab, label}) => (
        <button onClick={() => setActiveTab(tab)} className={`flex-1 py-3 text-lg font-semibold transition-colors ${activeTab === tab ? 'border-b-2 border-ios-blue text-ios-blue' : 'text-ios-label-secondary'}`}>
            {label}
        </button>
    );

    const itemsToList = shopItems.filter(item => item.category === activeTab);

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Shop</h1>
            <p className="text-ios-label-secondary">Invest your cash in your career. Buy lifestyle items to boost your image or upgrade your studio for better music.</p>
            
            <div className="flex border-b border-gray-700">
                <TabButton tab={ItemCategory.LIFESTYLE} label="Lifestyle"/>
                <TabButton tab={ItemCategory.STUDIO} label="Studio"/>
            </div>

            <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-2">
                {itemsToList.map(item => {
                    const owned = isOwned(item);
                    const canAfford = player.stats.netWorth >= item.cost;
                    
                    return (
                        <div key={item.id} className="bg-ios-bg-secondary p-4 rounded-xl">
                            <div className="flex justify-between items-start">
                                <div className="flex-1 pr-4">
                                    <h2 className="text-lg font-semibold">{item.name}</h2>
                                    <p className="text-sm text-ios-label-secondary mt-1">{item.description}</p>
                                    <p className="text-base font-bold text-ios-green mt-2">${item.cost.toLocaleString()}</p>
                                </div>
                                <button
                                    onClick={() => handleBuyItem(item)}
                                    disabled={owned || !canAfford}
                                    className="px-6 py-3 bg-ios-blue text-white font-bold rounded-lg shadow-md disabled:bg-ios-gray disabled:cursor-not-allowed transition-colors text-base"
                                >
                                    {owned ? 'Owned' : 'Buy'}
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default ShopScreen;