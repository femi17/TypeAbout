import React, { useState, useEffect, useCallback } from 'react';
import { GameState, WordValidation } from '../../shared/types';
import { GameHeader } from './GameHeader';
import { GameBoard } from './GameBoard';
import { WordInput } from './WordInput';
import { GameResults } from './GameResults';
import { LeaderboardPage } from './LeaderboardPage';
import { DailyChallenge } from './DailyChallenge';
import { Navigation } from './Navigation';
import { HowToPlay } from './HowToPlay';
import { PreparationCountdown } from './PreparationCountdown';
import { WordStats } from './WordStats';
import { Confetti } from './Confetti';
import { getUnusedKeywordSet } from '../services/dictionaryApi';
import { addUsedWord, getUsedWords } from '../services/wordTracker';
import { addGameResult } from '../services/leaderboardService';
import { 
  isKeywordMatch, 
  hasPlayerWon
} from '../services/keywordDatabase';

const GAME_DURATION = 20; // seconds

// Get a fresh keyword set that hasn't been used by the current user
const getDailyWord = (): { targetWord: string; difficulty: 'easy' | 'medium' | 'hard'; description: string } => {
  const usedWords = getUsedWords();
  return getUnusedKeywordSet(usedWords);
};

export const TypeAboutGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    targetWord: '',
    timeRemaining: GAME_DURATION,
    typedWords: [],
    score: 0,
    level: 1,
    gamePhase: 'waiting',
    isCountdownActive: false,
    isPreparationActive: false
  });

  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showWordStats, setShowWordStats] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showLevelConfetti, setShowLevelConfetti] = useState(false);
  const [dailyChallenge, setDailyChallenge] = useState(() => {
    const { targetWord, difficulty, description } = getDailyWord();
    return {
      targetWord,
      description,
      difficulty
    };
  });

  const startGame = useCallback(() => {
    // Get a fresh keyword set that hasn't been used by the current user
    const { targetWord, difficulty, description } = getDailyWord();
    
    // Track this word as used
    addUsedWord(targetWord);
    
    setDailyChallenge({
      targetWord,
      description,
      difficulty
    });
    
    // Start preparation/countdown phase - always start from level 1
    setGameState({
      isPlaying: false,
      targetWord,
      timeRemaining: GAME_DURATION,
      typedWords: [],
      score: 0,
      level: 1,
      gamePhase: 'preparation',
      isCountdownActive: false,
      isPreparationActive: true
    });
  }, []);

  const handlePreparationCountdownComplete = useCallback(() => {
    // Start the actual game after preparation and countdown
    setGameState(prev => ({
      ...prev,
      isPlaying: true,
      gamePhase: 'playing',
      isPreparationActive: false,
      isCountdownActive: false
    }));
  }, []);

  const endGame = useCallback(async () => {
    console.log('endGame called');
    
    // Save game result to leaderboard
    const result = {
      targetWord: gameState.targetWord,
      typedWords: gameState.typedWords,
      score: gameState.score,
      level: gameState.level,
      timeRemaining: gameState.timeRemaining,
      timestamp: new Date()
    };
    
    try {
      await addGameResult(result);
    } catch (error) {
      console.error('Failed to save game result to leaderboard:', error);
    }
    
    setGameState(prev => ({
      ...prev,
      isPlaying: false,
      gamePhase: 'finished'
    }));
  }, [gameState.targetWord, gameState.typedWords, gameState.score, gameState.level, gameState.timeRemaining]);

  const advanceToNextLevel = useCallback(() => {
    // Get a new word for the next level
    const { targetWord, difficulty, description } = getDailyWord();
    
    // Track this word as used
    addUsedWord(targetWord);
    
    setDailyChallenge({
      targetWord,
      description,
      difficulty
    });
    
    // Advance to next level with new word
    setGameState(prev => ({
      ...prev,
      isPlaying: false,
      targetWord,
      timeRemaining: GAME_DURATION,
      typedWords: [],
      level: prev.level + 1,
      gamePhase: 'preparation',
      isCountdownActive: false,
      isPreparationActive: true
    }));
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
        
        // Trigger confetti animation
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      }
    }
  }, [gameState.isPlaying, gameState.typedWords, gameState.score]);

  const validateWord = useCallback((word: string): WordValidation => {
    const trimmedWord = word.trim().toLowerCase();
    const targetWord = gameState.targetWord.toLowerCase();
    
    // Check if word is the target word itself
    if (trimmedWord === targetWord) {
      return { word: trimmedWord, isValid: false, reason: "Can't use the target word itself" };
    }
    
    // Check if word is too short
    if (trimmedWord.length < 2) {
      return { word: trimmedWord, isValid: false, reason: "Word too short" };
    }
    
    // Check if word has already been used
    if (gameState.typedWords.includes(trimmedWord)) {
      return { word: trimmedWord, isValid: false, reason: "Word already used" };
    }
    
    // Check if word matches any of the pre-selected keywords
    const isMatch = isKeywordMatch(gameState.targetWord, trimmedWord);
    if (!isMatch) {
      return { word: trimmedWord, isValid: false, reason: "Not a related keyword" };
    }
    
    return { word: trimmedWord, isValid: true };
  }, [gameState.targetWord, gameState.typedWords]);

  // Timer effect and win/lose condition checking
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameState.isPlaying) {
      interval = setInterval(() => {
        setGameState(prev => {
          const newTime = prev.timeRemaining - 1;
          console.log('Timer tick:', { current: prev.timeRemaining, new: newTime, isPlaying: prev.isPlaying });
          
          // Check if player has won (found ALL keywords for the level)
          if (hasPlayerWon(prev.targetWord, prev.typedWords)) {
            // Trigger level completion confetti
            setShowLevelConfetti(true);
            setTimeout(() => setShowLevelConfetti(false), 3000);
            
            // Advance to next level instead of ending game
            setTimeout(() => {
              advanceToNextLevel();
            }, 1000); // Small delay to show completion
            return prev;
          }
          
          // Check if time is up
          if (newTime <= 0) {
            // Game over - player didn't find all keywords in time
            console.log('Game over triggered - time up!');
            endGame(); // This is now async but we don't need to await it
            return { ...prev, timeRemaining: 0, isPlaying: false, gamePhase: 'finished' };
          }
          
          return { ...prev, timeRemaining: newTime };
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [gameState.isPlaying, gameState.timeRemaining, endGame, advanceToNextLevel]);

  const handleWordSubmit = useCallback((word: string) => {
    const validation = validateWord(word);
    if (validation.isValid) {
      addWord(word);
    }
    return validation;
  }, [validateWord, addWord]);


  // Show leaderboard page if requested
  if (showLeaderboard) {
    return (
      <LeaderboardPage 
        onBack={() => setShowLeaderboard(false)}
        currentScore={gameState.score}
        currentLevel={gameState.level}
        targetWord={gameState.targetWord}
      />
    );
  }

  return (
    <div className="game-container h-screen overflow-hidden">
      {/* Navigation */}
      <Navigation 
        onShowLeaderboard={() => setShowLeaderboard(true)}
        onShowHowToPlay={() => setShowHowToPlay(true)}
        onShowWordStats={() => setShowWordStats(true)}
      />
      
      <div className="max-w-4xl mx-auto p-2 h-full flex flex-col">
        {/* Only show GameHeader on landing page */}
        {gameState.gamePhase === 'waiting' && <GameHeader />}
        
        {gameState.gamePhase === 'waiting' && (
          <DailyChallenge 
            challenge={dailyChallenge}
            onStartGame={startGame}
          />
        )}
        
        {gameState.isPlaying && (
          <div className="flex-1 flex flex-col space-y-3 min-h-0">
            <div className="flex-1 min-h-0">
              <GameBoard 
                targetWord={gameState.targetWord}
                typedWords={gameState.typedWords}
                timeRemaining={gameState.timeRemaining}
                score={gameState.score}
                level={gameState.level}
                isCountdownActive={false}
                gamePhase="playing"
              />
            </div>
            <div className="flex-shrink-0">
              <WordInput 
                onSubmit={handleWordSubmit}
                disabled={!gameState.isPlaying}
                placeholder={`Type words related to "${gameState.targetWord}"...`}
                isCountdownActive={false}
              />
            </div>
          </div>
        )}

        {/* Preparation and Countdown Combined */}
        <PreparationCountdown 
          targetWord={gameState.targetWord}
          level={gameState.level}
          isVisible={gameState.isPreparationActive}
          onComplete={handlePreparationCountdownComplete}
        />
        
        {gameState.gamePhase === 'finished' && (
          <div className="flex-1 min-h-0">
            <GameResults 
              result={{
                targetWord: gameState.targetWord,
                typedWords: gameState.typedWords,
                score: gameState.score,
                level: gameState.level,
                timeRemaining: gameState.timeRemaining,
                timestamp: new Date()
              }}
              onPlayAgain={startGame}
              onShowLeaderboard={() => setShowLeaderboard(true)}
            />
          </div>
        )}
        

        {showHowToPlay && (
          <HowToPlay 
            onClose={() => setShowHowToPlay(false)}
          />
        )}
        
        {/* Word Stats Modal */}
        <WordStats 
          isVisible={showWordStats}
          onClose={() => setShowWordStats(false)}
        />
        
        {/* Confetti Animations */}
        <Confetti isActive={showConfetti} type="keyword" />
        <Confetti isActive={showLevelConfetti} type="level" duration={3000} />
      </div>
    </div>
  );
};
