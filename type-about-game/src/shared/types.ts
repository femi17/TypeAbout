export interface GameState {
  isPlaying: boolean;
  targetWord: string;
  timeRemaining: number;
  typedWords: string[];
  score: number;
  level: number;
  gamePhase: 'waiting' | 'preparation' | 'countdown' | 'playing' | 'finished';
  isCountdownActive: boolean;
  isPreparationActive: boolean;
}

export interface WordValidation {
  word: string;
  isValid: boolean;
  reason?: string;
}

export interface GameResult {
  targetWord: string;
  typedWords: string[];
  score: number;
  level: number;
  timeRemaining: number;
  timestamp: Date;
}

export interface LeaderboardEntry {
  username: string;
  score: number;
  level: number;
  targetWord: string;
  timestamp: Date;
}

export interface DailyChallenge {
  id: string;
  targetWord: string;
  date: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface WordPool {
  easy: string[];
  medium: string[];
  hard: string[];
}

export interface DailyWordTracker {
  date: string;
  usedWords: string[];
  currentWord: string;
}
