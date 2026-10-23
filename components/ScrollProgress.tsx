'use client';

import { useEffect, useRef, useState } from 'react';

export default function ScrollProgress() {
  const [percent, setPercent] = useState(0);
  const rafIdRef = useRef<number | null>(null);
  const percentRef = useRef(0);

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const max = scrollHeight - clientHeight;
      const pct = max <= 0 ? 0 : Math.round((scrollTop / max) * 100);
      const next = Math.min(100, pct);
      if (next !== percentRef.current) {
        percentRef.current = next;
        setPercent(next);
      }
      rafIdRef.current = null;
    };

    const onScroll = () => {
      if (rafIdRef.current !== null) return;
      rafIdRef.current = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  return (
    <div
      className="scroll-progress-hud"
      role="status"
      aria-label={`Scroll progress: ${percent}%`}
    >
      <div className="scroll-hud-track">
        <div
          className="scroll-hud-fill"
          style={{ height: `${percent}%` }}
        />
      </div>
      <span className="scroll-hud-val">
        {String(percent).padStart(2, '0')}%
      </span>
    </div>
  );
}
