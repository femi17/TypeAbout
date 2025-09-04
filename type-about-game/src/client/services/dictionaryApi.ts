// Dictionary API service for fetching words and definitions
// Using WordsAPI (free tier available)

import { getUnusedKeywordSet as getKeywordSetFromDb } from './keywordDatabase';

export interface WordDefinition {
  word: string;
  definitions: string[];
  synonyms: string[];
  antonyms: string[];
  examples: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface WordPool {
  easy: string[];
  medium: string[];
  hard: string[];
}

// Fallback word pools if API is unavailable
const FALLBACK_WORD_POOL: WordPool = {
  easy: [
    'Cat', 'Dog', 'Bird', 'Fish', 'Tree', 'Flower', 'Sun', 'Moon', 'Star', 'Cloud',
    'House', 'Car', 'Book', 'Phone', 'Food', 'Water', 'Music', 'Art', 'Game', 'Toy',
    'Friend', 'Family', 'School', 'Work', 'Home', 'City', 'Country', 'Beach', 'Mountain', 'River',
    'Summer', 'Winter', 'Spring', 'Fall', 'Morning', 'Night', 'Day', 'Week', 'Month', 'Year',
    'Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Big', 'Small', 'Fast', 'Slow',
    'Happy', 'Sad', 'Hot', 'Cold', 'New', 'Old', 'Good', 'Bad', 'Light', 'Dark'
  ],
  medium: [
    'Ocean', 'Forest', 'Desert', 'Jungle', 'Island', 'Volcano', 'Canyon', 'Waterfall', 'Cave', 'Meadow',
    'Technology', 'Science', 'Medicine', 'Engineering', 'Architecture', 'Literature', 'Philosophy', 'History', 'Geography', 'Mathematics',
    'Adventure', 'Exploration', 'Discovery', 'Innovation', 'Creativity', 'Imagination', 'Inspiration', 'Motivation', 'Determination', 'Perseverance',
    'Harmony', 'Balance', 'Wisdom', 'Knowledge', 'Understanding', 'Awareness', 'Consciousness', 'Spirituality', 'Meditation', 'Reflection',
    'Celebration', 'Festival', 'Ceremony', 'Tradition', 'Culture', 'Heritage', 'Legacy', 'Memory', 'Experience', 'Journey',
    'Compassion', 'Empathy', 'Kindness', 'Generosity', 'Honesty', 'Integrity', 'Courage', 'Strength', 'Resilience', 'Patience'
  ],
  hard: [
    'Quantum', 'Neuroscience', 'Astrophysics', 'Biotechnology', 'Nanotechnology', 'Cryptography', 'Algorithm', 'Artificial Intelligence', 'Machine Learning', 'Blockchain',
    'Metaphysics', 'Epistemology', 'Ontology', 'Ethics', 'Aesthetics', 'Logic', 'Rhetoric', 'Semantics', 'Pragmatics', 'Hermeneutics',
    'Sustainability', 'Biodiversity', 'Ecosystem', 'Climate Change', 'Renewable Energy', 'Carbon Footprint', 'Environmentalism', 'Conservation', 'Preservation', 'Restoration',
    'Globalization', 'Interconnectedness', 'Interdependence', 'Multiculturalism', 'Diversity', 'Inclusion', 'Equity', 'Justice', 'Democracy', 'Citizenship',
    'Innovation', 'Disruption', 'Transformation', 'Evolution', 'Revolution', 'Progress', 'Development', 'Advancement', 'Breakthrough', 'Discovery',
    'Consciousness', 'Subconscious', 'Unconscious', 'Psyche', 'Soul', 'Essence', 'Existence', 'Reality', 'Truth', 'Beauty'
  ]
};

// Determine word difficulty based on length and complexity
const getWordDifficulty = (word: string): 'easy' | 'medium' | 'hard' => {
  const length = word.length;
  const hasComplexChars = /[^a-zA-Z]/.test(word);
  
  if (length <= 4 && !hasComplexChars) return 'easy';
  if (length <= 8 && !hasComplexChars) return 'medium';
  return 'hard';
};

// Get a random word from the specified difficulty level
export const getRandomWord = (difficulty: 'easy' | 'medium' | 'hard'): string => {
  const words = FALLBACK_WORD_POOL[difficulty];
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex] || words[0] || 'cat';
};

