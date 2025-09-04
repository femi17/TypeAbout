import React from 'react';

interface GameBoardProps {
  targetWord: string;
  typedWords: string[];
  timeRemaining: number;
  score: number;
  isCountdownActive?: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  targetWord,
  typedWords,
  timeRemaining,
  score,
  isCountdownActive = false
}) => {
  const getTimerColor = (time: number) => {
    if (time > 15) return 'text-green-400';
    if (time > 8) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getTimerBarWidth = (time: number) => {
    return (time / 20) * 100;
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      {/* Target Word and Timer */}
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-white mb-4">
          Type about: <span className="text-yellow-300 font-black">{targetWord}</span>
        </h2>
        
        <div className="flex items-center justify-center gap-6 mb-4">
          <div className="text-center">
            <div className={`text-3xl font-bold ${isCountdownActive ? 'text-blue-400' : getTimerColor(timeRemaining)}`}>
              {isCountdownActive ? 'Get Ready!' : `${timeRemaining}s`}
            </div>
            <div className="text-white/70 text-sm">
              {isCountdownActive ? 'Starting Soon' : 'Time Left'}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">
              {score}
            </div>
            <div className="text-white/70 text-sm">Score</div>
          </div>
        </div>
        
        {/* Timer Bar */}
        <div className="w-full bg-white/20 rounded-full h-3 mb-4">
          <div 
            className={`h-3 rounded-full transition-all duration-1000 ease-linear ${
              isCountdownActive 
                ? 'bg-blue-400 animate-pulse' 
                : 'timer-bar'
            }`}
            style={{ width: isCountdownActive ? '100%' : `${getTimerBarWidth(timeRemaining)}%` }}
          />
        </div>
      </div>
      
      {/* Typed Words Display */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-4 text-center">
          Your Words ({typedWords.length})
        </h3>
        
        {typedWords.length === 0 ? (
          <div className="text-center text-white/60 py-8">
            <div className="text-4xl mb-2">⌨️</div>
            <p>
              {isCountdownActive 
                ? `Get ready to type words related to "${targetWord}"...` 
                : `Start typing words related to "${targetWord}"...`
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {typedWords.map((word, index) => (
              <div
                key={index}
                className="word-bubble bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-center font-medium shadow-lg"
              >
                {word}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Instructions */}
      <div className="text-center text-white/80 text-sm">
        <p>💡 Tip: Think about what {targetWord} does, looks like, or reminds you of!</p>
      </div>
    </div>
  );
};
