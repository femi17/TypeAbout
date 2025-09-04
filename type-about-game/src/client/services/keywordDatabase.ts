// Keyword database service for storing related keywords for each target word
// This creates a structured learning experience where players must guess pre-selected keywords

export interface KeywordSet {
  targetWord: string;
  difficulty: 'easy' | 'medium' | 'hard';
  keywords: string[];
  description: string;
}

// Comprehensive keyword database organized by target words
const KEYWORD_DATABASE: KeywordSet[] = [
  // Easy words
  {
    targetWord: 'Cat',
    difficulty: 'easy',
    keywords: ['feline', 'pet', 'whiskers', 'meow', 'purr'],
    description: 'Type words related to cats! Think about what cats look like, sound like, or do.'
  },
  {
    targetWord: 'Dog',
    difficulty: 'easy',
    keywords: ['canine', 'pet', 'bark', 'tail', 'paws'],
    description: 'Type words related to dogs! Think about what dogs look like, sound like, or do.'
  },
  {
    targetWord: 'Tree',
    difficulty: 'easy',
    keywords: ['leaves', 'branches', 'trunk', 'roots', 'bark'],
    description: 'Type words related to trees! Think about what trees look like and their parts.'
  },
  {
    targetWord: 'Sun',
    difficulty: 'easy',
    keywords: ['bright', 'hot', 'yellow', 'day', 'light'],
    description: 'Type words related to the sun! Think about what the sun does and looks like.'
  },
  {
    targetWord: 'Water',
    difficulty: 'easy',
    keywords: ['liquid', 'wet', 'blue', 'drink', 'ocean'],
    description: 'Type words related to water! Think about what water is and where you find it.'
  },
  {
    targetWord: 'Food',
    difficulty: 'easy',
    keywords: ['eat', 'hungry', 'taste', 'cook', 'meal'],
    description: 'Type words related to food! Think about what you do with food and how it tastes.'
  },
  {
    targetWord: 'Music',
    difficulty: 'easy',
    keywords: ['song', 'melody', 'rhythm', 'instrument', 'band'],
    description: 'Type words related to music! Think about what music sounds like and how you enjoy it.'
  },
  {
    targetWord: 'Book',
    difficulty: 'easy',
    keywords: ['read', 'pages', 'story', 'author', 'library'],
    description: 'Type words related to books! Think about what you do with books and what they contain.'
  },
  {
    targetWord: 'House',
    difficulty: 'easy',
    keywords: ['home', 'roof', 'door', 'windows', 'family'],
    description: 'Type words related to houses! Think about what houses look like and what they provide.'
  },
  {
    targetWord: 'Car',
    difficulty: 'easy',
    keywords: ['drive', 'wheels', 'engine', 'road', 'speed'],
    description: 'Type words related to cars! Think about what cars do and their parts.'
  },

  // Medium words
  {
    targetWord: 'Ocean',
    difficulty: 'medium',
    keywords: ['waves', 'deep', 'blue', 'salt', 'fish'],
    description: 'Type words related to oceans! Think about what oceans contain and their characteristics.'
  },
  {
    targetWord: 'Technology',
    difficulty: 'medium',
    keywords: ['computer', 'digital', 'innovation', 'software', 'internet'],
    description: 'Type words related to technology! Think about modern tools and digital systems.'
  },
  {
    targetWord: 'Adventure',
    difficulty: 'medium',
    keywords: ['explore', 'journey', 'exciting', 'discover', 'travel'],
    description: 'Type words related to adventure! Think about exciting experiences and exploration.'
  },
  {
    targetWord: 'Harmony',
    difficulty: 'medium',
    keywords: ['balance', 'peace', 'unity', 'agreement', 'melody'],
    description: 'Type words related to harmony! Think about balance, peace, and things working together.'
  },
  {
    targetWord: 'Compassion',
    difficulty: 'medium',
    keywords: ['empathy', 'kindness', 'caring', 'understanding', 'sympathy'],
    description: 'Type words related to compassion! Think about caring for others and showing kindness.'
  },
  {
    targetWord: 'Innovation',
    difficulty: 'medium',
    keywords: ['creativity', 'invention', 'progress', 'breakthrough', 'original'],
    description: 'Type words related to innovation! Think about new ideas and creative solutions.'
  },
  {
    targetWord: 'Wisdom',
    difficulty: 'medium',
    keywords: ['knowledge', 'insight', 'understanding', 'experience', 'judgment'],
    description: 'Type words related to wisdom! Think about deep understanding and good judgment.'
  },
  {
    targetWord: 'Celebration',
    difficulty: 'medium',
    keywords: ['festival', 'party', 'joy', 'happiness', 'ceremony'],
    description: 'Type words related to celebration! Think about joyful events and special occasions.'
  },

  // Hard words
  {
    targetWord: 'Quantum',
    difficulty: 'hard',
    keywords: ['physics', 'particle', 'energy', 'subatomic', 'uncertainty'],
    description: 'Type words related to quantum! Think about advanced physics and subatomic phenomena.'
  },
  {
    targetWord: 'Metaphysics',
    difficulty: 'hard',
    keywords: ['philosophy', 'reality', 'existence', 'consciousness', 'being'],
    description: 'Type words related to metaphysics! Think about fundamental questions about reality and existence.'
  },
  {
    targetWord: 'Sustainability',
    difficulty: 'hard',
    keywords: ['environment', 'conservation', 'renewable', 'ecological', 'green'],
    description: 'Type words related to sustainability! Think about environmental responsibility and long-term thinking.'
  },
  {
    targetWord: 'Globalization',
    difficulty: 'hard',
    keywords: ['international', 'worldwide', 'interconnected', 'trade', 'culture'],
    description: 'Type words related to globalization! Think about worldwide connections and international integration.'
  },
  {
    targetWord: 'Consciousness',
    difficulty: 'hard',
    keywords: ['awareness', 'mind', 'perception', 'cognition', 'subjective'],
    description: 'Type words related to consciousness! Think about awareness, mind, and subjective experience.'
  },
  {
    targetWord: 'Cryptography',
    difficulty: 'hard',
    keywords: ['encryption', 'security', 'code', 'cipher', 'algorithm'],
    description: 'Type words related to cryptography! Think about digital security and data protection.'
  },
  {
    targetWord: 'Biodiversity',
    difficulty: 'hard',
    keywords: ['ecosystem', 'species', 'variety', 'genetic', 'conservation'],
    description: 'Type words related to biodiversity! Think about the variety of life and ecological systems.'
  },
  {
    targetWord: 'Epistemology',
    difficulty: 'hard',
    keywords: ['knowledge', 'truth', 'belief', 'justification', 'philosophy'],
    description: 'Type words related to epistemology! Think about the nature of knowledge and how we know things.'
  }
];

