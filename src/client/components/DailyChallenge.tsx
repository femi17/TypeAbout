import React from 'react';
import { WordStats } from './WordStats';

interface DailyChallengeProps {
  challenge: {
    targetWord: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
  };
  onStartGame: () => void;
}

export const DailyChallenge: React.FC<DailyChallengeProps> = ({
  challenge,
  onStartGame
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hard': return 'text-red-500';
      default: return 'text-blue-500';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '🟢';
      case 'medium': return '🟡';
      case 'hard': return '🔴';
      default: return '🔵';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Easy';
      case 'medium': return 'Medium';
      case 'hard': return 'Hard';
      default: return 'Unknown';
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">
          📅 Daily Challenge
        </h2>
        
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-2xl">{getDifficultyIcon(challenge.difficulty)}</span>
          <span className={`text-xl font-semibold ${getDifficultyColor(challenge.difficulty)}`}>
            {getDifficultyText(challenge.difficulty)} Level
          </span>
        </div>
      </div>

      {/* Challenge Card */}
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-8 mb-8 border border-white/20">
        <div className="text-6xl mb-4">🎯</div>
        <h3 className="text-3xl font-bold text-white mb-4">
          Type about: <span className="text-yellow-300">{challenge.targetWord}</span>
        </h3>
        <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
          {challenge.description.replace(/Talk about/g, 'Type about')}
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
            ⏱️ 20 seconds
          </span>
          <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
            🎯 Type related words
          </span>
          <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
            🏆 Beat your high score
          </span>
        </div>
      </div>

      {/* Example Words */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold text-white mb-4">
          💡 Example words for "{challenge.targetWord}":
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
          {getExampleWords(challenge.targetWord).map((word, index) => (
            <div
              key={index}
              className="bg-white/20 text-white px-3 py-2 rounded-lg text-center font-medium"
            >
              {word}
            </div>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <div className="mb-6">
        <button
          onClick={onStartGame}
          className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-4 px-12 rounded-full text-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          🚀 Start Challenge Now!
        </button>
      </div>

      {/* Word Statistics */}
      <div className="mb-6">
        <WordStats />
      </div>

      {/* Game Rules */}
      <div className="bg-white/5 rounded-lg p-6 max-w-3xl mx-auto">
        <h4 className="text-xl font-semibold text-white mb-4">📋 How to Play:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left text-white/80">
          <div className="space-y-2">
            <p>🎯 <strong>Get a target word</strong> - Today it's "{challenge.targetWord}"</p>
            <p>⏱️ <strong>20 seconds</strong> - Race against the clock</p>
            <p>⌨️ <strong>Type related words</strong> - Think fast!</p>
          </div>
          <div className="space-y-2">
            <p>✅ <strong>Valid words</strong> - Must relate to the target</p>
            <p>🏆 <strong>Score points</strong> - One point per unique word</p>
            <p>📊 <strong>Compare scores</strong> - See how you rank</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get example words based on target word
const getExampleWords = (targetWord: string): string[] => {
  const examples: { [key: string]: string[] } = {
    // Animals
    'Cat': ['meow', 'purr', 'whiskers', 'paws', 'feline', 'kitten', 'claws', 'tail'],
    'Dog': ['bark', 'wag', 'puppy', 'loyal', 'fetch', 'paws', 'friendly', 'pet'],
    'Lion': ['roar', 'mane', 'pride', 'king', 'wild', 'hunt', 'savanna', 'courage'],
    'Tiger': ['stripes', 'hunt', 'jungle', 'powerful', 'orange', 'wild', 'stealth', 'fierce'],
    'Elephant': ['trunk', 'tusk', 'herd', 'memory', 'gentle', 'giant', 'gray', 'wise'],
    
    // Nature
    'Ocean': ['waves', 'blue', 'fish', 'salt', 'beach', 'deep', 'swim', 'water'],
    'Forest': ['trees', 'green', 'nature', 'wildlife', 'hiking', 'fresh', 'shade', 'wood'],
    'Mountain': ['peak', 'climb', 'high', 'rocky', 'snow', 'adventure', 'summit', 'challenge'],
    'River': ['flow', 'water', 'current', 'fish', 'bridge', 'stream', 'fresh', 'life'],
    
    // Food
    'Pizza': ['cheese', 'tomato', 'crust', 'delicious', 'hot', 'slice', 'toppings', 'Italian'],
    'Burger': ['meat', 'bun', 'cheese', 'lettuce', 'tomato', 'grill', 'juicy', 'fast food'],
    'Apple': ['red', 'fruit', 'sweet', 'crunchy', 'healthy', 'tree', 'orchard', 'pie'],
    
    // Activities
    'Sports': ['competition', 'team', 'athletic', 'fitness', 'game', 'champion', 'training', 'victory'],
    'Music': ['melody', 'rhythm', 'song', 'instrument', 'concert', 'harmony', 'beat', 'sound'],
    'Travel': ['adventure', 'explore', 'journey', 'destination', 'vacation', 'sightseeing', 'culture', 'experience'],
    'Cooking': ['kitchen', 'recipe', 'ingredients', 'flavor', 'delicious', 'chef', 'meal', 'creativity'],
    
    // Emotions
    'Love': ['heart', 'warm', 'caring', 'romance', 'affection', 'devotion', 'passion', 'beautiful'],
    'Happiness': ['joy', 'smile', 'laugh', 'cheerful', 'bright', 'positive', 'delight', 'pleasure'],
    'Peace': ['calm', 'tranquil', 'serene', 'quiet', 'relaxed', 'harmony', 'gentle', 'soothing'],
    
    // Technology
    'Computer': ['screen', 'keyboard', 'mouse', 'internet', 'software', 'digital', 'modern', 'efficient'],
    'Phone': ['call', 'text', 'app', 'mobile', 'communication', 'smart', 'pocket', 'connected'],
    
    // Places
    'Home': ['comfort', 'family', 'safe', 'warm', 'cozy', 'shelter', 'belonging', 'peace'],
    'School': ['learn', 'education', 'knowledge', 'students', 'teachers', 'classroom', 'growth', 'future'],
    
    // Time
    'Morning': ['sunrise', 'fresh', 'new', 'awake', 'energy', 'breakfast', 'start', 'bright']
  };

  return examples[targetWord] || ['related', 'words', 'here', 'examples'];
};
