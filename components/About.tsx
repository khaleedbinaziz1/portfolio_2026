'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { personalInfo } from '@/data/personal';
import { FiMapPin, FiTrendingUp, FiUsers, FiZap, FiCheck } from 'react-icons/fi';
import TextScramble from '@/components/TextScramble';
import AnimatedCounter from '@/components/AnimatedCounter';
import { sound } from '@/lib/sound';

const EASE = [0.16, 1, 0.3, 1] as const;

// ── Bento card tilt (direct DOM writes, zero re-renders) ──
function useTilt<T extends HTMLElement>(strength = 5) {
  const ref = useRef<T | null>(null);
  const raf = useRef<number | null>(null);

  const onMouseMove = (e: React.MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${(-py * strength).toFixed(2)}deg) rotateY(${(px * strength).toFixed(2)}deg) translateY(-2px)`;
    });
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    if (raf.current) cancelAnimationFrame(raf.current);
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return { ref, onMouseMove, onMouseLeave };
}

// ── Spotlight effect ──
function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const raf = useRef<number | null>(null);

  const onMouseMove = (e: React.MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    });
  };

  return { ref, onMouseMove };
}

const PRINCIPLES = [
  {
    id: 'scale',
    tag: 'Scalability',
    label: 'High-Throughput Web Systems',
    desc: 'Designing modular microservices and event-driven backends that easily sustain tens of thousands of concurrent requests without latency spikes.',
  },
  {
    id: 'craft',
    tag: 'Craftsmanship',
    label: 'Fluid Full-Stack Experiences',
    desc: 'Bridging technical rigor with tactile micro-interactions — ensuring applications feel instantaneous, accessible, and enjoyable to use.',
  },
  {
    id: 'education',
    tag: 'Education',
    label: 'CS Pedagogy & Mentorship',
    desc: 'Authoring structured past paper guides and curriculum notes to guide the next generation of engineers toward core computational thinking.',
  },
];

const STATS = [
  { icon: FiTrendingUp, value: '70%', label: 'Performance Boost' },
  { icon: FiUsers, value: '5,000+', label: 'Production Users' },
  { icon: FiZap, value: '50K+', label: 'Daily Operations' },
];

export default function About() {
  const [activePrinciple, setActivePrinciple] = useState(PRINCIPLES[0].id);
  const currentPrinciple = PRINCIPLES.find((p) => p.id === activePrinciple) || PRINCIPLES[0];

  const photoTilt = useTilt<HTMLDivElement>(4);
  const bioSpotlight = useSpotlight<HTMLDivElement>();

  return (
    <section id="about" className="ln-about">
      <style>{`
        .ln-about {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: var(--void);
          color: var(--ivory);
          padding: var(--section-pad-y) var(--section-pad-x);
        }

        .ln-about-inner {
          position: relative;
          max-width: var(--max-w);
          margin: 0 auto;
        }

        /* Section Header: Calibrated, Non-Aggressive */
        .ln-section-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--opal-cyan);
          margin-bottom: 16px;
        }

        .ln-section-label::before {
          content: '';
          width: 24px;
          height: 1px;
          background: var(--opal-cyan);
          opacity: 0.6;
        }

        .ln-section-title {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(1.75rem, 3.2vw, 2.4rem);
          letter-spacing: -0.025em;
          line-height: 1.15;
          margin-bottom: 12px;
          color: var(--ivory);
        }

        .ln-section-subtitle {
          font-family: var(--font-body);
          font-size: clamp(0.95rem, 1.4vw, 1.05rem);
          color: var(--ivory-muted);
          max-width: 580px;
          line-height: 1.6;
          margin-bottom: 44px;
        }

        /* Bento Grid Layout */
        .ln-bento-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
        }

        @media (min-width: 768px) {
          .ln-bento-grid {
            grid-template-columns: repeat(12, 1fr);
          }
        }

        /* Bento Base Card */
        .ln-bento-card {
          position: relative;
          background: var(--surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 24px;
          overflow: hidden;
          transition: border-color var(--duration-normal) ease, box-shadow var(--duration-normal) ease;
          backdrop-filter: blur(16px);
        }

        .ln-bento-card:hover {
          border-color: var(--border-hover);
          box-shadow: 0 16px 36px -12px rgba(0, 0, 0, 0.75);
        }

        /* Cell 1: Photo & Identity (4 Cols) */
        .ln-bento-photo-cell {
          grid-column: span 12;
          display: flex;
          flex-direction: column;
        }

        @media (min-width: 768px) {
          .ln-bento-photo-cell {
            grid-column: span 5;
          }
        }

        @media (min-width: 1024px) {
          .ln-bento-photo-cell {
            grid-column: span 4;
          }
        }

        .ln-photo-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 4.5;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: #0d0f15;
          border: 1px solid var(--border-subtle);
          margin-bottom: 18px;
        }

        .ln-photo-img {
          object-fit: cover;
          transition: transform 0.6s var(--ease-out-expo);
        }

        .ln-bento-photo-cell:hover .ln-photo-img {
          transform: scale(1.03);
        }

        .ln-photo-badge {
          position: absolute;
          bottom: 12px;
          left: 12px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          background: rgba(8, 9, 13, 0.8);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border-subtle);
          border-radius: 100px;
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: var(--ivory);
          letter-spacing: 0.06em;
        }

        .ln-id-name {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--ivory);
          margin-bottom: 4px;
        }

        .ln-id-role {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--opal-cyan);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* Cell 2: Interactive Engineering Principles (7/8 Cols) */
        .ln-bento-bio-cell {
          grid-column: span 12;
          display: flex;
          flex-direction: column;
        }

        @media (min-width: 768px) {
          .ln-bento-bio-cell {
            grid-column: span 7;
          }
        }

        @media (min-width: 1024px) {
          .ln-bento-bio-cell {
            grid-column: span 8;
          }
        }

        .ln-bento-tag {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--ivory-dim);
          margin-bottom: 14px;
        }

        .ln-bio-heading {
          font-family: var(--font-display);
          font-size: clamp(1.2rem, 2vw, 1.45rem);
          font-weight: 600;
          letter-spacing: -0.015em;
          line-height: 1.35;
          margin-bottom: 16px;
          color: var(--ivory);
        }

        .ln-bio-text {
          font-family: var(--font-body);
          font-size: 14.5px;
          line-height: 1.65;
          color: var(--ivory-muted);
          margin-bottom: 24px;
        }

        /* Interactive Principle Tabs */
        .ln-principle-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 18px;
        }

        .ln-principle-btn {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.06em;
          padding: 6px 14px;
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          color: var(--ivory-dim);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .ln-principle-btn:hover {
          color: var(--ivory);
          border-color: var(--border-hover);
        }

        .ln-principle-btn.active {
          color: #ffffff;
          background: rgba(125, 211, 252, 0.1);
          border-color: rgba(125, 211, 252, 0.35);
        }

        .ln-principle-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 16px 18px;
          margin-top: auto;
        }

        .ln-principle-title {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 600;
          color: var(--ivory);
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .ln-principle-desc {
          font-family: var(--font-body);
          font-size: 13px;
          line-height: 1.55;
          color: var(--ivory-muted);
        }

        /* Cell 3: Metrics Strip (Span 12 or 8) */
        .ln-bento-metrics-cell {
          grid-column: span 12;
        }

        @media (min-width: 1024px) {
          .ln-bento-metrics-cell {
            grid-column: span 7;
          }
        }

        .ln-metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          height: 100%;
        }

        .ln-bento-metric-box {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 18px 16px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: all 0.25s ease;
        }

        .ln-bento-metric-box:hover {
          border-color: var(--border-hover);
          background: rgba(255, 255, 255, 0.04);
          transform: translateY(-2px);
        }

        .ln-bento-m-val {
          font-family: var(--font-display);
          font-size: clamp(1.4rem, 2.2vw, 1.8rem);
          font-weight: 600;
          color: var(--ivory);
          letter-spacing: -0.02em;
        }

        .ln-bento-m-lbl {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ivory-dim);
          margin-top: 4px;
        }

        /* Cell 4: Education & Research (Span 12 or 5) */
        .ln-bento-edu-cell {
          grid-column: span 12;
        }

        @media (min-width: 1024px) {
          .ln-bento-edu-cell {
            grid-column: span 5;
          }
        }

        .ln-edu-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .ln-edu-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .ln-edu-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .ln-edu-bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--opal-cyan);
          margin-top: 6px;
          flex-shrink: 0;
        }

        .ln-edu-degree {
          font-family: var(--font-display);
          font-size: 13.5px;
          font-weight: 600;
          color: var(--ivory);
          margin-bottom: 2px;
        }

        .ln-edu-school {
          font-family: var(--font-mono);
          font-size: 10.5px;
          letter-spacing: 0.06em;
          color: var(--ivory-dim);
        }
      `}</style>

      <div className="ln-about-inner">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="ln-section-label">
            <TextScramble text="Identity // 01" />
          </div>
          <h2 className="ln-section-title">Engineering software that holds up under pressure.</h2>
          <p className="ln-section-subtitle">
            Two years in production — e-commerce platforms, ticketing systems, retail ERPs, and CS education.
            Here's the thinking behind the work.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="ln-bento-grid">
          {/* Cell 1: Photo & Status */}
          <motion.div
            ref={photoTilt.ref}
            onMouseMove={photoTilt.onMouseMove}
            onMouseLeave={photoTilt.onMouseLeave}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="ln-bento-card ln-bento-photo-cell"
          >
            <div className="ln-photo-wrap">
              <Image
                src="/images/me.jpg"
                alt="Khaled Bin Aziz"
                fill
                className="ln-photo-img"
                sizes="(max-width: 768px) 100vw, 360px"
              />
              <div className="ln-photo-badge">
                <FiMapPin size={11} color="var(--opal-teal)" />
                <span>Chattogram, Bangladesh</span>
              </div>
            </div>
          </motion.div>

          {/* Cell 2: Philosophy & Interactive Focus Areas */}
          <motion.div
            ref={bioSpotlight.ref}
            onMouseMove={bioSpotlight.onMouseMove}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="ln-bento-card ln-bento-bio-cell"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div className="ln-bento-tag" style={{ margin: 0 }}>PHILOSOPHY // PERSPECTIVE</div>
            </div>

            <h3 className="ln-bio-heading">
              Technology is most powerful when engineered cleanly and explained transparently.
            </h3>
            <p className="ln-bio-text">
              Over the last two years, I’ve engineered e-commerce platforms, ticketing systems, and enterprise POS ERPs
              handling mission-critical sales and inventory data. Parallel to development, I mentor CS students to bridge academic theory with real-world engineering.
            </p>

            {/* Interactive Principle Switcher */}
            <div className="ln-principle-tabs">
              {PRINCIPLES.map((p) => {
                const isActive = activePrinciple === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      sound.tick(1000, 0.02);
                      setActivePrinciple(p.id);
                    }}
                    className={`ln-principle-btn ${isActive ? 'active' : ''}`}
                    style={{ position: 'relative' }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activePrincipleTab"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '100px',
                          background: 'rgba(125, 211, 252, 0.12)',
                          border: '1px solid rgba(125, 211, 252, 0.4)',
                          zIndex: 0,
                        }}
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      />
                    )}
                    <span style={{ position: 'relative', zIndex: 1 }}>{p.tag}</span>
                  </button>
                );
              })}
            </div>

            <div className="ln-principle-card">
              <div className="ln-principle-title">
                <FiCheck size={13} color="var(--opal-cyan)" />
                <span>{currentPrinciple.label}</span>
              </div>
              <p className="ln-principle-desc">{currentPrinciple.desc}</p>
            </div>
          </motion.div>

          {/* Cell 3: Impact Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.6, delay: 0.14, ease: EASE }}
            className="ln-bento-card ln-bento-metrics-cell"
          >
            <div className="ln-bento-tag">QUANTIFIED IMPACT // BENCHMARKS</div>
            <div className="ln-metrics-grid">
              {STATS.map((s) => (
                <div key={s.label} className="ln-bento-metric-box">
                  <div className="ln-bento-m-val">
                    <AnimatedCounter value={s.value} duration={1.2} />
                  </div>
                  <div className="ln-bento-m-lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Cell 4: Academic Rigor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
            className="ln-bento-card ln-bento-edu-cell"
          >
            <div className="ln-bento-tag">FOUNDATION // ACADEMIA</div>
            <div className="ln-edu-list">
              <div className="ln-edu-item">
                <span className="ln-edu-bullet" />
                <div>
                  <div className="ln-edu-degree">MSc in Computer Science & Engineering</div>
                  <div className="ln-edu-school">East Delta University • 2025 – Present</div>
                </div>
              </div>
              <div className="ln-edu-item">
                <span className="ln-edu-bullet" />
                <div>
                  <div className="ln-edu-degree">BSc in Computer Science & Engineering</div>
                  <div className="ln-edu-school">East Delta University • Graduated 2024</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}