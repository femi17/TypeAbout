import React, { useState, useEffect } from 'react';

export const GameHeader: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const words = ['CAT', 'OCEAN', 'MUSIC', 'FRIEND', 'DREAM'];
  const currentWord = words[currentWordIndex];

  useEffect(() => {
    let typeInterval: NodeJS.Timeout;
    let deleteInterval: NodeJS.Timeout;
    let waitTimeout: NodeJS.Timeout;
    
    if (isTyping) {
      // Type out the current word character by character
      let charIndex = 0;
      typeInterval = setInterval(() => {
        if (charIndex <= currentWord.length) {
          setDisplayText(currentWord.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          // Wait longer before starting to delete
          waitTimeout = setTimeout(() => setIsTyping(false), 2000);
        }
      }, 150); // Slower typing speed
    } else {
      // Delete the current word character by character
      let charIndex = currentWord.length;
      deleteInterval = setInterval(() => {
        if (charIndex >= 0) {
          setDisplayText(currentWord.slice(0, charIndex));
          charIndex--;
        } else {
          clearInterval(deleteInterval);
          // Move to next word and start typing
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          setTimeout(() => setIsTyping(true), 800); // Longer pause between words
        }
      }, 100); // Slower deletion speed
    }

    return () => {
      clearInterval(typeInterval);
      clearInterval(deleteInterval);
      clearTimeout(waitTimeout);
    };
  }, [currentWord, isTyping, currentWordIndex]);

  return (
    <div className="text-center mb-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-3 drop-shadow-sm">
        Type About
      </h1>
      <div className="h-10 flex items-center justify-center mb-3">
        <span className="text-2xl font-semibold text-blue-600 drop-shadow-sm">
          {displayText}
          {isTyping && <span className="animate-pulse text-blue-400">|</span>}
        </span>
      </div>
      <p className="text-lg text-gray-600 mb-4 max-w-2xl mx-auto">
        How fast can you type in 20 seconds
      </p>
    </div>
  );
};
