'use client';

import { useEffect, useRef } from 'react';
import { playHover, playClick } from '@/lib/retroSound';

const INTERACTIVE_SELECTOR = 'a[href], button, [role="button"], input[type="submit"], input[type="button"]';
const HOVER_THROTTLE_MS = 120;

function isInteractive(el: EventTarget | null): boolean {
  if (!el || !(el instanceof HTMLElement)) return false;
  const target = el.closest(INTERACTIVE_SELECTOR);
  if (!target) return false;
  const disabled = target instanceof HTMLButtonElement || target instanceof HTMLInputElement
    ? target.disabled
    : (target as HTMLElement).getAttribute('aria-disabled') === 'true';
  return !disabled;
}

export default function RetroSoundHandler() {
  const lastHoverTime = useRef(0);
  const hoverTarget = useRef<EventTarget | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!isInteractive(e.target as HTMLElement)) return;
      playClick();
    };

    const onMouseOver = (e: MouseEvent) => {
      if (!isInteractive(e.target as HTMLElement)) return;
      const now = Date.now();
      const sameTarget = e.target === hoverTarget.current;
      if (sameTarget && now - lastHoverTime.current < HOVER_THROTTLE_MS) return;
      lastHoverTime.current = now;
      hoverTarget.current = e.target;
      playHover();
    };

    const onMouseOut = () => {
      hoverTarget.current = null;
    };

    document.addEventListener('click', onClick, true);
    document.addEventListener('mouseover', onMouseOver, true);
    document.addEventListener('mouseout', onMouseOut, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('mouseover', onMouseOver, true);
      document.removeEventListener('mouseout', onMouseOut, true);
    };
  }, []);

  return null;
}
