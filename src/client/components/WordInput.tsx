import React, { useState, useRef, useEffect } from 'react';
import { WordValidation } from '../../shared/types';

interface WordInputProps {
  onSubmit: (word: string) => WordValidation;
  disabled: boolean;
  placeholder: string;
  isCountdownActive?: boolean;
}

export const WordInput: React.FC<WordInputProps> = ({
  onSubmit,
  disabled,
  placeholder,
  isCountdownActive = false
}) => {
  const [inputValue, setInputValue] = useState('');
  const [validation, setValidation] = useState<WordValidation | null>(null);
  const [showValidation, setShowValidation] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled && !isCountdownActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled, isCountdownActive]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || disabled || isCountdownActive) return;

    const result = onSubmit(inputValue);
    setValidation(result);
    setShowValidation(true);

    if (result.isValid) {
      setInputValue('');
      // Clear validation after a short delay
      setTimeout(() => setShowValidation(false), 2000);
    } else {
      // Clear validation after showing error
      setTimeout(() => setShowValidation(false), 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const getValidationStyle = () => {
    if (!validation) return '';
    return validation.isValid 
      ? 'border-green-500 bg-green-50' 
      : 'border-red-500 bg-red-50 shake';
  };

  const getValidationMessage = () => {
    if (!validation) return '';
    return validation.isValid 
      ? `✅ "${validation.word}" added!` 
      : `❌ ${validation.reason}`;
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            className={`word-input w-full px-4 py-3 text-lg rounded-lg border-2 transition-all duration-200 ${
              disabled || isCountdownActive
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                : 'bg-white text-gray-800 hover:border-blue-300 focus:border-blue-500'
            } ${getValidationStyle()}`}
            maxLength={50}
          />
        </div>
        
        <button
          type="submit"
          disabled={disabled || !inputValue.trim() || isCountdownActive}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
        >
          {disabled ? 'Game Over' : isCountdownActive ? 'Get Ready...' : 'Submit Word'}
        </button>
      </form>

      {/* Validation Message */}
      {showValidation && validation && (
        <div className={`text-center p-3 rounded-lg font-medium ${
          validation.isValid 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {getValidationMessage()}
        </div>
      )}

      {/* Instructions */}
      <div className="text-center text-white/80 text-sm">
        <p>💡 Press Enter or click Submit to add your word!</p>
        <p>🎯 Try to think of as many related words as possible!</p>
      </div>
    </div>
  );
};
