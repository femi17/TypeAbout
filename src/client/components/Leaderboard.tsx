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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">🏆 Leaderboard</h2>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white text-2xl transition-colors duration-200"
            >
              ✕
            </button>
          </div>
          
          {/* Current Player Score */}
          <div className="mt-4 p-4 bg-white/20 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg">Your Score: <span className="font-bold text-yellow-300">{currentScore}</span></p>
                <p className="text-sm text-white/80">Target Word: "{targetWord}"</p>
              </div>
              <div className="text-right">
                <p className="text-lg">Rank: <span className="font-bold text-yellow-300">{getCurrentPlayerRank()}</span></p>
                <p className="text-sm text-white/80">Keep playing to improve!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b">
          <div className="flex gap-2">
            {(['all', 'today', 'week', 'month'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  timeFilter === filter
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="p-6">
          <div className="space-y-3">
            {leaderboard.map((entry, index) => (
              <div
                key={index}
                className={`flex items-center p-4 rounded-lg border transition-all duration-200 ${
                  entry.score === currentScore && entry.targetWord === targetWord
                    ? 'bg-blue-50 border-blue-200 shadow-md'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="w-12 text-center">
                  <span className="text-2xl">{getMedal(index + 1)}</span>
                </div>
                
                <div className="flex-1 ml-4">
                  <div className="font-semibold text-lg">{entry.username}</div>
                  <div className="text-sm text-gray-600">
                    Target: "{entry.targetWord}" • {getTimeAgo(entry.timestamp)}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{entry.score}</div>
                  <div className="text-sm text-gray-500">words</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 rounded-b-2xl text-center">
          <p className="text-gray-600 mb-4">
            💡 Tip: Practice with different target words to improve your word association skills!
          </p>
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Close Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};
