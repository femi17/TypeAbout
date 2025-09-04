import React, { useState, useEffect } from 'react';
import { LeaderboardEntry } from '../../shared/types';

interface LeaderboardProps {
  onClose: () => void;
  currentScore: number;
  targetWord: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  onClose,
  currentScore,
  targetWord
}) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    { username: "WordMaster", score: 18, targetWord: "Cat", timestamp: new Date() },
    { username: "LexiconPro", score: 16, targetWord: "Ocean", timestamp: new Date() },
    { username: "VocabularyKing", score: 15, targetWord: "Music", timestamp: new Date() },
    { username: "WordSmith", score: 14, targetWord: "Food", timestamp: new Date() },
    { username: "LanguageLover", score: 13, targetWord: "Nature", timestamp: new Date() },
    { username: "TypingChamp", score: 12, targetWord: "Sports", timestamp: new Date() },
    { username: "WordWizard", score: 11, targetWord: "Technology", timestamp: new Date() },
    { username: "SpeedTyper", score: 10, targetWord: "Travel", timestamp: new Date() },
    { username: "BrainStormer", score: 9, targetWord: "Art", timestamp: new Date() },
    { username: "QuickThinker", score: 8, targetWord: "Science", timestamp: new Date() }
  ]);

  const [timeFilter, setTimeFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');

  const getCurrentPlayerRank = () => {
    const sorted = [...leaderboard].sort((a, b) => b.score - a.score);
    const rank = sorted.findIndex(entry => entry.score === currentScore) + 1;
    return rank > 0 ? rank : 'Not ranked';
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const getMedal = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm">
      {/* Header Section - Compact */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          🏆 Leaderboard
        </h2>
        <div className="text-sm text-gray-600">
          Your Score: <span className="font-bold text-blue-600">{currentScore}</span> • 
          Rank: <span className="font-bold text-blue-600">{getCurrentPlayerRank()}</span>
        </div>
      </div>

      {/* Main Content - Horizontal Layout */}
      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        {/* Left Side - Top 3 Players */}
        <div className="flex flex-row lg:flex-col gap-2 lg:gap-3 flex-1">
          {leaderboard.slice(0, 3).map((entry, index) => (
            <div key={index} className="bg-white rounded-lg p-2 lg:p-3 border border-gray-200 text-center flex-1 lg:flex-none">
              <div className="text-lg lg:text-xl font-bold text-blue-600">{getMedal(index + 1)}</div>
              <div className="text-xs lg:text-sm font-semibold text-gray-800 truncate">{entry.username}</div>
              <div className="text-xs text-gray-600">{entry.score} words</div>
            </div>
          ))}
        </div>

        {/* Right Side - Full Leaderboard */}
        <div className="flex-1 lg:flex-2">
          <h3 className="text-sm lg:text-base font-semibold text-gray-800 mb-2">
            All Players:
          </h3>
          <div className="space-y-1 max-h-32 lg:max-h-40 overflow-y-auto">
            {leaderboard.slice(3).map((entry, index) => (
              <div
                key={index + 3}
                className={`flex items-center justify-between p-2 rounded-lg text-xs lg:text-sm ${
                  entry.score === currentScore && entry.targetWord === targetWord
                    ? 'bg-blue-50 border border-blue-200'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-600">#{index + 4}</span>
                  <span className="font-medium text-gray-800 truncate">{entry.username}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-blue-600">{entry.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4">
        <div className="flex gap-1 justify-center">
          {(['all', 'today', 'week', 'month'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                timeFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <button
          onClick={onClose}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-6 rounded-full text-sm lg:text-base shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          Close Leaderboard
        </button>
      </div>
    </div>
  );
};
