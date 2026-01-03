'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Package {
  name: string;
  version: string;
  status: 'installing' | 'installed' | 'pending';
}

interface NpmInstallAnimationProps {
  packages?: Package[];
  autoStart?: boolean;
  speed?: number;
  className?: string;
}

const defaultPackages: Package[] = [
  { name: 'react', version: '^18.2.0', status: 'pending' },
  { name: 'next', version: '^14.0.0', status: 'pending' },
  { name: 'typescript', version: '^5.0.0', status: 'pending' },
  { name: 'framer-motion', version: '^10.16.0', status: 'pending' },
  { name: 'tailwindcss', version: '^3.3.0', status: 'pending' },
  { name: '@types/node', version: '^20.0.0', status: 'pending' },
];

export default function NpmInstallAnimation({
  packages = defaultPackages,
  autoStart = true,
  speed = 800,
  className = '',
}: NpmInstallAnimationProps) {
  const [currentPackages, setCurrentPackages] = useState<Package[]>(
    packages.map(p => ({ ...p, status: 'pending' as const }))
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (!isRunning || currentIndex >= packages.length) {
      if (currentIndex >= packages.length) {
        setTimeout(() => setShowSummary(true), 500);
      }
      return;
    }

    const timer = setTimeout(() => {
      setCurrentPackages(prev => 
        prev.map((pkg, idx) => {
          if (idx === currentIndex) {
            return { ...pkg, status: 'installing' };
          }
          return pkg;
        })
      );

      setTimeout(() => {
        setCurrentPackages(prev => 
          prev.map((pkg, idx) => {
            if (idx === currentIndex) {
              return { ...pkg, status: 'installed' };
            }
            return pkg;
          })
        );
        setCurrentIndex(prev => prev + 1);
      }, speed / 2);
    }, speed / 2);

    return () => clearTimeout(timer);
  }, [currentIndex, isRunning, packages.length, speed]);

  const installedCount = currentPackages.filter(p => p.status === 'installed').length;
  const totalSize = (Math.random() * 50 + 100).toFixed(2);

  return (
    <div className={`font-mono text-xs ${className}`}>
      <div className="mb-2 text-[#006400]">
        <span className="text-[#008b8b]">$</span> npm install
      </div>
      
      <div className="space-y-1 text-[#4a4a4a]">
        <AnimatePresence>
          {currentPackages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              {pkg.status === 'installing' && (
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="text-[#006400]"
                >
                  ⚡
                </motion.span>
              )}
              {pkg.status === 'installed' && (
                <span className="text-[#006400]">✓</span>
              )}
              {pkg.status === 'pending' && (
                <span className="text-[#6a6a6a]">○</span>
              )}
              
              <span className={pkg.status === 'installed' ? 'text-[#006400]' : ''}>
                {pkg.name}@{pkg.version}
              </span>
              
              {pkg.status === 'installing' && (
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-[#008b8b] text-[10px]"
                >
                  downloading...
                </motion.span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {showSummary && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 pt-2 border-t border-[#006400] border-opacity-20"
        >
          <div className="text-[#006400]">
            ✓ {installedCount} packages installed ({totalSize} MB)
          </div>
          <div className="text-[#008b8b] text-[10px] mt-1">
            added {installedCount} packages in {((speed * packages.length) / 1000).toFixed(1)}s
          </div>
        </motion.div>
      )}
    </div>
  );
}

