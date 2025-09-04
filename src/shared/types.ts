export interface GameState {
  isPlaying: boolean;
  targetWord: string;
  timeRemaining: number;
  typedWords: string[];
  score: number;
  gamePhase: 'waiting' | 'countdown' | 'playing' | 'finished';
  isCountdownActive: boolean;
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
  timeRemaining: number;
  timestamp: Date;
}

export interface LeaderboardEntry {
  username: string;
  score: number;
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
