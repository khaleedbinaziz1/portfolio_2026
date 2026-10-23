'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TextScrambleProps {
  text: string;
  className?: string;
  triggerOnHover?: boolean;
  triggerInView?: boolean;
  delay?: number;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Architectural Smooth Text Reveal
 * Replaces jarring glyph jitter with an ultra-smooth, luxury staggered
 * character blur & elevation transition (Linear/Stripe/Apple standard).
 */
export default function TextScramble({
  text,
  className = '',
  triggerOnHover = true,
  triggerInView = true,
  delay = 0,
}: TextScrambleProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-20px' });
  const [isHovered, setIsHovered] = useState(false);

  const letters = Array.from(text);

  return (
    <span
      ref={containerRef}
      className={`inline-flex items-center cursor-default select-none font-mono ${className}`}
      onMouseEnter={() => {
        if (triggerOnHover) {
          setIsHovered(true);
          setTimeout(() => setIsHovered(false), 600);
        }
      }}
      style={{ overflow: 'hidden' }}
    >
      {letters.map((char, index) => {
        const isSpace = char === ' ';

        return (
          <motion.span
            key={`${char}-${index}`}
            initial={{
              opacity: 0,
              y: 8,
              filter: 'blur(4px)',
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                  }
                : {
                    opacity: 0,
                    y: 8,
                    filter: 'blur(4px)',
                  }
            }
            transition={{
              duration: 0.5,
              delay: delay + index * 0.018,
              ease: EASE,
            }}
            style={{
              display: 'inline-block',
              whiteSpace: 'pre',
              willChange: 'transform, opacity, filter',
            }}
            whileHover={
              triggerOnHover
                ? {
                    y: -1.5,
                    color: 'var(--opal-cyan, #7dd3fc)',
                    transition: { duration: 0.15 },
                  }
                : undefined
            }
          >
            {isSpace ? '\u00A0' : char}
          </motion.span>
        );
      })}
    </span>
  );
}
