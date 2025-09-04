import React from 'react';
import { getWordUsageStats } from '../services/wordTracker';

interface WordStatsProps {
  isVisible?: boolean;
  onClose?: () => void;
}

export const WordStats: React.FC<WordStatsProps> = ({ 
  isVisible = false, 
  onClose 
}) => {
  const stats = getWordUsageStats();

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">📊 Word Statistics</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          )}
        </div>
        
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Today's Progress</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.userWordsToday}</div>
                <div className="text-sm text-blue-700">Your Words</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.globalWordsToday}</div>
                <div className="text-sm text-blue-700">Global Words</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Total Progress</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.userWordsTotal}</div>
                <div className="text-sm text-green-700">Your Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.globalWordsTotal}</div>
                <div className="text-sm text-green-700">Global Total</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">🎯 No Repetition</h3>
            <p className="text-sm text-purple-700">
              We ensure you never see the same word twice! Each game brings fresh challenges.
            </p>
          </div>
        </div>
        
        {onClose && (
          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-200"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
