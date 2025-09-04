import React from 'react';

interface HowToPlayProps {
  onClose: () => void;
}

export const HowToPlay: React.FC<HowToPlayProps> = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">How to Play TypeAbout</h2>
          
          <div className="space-y-6 text-left text-white/90">
            {/* Game Overview */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-2xl font-semibold text-white mb-4 text-center">🎮 Game Overview</h3>
              <p className="text-center text-lg">
                TypeAbout is a word association game where you type keywords related to a target word. 
                Find all 5 keywords to advance to the next level!
              </p>
            </div>

            {/* Game Flow */}
            <div className="flex items-start gap-4">
              <span className="text-3xl">🎯</span>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">1. Get Your Target Word</h3>
                <p>You'll see a target word (like "Cat" or "Ocean"). Each game starts with a fresh word that hasn't been used before.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <span className="text-3xl">⏱️</span>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">2. 20 Second Timer</h3>
                <p>You have exactly 20 seconds per level to find all 5 related keywords. The timer starts after the countdown!</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <span className="text-3xl">⌨️</span>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">3. Type Keywords</h3>
                <p>Type words that are directly related to the target word. For "Cat", valid keywords might be "feline", "whiskers", "meow", etc.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-3xl">🎉</span>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">4. Level Progression</h3>
                <p>Find all 5 keywords to advance to the next level! Each level has a new target word and you get a fresh 20 seconds.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <span className="text-3xl">✅</span>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">5. Scoring System</h3>
                <p>Each correct keyword earns you 1 point. Your score accumulates across all levels. Find all 5 keywords to advance!</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-3xl">💥</span>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">6. Game Over</h3>
                <p>If time runs out before finding all 5 keywords, the game ends. Your final level and score are saved to the leaderboard!</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <span className="text-3xl">🏆</span>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">7. Reddit Leaderboard</h3>
                <p>Compete with other Reddit users! Your Reddit username appears on the leaderboard. Rankings are based on score and level reached.</p>
              </div>
            </div>

            {/* Rules Section */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10 mt-8">
              <h3 className="text-2xl font-semibold text-white mb-4 text-center">📋 Rules & Tips</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">✅ Valid Keywords:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Must be directly related to target word</li>
                    <li>• At least 2 characters long</li>
                    <li>• Cannot be the target word itself</li>
                    <li>• No duplicate words</li>
                    <li>• Case insensitive</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">💡 Pro Tips:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Think of characteristics, sounds, actions</li>
                    <li>• Type fast but accurately</li>
                    <li>• Don't overthink - go with first thoughts</li>
                    <li>• Watch for confetti celebrations!</li>
                    <li>• Input clears automatically after each word</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-2xl font-semibold text-white mb-4 text-center">🌟 Features</h3>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl mb-2">🎊</div>
                  <h4 className="font-semibold text-white mb-1">Confetti</h4>
                  <p className="text-sm">Celebrate correct keywords and level completions!</p>
                </div>
                <div>
                  <div className="text-2xl mb-2">📊</div>
                  <h4 className="font-semibold text-white mb-1">Statistics</h4>
                  <p className="text-sm">Track your word usage and game history</p>
                </div>
                <div>
                  <div className="text-2xl mb-2">🔄</div>
                  <h4 className="font-semibold text-white mb-1">No Repeats</h4>
                  <p className="text-sm">Each word is unique - no repetition!</p>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="mt-8 bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Let's Play! 🚀
          </button>
        </div>
      </div>
    </div>
  );
};
