'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface TerminalSnippet {
  id: number;
  command: string;
  output?: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  delay: number;
}

const snippets: Omit<TerminalSnippet, 'id' | 'delay'>[] = [
  {
    command: 'npm run dev',
    output: '> Ready on http://localhost:3000',
    position: { top: '10%', left: '5%' },
  },
  {
    command: 'git status',
    output: 'On branch main\nnothing to commit',
    position: { top: '20%', right: '5%' },
  },
  {
    command: 'npm install',
    output: 'added 150 packages',
    position: { bottom: '15%', left: '8%' },
  },
  {
    command: 'docker ps',
    output: 'CONTAINER ID   STATUS',
    position: { bottom: '25%', right: '8%' },
  },
  {
    command: 'git log --oneline',
    output: 'abc123 feat: new feature',
    position: { top: '50%', left: '3%' },
  },
  {
    command: 'npm test',
    output: 'Tests: 50 passed',
    position: { top: '60%', right: '3%' },
  },
];

export default function TerminalSnippets() {
  const [visibleSnippets, setVisibleSnippets] = useState<TerminalSnippet[]>([]);

  useEffect(() => {
    const showSnippet = () => {
      const snippet = snippets[Math.floor(Math.random() * snippets.length)];
      const newSnippet: TerminalSnippet = {
        ...snippet,
        id: Date.now() + Math.random(),
        delay: Math.random() * 0.5,
      };

      setVisibleSnippets(prev => {
        const updated = [...prev, newSnippet];
        // Reduce max snippets by half (from 3 to 1-2)
        if (updated.length > 2) {
          return updated.slice(-2);
        }
        return updated;
      });

      // Remove after animation
      setTimeout(() => {
        setVisibleSnippets(prev => prev.filter(s => s.id !== newSnippet.id));
      }, 5000);
    };

    // Show initial snippets - reduced by half
    setTimeout(showSnippet, 4000);
    setTimeout(showSnippet, 8000);

    // Double the interval to reduce frequency by half
    const interval = setInterval(showSnippet, 16000 + Math.random() * 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {visibleSnippets.map((snippet) => (
          <motion.div
            key={snippet.id}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 0.15, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ 
              duration: 0.5,
              delay: snippet.delay,
            }}
            className="absolute font-mono text-[9px] md:text-[10px]"
            style={{
              ...snippet.position,
              maxWidth: '200px',
              color: 'var(--retro-green)',
            }}
          >
            <div className="flex items-start gap-1">
              <span style={{ color: 'var(--retro-cyan)' }}>$</span>
              <div>
                <div>{snippet.command}</div>
                {snippet.output && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ delay: 0.3 }}
                    className="mt-0.5 text-[8px]"
                    style={{ color: 'var(--retro-cyan)' }}
                  >
                    {snippet.output}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

