import { DailyChallenge } from '../shared/types';

// Large collection of words organized by categories
const WORD_CATEGORIES = {
  animals: [
    'Cat', 'Dog', 'Lion', 'Tiger', 'Elephant', 'Giraffe', 'Monkey', 'Penguin',
    'Dolphin', 'Whale', 'Shark', 'Eagle', 'Owl', 'Butterfly', 'Bee', 'Ant',
    'Spider', 'Snake', 'Fish', 'Bird', 'Horse', 'Cow', 'Pig', 'Sheep',
    'Goat', 'Chicken', 'Duck', 'Goose', 'Swan', 'Peacock', 'Parrot', 'Crow'
  ],
  nature: [
    'Ocean', 'Forest', 'Mountain', 'River', 'Lake', 'Desert', 'Jungle', 'Beach',
    'Island', 'Valley', 'Canyon', 'Waterfall', 'Volcano', 'Cave', 'Meadow', 'Garden',
    'Flower', 'Tree', 'Grass', 'Rock', 'Stone', 'Sand', 'Soil', 'Cloud',
    'Rain', 'Snow', 'Wind', 'Storm', 'Sun', 'Moon', 'Star', 'Sky'
  ],
  food: [
    'Pizza', 'Burger', 'Pasta', 'Rice', 'Bread', 'Cake', 'Cookie', 'Ice Cream',
    'Apple', 'Banana', 'Orange', 'Grape', 'Strawberry', 'Chocolate', 'Coffee', 'Tea',
    'Milk', 'Cheese', 'Egg', 'Meat', 'Fish', 'Vegetable', 'Salad', 'Soup',
    'Sandwich', 'Hot Dog', 'Taco', 'Sushi', 'Steak', 'Chicken', 'Pork', 'Lamb'
  ],
  activities: [
    'Sports', 'Music', 'Dance', 'Singing', 'Reading', 'Writing', 'Painting', 'Drawing',
    'Cooking', 'Baking', 'Gardening', 'Fishing', 'Hiking', 'Swimming', 'Running', 'Cycling',
    'Travel', 'Photography', 'Gaming', 'Shopping', 'Cleaning', 'Working', 'Studying', 'Teaching',
    'Learning', 'Exploring', 'Adventuring', 'Relaxing', 'Meditating', 'Exercising', 'Training', 'Competing'
  ],
  emotions: [
    'Love', 'Happiness', 'Joy', 'Excitement', 'Peace', 'Calm', 'Serenity', 'Contentment',
    'Sadness', 'Anger', 'Fear', 'Anxiety', 'Worry', 'Stress', 'Relief', 'Gratitude',
    'Hope', 'Faith', 'Courage', 'Strength', 'Confidence', 'Pride', 'Humility', 'Kindness',
    'Compassion', 'Empathy', 'Patience', 'Forgiveness', 'Understanding', 'Acceptance', 'Respect', 'Trust'
  ],
  technology: [
    'Computer', 'Phone', 'Internet', 'Software', 'App', 'Website', 'Social Media', 'Email',
    'Camera', 'Television', 'Radio', 'Speaker', 'Headphone', 'Microphone', 'Keyboard', 'Mouse',
    'Robot', 'Artificial Intelligence', 'Machine Learning', 'Data', 'Information', 'Knowledge', 'Wisdom', 'Intelligence',
    'Innovation', 'Creativity', 'Design', 'Engineering', 'Science', 'Mathematics', 'Physics', 'Chemistry'
  ],
  places: [
    'Home', 'School', 'Work', 'Office', 'Hospital', 'Restaurant', 'Store', 'Mall',
    'Park', 'Museum', 'Library', 'Theater', 'Cinema', 'Stadium', 'Airport', 'Station',
    'City', 'Town', 'Village', 'Country', 'State', 'Province', 'Region', 'Area',
    'Neighborhood', 'Street', 'Road', 'Highway', 'Bridge', 'Tunnel', 'Building', 'House'
  ],
  time: [
    'Morning', 'Afternoon', 'Evening', 'Night', 'Today', 'Yesterday', 'Tomorrow', 'Week',
    'Month', 'Year', 'Season', 'Spring', 'Summer', 'Autumn', 'Winter', 'Holiday',
    'Birthday', 'Anniversary', 'Celebration', 'Party', 'Event', 'Meeting', 'Appointment', 'Schedule',
    'Past', 'Present', 'Future', 'History', 'Memory', 'Moment', 'Second', 'Minute'
  ]
};

// Track used words by date
const usedWordsByDate: Map<string, Set<string>> = new Map();

// Get all available words
export function getAllWords(): string[] {
  return Object.values(WORD_CATEGORIES).flat();
}

// Get total word count
export function getTotalWordCount(): number {
  return getAllWords().length;
}

// Get words by category
export function getWordsByCategory(category: keyof typeof WORD_CATEGORIES): string[] {
  return WORD_CATEGORIES[category] || [];
}

// Check if a word was used on a specific date
export function isWordUsedOnDate(word: string, date: string): boolean {
  const usedWords = usedWordsByDate.get(date);
  return usedWords ? usedWords.has(word) : false;
}

// Mark a word as used on a specific date
export function markWordAsUsed(word: string, date: string): void {
  if (!usedWordsByDate.has(date)) {
    usedWordsByDate.set(date, new Set());
  }
  usedWordsByDate.get(date)!.add(word);
}

// Get available words for a specific date (words not used on that date)
export function getAvailableWordsForDate(date: string): string[] {
  const allWords = getAllWords();
  const usedWords = usedWordsByDate.get(date) || new Set();
  return allWords.filter(word => !usedWords.has(word));
}

