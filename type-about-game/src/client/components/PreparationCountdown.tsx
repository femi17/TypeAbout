import React, { useState, useEffect } from 'react';

interface PreparationCountdownProps {
  targetWord: string;
  level: number;
  onComplete: () => void;
  isVisible: boolean;
}

export const PreparationCountdown: React.FC<PreparationCountdownProps> = ({
  targetWord,
  level,
  onComplete,
  isVisible
}) => {
  const [phase, setPhase] = useState<'preparation' | 'ready' | 'countdown' | 'go'>('preparation');
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (!isVisible) {
      setPhase('preparation');
      setCountdown(3);
      return;
    }

    // Phase 1: Show word for 3 seconds
    const preparationTimer = setTimeout(() => {
      setPhase('ready');
    }, 3000);

    // Phase 2: Show "Ready" for 1 second
    const readyTimer = setTimeout(() => {
      setPhase('countdown');
    }, 4000);

    // Phase 3: Countdown 3, 2, 1
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setPhase('go');
          // Show "GO" for 1 second then complete
          setTimeout(() => {
            onComplete();
          }, 1000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(preparationTimer);
      clearTimeout(readyTimer);
      clearInterval(countdownInterval);
    };
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center max-w-4xl mx-auto px-4">
        {/* Word Display - Always visible */}
        <div className="mb-8">
          <div className="text-2xl md:text-3xl font-bold text-white mb-2">
            Level {level}
          </div>
          <div className="text-4xl md:text-6xl font-bold text-white mb-4">
            Type about
          </div>
          <div className="text-6xl md:text-8xl font-bold text-yellow-400 animate-pulse">
            {targetWord}
          </div>
        </div>

        {/* Dynamic Content Below */}
        <div className="min-h-[200px] flex items-center justify-center">
          {phase === 'preparation' && (
            <div className="text-2xl md:text-3xl text-white/80 animate-fade-in">
              Get ready to think...
            </div>
          )}

          {phase === 'ready' && (
            <div className="text-6xl md:text-8xl font-bold text-white animate-bounce">
              Ready
            </div>
          )}

          {phase === 'countdown' && (
            <div className="text-8xl md:text-9xl font-bold text-yellow-400 animate-pulse">
              {countdown}
            </div>
          )}

          {phase === 'go' && (
            <div className="text-8xl md:text-9xl font-bold text-green-400 animate-bounce">
              GO!
            </div>
          )}
        </div>

        {/* Progress indicator */}
        <div className="mt-8 flex justify-center space-x-2">
          <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
            phase === 'preparation' ? 'bg-yellow-400' : 'bg-white/30'
          }`}></div>
          <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
            phase === 'ready' ? 'bg-yellow-400' : 'bg-white/30'
          }`}></div>
          <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
            phase === 'countdown' ? 'bg-yellow-400' : 'bg-white/30'
          }`}></div>
          <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
            phase === 'go' ? 'bg-green-400' : 'bg-white/30'
          }`}></div>
        </div>
      </div>
    </div>
  );
};
