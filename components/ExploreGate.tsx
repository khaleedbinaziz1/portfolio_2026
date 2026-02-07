'use client';

import { useEffect, useState, useCallback } from 'react';

const LINE_1 = '> run khaledbinaziz.dev';
const LINE_2 = '> load khaled.core...100%';
const LINE_3 = 'Ready.';
const CHAR_DELAY_MS = 42;
const LINE_DELAY_MS = 380;

const LANDING_PROGRESS = 0.04; // 4% scroll as default landing after launch
const LANDING_SCROLL_DURATION_MS = 900;
const EASE_IN_OUT_CUBIC = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function smoothScrollTo(top: number, durationMs: number) {
  const startTop = window.scrollY;
  const distance = top - startTop;
  const startTime = performance.now();
  let rafId: number;
  const tick = (now: number) => {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / durationMs, 1);
    const eased = EASE_IN_OUT_CUBIC(t);
    window.scrollTo(0, startTop + distance * eased);
    if (t < 1) rafId = requestAnimationFrame(tick);
  };
  rafId = requestAnimationFrame(tick);
}

export default function ExploreGate({
  onExplore,
  disabled,
}: {
  onExplore: () => void;
  disabled: boolean;
}) {
  const [len1, setLen1] = useState(0);
  const [len2, setLen2] = useState(0);
  const [len3, setLen3] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [buttonReady, setButtonReady] = useState(false);

  useEffect(() => {
    if (len1 < LINE_1.length) {
      const t = setTimeout(() => setLen1((n) => n + 1), CHAR_DELAY_MS);
      return () => clearTimeout(t);
    }
    if (len2 < LINE_2.length) {
      const t = setTimeout(
        () => setLen2((n) => n + 1),
        len2 === 0 ? LINE_DELAY_MS : CHAR_DELAY_MS
      );
      return () => clearTimeout(t);
    }
    if (len3 < LINE_3.length) {
      const t = setTimeout(
        () => setLen3((n) => n + 1),
        len3 === 0 ? LINE_DELAY_MS : CHAR_DELAY_MS
      );
      return () => clearTimeout(t);
    }
    const t1 = setTimeout(() => setShowButton(true), LINE_DELAY_MS);
    return () => clearTimeout(t1);
  }, [len1, len2, len3]);

  useEffect(() => {
    if (!showButton) return;
    const t = setTimeout(() => setButtonReady(true), 120);
    return () => clearTimeout(t);
  }, [showButton]);

  const scrollToLanding = useCallback(() => {
    const { scrollHeight, clientHeight } = document.documentElement;
    const maxScroll = Math.max(0, scrollHeight - clientHeight);
    const targetTop = maxScroll * LANDING_PROGRESS;
    smoothScrollTo(targetTop, LANDING_SCROLL_DURATION_MS);
  }, []);

  const handleLaunch = useCallback(() => {
    if (!showButton || disabled) return;
    onExplore();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(scrollToLanding, 80);
      });
    });
  }, [showButton, disabled, onExplore, scrollToLanding]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && showButton && !disabled) {
      e.preventDefault();
      handleLaunch();
    }
  };

  return (
    <div
      className="hero3d-explore hero3d-explore-crt-display"
      role="dialog"
      aria-label="Terminal boot"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* CRT display layers: chromatic, vignette, glow, then noisy CRT (scanlines + noise) */}
      <div className="hero3d-canvas-chromatic" aria-hidden />
      <div className="hero3d-canvas-vignette" aria-hidden />
      <div className="hero3d-explore-crt-glow" aria-hidden />
      <div className="hero3d-explore-crt-noise" aria-hidden />
      <div className="hero3d-explore-scanline" aria-hidden />
      <div className="hero3d-explore-frame hero3d-explore-terminal">
        <div className="hero3d-explore-header">
          <span className="hero3d-explore-header-dot" />
          <span className="hero3d-explore-header-label">terminal</span>
        </div>
        <div className="hero3d-explore-lines">
          <p className="hero3d-explore-line">
            {LINE_1.slice(0, len1)}
            {len1 < LINE_1.length && (
              <span className="hero3d-explore-cursor" aria-hidden>|</span>
            )}
          </p>
          <p className="hero3d-explore-line">
            {LINE_2.slice(0, len2)}
            {len2 < LINE_2.length && len1 === LINE_1.length && (
              <span className="hero3d-explore-cursor" aria-hidden>|</span>
            )}
          </p>
          <p className="hero3d-explore-line hero3d-explore-line-muted">
            {LINE_3.slice(0, len3)}
            {len3 < LINE_3.length && len2 === LINE_2.length && (
              <span className="hero3d-explore-cursor" aria-hidden>|</span>
            )}
          </p>
          {showButton && (
            <div
              className={`hero3d-explore-cta ${buttonReady ? 'hero3d-explore-cta-ready' : ''}`}
            >
              <button
                type="button"
                className="hero3d-explore-btn"
                onClick={handleLaunch}
                disabled={disabled}
                aria-label={disabled ? 'Loading' : 'Launch interface'}
              >
                <span className="hero3d-explore-btn-inner">
                  &gt; launch interface
                </span>
              </button>
              <p className="hero3d-explore-hint">Press Enter to launch</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
