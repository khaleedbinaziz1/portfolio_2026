'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
  prompt?: string;
}

export default function TerminalWindow({ 
  title = 'terminal', 
  children, 
  className = '',
  prompt = '$'
}: TerminalWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`terminal-window ${className}`}
    >
      {/* Terminal Header */}
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="terminal-btn terminal-btn-close"></span>
          <span className="terminal-btn terminal-btn-minimize"></span>
          <span className="terminal-btn terminal-btn-maximize"></span>
        </div>
        <div className="terminal-title">
          <span className="text-[#008b8b]">┌─</span>
          <span className="mx-2">{title}</span>
          <span className="text-[#008b8b]">─┐</span>
        </div>
      </div>
      
      {/* Terminal Body */}
      <div className="terminal-body">
        {prompt && (
          <div className="terminal-prompt">
            <span className="text-[#006400] font-bold">{prompt}</span>
            <span className="text-[#4a4a4a] ml-2">|</span>
          </div>
        )}
        <div className="terminal-content">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

