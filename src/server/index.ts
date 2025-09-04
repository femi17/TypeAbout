import express from 'express';
import cors from 'cors';
import { GameResult, LeaderboardEntry, DailyChallenge } from '../shared/types';
import { generateDailyChallenge, getWordUsageStats, getAllWords } from './wordManager';

const app = express();

app.use(cors());
app.use(express.json());

// In-memory storage (in production, use a database)
let leaderboard: LeaderboardEntry[] = [
  { username: "WordMaster", score: 18, targetWord: "Cat", timestamp: new Date() },
  { username: "LexiconPro", score: 16, targetWord: "Ocean", timestamp: new Date() },
  { username: "VocabularyKing", score: 15, targetWord: "Music", timestamp: new Date() },
  { username: "WordSmith", score: 14, targetWord: "Food", timestamp: new Date() },
  { username: "LanguageLover", score: 13, targetWord: "Nature", timestamp: new Date() }
];

// Daily challenges will be generated dynamically using the word manager
let dailyChallenges: DailyChallenge[] = [];

// Get current daily challenge
app.get('/api/daily-challenge', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  let challenge = dailyChallenges.find(c => c.date === today);
  
  if (!challenge) {
    // Generate a new challenge using the word manager
    challenge = generateDailyChallenge(today);
    dailyChallenges.push(challenge);
  }
  
  res.json(challenge);
});

// Submit game result
app.post('/api/submit-result', (req, res) => {
  const { username, targetWord, score, typedWords, timeRemaining } = req.body;
  
  if (!username || !targetWord || typeof score !== 'number') {
    return res.status(400).json({ error: 'Invalid data' });
  }
  
  const newEntry: LeaderboardEntry = {
    username,
    score,
    targetWord,
    timestamp: new Date()
  };
  
  leaderboard.push(newEntry);
  
  // Sort by score (highest first) and keep top 100
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard = leaderboard.slice(0, 100);
  
  res.json({ success: true, rank: leaderboard.findIndex(entry => entry.username === username) + 1 });
});

// Get leaderboard
app.get('/api/leaderboard', (req, res) => {
  const { limit = 50, timeFilter = 'all' } = req.query;
  
  let filteredLeaderboard = [...leaderboard];
  
  if (timeFilter === 'today') {
    const today = new Date().toISOString().split('T')[0];
    filteredLeaderboard = leaderboard.filter(entry => 
      entry.timestamp.toISOString().split('T')[0] === today
    );
  } else if (timeFilter === 'week') {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    filteredLeaderboard = leaderboard.filter(entry => entry.timestamp > weekAgo);
  } else if (timeFilter === 'month') {
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    filteredLeaderboard = leaderboard.filter(entry => entry.timestamp > monthAgo);
  }
  
  res.json(filteredLeaderboard.slice(0, Number(limit)));
});

// Get user stats
app.get('/api/user/:username', (req, res) => {
  const { username } = req.params;
  const userEntries = leaderboard.filter(entry => entry.username === username);
  
  if (userEntries.length === 0) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const totalGames = userEntries.length;
  const totalScore = userEntries.reduce((sum, entry) => sum + entry.score, 0);
  const averageScore = totalScore / totalGames;
  const bestScore = Math.max(...userEntries.map(entry => entry.score));
  const favoriteWord = userEntries.reduce((acc, entry) => {
    acc[entry.targetWord] = (acc[entry.targetWord] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const mostPlayedWord = Object.entries(favoriteWord)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || 'None';
  
  res.json({
    username,
    totalGames,
    totalScore,
    averageScore: Math.round(averageScore * 100) / 100,
    bestScore,
    mostPlayedWord,
    recentGames: userEntries.slice(0, 10)
  });
});

// Get word usage statistics
app.get('/api/word-stats', (req, res) => {
  const stats = getWordUsageStats();
  res.json(stats);
});

// Get all available words (for admin/debugging purposes)
app.get('/api/words', (req, res) => {
  const words = getAllWords();
  res.json({ 
    total: words.length, 
    words: words.slice(0, 100) // Limit to first 100 for performance
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// For Devvit Web, we export the app but don't start a standalone server
export default app;
