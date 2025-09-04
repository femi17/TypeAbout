import React, { useEffect, useState } from 'react';

interface ConfettiProps {
  isActive: boolean;
  duration?: number;
  type?: 'keyword' | 'level';
}

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  velocityX: number;
  velocityY: number;
  rotationSpeed: number;
}

export const Confetti: React.FC<ConfettiProps> = ({ 
  isActive, 
  duration = 2000,
  type = 'keyword'
}) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
  ];

  useEffect(() => {
    if (!isActive) {
      setPieces([]);
      return;
    }

    // Create confetti pieces
    const newPieces: ConfettiPiece[] = [];
    const pieceCount = type === 'level' ? 50 : 25; // Reduced count for better performance

    for (let i = 0; i < pieceCount; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800),
        y: -10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: type === 'level' ? Math.random() * 8 + 4 : Math.random() * 6 + 3,
        rotation: Math.random() * 360,
        velocityX: (Math.random() - 0.5) * 4,
        velocityY: Math.random() * 3 + 2,
        rotationSpeed: (Math.random() - 0.5) * 5
      });
    }

    setPieces(newPieces);

    // Simple timeout to clear confetti
    const timeout = setTimeout(() => {
      setPieces([]);
    }, duration);

    return () => clearTimeout(timeout);
  }, [isActive, duration, type]);

  if (!isActive || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {pieces.map(piece => (
        <div
          key={piece.id}
          className="absolute rounded-full confetti-piece"
          style={{
            left: piece.x,
            top: piece.y,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            boxShadow: `0 0 ${piece.size}px ${piece.color}40, 0 0 ${piece.size * 2}px ${piece.color}20`
          }}
        />
      ))}
    </div>
  );
};
