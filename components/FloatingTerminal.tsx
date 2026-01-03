'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface FloatingCommand {
  id: number;
  command: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

interface FloatingTerminalProps {
  maxCommands?: number;
  spawnInterval?: number;
}

const terminalCommands = [
  'npm install',
  'git commit -m "feat: add feature"',
  'npm run build',
  'docker-compose up',
  'kubectl apply -f',
  'npm test',
  'git push origin main',
  'npm run dev',
  'yarn install',
  'npm run lint',
  'git pull',
  'npm start',
  'docker ps',
  'git status',
  'npm run deploy',
  'git log --oneline',
  'npm audit fix',
  'git branch',
  'npm outdated',
  'git diff',
];

export default function FloatingTerminal({ 
  maxCommands = 5, 
  spawnInterval = 4000 
}: FloatingTerminalProps) {
  const [commands, setCommands] = useState<FloatingCommand[]>([]);

  useEffect(() => {
    const spawnCommand = () => {
      const randomCommand = terminalCommands[Math.floor(Math.random() * terminalCommands.length)];
      const newCommand: FloatingCommand = {
        id: Date.now() + Math.random(),
        command: randomCommand,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 3 + Math.random() * 2,
      };

      setCommands(prev => {
        const updated = [...prev, newCommand];
        // Reduce max commands by half
        const reducedMax = Math.max(1, Math.floor(maxCommands / 2));
        if (updated.length > reducedMax) {
          return updated.slice(-reducedMax);
        }
        return updated;
      });
    };

    // Spawn initial commands - reduced by half
    setTimeout(spawnCommand, 2000);

    // Double the spawn interval to reduce frequency by half
    const interval = setInterval(spawnCommand, spawnInterval * 2);
    return () => clearInterval(interval);
  }, [maxCommands, spawnInterval]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {commands.map((cmd) => (
          <motion.div
            key={cmd.id}
            initial={{ 
              opacity: 0, 
              scale: 0.8,
              x: `${cmd.x}%`,
              y: `${cmd.y}%`,
            }}
            animate={{ 
              opacity: [0, 0.4, 0.4, 0],
              scale: [0.8, 1, 1, 0.8],
              y: [`${cmd.y}%`, `${cmd.y - 5}%`, `${cmd.y - 5}%`, `${cmd.y - 10}%`],
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ 
              duration: cmd.duration,
              delay: cmd.delay,
              ease: 'easeOut',
            }}
            className="absolute font-mono text-[10px] md:text-xs text-[#006400]"
            style={{
              left: `${cmd.x}%`,
              top: `${cmd.y}%`,
              textShadow: '0 0 8px rgba(0, 100, 0, 0.3)',
            }}
          >
            <span className="text-[#008b8b]">$</span> {cmd.command}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

