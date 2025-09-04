import React, { useState, useEffect } from 'react';
import { LeaderboardEntry } from '../../shared/types';
import { 
  getLeaderboardEntries, 
  getFilteredLeaderboard, 
  getPlayerRank, 
  getLeaderboardStats 
} from '../services/leaderboardService';
import { getCurrentRedditUsername } from '../services/redditUserService';

interface LeaderboardPageProps {
  onBack: () => void;
  currentScore: number;
  currentLevel: number;
  targetWord: string;
}

export const LeaderboardPage: React.FC<LeaderboardPageProps> = ({
  onBack,
  currentScore,
  currentLevel,
  targetWord
}) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [timeFilter, setTimeFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [currentUsername, setCurrentUsername] = useState<string>('Loading...');

  // Load leaderboard data and current username on component mount
  useEffect(() => {
    const entries = getLeaderboardEntries();
    setLeaderboard(entries);
    
    // Get current Reddit username
    getCurrentRedditUsername().then(username => {
      setCurrentUsername(username);
    }).catch(error => {
      console.error('Failed to get Reddit username:', error);
      setCurrentUsername('Anonymous');
    });
  }, []);

  // Refresh leaderboard data when component becomes visible (e.g., after a game)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const entries = getLeaderboardEntries();
        setLeaderboard(entries);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const getCurrentPlayerRank = () => {
    const rank = getPlayerRank(leaderboard, currentScore, currentLevel);
    return rank <= leaderboard.length ? rank : 'Not ranked';
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

  const getScoreColor = (score: number) => {
    if (score >= 15) return 'text-yellow-600';
    if (score >= 10) return 'text-green-600';
    if (score >= 5) return 'text-blue-600';
    return 'text-gray-600';
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              ← Back
            </button>
            <h1 className="text-3xl font-bold">🏆 Leaderboard</h1>
            <div className="w-16"></div> {/* Spacer for centering */}
          </div>
          
          <div className="text-center">
            <div className="text-lg mb-2">
              <span className="font-bold text-yellow-300">u/{currentUsername}</span> • 
              Score: <span className="font-bold text-yellow-300">{currentScore}</span> • 
              Rank: <span className="font-bold text-yellow-300">{getCurrentPlayerRank()}</span>
            </div>
            <div className="text-sm opacity-90">
              Compete with Reddit users worldwide and climb the ranks!
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto p-6 h-full flex flex-col">
          {/* Top 3 Podium */}
          <div className="mb-8 flex-shrink-0">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Top Players</h2>
            <div className="flex justify-center items-end gap-4">
              {getFilteredLeaderboard(leaderboard, timeFilter).slice(0, 3).map((entry, index) => (
                <div key={index} className={`text-center ${index === 1 ? 'order-first' : index === 2 ? 'order-last' : ''}`}>
                  <div className={`bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-2 shadow-lg ${
                    index === 0 ? 'border-yellow-400' : index === 1 ? 'border-gray-300' : 'border-orange-400'
                  }`}>
                    <div className="text-4xl mb-2">{getMedal(index + 1)}</div>
                    <div className="text-xl font-bold text-gray-800 mb-1">u/{entry.username}</div>
                    <div className="text-sm text-gray-600 mb-1">Level {entry.level}</div>
                    <div className={`text-2xl font-bold ${getScoreColor(entry.score)}`}>{entry.score}</div>
                    <div className="text-sm text-gray-600">words</div>
                  </div>
                  <div className={`mt-2 h-${(3 - index) * 4} bg-gradient-to-t ${
                    index === 0 ? 'from-yellow-400 to-yellow-300' : 
                    index === 1 ? 'from-gray-400 to-gray-300' : 
                    'from-orange-400 to-orange-300'
                  } rounded-t-lg`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 flex-shrink-0">
            <div className="flex gap-2 justify-center">
              {(['all', 'today', 'week', 'month'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    timeFilter === filter
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Full Leaderboard */}
          <div className="flex-1 overflow-hidden">
            <h3 className="text-xl font-bold text-gray-800 mb-4">All Players</h3>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-full overflow-y-auto">
              <div className="divide-y divide-gray-100">
                {getFilteredLeaderboard(leaderboard, timeFilter).map((entry, index) => (
                  <div
                    key={index}
                    className={`p-4 hover:bg-gray-50 transition-colors duration-200 ${
                      entry.score === currentScore && entry.targetWord === targetWord
                        ? 'bg-blue-50 border-l-4 border-blue-500'
                        : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-gray-600 w-8">
                          {getMedal(index + 1)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">u/{entry.username}</div>
                          <div className="text-sm text-gray-500">
                            Level {entry.level} • {entry.targetWord} • {getTimeAgo(entry.timestamp)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getScoreColor(entry.score)}`}>
                          {entry.score}
                        </div>
                        <div className="text-sm text-gray-500">words</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t border-gray-200 p-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto text-center">
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-xl text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Back to Game
          </button>
        </div>
      </div>
    </div>
  );
};
