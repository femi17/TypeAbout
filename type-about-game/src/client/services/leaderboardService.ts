// Leaderboard service for managing game results and rankings
import { LeaderboardEntry, GameResult } from '../../shared/types';
import { getCurrentRedditUsername } from './redditUserService';

const LEADERBOARD_STORAGE_KEY = 'typeabout_leaderboard';
const MAX_LEADERBOARD_ENTRIES = 100;

// Get all leaderboard entries from localStorage
export const getLeaderboardEntries = (): LeaderboardEntry[] => {
  try {
    const stored = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
    if (stored) {
      const entries = JSON.parse(stored);
      // Convert timestamp strings back to Date objects
      return entries.map((entry: any) => ({
        ...entry,
        timestamp: new Date(entry.timestamp)
      }));
    }
  } catch (error) {
    console.error('Error loading leaderboard:', error);
  }
  return [];
};

// Save a new leaderboard entry
export const addLeaderboardEntry = (entry: LeaderboardEntry): void => {
  try {
    const entries = getLeaderboardEntries();
    
    // Add the new entry
    entries.push(entry);
    
    // Sort by score (descending) and level (descending) as tiebreaker
    entries.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return b.level - a.level;
    });
    
    // Keep only the top entries
    const topEntries = entries.slice(0, MAX_LEADERBOARD_ENTRIES);
    
    // Save to localStorage
    localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(topEntries));
  } catch (error) {
    console.error('Error saving leaderboard entry:', error);
  }
};

// Add a game result to the leaderboard
export const addGameResult = async (result: GameResult, username?: string): Promise<void> => {
  let finalUsername = username;
  
  // If no username provided, try to get Reddit username
  if (!finalUsername) {
    try {
      finalUsername = await getCurrentRedditUsername();
      
      // If we got 'anonymous', fall back to generated username
      if (finalUsername === 'anonymous') {
        finalUsername = generateRandomUsername();
      }
    } catch (error) {
      console.error('Failed to get Reddit username, using generated username:', error);
      finalUsername = generateRandomUsername();
    }
  }
  
  const entry: LeaderboardEntry = {
    username: finalUsername,
    score: result.score,
    level: result.level,
    targetWord: result.targetWord,
    timestamp: result.timestamp
  };
  
  addLeaderboardEntry(entry);
};

// Generate a random username for anonymous players
const generateRandomUsername = (): string => {
  const adjectives = [
    'Swift', 'Clever', 'Bright', 'Quick', 'Sharp', 'Smart', 'Fast', 'Bold',
    'Wise', 'Brave', 'Cool', 'Epic', 'Super', 'Mega', 'Ultra', 'Pro'
  ];
  
  const nouns = [
    'Player', 'Gamer', 'Thinker', 'Master', 'Champ', 'Hero', 'Star', 'Ace',
    'Genius', 'Wizard', 'Ninja', 'Legend', 'Boss', 'King', 'Queen', 'Lord'
  ];
  
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 999) + 1;
  
  return `${adjective}${noun}${number}`;
};

// Get leaderboard entries filtered by time period
export const getFilteredLeaderboard = (
  entries: LeaderboardEntry[], 
  filter: 'all' | 'today' | 'week' | 'month'
): LeaderboardEntry[] => {
  const now = new Date();
  
  switch (filter) {
    case 'today':
      return entries.filter(entry => {
        const entryDate = new Date(entry.timestamp);
        return entryDate.toDateString() === now.toDateString();
      });
    
    case 'week':
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return entries.filter(entry => entry.timestamp >= weekAgo);
    
    case 'month':
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      return entries.filter(entry => entry.timestamp >= monthAgo);
    
    default:
      return entries;
  }
};

// Get player's rank in the leaderboard
export const getPlayerRank = (entries: LeaderboardEntry[], score: number, level: number): number => {
  const sorted = [...entries].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return b.level - a.level;
  });
  
  const rank = sorted.findIndex(entry => 
    entry.score === score && entry.level === level
  ) + 1;
  
  return rank > 0 ? rank : sorted.length + 1;
};

// Get leaderboard statistics
export const getLeaderboardStats = (entries: LeaderboardEntry[]) => {
  if (entries.length === 0) {
    return {
      totalPlayers: 0,
      averageScore: 0,
      highestScore: 0,
      highestLevel: 0
    };
  }
  
  const scores = entries.map(entry => entry.score);
  const levels = entries.map(entry => entry.level);
  
  return {
    totalPlayers: entries.length,
    averageScore: Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length),
    highestScore: Math.max(...scores),
    highestLevel: Math.max(...levels)
  };
};

// Clear all leaderboard data (for testing/reset)
export const clearLeaderboard = (): void => {
  localStorage.removeItem(LEADERBOARD_STORAGE_KEY);
};
