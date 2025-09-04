import React, { useState, useEffect, useCallback } from 'react';
import { GameState, WordValidation, GameResult } from '../../shared/types';
import { GameHeader } from './GameHeader';
import { GameBoard } from './GameBoard';
import { WordInput } from './WordInput';
import { GameResults } from './GameResults';
import { Leaderboard } from './Leaderboard';
import { DailyChallenge } from './DailyChallenge';
import { CountdownOverlay } from './CountdownOverlay';

const GAME_DURATION = 20; // seconds

export const TypeAboutGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    targetWord: '',
    timeRemaining: GAME_DURATION,
    typedWords: [],
    score: 0,
    gamePhase: 'waiting',
    isCountdownActive: false
  });

  const [showResults, setShowResults] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [dailyChallenge, setDailyChallenge] = useState({
    targetWord: 'Cat',
    description: 'Type words related to cats! Think about what cats do, look like, or remind you of.',
    difficulty: 'easy' as const
  });

  // Fetch daily challenge from server
  useEffect(() => {
    const fetchDailyChallenge = async () => {
      try {
        const response = await fetch('/api/daily-challenge');
        if (response.ok) {
          const challenge = await response.json();
          setDailyChallenge(challenge);
        }
      } catch (error) {
        console.error('Failed to fetch daily challenge:', error);
        // Keep the default challenge if fetch fails
      }
    };

    fetchDailyChallenge();
  }, []);

  const startGame = useCallback(() => {
    // Start countdown first
    setGameState({
      isPlaying: false,
      targetWord: dailyChallenge.targetWord,
      timeRemaining: GAME_DURATION,
      typedWords: [],
      score: 0,
      gamePhase: 'countdown',
      isCountdownActive: true
    });
    setShowResults(false);
  }, [dailyChallenge.targetWord]);

  const handleCountdownComplete = useCallback(() => {
    // Start the actual game after countdown
    setGameState(prev => ({
      ...prev,
      isPlaying: true,
      gamePhase: 'playing',
      isCountdownActive: false
    }));
  }, []);

  const endGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPlaying: false,
      gamePhase: 'finished'
    }));
    setShowResults(true);
  }, []);

  const addWord = useCallback((word: string) => {
    if (gameState.isPlaying && word.trim()) {
      const trimmedWord = word.trim().toLowerCase();
      if (!gameState.typedWords.includes(trimmedWord)) {
        const newScore = gameState.score + 1;
        setGameState(prev => ({
          ...prev,
          typedWords: [...prev.typedWords, trimmedWord],
          score: newScore
        }));
      }
    }
  }, [gameState.isPlaying, gameState.typedWords, gameState.score]);

  const validateWord = useCallback((word: string): WordValidation => {
    const trimmedWord = word.trim().toLowerCase();
    const targetWord = gameState.targetWord.toLowerCase();
    
    // Basic validation - word should be related to target word
    // In a real implementation, this would use more sophisticated semantic analysis
    if (trimmedWord === targetWord) {
      return { word: trimmedWord, isValid: false, reason: "Can't use the target word itself" };
    }
    
    if (trimmedWord.length < 2) {
      return { word: trimmedWord, isValid: false, reason: "Word too short" };
    }
    
    if (gameState.typedWords.includes(trimmedWord)) {
      return { word: trimmedWord, isValid: false, reason: "Word already used" };
    }
    
    return { word: trimmedWord, isValid: true };
  }, [gameState.targetWord, gameState.typedWords]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameState.isPlaying && gameState.timeRemaining > 0) {
      interval = setInterval(() => {
        setGameState(prev => {
          const newTime = prev.timeRemaining - 1;
          if (newTime <= 0) {
            endGame();
            return prev;
          }
          return { ...prev, timeRemaining: newTime };
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [gameState.isPlaying, gameState.timeRemaining, endGame]);

  const handleWordSubmit = useCallback((word: string) => {
    const validation = validateWord(word);
    if (validation.isValid) {
      addWord(word);
    }
    return validation;
  }, [validateWord, addWord]);

  const resetGame = useCallback(() => {
    setGameState({
      isPlaying: false,
      targetWord: '',
      timeRemaining: GAME_DURATION,
      typedWords: [],
      score: 0,
      gamePhase: 'waiting',
      isCountdownActive: false
    });
    setShowResults(false);
  }, []);

  return (
    <div className="game-container min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <GameHeader 
          onStartGame={startGame}
          onShowLeaderboard={() => setShowLeaderboard(true)}
          onShowDailyChallenge={() => setShowLeaderboard(false)}
        />
        
        {!gameState.isPlaying && !showResults && gameState.gamePhase === 'waiting' && (
          <DailyChallenge 
            challenge={dailyChallenge}
            onStartGame={startGame}
          />
        )}
        
        {(gameState.isPlaying || gameState.gamePhase === 'countdown') && (
          <div className="space-y-6">
            <GameBoard 
              targetWord={gameState.targetWord}
              typedWords={gameState.typedWords}
              timeRemaining={gameState.timeRemaining}
              score={gameState.score}
              isCountdownActive={gameState.isCountdownActive}
            />
            <WordInput 
              onSubmit={handleWordSubmit}
              disabled={!gameState.isPlaying}
              placeholder={`Type words related to "${gameState.targetWord}"...`}
              isCountdownActive={gameState.isCountdownActive}
            />
          </div>
        )}

        {/* Countdown Overlay */}
        <CountdownOverlay 
          isVisible={gameState.isCountdownActive}
          onCountdownComplete={handleCountdownComplete}
        />
        
        {showResults && (
          <GameResults 
            result={{
              targetWord: gameState.targetWord,
              typedWords: gameState.typedWords,
              score: gameState.score,
              timeRemaining: gameState.timeRemaining,
              timestamp: new Date()
            }}
            onPlayAgain={resetGame}
            onShowLeaderboard={() => setShowLeaderboard(true)}
          />
        )}
        
        {showLeaderboard && (
          <Leaderboard 
            onClose={() => setShowLeaderboard(false)}
            currentScore={gameState.score}
            targetWord={gameState.targetWord}
          />
        )}
      </div>
    </div>
  );
};
