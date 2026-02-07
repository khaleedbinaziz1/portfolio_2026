'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Command {
  prompt: string;
  command: string;
  output?: string;
  delay?: number;
}

interface TerminalCommandProps {
  commands: Command[];
  autoStart?: boolean;
  loop?: boolean;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export default function TerminalCommand({
  commands,
  autoStart = true,
  loop = false,
  speed = 100,
  className = '',
  onComplete,
}: TerminalCommandProps) {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentCommand = commands[currentCommandIndex];

  useEffect(() => {
    if (!autoStart || isComplete) return;

    setIsTyping(true);
    setCurrentText('');
    setShowOutput(false);

    let charIndex = 0;
    const commandText = currentCommand.command;

    const typingInterval = setInterval(() => {
      if (charIndex < commandText.length) {
        setCurrentText(commandText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        
        setTimeout(() => {
          setShowOutput(true);
          
          setTimeout(() => {
            if (currentCommandIndex < commands.length - 1) {
              setCurrentCommandIndex(prev => prev + 1);
            } else if (loop) {
              setCurrentCommandIndex(0);
            } else {
              setIsComplete(true);
              onComplete?.();
            }
          }, currentCommand.delay || 2000);
        }, 500);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [currentCommandIndex, autoStart, loop, speed, currentCommand, commands.length, isComplete, onComplete]);

  if (!currentCommand) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`font-mono text-xs ${className}`}
    >
      <div className="flex items-start gap-2">
        <span className="font-bold flex-shrink-0" style={{ color: 'var(--retro-green)' }}>{currentCommand.prompt}</span>
        <div className="flex-1">
          <span className="text-[#4a4a4a]">{currentText}</span>
          {isTyping && (
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2 h-4 ml-1"
              style={{ backgroundColor: 'var(--retro-green)' }}
            />
          )}
        </div>
      </div>
      
      <AnimatePresence>
        {showOutput && currentCommand.output && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1 ml-4 text-[10px]"
            style={{ color: 'var(--retro-cyan)' }}
          >
            {currentCommand.output}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

