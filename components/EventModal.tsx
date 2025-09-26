import React from 'react';
import { useGame } from '../context/GameContext';
import { GameEvent, ActionType } from '../types';

interface EventModalProps {
  event: GameEvent;
}

const EventModal: React.FC<EventModalProps> = ({ event }) => {
  const { dispatch } = useGame();

  const handleChoice = (choice: typeof event.choices[0]) => {
    dispatch({ type: ActionType.RESOLVE_EVENT, payload: { choice } });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-ios-bg-secondary rounded-2xl p-6 w-full max-w-sm mx-auto shadow-lg border border-gray-700 space-y-4 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-center text-ios-label">{event.title}</h2>
        <p className="text-base text-ios-label-secondary text-center">
          {event.description}
        </p>
        <div className="flex flex-col space-y-3 pt-2">
          {event.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleChoice(choice)}
              className="w-full py-3 px-4 bg-ios-blue text-white font-semibold rounded-lg text-base transition-transform transform hover:scale-105"
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventModal;
