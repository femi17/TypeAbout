import React from 'react';

interface DailyChallengeProps {
  challenge: {
    targetWord: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
  };
  onStartGame: () => void;
}

export const DailyChallenge: React.FC<DailyChallengeProps> = ({
  challenge,
  onStartGame
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh]">
      {/* Big Countdown Circle */}
      <div className="relative mb-8">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 border-4 border-blue-300 flex items-center justify-center shadow-lg">
          <span className="text-6xl font-bold text-blue-600">20</span>
        </div>
        <div className="absolute inset-0 w-32 h-32 rounded-full border-4 border-transparent border-t-blue-400 animate-spin"></div>
      </div>

      {/* Call to Action */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Sure of yourself?
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          Push the start button below
        </p>
      </div>

      {/* Start Button */}
      <button
        onClick={onStartGame}
        className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 px-10 rounded-full text-xl shadow-lg transform hover:scale-105 transition-all duration-200"
      >
        Start
      </button>
    </div>
  );
};
