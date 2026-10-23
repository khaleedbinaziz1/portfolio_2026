'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight, FiMail } from 'react-icons/fi';
import HeroVisualizer from './HeroVisualizer';
import { sound } from '@/lib/sound';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const ROLES = [
  'Full-Stack Engineer',
  'Distributed Systems Builder',
  'CS Educator',
  'Full-Stack Architect',
];

/* ------------------------------------------------------------------ */
/*  MAGNETIC BUTTON WITH SPRING PHYSICS                                */
/* ------------------------------------------------------------------ */
function MagneticButton({
  href,
  className,
  children,
  onClick,
}: {
  href?: string;
  className: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 22, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 240, damping: 22, mass: 0.35 });

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.28);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const onMouseEnter = () => {
    sound.tick(1200, 0.015);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={() => {
        sound.tick(900, 0.03);
        if (onClick) onClick();
      }}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/*  ROLE TEXT ROTATOR WITH SILKY MASKS                                 */
/* ------------------------------------------------------------------ */
function RoleTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="ln-role-rotator">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={ROLES[index]}
          initial={{ y: '100%', opacity: 0, filter: 'blur(3px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-100%', opacity: 0, filter: 'blur(3px)' }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          className="ln-role-current"
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO SECTION BACKGROUND — subtle aurora gradient blobs             */
/* ------------------------------------------------------------------ */
function HeroBackground() {
  return (
    <div className="ln-hero-bg" aria-hidden>
      <div className="ln-bg-blob ln-bg-blob-1" />
      <div className="ln-bg-blob ln-bg-blob-2" />
      <div className="ln-bg-blob ln-bg-blob-3" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN HERO COMPONENT                                                */
/* ------------------------------------------------------------------ */
export default function Hero() {

  return (
    <section id="hero" className="ln-hero-section">
      <style>{`
        /* ── Section ── */
        .ln-hero-section {
          position: relative;
          min-height: 100vh;
          width: 100%;
          overflow: hidden;
          background: var(--void);
          color: var(--ivory);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* ── Aurora background blobs ── */
        .ln-hero-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }

        .ln-bg-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
        }

        .ln-bg-blob-1 {
          width: 520px;
          height: 520px;
          top: -140px;
          right: -80px;
          background: radial-gradient(circle, rgba(167, 139, 250, 0.13) 0%, transparent 70%);
          animation: ln-blob-drift-1 20s ease-in-out infinite alternate;
        }

        .ln-bg-blob-2 {
          width: 400px;
          height: 400px;
          bottom: -100px;
          left: -60px;
          background: radial-gradient(circle, rgba(125, 211, 252, 0.10) 0%, transparent 70%);
          animation: ln-blob-drift-2 16s ease-in-out infinite alternate;
        }

        .ln-bg-blob-3 {
          width: 280px;
          height: 280px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(94, 234, 212, 0.06) 0%, transparent 70%);
          animation: ln-blob-drift-3 24s ease-in-out infinite alternate;
        }

        @keyframes ln-blob-drift-1 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(-30px, 30px) scale(1.08); }
        }
        @keyframes ln-blob-drift-2 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(25px, -20px) scale(1.06); }
        }
        @keyframes ln-blob-drift-3 {
          from { transform: translate(-50%, -50%) scale(1); }
          to   { transform: translate(-50%, -50%) scale(1.14); }
        }

        /* ── Inner layout ── */
        .ln-hero-inner {
          position: relative;
          z-index: 2;
          max-width: var(--max-w);
          width: 100%;
          margin: 0 auto;
          padding: 120px var(--section-pad-x) 80px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 64px;
          align-items: center;
        }

        @media (min-width: 1024px) {
          .ln-hero-inner {
            grid-template-columns: 1.08fr 0.92fr;
            padding: 130px var(--section-pad-x) 90px;
            gap: 56px;
          }
        }

        /* ── Top monospace meta strip ── */
        .ln-hero-meta-bar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px 16px;
          margin-bottom: 32px;
          font-family: var(--font-mono);
          font-size: 10.5px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--ivory-dim);
        }

        .ln-location-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 4px 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 100px;
          color: var(--ivory-dim);
          letter-spacing: 0.1em;
        }

        /* ── "Hi, I'm" eyebrow ── */
        .ln-hero-eyebrow {
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--opal-violet);
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ln-eyebrow-line {
          display: inline-block;
          width: 32px;
          height: 1px;
          background: var(--opal-violet);
          opacity: 0.5;
        }

        /* ── Main headline ── */
        .ln-hero-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(2.6rem, 5.2vw, 4.2rem);
          line-height: 1.04;
          letter-spacing: -0.035em;
          margin: 0 0 16px;
          color: var(--ivory);
        }

        .ln-hero-title .name-word {
          display: block;
          background: linear-gradient(135deg, #ffffff 0%, rgba(167, 139, 250, 0.9) 55%, rgba(125, 211, 252, 0.85) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Role tagline ── */
        .ln-hero-tagline {
          font-family: var(--font-body);
          font-size: clamp(1rem, 1.8vw, 1.2rem);
          font-weight: 400;
          color: var(--ivory-muted);
          line-height: 1.55;
          margin-bottom: 28px;
          max-width: 520px;
        }

        .ln-role-rotator {
          position: relative;
          display: inline-block;
          min-width: 280px;
          height: 1.38em;
          vertical-align: bottom;
          overflow: hidden;
          font-weight: 500;
          color: var(--opal-cyan);
        }

        .ln-role-current {
          display: inline-block;
          white-space: nowrap;
        }

        /* ── Feature chips ── */
        .ln-hero-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 40px;
        }

        .ln-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 13px;
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          font-family: var(--font-mono);
          font-size: 10.5px;
          letter-spacing: 0.06em;
          color: var(--ivory-muted);
          transition: all 0.2s ease;
        }

        .ln-chip:hover {
          border-color: rgba(167, 139, 250, 0.3);
          background: rgba(167, 139, 250, 0.05);
          color: var(--ivory);
        }

        .ln-chip-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.6;
        }

        /* ── Action CTAs ── */
        .ln-hero-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 14px 16px;
        }

        .ln-btn-main {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 26px;
          border-radius: 100px;
          background: linear-gradient(135deg, #a78bfa, #7dd3fc);
          color: #08090d;
          font-family: var(--font-body);
          font-size: 13.5px;
          font-weight: 600;
          letter-spacing: 0.01em;
          text-decoration: none;
          box-shadow: 0 0 0 0 rgba(167, 139, 250, 0.4), 0 6px 24px rgba(0, 0, 0, 0.4);
          transition: all 0.25s var(--ease-out-expo);
          position: relative;
          overflow: hidden;
        }

        .ln-btn-main::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #c4b5fd, #93c5fd);
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .ln-btn-main:hover::before {
          opacity: 1;
        }

        .ln-btn-main:hover {
          box-shadow: 0 0 28px rgba(167, 139, 250, 0.5), 0 8px 32px rgba(0, 0, 0, 0.5);
          transform: translateY(-2px);
        }

        .ln-btn-main > * {
          position: relative;
          z-index: 1;
        }

        .ln-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 24px;
          border-radius: 100px;
          background: transparent;
          color: var(--ivory-muted);
          border: 1px solid var(--border-default);
          font-family: var(--font-body);
          font-size: 13.5px;
          font-weight: 400;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .ln-btn-outline:hover {
          color: var(--ivory);
          border-color: rgba(167, 139, 250, 0.4);
          background: rgba(167, 139, 250, 0.05);
          transform: translateY(-1px);
        }

        .ln-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 12px 18px;
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-subtle);
          color: var(--ivory-dim);
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 400;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .ln-btn-ghost:hover {
          color: var(--ivory);
          border-color: var(--border-hover);
          background: rgba(255, 255, 255, 0.04);
          transform: translateY(-1px);
        }

        .ln-hero-kbd {
          padding: 1px 6px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--border-subtle);
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--opal-cyan);
        }

        /* ── Right visual column ── */
        .ln-hero-visual {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── Scroll cue ── */
        .ln-hero-scroll-cue {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          display: none;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          opacity: 0.45;
          transition: opacity 0.2s ease;
          text-decoration: none;
        }

        @media (min-width: 768px) {
          .ln-hero-scroll-cue { display: flex; }
        }

        .ln-hero-scroll-cue:hover { opacity: 0.85; }

        .ln-scroll-label {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--ivory-dim);
        }

        .ln-scroll-line {
          width: 1px;
          height: 28px;
          background: linear-gradient(180deg, var(--ivory-dim), transparent);
          animation: ln-scroll-drop 2.4s infinite ease-in-out;
        }

        @keyframes ln-scroll-drop {
          0%    { transform: scaleY(0); transform-origin: top; }
          50%   { transform: scaleY(1); transform-origin: top; }
          50.1% { transform: scaleY(1); transform-origin: bottom; }
          100%  { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>

      {/* Atmospheric aurora background */}
      <HeroBackground />

      <div className="ln-hero-inner">
        {/* ────────────────────────────────────────
            Left Column: Editorial Identity Content
        ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
        >
          {/* Top Metadata Strip */}
          <div className="ln-hero-meta-bar">
            <span className="ln-location-chip">
              Chattogram, Bangladesh
            </span>
          </div>

          {/* Eyebrow */}
          <motion.div
            className="ln-hero-eyebrow"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: EASE_OUT_EXPO }}
          >
            <span className="ln-eyebrow-line" />
            Hi, I&apos;m Khaled
          </motion.div>

          {/* Main headline */}
          <motion.h1
            className="ln-hero-title"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: EASE_OUT_EXPO }}
          >
            <span className="name-word">Architecting</span>
            resilient systems &amp; full-stack platforms.
          </motion.h1>

          {/* Role ticker subtitle */}
          <motion.p
            className="ln-hero-tagline"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.26, ease: EASE_OUT_EXPO }}
          >
            Software engineer crafting high-throughput web apps with Next.js, Node.js &amp;
            distributed architectures. Currently active as <RoleTicker />
          </motion.p>

          {/* Feature chips */}
          <motion.div
            className="ln-hero-chips"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.34, ease: EASE_OUT_EXPO }}
          >
            {[
              'TypeScript',
              'System Design',
              'Microservices',
              'MSc CS — AI Focus',
            ].map((c) => (
              <span key={c} className="ln-chip">
                <span className="ln-chip-dot" />
                {c}
              </span>
            ))}
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            className="ln-hero-actions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.42, ease: EASE_OUT_EXPO }}
          >
            <MagneticButton href="#projects" className="ln-btn-main">
              <span>View My Work</span>
              <FiArrowUpRight size={15} />
            </MagneticButton>

            <MagneticButton href="#contact" className="ln-btn-outline">
              <FiMail size={14} />
              <span>Get in Touch</span>
            </MagneticButton>

            <button
              type="button"
              onClick={() => {
                sound.tick(1200, 0.02);
                window.dispatchEvent(new CustomEvent('open-command-palette'));
              }}
              className="ln-btn-ghost"
              aria-label="Launch Command Palette (Cmd+K)"
            >
              <span>Quick Nav</span>
              <span className="ln-hero-kbd">⌘K</span>
            </button>
          </motion.div>
        </motion.div>

        {/* ────────────────────────────────────────
            Right Column: Identity Visual
        ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.14, ease: EASE_OUT_EXPO }}
          className="ln-hero-visual"
        >
          <HeroVisualizer />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <a href="#about" className="ln-hero-scroll-cue" aria-label="Scroll to about section">
        <span className="ln-scroll-label">Scroll</span>
        <span className="ln-scroll-line" />
      </a>
    </section>
  );
}