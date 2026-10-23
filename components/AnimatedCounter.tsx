'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

type AnimatedCounterProps = {
  value: string;
  duration?: number;
  className?: string;
};

/**
 * Parses numbers with suffixes like '5,000+', '70%', '50K+', '2+'
 * and smoothly animates the numeric portion when scrolled into view.
 */
export default function AnimatedCounter({
  value,
  duration = 1.4,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!isInView) return;

    // Extract numeric part and affixes
    // e.g. "5,000+" -> prefix: "", rawNum: 5000, suffix: "+", format: comma
    // e.g. "70%" -> prefix: "", rawNum: 70, suffix: "%"
    // e.g. "50K+" -> prefix: "", rawNum: 50, suffix: "K+"
    // e.g. "2+" -> prefix: "", rawNum: 2, suffix: "+"
    const match = value.match(/^([^0-9]*)([\d,.]+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const prefix = match[1] || '';
    const numStr = match[2].replace(/,/g, '');
    const suffix = match[3] || '';
    const target = parseFloat(numStr);

    if (isNaN(target)) {
      setDisplay(value);
      return;
    }

    const hasComma = match[2].includes(',');
    const hasDecimal = match[2].includes('.');
    const decimals = hasDecimal ? (match[2].split('.')[1]?.length || 0) : 0;

    let startTime: number | null = null;
    let animId: number;

    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const update = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeOutExpo(progress);
      const current = target * eased;

      let formattedNum = hasDecimal
        ? current.toFixed(decimals)
        : Math.round(current).toString();

      if (hasComma) {
        formattedNum = Number(formattedNum).toLocaleString('en-US');
      }

      setDisplay(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        animId = requestAnimationFrame(update);
      } else {
        setDisplay(value);
      }
    };

    animId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isInView, value, duration]);

  return (
    <span
      ref={ref}
      className={className}
      style={{
        fontVariantNumeric: 'tabular-nums',
        display: 'inline-block',
        letterSpacing: '-0.02em',
      }}
    >
      {display}
    </span>
  );
}