// Get a random keyword set that hasn't been used by the current user
export const getUnusedKeywordSet = (usedWords: string[]): KeywordSet => {
  const availableSets = KEYWORD_DATABASE.filter(set => 
    !usedWords.includes(set.targetWord.toLowerCase())
  );
  
  if (availableSets.length === 0) {
    // If all words have been used, reset and start fresh
    console.log('All keyword sets have been used, resetting...');
    const randomIndex = Math.floor(Math.random() * KEYWORD_DATABASE.length);
    return KEYWORD_DATABASE[randomIndex];
  }
  
  const randomIndex = Math.floor(Math.random() * availableSets.length);
  return availableSets[randomIndex];
};

// Get a keyword set by target word
export const getKeywordSetByWord = (targetWord: string): KeywordSet | null => {
  return KEYWORD_DATABASE.find(set => 
    set.targetWord.toLowerCase() === targetWord.toLowerCase()
  ) || null;
};

// Check if a typed word matches any of the keywords for a target word
export const isKeywordMatch = (targetWord: string, typedWord: string): boolean => {
  const keywordSet = getKeywordSetByWord(targetWord);
  if (!keywordSet) return false;
  
  return keywordSet.keywords.some(keyword => 
    keyword.toLowerCase() === typedWord.toLowerCase()
  );
};

// Get all keywords for a target word
export const getKeywordsForWord = (targetWord: string): string[] => {
  const keywordSet = getKeywordSetByWord(targetWord);
  return keywordSet ? keywordSet.keywords : [];
};

// Get the number of correct keywords found
export const getCorrectKeywordsCount = (targetWord: string, typedWords: string[]): number => {
  const keywordSet = getKeywordSetByWord(targetWord);
  if (!keywordSet) return 0;
  
  return typedWords.filter(typedWord => 
    isKeywordMatch(targetWord, typedWord)
  ).length;
};

// Get the remaining keywords that haven't been found
export const getRemainingKeywords = (targetWord: string, typedWords: string[]): string[] => {
  const keywordSet = getKeywordSetByWord(targetWord);
  if (!keywordSet) return [];
  
  return keywordSet.keywords.filter(keyword => 
    !typedWords.some(typedWord => 
      keyword.toLowerCase() === typedWord.toLowerCase()
    )
  );
};

// Get a hint (one of the remaining keywords)
export const getHint = (targetWord: string, typedWords: string[]): string | null => {
  const remaining = getRemainingKeywords(targetWord, typedWords);
  if (remaining.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * remaining.length);
  return remaining[randomIndex];
};

// Check if player has won (found ALL keywords for the level)
export const hasPlayerWon = (targetWord: string, typedWords: string[]): boolean => {
  const keywordSet = getKeywordSetByWord(targetWord);
  if (!keywordSet) return false;
  
  return getCorrectKeywordsCount(targetWord, typedWords) >= keywordSet.keywords.length;
};

// Check if player has found at least 5 keywords (for partial progress)
export const hasPlayerFoundMinimum = (targetWord: string, typedWords: string[]): boolean => {
  return getCorrectKeywordsCount(targetWord, typedWords) >= 5;
};

// Get game progress (correct keywords found out of total)
export const getGameProgress = (targetWord: string, typedWords: string[]): {
  correct: number;
  total: number;
  percentage: number;
} => {
  const keywordSet = getKeywordSetByWord(targetWord);
  if (!keywordSet) return { correct: 0, total: 0, percentage: 0 };
  
  const correct = getCorrectKeywordsCount(targetWord, typedWords);
  const total = keywordSet.keywords.length;
  const percentage = Math.round((correct / total) * 100);
  
  return { correct, total, percentage };
};