// Get a random word from all difficulty levels
export const getRandomWordFromAll = (): { word: string; difficulty: 'easy' | 'medium' | 'hard' } => {
  const allWords = [...FALLBACK_WORD_POOL.easy, ...FALLBACK_WORD_POOL.medium, ...FALLBACK_WORD_POOL.hard];
  const randomIndex = Math.floor(Math.random() * allWords.length);
  const word = allWords[randomIndex] || 'cat';
  return { word, difficulty: getWordDifficulty(word) };
};

// Fetch word definition from WordsAPI (if available)
export const fetchWordDefinition = async (word: string): Promise<WordDefinition | null> => {
  try {
    // Note: In a real implementation, you would need to:
    // 1. Get an API key from WordsAPI
    // 2. Make the actual API call
    // 3. Handle rate limiting and errors
    
    // For now, we'll simulate the API response
    const mockDefinition: WordDefinition = {
      word: word,
      definitions: [`A word related to ${word}`],
      synonyms: [],
      antonyms: [],
      examples: [`Example usage of ${word}`],
      difficulty: getWordDifficulty(word)
    };
    
    return mockDefinition;
  } catch (error) {
    console.error('Error fetching word definition:', error);
    return null;
  }
};

// Get a random word that hasn't been used by the user
export const getUnusedWord = (usedWords: string[], difficulty?: 'easy' | 'medium' | 'hard'): { word: string; difficulty: 'easy' | 'medium' | 'hard' } => {
  const allWords = [...FALLBACK_WORD_POOL.easy, ...FALLBACK_WORD_POOL.medium, ...FALLBACK_WORD_POOL.hard];
  const availableWords = allWords.filter(word => !usedWords.includes(word.toLowerCase()));
  
  if (availableWords.length === 0) {
    // If all words have been used, reset and start fresh
    console.log('All words have been used, resetting word pool');
    return getRandomWordFromAll();
  }
  
  // Filter by difficulty if specified
  let filteredWords = availableWords;
  if (difficulty) {
    filteredWords = availableWords.filter(word => getWordDifficulty(word) === difficulty);
    if (filteredWords.length === 0) {
      // If no words available in specified difficulty, use any available word
      filteredWords = availableWords;
    }
  }
  
  const randomIndex = Math.floor(Math.random() * filteredWords.length);
  const word = filteredWords[randomIndex] || availableWords[0] || 'cat';
  
  return { word, difficulty: getWordDifficulty(word) };
};

// Get a keyword set that hasn't been used by the user (new method for keyword-based gameplay)
export const getUnusedKeywordSet = (usedWords: string[]): { targetWord: string; difficulty: 'easy' | 'medium' | 'hard'; description: string } => {
  const keywordSet = getKeywordSetFromDb(usedWords);
  return {
    targetWord: keywordSet.targetWord,
    difficulty: keywordSet.difficulty,
    description: keywordSet.description
  };
};

// Get description based on target word and difficulty
export const getWordDescription = (targetWord: string, difficulty: 'easy' | 'medium' | 'hard'): string => {
  const descriptions = {
    easy: `Type words related to ${targetWord}! Think about what ${targetWord} looks like, does, or reminds you of.`,
    medium: `Type words related to ${targetWord}! Consider deeper connections, functions, and broader associations.`,
    hard: `Type words related to ${targetWord}! Explore complex concepts, abstract ideas, and sophisticated connections.`
  };
  return descriptions[difficulty];
};
