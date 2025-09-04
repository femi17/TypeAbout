import React from 'react';

interface RoundTimerProps {
  timeRemaining: number;
  isCountdownActive: boolean;
}

export const RoundTimer: React.FC<RoundTimerProps> = ({
  timeRemaining,
  isCountdownActive
}) => {
  const getTimerColor = (time: number) => {
    if (time > 15) return 'text-green-600';
    if (time > 8) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTimerBarColor = (time: number) => {
    if (time > 15) return 'stroke-green-600';
    if (time > 8) return 'stroke-yellow-600';
    return 'stroke-red-600';
  };

  const circumference = 2 * Math.PI * 40; // radius = 40
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (timeRemaining / 20) * circumference;

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            className="text-gray-200"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={`transition-all duration-1000 ease-linear ${
              isCountdownActive ? 'text-blue-600' : getTimerBarColor(timeRemaining)
            }`}
            strokeLinecap="round"
          />
        </svg>
        {/* Timer text in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`text-xl font-bold ${
            isCountdownActive ? 'text-blue-600' : getTimerColor(timeRemaining)
          }`}>
            {isCountdownActive ? 'Ready!' : `${timeRemaining}s`}
          </div>
        </div>
      </div>
    </div>
  );
};
