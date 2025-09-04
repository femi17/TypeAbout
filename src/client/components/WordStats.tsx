import React, { useState, useEffect } from 'react';

interface WordStats {
  totalWords: number;
  usedWordsToday: number;
  availableWordsToday: number;
  categories: { [key: string]: number };
}

export const WordStats: React.FC = () => {
  const [stats, setStats] = useState<WordStats | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/word-stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch word stats:', error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return null;
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-lg font-semibold text-white">📊 Word Statistics</h4>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-white/70 hover:text-white transition-colors"
        >
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-3">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">{stats.totalWords}</div>
          <div className="text-sm text-white/70">Total Words</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">{stats.availableWordsToday}</div>
          <div className="text-sm text-white/70">Available Today</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">{stats.usedWordsToday}</div>
          <div className="text-sm text-white/70">Used Today</div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-white/10 pt-3">
          <h5 className="text-sm font-medium text-white/80 mb-2">Words by Category:</h5>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {Object.entries(stats.categories).map(([category, count]) => (
              <div key={category} className="flex justify-between">
                <span className="text-white/70 capitalize">{category}:</span>
                <span className="text-white font-medium">{count}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-white/60">
            💡 New words every day! We have {stats.totalWords} words in our collection.
          </div>
        </div>
      )}
    </div>
  );
};
