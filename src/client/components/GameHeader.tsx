import React from 'react';

interface GameHeaderProps {
  onStartGame: () => void;
  onShowLeaderboard: () => void;
  onShowDailyChallenge: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  onStartGame,
  onShowLeaderboard,
  onShowDailyChallenge
}) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
        🎯 Type About
      </h1>
      <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
        Get a word, type related words in 20 seconds. How many can you think of?
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          onClick={onStartGame}
          className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          🚀 Start New Game
        </button>
        
        <div className="flex gap-2">
          <button
            onClick={onShowLeaderboard}
            className="bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            🏆 Leaderboard
          </button>
          <button
            onClick={onShowDailyChallenge}
            className="bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            📅 Daily Challenge
          </button>
        </div>
      </div>
    </div>
  );
};
