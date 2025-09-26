import React from 'react';
import { useGame } from '../context/GameContext';
import { ActionType, Player } from '../types';
import ProgressBar from '../components/ProgressBar';

type SkillName = keyof Player['skills'];

const skillInfo: { [key in SkillName]: { name: string; description: string } } = {
    lyricism: { name: 'Lyricism', description: 'Improves the quality of your lyrics and tracks.' },
    flow: { name: 'Flow', description: 'A better flow results in higher quality recordings.' },
    production: { name: 'Production', description: 'Boosts the overall quality score of your music.' },
    marketing: { name: 'Marketing', description: 'Increases fan growth from your fame.' },
};

const SkillsScreen: React.FC = () => {
    const { state, dispatch } = useGame();
    const { player } = state;

    const handleTrain = (skill: SkillName) => {
        const currentLevel = player.skills[skill];
        const cost = 50 * Math.pow(1.1, currentLevel);
        const energyCost = 10;
        
        if(player.stats.netWorth >= cost && player.stats.energy >= energyCost && currentLevel < 100){
            dispatch({ type: ActionType.TRAIN_SKILL, payload: { skill, cost, energyCost }});
        }
    };

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Train Skills</h1>
            <p className="text-ios-label-secondary">Invest money and energy to hone your craft. Higher skills lead to better music and more success.</p>
            
            <div className="space-y-4">
                {(Object.keys(skillInfo) as SkillName[]).map(skillKey => {
                    const skill = skillInfo[skillKey];
                    const level = player.skills[skillKey];
                    const cost = 50 * Math.pow(1.1, level);

                    return (
                        <div key={skillKey} className="bg-ios-bg-secondary p-4 rounded-xl">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-lg font-semibold">{skill.name} <span className="text-sm font-mono text-ios-blue">Lv. {level}</span></h2>
                                <button
                                    onClick={() => handleTrain(skillKey)}
                                    disabled={player.stats.netWorth < cost || player.stats.energy < 10 || level >= 100}
                                    className="px-5 py-2.5 text-sm bg-ios-blue text-white font-bold rounded-lg shadow-md disabled:bg-ios-gray disabled:cursor-not-allowed transition-colors"
                                >
                                    Train (${cost.toFixed(0)})
                                </button>
                            </div>
                            <ProgressBar value={level} max={100} />
                            <p className="text-xs text-ios-label-secondary mt-2">{skill.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SkillsScreen;