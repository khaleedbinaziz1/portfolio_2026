'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypingAnimationProps {
  text: string;
  speed?: number;
  className?: string;
  showCursor?: boolean;
  prefix?: string;
  style?: React.CSSProperties;
}

export default function TypingAnimation({ 
  text, 
  speed = 50, 
  className = '',
  showCursor = true,
  prefix = '',
  style
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={`font-mono ${className}`} style={style}>
      {prefix && <span className="text-[#008b8b]">{prefix}</span>}
      <span>{displayedText}</span>
      {showCursor && (
        <span className={`inline-block w-2 h-4 ml-1 ${!isComplete ? 'animate-pulse' : ''}`} style={{ backgroundColor: style?.color || '#006400' }}></span>
      )}
    </span>
  );
}

