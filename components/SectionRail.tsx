'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/lib/sound';

const SECTIONS = [
  { id: 'hero', num: '01', label: 'Overview' },
  { id: 'about', num: '02', label: 'Identity' },
  { id: 'skills', num: '03', label: 'Stack' },
  { id: 'experience', num: '04', label: 'Trajectory' },
  { id: 'projects', num: '05', label: 'Works' },
  { id: 'contact', num: '06', label: 'Signal' },
];

export default function SectionRail() {
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const handleScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const max = scrollHeight - clientHeight;
        setScrollProgress(max > 0 ? (scrollTop / max) * 100 : 0);

        // Find active section
        for (let i = SECTIONS.length - 1; i >= 0; i--) {
          const s = SECTIONS[i];
          if (s.id === 'hero' && scrollTop < 200) {
            setActiveSection('hero');
            break;
          }
          const el = document.getElementById(s.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.45) {
              setActiveSection(s.id);
              break;
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scrollTo = (id: string) => {
    sound.tick(1200, 0.025);
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      className="section-rail-container"
      aria-label="Section navigation rail"
    >
      <style>{`
        .section-rail-container {
          position: fixed;
          right: 28px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 90;
          display: none;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          pointer-events: auto;
        }

        @media (min-width: 1280px) {
          .section-rail-container {
            display: flex;
          }
        }

        .section-rail-track {
          position: absolute;
          top: 8px;
          bottom: 8px;
          width: 1px;
          background: rgba(255, 255, 255, 0.07);
          z-index: 1;
        }

        .section-rail-progress-bar {
          position: absolute;
          top: 8px;
          width: 1px;
          background: linear-gradient(180deg, var(--opal-cyan), var(--opal-amethyst));
          box-shadow: 0 0 8px rgba(125, 211, 252, 0.6);
          z-index: 2;
          transition: height 0.1s linear;
        }

        .section-rail-node {
          position: relative;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          padding: 4px;
          cursor: pointer;
          outline: none;
        }

        .section-rail-pip {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.25s var(--ease-out-expo);
        }

        .section-rail-node:hover .section-rail-pip {
          background: var(--ivory);
          transform: scale(1.4);
        }

        .section-rail-node.active .section-rail-pip {
          background: var(--opal-cyan);
          border-color: var(--opal-cyan);
          box-shadow: 0 0 10px var(--opal-cyan);
          transform: scale(1.5);
        }

        .section-rail-tooltip {
          position: absolute;
          right: 22px;
          white-space: nowrap;
          padding: 4px 10px;
          background: rgba(13, 15, 21, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--border-default);
          border-radius: 4px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ivory);
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
          pointer-events: none;
        }

        .section-rail-tooltip .num {
          color: var(--opal-cyan);
        }
      `}</style>

      <div className="section-rail-track" />
      <div
        className="section-rail-progress-bar"
        style={{
          height: `${Math.min(100, Math.max(0, (scrollProgress / 100) * (SECTIONS.length - 1) * 26))}px`,
        }}
      />

      {SECTIONS.map((s) => {
        const isActive = activeSection === s.id;
        const isHovered = hoveredSection === s.id;

        return (
          <button
            key={s.id}
            type="button"
            onClick={() => scrollTo(s.id)}
            onMouseEnter={() => {
              setHoveredSection(s.id);
              sound.tick(1400, 0.012);
            }}
            onMouseLeave={() => setHoveredSection(null)}
            className={`section-rail-node ${isActive ? 'active' : ''}`}
            aria-label={`Jump to ${s.label}`}
          >
            <span className="section-rail-pip" />

            <AnimatePresence>
              {(isHovered || (isActive && hoveredSection === null)) && (
                <motion.div
                  initial={{ opacity: 0, x: 6, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 6, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  className="section-rail-tooltip"
                >
                  <span className="num">{s.num}</span>
                  <span>{s.label}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </aside>
  );
}
