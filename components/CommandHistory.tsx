'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface CommandHistoryProps {
  commands: string[];
  autoStart?: boolean;
  speed?: number;
  className?: string;
  maxLines?: number;
}

export default function CommandHistory({
  commands,
  autoStart = true,
  speed = 1500,
  className = '',
  maxLines = 8,
}: CommandHistoryProps) {
  const [visibleCommands, setVisibleCommands] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoStart || currentIndex >= commands.length) return;

    const timer = setTimeout(() => {
      setVisibleCommands(prev => {
        const newCommands = [...prev, commands[currentIndex]];
        if (newCommands.length > maxLines) {
          return newCommands.slice(-maxLines);
        }
        return newCommands;
      });
      setCurrentIndex(prev => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [currentIndex, commands.length, speed, autoStart, maxLines, commands]);

  return (
    <div className={`font-mono text-xs space-y-1 ${className}`}>
      {visibleCommands.map((cmd, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 0.6, x: 0 }}
          transition={{ duration: 0.3 }}
          className="text-[#6a6a6a]"
        >
          <span className="text-[#008b8b]">$</span> {cmd}
        </motion.div>
      ))}
      {currentIndex < commands.length && (
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-[#006400]"
        >
          <span className="text-[#008b8b]">$</span> <span className="animate-pulse">_</span>
        </motion.div>
      )}
    </div>
  );
}

