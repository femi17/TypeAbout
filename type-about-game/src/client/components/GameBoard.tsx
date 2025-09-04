import React from 'react';
import { RoundTimer } from './RoundTimer';
import { getCorrectKeywordsCount, getKeywordsForWord } from '../services/keywordDatabase';

interface GameBoardProps {
  targetWord: string;
  typedWords: string[];
  timeRemaining: number;
  score: number;
  level: number;
  isCountdownActive?: boolean;
  gamePhase?: 'preparation' | 'countdown' | 'playing' | 'finished';
}

export const GameBoard: React.FC<GameBoardProps> = ({
  targetWord,
  typedWords,
  timeRemaining,
  score,
  level,
  isCountdownActive = false,
  gamePhase = 'playing'
}) => {
  // Show different layouts based on game phase
  if (gamePhase === 'preparation') {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-200 shadow-lg">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Type about: <span className="text-blue-600 font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{targetWord}</span>
          </h2>
          <div className="text-2xl text-gray-600">
            Get ready to think...
          </div>
        </div>
      </div>
    );
  }

  // Debug: Log the props to see what's being passed
  console.log('GameBoard props:', { targetWord, typedWords, timeRemaining, score, level, gamePhase });
  
  // Safe function calls with error handling
  let correctKeywordsCount = 0;
  let totalKeywords = 0;
  
  try {
    correctKeywordsCount = getCorrectKeywordsCount(targetWord, typedWords);
    totalKeywords = getKeywordsForWord(targetWord).length;
  } catch (error) {
    console.error('Error in GameBoard keyword functions:', error);
    correctKeywordsCount = 0;
    totalKeywords = 10; // fallback
  }

  const getWordDifficulty = (word: string) => {
    if (word.length <= 4) return 'easy';
    if (word.length <= 8) return 'medium';
    return 'hard';
  };

  const getWordColor = (word: string) => {
    const difficulty = getWordDifficulty(word);
    switch (difficulty) {
      case 'easy': return 'from-green-400 to-emerald-500';
      case 'medium': return 'from-blue-400 to-cyan-500';
      case 'hard': return 'from-purple-400 to-pink-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  // Simple fallback to ensure component renders
  if (!targetWord) {
    return (
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-xl h-[calc(100vh-8rem)] flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800 mb-2">Loading...</div>
          <div className="text-gray-600">Preparing your game...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-xl h-[calc(100vh-8rem)] flex flex-col">
      {/* Compact Header */}
      <div className="text-center mb-4 flex-shrink-0">
        <div className="mb-3">
          <div className="text-lg md:text-xl font-bold text-blue-600 mb-1">
            Level {level}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
            Type about
          </h1>
          <div className="text-3xl md:text-4xl font-black gradient-text">
            {targetWord}
          </div>
        </div>
        
        {/* Compact Timer and Score Layout */}
        <div className="flex items-center justify-center gap-8 mb-4">
          <div className="flex flex-col items-center">
            <RoundTimer 
              timeRemaining={timeRemaining}
              isCountdownActive={isCountdownActive}
            />
            <div className="text-xs text-gray-600 mt-1 font-medium">Time</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-green-600">{score}</div>
            <div className="text-xs text-gray-600 font-medium">Score</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold text-purple-600">{correctKeywordsCount}</div>
            <div className="text-xs text-gray-600 font-medium">Keywords</div>
          </div>
        </div>
      </div>
      
      {/* Compact Word Display - takes remaining space */}
      <div className="flex-1 flex flex-col min-h-0">
        {typedWords.length > 0 ? (
          <div className="flex flex-col h-full">
            <h3 className="text-lg font-semibold text-gray-700 mb-2 text-center flex-shrink-0">
              Keywords Found ({correctKeywordsCount}/{totalKeywords})
            </h3>
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-wrap gap-2 justify-center">
                {typedWords.map((word, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-r ${getWordColor(word)} text-white px-1 py-1 rounded-lg text-center text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 word-bubble flex-shrink-0`}
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="text-4xl mb-3">💭</div>
            <div className="text-lg text-gray-500 mb-2">
              {isCountdownActive 
                ? `Get ready to type words related to "${targetWord}"...` 
                : `Start typing words related to "${targetWord}"...`
              }
            </div>
            <div className="text-sm text-gray-400">
              Think of associations, synonyms, related concepts, or anything that comes to mind!
            </div>
          </div>
        )}
      </div>
      
              {/* Keyword Progress indicator */}
        <div className="mt-4 flex-shrink-0">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
            <span>Keyword Progress</span>
            <span>{correctKeywordsCount}/{totalKeywords}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="progress-bar h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min((correctKeywordsCount / totalKeywords) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
    </div>
  );
};
