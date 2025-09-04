// Word tracking service to prevent word repetition
// Tracks words used per user and globally

export interface WordUsage {
  word: string;
  timestamp: number;
  userId?: string;
}

export interface WordTracker {
  date: string;
  usedWords: WordUsage[];
  currentWord: string;
  userId?: string;
}

// Get today's date in YYYY-MM-DD format
const getTodayString = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0] || new Date().toLocaleDateString('en-CA');
};

// Generate a simple user ID (in a real app, this would come from authentication)
const generateUserId = (): string => {
  let userId = localStorage.getItem('typeAboutUserId');
  if (!userId) {
    userId = 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    localStorage.setItem('typeAboutUserId', userId);
  }
  return userId;
};

// Get user ID
export const getUserId = (): string => {
  return generateUserId();
};

// Get word tracker from localStorage
export const getWordTracker = (): WordTracker | null => {
  try {
    const stored = localStorage.getItem('typeAboutWordTracker');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error parsing word tracker:', error);
  }
  return null;
};

// Save word tracker to localStorage
export const saveWordTracker = (tracker: WordTracker): void => {
  try {
    localStorage.setItem('typeAboutWordTracker', JSON.stringify(tracker));
  } catch (error) {
    console.error('Error saving word tracker:', error);
  }
};

// Get all words used by the current user
export const getUsedWords = (): string[] => {
  const tracker = getWordTracker();
  const userId = getUserId();
  
  if (!tracker) return [];
  
  // Filter words used by current user
  return tracker.usedWords
    .filter(usage => usage.userId === userId)
    .map(usage => usage.word.toLowerCase());
};

// Get all words used globally (across all users)
export const getGlobalUsedWords = (): string[] => {
  const tracker = getWordTracker();
  
  if (!tracker) return [];
  
  return tracker.usedWords.map(usage => usage.word.toLowerCase());
};

// Add a word to the tracker
export const addUsedWord = (word: string): void => {
  const tracker = getWordTracker();
  const userId = getUserId();
  const today = getTodayString();
  
  const wordUsage: WordUsage = {
    word: word.toLowerCase(),
    timestamp: Date.now(),
    userId: userId
  };
  
  if (!tracker || tracker.date !== today) {
    // Create new tracker for today
    const newTracker: WordTracker = {
      date: today,
      usedWords: [wordUsage],
      currentWord: word.toLowerCase()
    };
    saveWordTracker(newTracker);
  } else {
    // Add to existing tracker
    const existingUsage = tracker.usedWords.find(
      usage => usage.word === word.toLowerCase() && usage.userId === userId
    );
    
    if (!existingUsage) {
      tracker.usedWords.push(wordUsage);
      tracker.currentWord = word.toLowerCase();
      saveWordTracker(tracker);
    }
  }
};

// Check if a word has been used by the current user
export const hasUserUsedWord = (word: string): boolean => {
  const usedWords = getUsedWords();
  return usedWords.includes(word.toLowerCase());
};

// Check if a word has been used globally
export const hasGlobalUsedWord = (word: string): boolean => {
  const globalUsedWords = getGlobalUsedWords();
  return globalUsedWords.includes(word.toLowerCase());
};

// Get words used by the current user today
export const getTodayUsedWords = (): string[] => {
  const tracker = getWordTracker();
  const userId = getUserId();
  const today = getTodayString();
  
  if (!tracker || tracker.date !== today) return [];
  
  return tracker.usedWords
    .filter(usage => usage.userId === userId)
    .map(usage => usage.word.toLowerCase());
};

// Get words used globally today
export const getTodayGlobalUsedWords = (): string[] => {
  const tracker = getWordTracker();
  const today = getTodayString();
  
  if (!tracker || tracker.date !== today) return [];
  
  return tracker.usedWords.map(usage => usage.word.toLowerCase());
};

// Reset word tracker (useful for testing or if all words are exhausted)
export const resetWordTracker = (): void => {
  localStorage.removeItem('typeAboutWordTracker');
};

// Get statistics about word usage
export const getWordUsageStats = (): {
  userWordsToday: number;
  globalWordsToday: number;
  userWordsTotal: number;
  globalWordsTotal: number;
} => {
  const tracker = getWordTracker();
  const userId = getUserId();
  const today = getTodayString();
  
  if (!tracker) {
    return {
      userWordsToday: 0,
      globalWordsToday: 0,
      userWordsTotal: 0,
      globalWordsTotal: 0
    };
  }
  
  const userWords = tracker.usedWords.filter(usage => usage.userId === userId);
  const todayWords = tracker.usedWords.filter(usage => {
    const usageDate = new Date(usage.timestamp).toISOString().split('T')[0];
    return usageDate === today;
  });
  const todayUserWords = todayWords.filter(usage => usage.userId === userId);
  
  return {
    userWordsToday: todayUserWords.length,
    globalWordsToday: todayWords.length,
    userWordsTotal: userWords.length,
    globalWordsTotal: tracker.usedWords.length
  };
};
