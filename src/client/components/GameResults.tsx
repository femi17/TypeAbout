import React from 'react';
import { GameResult } from '../../shared/types';

interface GameResultsProps {
  result: GameResult;
  onPlayAgain: () => void;
  onShowLeaderboard: () => void;
}

export const GameResults: React.FC<GameResultsProps> = ({
  result,
  onPlayAgain,
  onShowLeaderboard
}) => {
  const getScoreMessage = (score: number) => {
    if (score >= 15) return "🎉 Amazing! You're a word wizard!";
    if (score >= 10) return "🌟 Great job! You really know your stuff!";
    if (score >= 5) return "👍 Good thinking! You've got potential!";
    if (score >= 2) return "🤔 Not bad! Keep practicing!";
    return "💪 Don't give up! Try again!";
  };

  const getScoreColor = (score: number) => {
    if (score >= 15) return 'text-yellow-400';
    if (score >= 10) return 'text-green-400';
    if (score >= 5) return 'text-blue-400';
    if (score >= 2) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">
          🎯 Game Complete!
        </h2>
        
        <div className="text-6xl font-bold mb-4">
          <span className={getScoreColor(result.score)}>{result.score}</span>
        </div>
        
        <p className="text-2xl text-white/90 mb-2">
          words typed about
        </p>
        <p className="text-3xl font-bold text-yellow-300 mb-4">
          "{result.targetWord}"
        </p>
        
        <p className="text-xl text-white/80 mb-6">
          {getScoreMessage(result.score)}
        </p>
      </div>

      {/* Score Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/10 rounded-lg p-4">
          <div className="text-3xl font-bold text-green-400">{result.score}</div>
          <div className="text-white/70">Words Typed</div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4">
          <div className="text-3xl font-bold text-blue-400">{result.timeRemaining}</div>
          <div className="text-white/70">Seconds Left</div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4">
          <div className="text-3xl font-bold text-purple-400">
            {Math.round((result.score / 20) * 100)}%
          </div>
          <div className="text-white/70">Efficiency</div>
        </div>
      </div>

      {/* Typed Words */}
      {result.typedWords.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Your Words:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-48 overflow-y-auto">
            {result.typedWords.map((word, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-3 py-2 rounded-full text-center font-medium text-sm"
              >
                {word}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onPlayAgain}
          className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          🎮 Play Again
        </button>
        
        <button
          onClick={onShowLeaderboard}
          className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-200"
        >
          🏆 View Leaderboard
        </button>
      </div>

      {/* Share Results */}
      <div className="mt-8 p-4 bg-white/5 rounded-lg">
        <p className="text-white/80 mb-3">Share your score with friends!</p>
        <div className="flex justify-center gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
            📘 Facebook
          </button>
          <button className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors duration-200">
            🐦 Twitter
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
            📱 WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};
