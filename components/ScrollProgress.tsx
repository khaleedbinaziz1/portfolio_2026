'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const max = scrollHeight - clientHeight;
      const pct = max <= 0 ? 0 : Math.round((scrollTop / max) * 100);
      setPercent(Math.min(100, pct));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="scroll-progress" aria-hidden>
      <div className="scroll-progress-track">
        <div
          className="scroll-progress-bar"
          style={{ height: `${percent}%` }}
        />
      </div>
      <span className="scroll-progress-text">{percent}%</span>
    </div>
  );
}
