'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface RetroEffectsProps {
  type?: 'terminal' | 'matrix' | 'glitch' | 'scanlines';
  intensity?: 'low' | 'medium' | 'high';
}

interface Command {
  id: number;
  text: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
}

export default function RetroEffects({ 
  type = 'terminal', 
  intensity = 'medium' 
}: RetroEffectsProps) {
  const [randomCommands, setRandomCommands] = useState<Command[]>([]);

  const terminalCommands = [
    'git status',
    'npm run dev',
    'ls -la',
    'cd ~/projects',
    'cat package.json',
    'grep -r "TODO"',
    'docker ps',
    'kubectl get pods',
    'npm test',
    'git log --oneline',
    'ps aux | grep node',
    'tail -f logs/app.log',
    'npm install',
    'git commit -m',
    'npm run build',
    'docker-compose up',
    'yarn install',
    'git push',
    'npm audit',
    'git pull',
  ];

  const positions = [
    { bottom: '10%', right: '5%' },
    { top: '15%', right: '8%' },
    { bottom: '20%', left: '5%' },
    { top: '25%', left: '8%' },
    { bottom: '30%', right: '10%' },
    { top: '35%', left: '10%' },
  ];

  useEffect(() => {
    if (type === 'terminal') {
      const spawnCommand = () => {
        const randomCmd = terminalCommands[Math.floor(Math.random() * terminalCommands.length)];
        const position = positions[Math.floor(Math.random() * positions.length)];
        
        const newCommand: Command = {
          id: Date.now() + Math.random(),
          text: randomCmd,
          position,
        };

        setRandomCommands(prev => {
          const updated = [...prev, newCommand];
          // Reduce max commands by half
          const maxForIntensity = intensity === 'high' ? 3 : intensity === 'medium' ? 2 : 1;
          if (updated.length > maxForIntensity) {
            return updated.slice(-maxForIntensity);
          }
          return updated;
        });

        // Remove after animation
        setTimeout(() => {
          setRandomCommands(prev => prev.filter(cmd => cmd.id !== newCommand.id));
        }, 4000);
      };

      // Initial commands - reduced by half
      setTimeout(spawnCommand, 2000);
      if (intensity === 'high') {
        setTimeout(spawnCommand, 5000);
      }

      // Double the interval to reduce frequency by half
      const interval = setInterval(spawnCommand, 6000 + Math.random() * 4000);
      return () => clearInterval(interval);
    }
  }, [type, intensity]);

  if (type === 'terminal') {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <AnimatePresence>
          {randomCommands.map((cmd) => (
            <motion.div
              key={cmd.id}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 0.2, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.4 }}
              className="absolute font-mono text-[9px] md:text-[10px]"
              style={{
                ...cmd.position,
                color: 'var(--retro-green)',
                textShadow: '0 0 6px rgba(0, 100, 0, 0.2)',
              }}
            >
              <span style={{ color: 'var(--retro-cyan)' }}>$</span> {cmd.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  }

  return null;
}

