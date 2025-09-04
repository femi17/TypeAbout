import React from 'react';
import { GameResult } from '../../shared/types';
import { getCorrectKeywordsCount, hasPlayerWon, getRemainingKeywords, getKeywordsForWord } from '../services/keywordDatabase';

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
  const getScoreMessage = (score: number, targetWord: string, typedWords: string[]) => {
    const correctKeywords = getCorrectKeywordsCount(targetWord, typedWords);
    const hasWon = hasPlayerWon(targetWord, typedWords);
    
    if (hasWon) {
      return "🎉 Congratulations! You found 5+ keywords!";
    }
    if (correctKeywords >= 3) {
      return "🌟 Great job! You're getting close!";
    }
    if (correctKeywords >= 1) {
      return "👍 Good start! Keep trying!";
    }
    return "💪 Don't give up! Try again!";
  };

  const getScoreColor = (score: number, targetWord: string, typedWords: string[]) => {
    const correctKeywords = getCorrectKeywordsCount(targetWord, typedWords);
    const hasWon = hasPlayerWon(targetWord, typedWords);
    
    if (hasWon) return 'text-green-600';
    if (correctKeywords >= 3) return 'text-blue-600';
    if (correctKeywords >= 1) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      {/* Header Section - Compact */}
      <div className="text-center p-4 flex-shrink-0 bg-gradient-to-br from-white to-gray-50 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {hasPlayerWon(result.targetWord, result.typedWords) ? "🎉 Level Complete!" : "🎯 Game Over!"}
        </h2>
        <div className="text-3xl font-bold mb-2">
          <span className="text-blue-600">Level {result.level}</span>
        </div>
        <div className="text-4xl font-bold mb-2">
          <span className={getScoreColor(result.score, result.targetWord, result.typedWords)}>
            {getCorrectKeywordsCount(result.targetWord, result.typedWords)}/{getKeywordsForWord(result.targetWord).length}
          </span>
        </div>
        <p className="text-lg text-gray-700 mb-1">
          keywords found for <span className="font-bold text-blue-600">"{result.targetWord}"</span>
        </p>
        <p className="text-sm text-gray-600">
          {getScoreMessage(result.score, result.targetWord, result.typedWords)}
        </p>
      </div>

      {/* Main Content - Takes remaining space */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 min-h-0">
        {/* Left Side - Score Cards */}
        <div className="flex flex-row lg:flex-col gap-3 flex-shrink-0">
          <div className="bg-white rounded-lg p-3 border border-gray-200 text-center shadow-sm flex-1 lg:flex-none">
            <div className="text-2xl font-bold text-green-600">{getCorrectKeywordsCount(result.targetWord, result.typedWords)}</div>
            <div className="text-xs text-gray-600">Keywords Found</div>
          </div>
          
          <div className="bg-white rounded-lg p-3 border border-gray-200 text-center shadow-sm flex-1 lg:flex-none">
            <div className="text-2xl font-bold text-blue-600">{result.timeRemaining}</div>
            <div className="text-xs text-gray-600">Time Remaining</div>
          </div>
          
          <div className="bg-white rounded-lg p-3 border border-gray-200 text-center shadow-sm flex-1 lg:flex-none">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round((getCorrectKeywordsCount(result.targetWord, result.typedWords) / getKeywordsForWord(result.targetWord).length) * 100)}%
            </div>
            <div className="text-xs text-gray-600">Success Rate</div>
          </div>
        </div>

        {/* Right Side - Typed Words */}
        <div className="flex-1 flex flex-col min-h-0">
          <h3 className="text-base font-semibold text-gray-800 mb-2 flex-shrink-0">
            Keywords Found ({getCorrectKeywordsCount(result.targetWord, result.typedWords)}):
          </h3>
          {result.typedWords.length > 0 ? (
            <div className="flex-1 overflow-y-auto bg-white rounded-lg border border-gray-200 p-3">
              <div className="flex flex-wrap gap-2 justify-center">
                {result.typedWords.map((word, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-1 py-1 rounded-md text-center font-medium text-xs shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105 word-bubble flex-shrink-0"
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center bg-white rounded-lg border border-gray-200">
              <div>
                <div className="text-3xl mb-2">🤔</div>
                <div className="text-sm text-gray-500">
                  No words typed this round
                </div>
                <div className="text-xs text-gray-400">
                  Try again and let your creativity flow!
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer - Action Buttons */}
      <div className="p-4 flex-shrink-0 border-t border-gray-200 bg-gray-50">
        <div className="flex gap-3 justify-center">
          <button
            onClick={onPlayAgain}
            className="submit-button bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-2 px-6 rounded-lg text-base shadow-md transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            🎮 Play Again
          </button>
          
          <button
            onClick={onShowLeaderboard}
            className="submit-button bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-2 px-6 rounded-lg text-base shadow-md transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            🏆 View Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};
