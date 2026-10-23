'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

/* ─────────────────────────────────────────────
   Orbiting tech chips — portfolio-relevant stack
───────────────────────────────────────────── */
const TECH_CHIPS = [
  { label: 'Next.js',   angle:   0, radius: 1,   color: '#ffffff', bg: 'rgba(255,255,255,0.08)' },
  { label: 'TypeScript',angle:  45, radius: 1,   color: '#7dd3fc', bg: 'rgba(125,211,252,0.1)' },
  { label: 'Node.js',   angle:  90, radius: 1,   color: '#6ee7b7', bg: 'rgba(110,231,183,0.1)' },
  { label: 'React',     angle: 135, radius: 1,   color: '#a78bfa', bg: 'rgba(167,139,250,0.1)' },
  { label: 'PostgreSQL',angle: 180, radius: 1,   color: '#fcd34d', bg: 'rgba(252,211,77,0.1)'  },
  { label: 'Docker',    angle: 225, radius: 1,   color: '#7dd3fc', bg: 'rgba(125,211,252,0.1)' },
  { label: 'GraphQL',   angle: 270, radius: 1,   color: '#fda4af', bg: 'rgba(253,164,175,0.1)' },
  { label: 'AWS',       angle: 315, radius: 1,   color: '#fcd34d', bg: 'rgba(252,211,77,0.1)'  },
];

