'use client';

import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';

export default function RetroCursor() {
  const [position, setPosition] = useState({ x: -40, y: -40 });
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    const updatePosition = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });

      const target = event.target as HTMLElement | null;
      const interactive = Boolean(
        target?.closest(
          'a, button, input, select, textarea, [role="button"], summary, [data-cursor-pointer], .cursor-pointer'
        )
      );

      setIsInteractive(interactive);
    };

    const handleLeave = () => {
      setIsInteractive(false);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', () => setIsInteractive(true));
    window.addEventListener('mouseup', () => setIsInteractive(false));
    window.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', () => setIsInteractive(true));
      window.removeEventListener('mouseup', () => setIsInteractive(false));
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const cursorStyle = {
    left: position.x,
    top: position.y,
  } as CSSProperties;

  return (
    <>
      <div
        aria-hidden="true"
        className={`retro-cursor-glow ${isInteractive ? 'is-active' : ''}`}
        style={cursorStyle}
      />
      <div
        aria-hidden="true"
        className={`retro-cursor-core ${isInteractive ? 'is-active' : ''}`}
        style={cursorStyle}
      />
    </>
  );
}
