import React, { useState, useEffect } from 'react';

interface CountdownOverlayProps {
  onCountdownComplete: () => void;
  isVisible: boolean;
}

export const CountdownOverlay: React.FC<CountdownOverlayProps> = ({
  onCountdownComplete,
  isVisible
}) => {
  const [countdown, setCountdown] = useState(3);
  const [showGo, setShowGo] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setCountdown(3);
      setShowGo(false);
      return;
    }

    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setShowGo(true);
          // Show "GO" for 1 second then complete
          setTimeout(() => {
            onCountdownComplete();
          }, 1000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [isVisible, onCountdownComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        {!showGo ? (
          <div className="countdown-display">
            <div className="text-6xl font-bold text-white mb-4">Ready</div>
            <div className="text-8xl font-bold text-yellow-400 animate-pulse">
              {countdown}
            </div>
          </div>
        ) : (
          <div className="go-display">
            <div className="text-8xl font-bold text-green-400 animate-bounce">
              GO!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
