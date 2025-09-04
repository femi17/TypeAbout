import React, { useState } from 'react';

interface NavigationProps {
  onShowLeaderboard: () => void;
  onShowHowToPlay: () => void;
  onShowWordStats?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onShowLeaderboard,
  onShowHowToPlay,
  onShowWordStats
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleMenu}
        className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white shadow-lg border border-gray-200 transition-colors duration-200"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <div className={`w-5 h-0.5 bg-gray-700 transition-all duration-200 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></div>
          <div className={`w-5 h-0.5 bg-gray-700 my-1 transition-all duration-200 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-5 h-0.5 bg-gray-700 transition-all duration-200 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></div>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-14 left-0 bg-white/95 backdrop-blur-sm rounded-lg border border-gray-200 shadow-xl min-w-48">
          <div className="p-2">
            <button
              onClick={() => {
                onShowLeaderboard();
                setIsMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center gap-3"
            >
              <span className="text-xl">🏆</span>
              Leaderboard
            </button>
            
            <button
              onClick={() => {
                onShowHowToPlay();
                setIsMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center gap-3"
            >
              <span className="text-xl">🎮</span>
              How to Play
            </button>
            
            {onShowWordStats && (
              <button
                onClick={() => {
                  onShowWordStats();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center gap-3"
              >
                <span className="text-xl">📊</span>
                Word Stats
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