/* ─────────────────────────────────────────────
   Orbiting chip component
───────────────────────────────────────────── */
function OrbitChip({
  label, angleDeg, orbitRadius, color, bg, duration, delay,
}: {
  label: string; angleDeg: number; orbitRadius: number;
  color: string; bg: string; duration: number; delay: number;
}) {
  return (
    <motion.div
      className="orbit-chip"
      style={
        {
          '--chip-color': color,
          '--chip-bg': bg,
          position: 'absolute',
          top: '50%', left: '50%',
        } as React.CSSProperties
      }
      animate={{
        rotate: [angleDeg, angleDeg + 360],
      }}
      transition={{
        duration,
        delay: -delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {/* Arm */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${orbitRadius}px`,
          height: 0,
          transformOrigin: '0 0',
          transform: `rotate(0deg) translateY(-50%)`,
        }}
      >
        {/* Counter-rotate the chip so it stays upright */}
        <motion.div
          style={{
            position: 'absolute',
            right: `-${orbitRadius}px`,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
          animate={{ rotate: [-(angleDeg), -(angleDeg + 360)] }}
          transition={{ duration, delay: -delay, repeat: Infinity, ease: 'linear' }}
        >
          <div className="chip-pill">
            {label}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Animated code lines for the terminal card
───────────────────────────────────────────── */
const CODE_LINES = [
  { tokens: [{ t: 'const ', c: 'kw' }, { t: 'stack', c: 'var' }, { t: ' = [', c: 'punct' }], delay: 0 },
  { tokens: [{ t: '  ', c: '' }, { t: '"Next.js"', c: 'str' }, { t: ',', c: 'punct' }], delay: 0.08 },
  { tokens: [{ t: '  ', c: '' }, { t: '"TypeScript"', c: 'str' }, { t: ',', c: 'punct' }], delay: 0.16 },
  { tokens: [{ t: '  ', c: '' }, { t: '"Node.js"', c: 'str' }], delay: 0.24 },
  { tokens: [{ t: '];', c: 'punct' }], delay: 0.32 },
  { tokens: [{ t: '', c: '' }], delay: 0.38 },
  { tokens: [{ t: 'export default ', c: 'kw' }, { t: 'Khaled', c: 'fn' }], delay: 0.42 },
  { tokens: [{ t: '// building at scale', c: 'comment' }], delay: 0.5 },
];

/* ─────────────────────────────────────────────
   Main export
───────────────────────────────────────────── */
export default function HeroVisualizer() {
  const prefersReducedMotion = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  // Orbit radii scale by viewport — we'll use CSS vars
  const INNER_R  = 168; // px from center to chip center
  const OUTER_R  = 218;

  return (
    <div className="hv-root">
      <style>{`
        /* ── Root container ── */
        .hv-root {
          position: relative;
          width: 100%;
          max-width: 480px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          user-select: none;
        }

        /* ── Aurora halo scene ── */
        .hv-scene {
          position: relative;
          width: 360px;
          height: 360px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Outer blurred aurora blob */
        .hv-aurora-blob {
          position: absolute;
          inset: -40px;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            rgba(167, 139, 250, 0.28) 0deg,
            rgba(125, 211, 252, 0.22) 90deg,
            rgba(94, 234, 212, 0.18) 180deg,
            rgba(167, 139, 250, 0.28) 360deg
          );
          filter: blur(52px);
          animation: hv-aurora-spin 14s linear infinite;
        }

        @keyframes hv-aurora-spin {
          from { transform: rotate(0deg) scale(1); }
          50%  { transform: rotate(180deg) scale(1.06); }
          to   { transform: rotate(360deg) scale(1); }
        }

        /* Outer decorative dashed ring */
        .hv-ring-outer {
          position: absolute;
          inset: 10px;
          border-radius: 50%;
          border: 1px dashed rgba(255, 255, 255, 0.09);
          animation: hv-ring-spin-r 28s linear infinite;
        }

        @keyframes hv-ring-spin-r {
          to { transform: rotate(360deg); }
        }

        /* Inner solid ring */
        .hv-ring-inner {
          position: absolute;
          inset: 52px;
          border-radius: 50%;
          border: 1px solid rgba(125, 211, 252, 0.14);
          animation: hv-ring-spin-l 18s linear infinite;
        }

        @keyframes hv-ring-spin-l {
          to { transform: rotate(-360deg); }
        }

        /* Quadrant tick marks on the outer ring */
        .hv-ring-tick {
          position: absolute;
          top: 50%;
          left: 50%;
          transform-origin: 0 0;
        }

        .hv-tick-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--opal-cyan);
          box-shadow: 0 0 8px var(--opal-cyan);
          margin-top: -2.5px;
        }

        /* Photo frame */
        .hv-photo-frame {
          position: relative;
          z-index: 4;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(255, 255, 255, 0.12);
          box-shadow:
            0 0 0 6px rgba(167, 139, 250, 0.06),
            0 0 0 12px rgba(125, 211, 252, 0.04),
            0 24px 60px -12px rgba(0, 0, 0, 0.8),
            inset 0 0 40px rgba(0, 0, 0, 0.4);
          background: var(--surface-solid);
        }

        .hv-photo-img {
          object-fit: cover;
          object-position: center top;
          filter: contrast(1.05) brightness(0.95);
          transition: transform 0.6s ease;
        }

        .hv-photo-frame:hover .hv-photo-img {
          transform: scale(1.04);
        }

        /* Shimmer overlay on photo */
        .hv-photo-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(167, 139, 250, 0.08) 0%,
            transparent 50%,
            rgba(125, 211, 252, 0.06) 100%
          );
          border-radius: 50%;
          pointer-events: none;
        }

        /* Status badge on photo */
        .hv-status-badge {
          position: absolute;
          bottom: 10px;
          right: 10px;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          border-radius: 100px;
          background: rgba(8, 9, 13, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(94, 234, 212, 0.3);
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--opal-teal);
          white-space: nowrap;
        }

        .hv-badge-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--opal-teal);
          box-shadow: 0 0 6px var(--opal-teal);
          animation: hv-pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }

        @keyframes hv-pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.85); }
          50%       { opacity: 1;   transform: scale(1.2);  }
        }

        /* ── Orbit chip pill ── */
        .chip-pill {
          display: inline-flex;
          align-items: center;
          padding: 4px 10px;
          border-radius: 100px;
          background: var(--chip-bg);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(8px);
          font-family: var(--font-mono);
          font-size: 9.5px;
          letter-spacing: 0.05em;
          color: var(--chip-color);
          white-space: nowrap;
          box-shadow: 0 2px 12px rgba(0,0,0,0.4);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .chip-pill:hover {
          border-color: var(--chip-color);
          box-shadow: 0 0 14px rgba(125,211,252,0.15);
        }

        /* ── Terminal card ── */
        .hv-terminal {
          width: 100%;
          max-width: 360px;
          background: rgba(10, 12, 18, 0.82);
          backdrop-filter: blur(24px) saturate(1.3);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255,255,255,0.03) inset;
        }

        .hv-term-top {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(255, 255, 255, 0.02);
        }

        .hv-term-dots {
          display: flex;
          gap: 6px;
        }

        .hv-term-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .hv-term-title {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.1em;
          color: var(--ivory-dim);
          flex: 1;
          text-align: center;
          text-transform: uppercase;
        }

        .hv-term-body {
          padding: 14px 16px;
          font-family: var(--font-mono);
          font-size: 11.5px;
          line-height: 1.7;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .hv-code-line {
          display: flex;
          gap: 0;
        }

        .hv-token-kw      { color: #c084fc; }
        .hv-token-var     { color: #7dd3fc; }
        .hv-token-str     { color: #86efac; }
        .hv-token-fn      { color: #fde68a; }
        .hv-token-comment { color: var(--ivory-dim); font-style: italic; }
        .hv-token-punct   { color: var(--ivory-muted); }
        .hv-token-        { color: var(--ivory-muted); }

        .hv-cursor {
          display: inline-block;
          width: 7px;
          height: 13px;
          background: var(--opal-cyan);
          border-radius: 1px;
          margin-left: 2px;
          vertical-align: middle;
          animation: hv-blink 1.1s step-end infinite;
        }

        @keyframes hv-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        /* Metrics strip */
        .hv-term-metrics {
          display: flex;
          gap: 0;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .hv-metric {
          flex: 1;
          padding: 8px 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
        }

        .hv-metric:last-child {
          border-right: none;
        }

        .hv-metric-val {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 600;
          color: var(--ivory);
          letter-spacing: -0.02em;
        }

        .hv-metric-lbl {
          font-family: var(--font-mono);
          font-size: 8.5px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ivory-dim);
        }
      `}</style>

      {/* ── Aurora / Photo Scene ── */}
      <motion.div
        className="hv-scene"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Blurred aurora blob behind everything */}
        {!prefersReducedMotion && <div className="hv-aurora-blob" />}

        {/* Outer dashed orbit ring */}
        <div className="hv-ring-outer" />

        {/* Inner ring */}
        <div className="hv-ring-inner" />

        {/* Orbiting tech chips on outer ring */}
        {!prefersReducedMotion && TECH_CHIPS.map((chip, i) => {
          const duration = i % 2 === 0 ? 24 : 22; // slightly different speeds
          const isOuter = i % 2 === 0;
          const radius = isOuter ? OUTER_R : INNER_R;
          return (
            <motion.div
              key={chip.label}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 0,
                height: 0,
              }}
              animate={{ rotate: [chip.angle, chip.angle + 360] }}
              transition={{
                duration,
                delay: -(chip.angle / 360) * duration,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <motion.div
                style={{
                  position: 'absolute',
                  left: `${radius}px`,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
                animate={{ rotate: [-(chip.angle), -(chip.angle + 360)] }}
                transition={{
                  duration,
                  delay: -(chip.angle / 360) * duration,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <div
                  className="chip-pill"
                  style={{ '--chip-color': chip.color, '--chip-bg': chip.bg } as React.CSSProperties}
                >
                  {chip.label}
                </div>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Profile photo */}
        <div className="hv-photo-frame">
          <Image
            src="/khaled_bin_aziz.jpg"
            alt="Khaled Bin Aziz — Full-Stack Engineer"
            fill
            className="hv-photo-img"
            priority
            sizes="200px"
          />
          <div className="hv-photo-shimmer" />
        </div>


      </motion.div>

      {/* ── Terminal Code Card ── */}
      <motion.div
        className="hv-terminal"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Window chrome */}
        <div className="hv-term-top">
          <div className="hv-term-dots">
            <div className="hv-term-dot" style={{ background: '#ff5f57' }} />
            <div className="hv-term-dot" style={{ background: '#febc2e' }} />
            <div className="hv-term-dot" style={{ background: '#28c840' }} />
          </div>
          <span className="hv-term-title">khaled.config.ts</span>
        </div>

        {/* Code body */}
        <div className="hv-term-body">
          {CODE_LINES.map((line, li) => (
            <motion.div
              key={li}
              className="hv-code-line"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.5 + line.delay }}
            >
              {line.tokens.map((tok, ti) => (
                <span key={ti} className={`hv-token-${tok.c}`}>
                  {tok.t}
                </span>
              ))}
              {li === CODE_LINES.length - 1 && (
                <span className="hv-cursor" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Metrics strip */}
        <div className="hv-term-metrics">
          {[
            { val: '2+', lbl: 'Yrs Exp' },
            { val: '5K+', lbl: 'Users' },
            { val: '70%', lbl: 'Perf ↑' },
            { val: '50K', lbl: 'Req/Day' },
          ].map((m) => (
            <div key={m.lbl} className="hv-metric">
              <span className="hv-metric-val">{m.val}</span>
              <span className="hv-metric-lbl">{m.lbl}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