// Get a random available word for a specific date
export function getRandomAvailableWordForDate(date: string): string | null {
  const availableWords = getAvailableWordsForDate(date);
  if (availableWords.length === 0) {
    return null;
  }
  return availableWords[Math.floor(Math.random() * availableWords.length)];
}

// Get a random word from a specific category for a date
export function getRandomWordFromCategoryForDate(
  category: keyof typeof WORD_CATEGORIES, 
  date: string
): string | null {
  const categoryWords = getWordsByCategory(category);
  const availableWords = categoryWords.filter(word => !isWordUsedOnDate(word, date));
  
  if (availableWords.length === 0) {
    return null;
  }
  
  return availableWords[Math.floor(Math.random() * availableWords.length)];
}

// Generate a daily challenge for a specific date
export function generateDailyChallenge(date: string): DailyChallenge {
  // Try to get a word from different categories to ensure variety
  const categories = Object.keys(WORD_CATEGORIES) as Array<keyof typeof WORD_CATEGORIES>;
  let selectedWord = '';
  let selectedCategory = '';
  
  // Shuffle categories to randomize selection
  const shuffledCategories = [...categories].sort(() => Math.random() - 0.5);
  
  for (const category of shuffledCategories) {
    const word = getRandomWordFromCategoryForDate(category, date);
    if (word) {
      selectedWord = word;
      selectedCategory = category;
      break;
    }
  }
  
  // If no word found in any category, get any available word
  if (!selectedWord) {
    selectedWord = getRandomAvailableWordForDate(date) || 'Cat'; // Fallback
  }
  
  // Mark the word as used for this date
  markWordAsUsed(selectedWord, date);
  
  // Generate description based on the word
  const description = generateDescription(selectedWord, selectedCategory);
  
  // Determine difficulty based on word length and category
  const difficulty = determineDifficulty(selectedWord, selectedCategory);
  
  return {
    id: Date.now().toString(),
    targetWord: selectedWord,
    date,
    description,
    difficulty
  };
}

// Generate a description for a word
function generateDescription(word: string, category: string): string {
  const descriptions: { [key: string]: string[] } = {
    animals: [
      `Type words related to ${word}! Think about what ${word} does, looks like, or reminds you of.`,
      `Describe ${word} and everything about it! What comes to mind when you think of ${word}?`,
      `Words about ${word} - think of behaviors, characteristics, and associations!`
    ],
    nature: [
      `Type words related to ${word}! What does ${word} make you think of?`,
      `Describe ${word} and its natural elements! What words come to mind?`,
      `Words about ${word} - think of colors, feelings, and natural connections!`
    ],
    food: [
      `Type words related to ${word}! What does ${word} taste like, look like, or remind you of?`,
      `Describe ${word} and everything about it! What words come to mind?`,
      `Words about ${word} - think of flavors, textures, and food associations!`
    ],
    activities: [
      `Type words related to ${word}! What does ${word} involve, feel like, or remind you of?`,
      `Describe ${word} and everything about it! What words come to mind?`,
      `Words about ${word} - think of emotions, tools, and experiences!`
    ],
    emotions: [
      `Type words related to ${word}! What does ${word} feel like, look like, or remind you of?`,
      `Describe ${word} and everything about it! What words come to mind?`,
      `Words about ${word} - think of feelings, expressions, and emotional connections!`
    ],
    technology: [
      `Type words related to ${word}! What does ${word} do, look like, or remind you of?`,
      `Describe ${word} and everything about it! What words come to mind?`,
      `Words about ${word} - think of functions, features, and tech associations!`
    ],
    places: [
      `Type words related to ${word}! What does ${word} look like, feel like, or remind you of?`,
      `Describe ${word} and everything about it! What words come to mind?`,
      `Words about ${word} - think of atmosphere, activities, and location features!`
    ],
    time: [
      `Type words related to ${word}! What does ${word} feel like, look like, or remind you of?`,
      `Describe ${word} and everything about it! What words come to mind?`,
      `Words about ${word} - think of feelings, activities, and time associations!`
    ]
  };
  
  const categoryDescriptions = descriptions[category] || descriptions.animals;
  return categoryDescriptions[Math.floor(Math.random() * categoryDescriptions.length)];
}

// Determine difficulty level
function determineDifficulty(word: string, category: string): 'easy' | 'medium' | 'hard' {
  // Easy: short words (3-4 letters) or common categories
  if (word.length <= 4 || ['animals', 'food'].includes(category)) {
    return 'easy';
  }
  
  // Hard: long words (8+ letters) or complex categories
  if (word.length >= 8 || ['technology', 'emotions'].includes(category)) {
    return 'hard';
  }
  
  // Medium: everything else
  return 'medium';
}

// Get statistics about word usage
export function getWordUsageStats(): {
  totalWords: number;
  usedWordsToday: number;
  availableWordsToday: number;
  categories: { [key: string]: number };
} {
  const today = new Date().toISOString().split('T')[0];
  const usedWords = usedWordsByDate.get(today) || new Set();
  
  return {
    totalWords: getTotalWordCount(),
    usedWordsToday: usedWords.size,
    availableWordsToday: getAvailableWordsForDate(today).length,
    categories: Object.fromEntries(
      Object.entries(WORD_CATEGORIES).map(([category, words]) => [
        category, 
        words.filter(word => !usedWords.has(word)).length
      ])
    )
  };
}

// Reset word usage for a specific date (useful for testing or admin purposes)
export function resetWordUsageForDate(date: string): void {
  usedWordsByDate.delete(date);
}

// Get words used on a specific date
export function getWordsUsedOnDate(date: string): string[] {
  const usedWords = usedWordsByDate.get(date);
  return usedWords ? Array.from(usedWords) : [];
}
