'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { plexMono, plexSerif, plexSans } from '@/public/fonts';

type Accent = 'brass' | 'teal';

type IdentityCard = {
  code: string;
  label: string;
  detail: string;
  accent: Accent;
};

const IDENTITY_CARDS: IdentityCard[] = [
  {
    code: 'ENG.01',
    label: 'Engineer',
    detail: 'React · Next.js · Laravel · Node · TypeScript',
    accent: 'teal',
  },
  {
    code: 'EDU.02',
    label: 'Educator',
    detail: 'O Level CS, explained so it actually clicks.',
    accent: 'brass',
  },
];

// Buttons/links — update hrefs to match your actual routes.
const LINKS = {
  projects: '#projects',

  resume: '/resume.pdf',
  contact: '#contact',
};

function MagneticLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.28);
    y.set(relY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.a>
  );
}

export default function Hero() {
  const [order, setOrder] = useState([0, 1]);
  const cycle = () => setOrder((o) => [...o.slice(1), o[0]]);

  const cardsRef = useRef<HTMLDivElement>(null);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 200, damping: 22 });
  const springTiltY = useSpring(tiltY, { stiffness: 200, damping: 22 });
  const rotateX = useTransform(springTiltY, [-40, 40], [8, -8]);
  const rotateY = useTransform(springTiltX, [-40, 40], [-8, 8]);

  const handleCardsMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardsRef.current?.getBoundingClientRect();
    if (!rect) return;
    tiltX.set(e.clientX - rect.left - rect.width / 2);
    tiltY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleCardsMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <section
      className={`khb-hero ${plexMono.variable} ${plexSerif.variable} ${plexSans.variable}`}
    >
      <style>{`
        .khb-hero {
          --ink: #0b0d12;
          --panel: #12151c;
          --paper: #f5f1e8;
          --brass: #d9a94e;
          --teal: #5fe3d6;
          --muted: rgba(245, 241, 232, 0.62);
          --muted-2: rgba(245, 241, 232, 0.34);
          position: relative;
          min-height: 100vh;
          width: 100%;
          overflow: hidden;
          background: var(--ink);
          color: var(--paper);
          font-family: var(--khb-font-sans), sans-serif;
          box-sizing: border-box;
        }
        .khb-hero *, .khb-hero *::before, .khb-hero *::after { box-sizing: border-box; }

        .khb-hero .khb-grid {
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(217,169,78,0.35) 1px, transparent 1px);
          background-size: 26px 26px;
          opacity: 0.4;
          pointer-events: none;
        }
        .khb-hero .khb-vignette {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at top, transparent 0%, var(--ink) 78%);
          pointer-events: none;
        }

        .khb-hero .khb-inner {
          position: relative;
          max-width: 1180px;
          margin: 0 auto;
          padding: 96px 24px 72px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
          align-items: center;
        }
        @media (min-width: 960px) {
          .khb-hero .khb-inner { grid-template-columns: 1.15fr 0.85fr; padding: 140px 40px 96px; gap: 64px; }
        }

        .khb-hero .khb-rise { animation: khb-hero-rise .7s cubic-bezier(.16,1,.3,1) both; }
        @keyframes khb-hero-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) { .khb-hero .khb-rise { animation: none; opacity: 1; } }

        .khb-hero .khb-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px; }
        .khb-hero .khb-tag {
          font-family: var(--khb-font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--brass);
          border: 1px solid rgba(217,169,78,0.35);
          padding: 5px 10px;
          border-radius: 3px;
          display: inline-block;
          cursor: default;
          transition: background-color .2s ease, border-color .2s ease, color .2s ease;
        }
        .khb-hero .khb-tag:hover {
          background: rgba(217,169,78,0.1);
          border-color: rgba(217,169,78,0.7);
        }

        .khb-hero .khb-name {
          font-family: var(--khb-font-mono), monospace;
          font-weight: 700;
          text-transform: uppercase;
          line-height: 0.94;
          letter-spacing: -0.01em;
          font-size: clamp(2.6rem, 8vw, 4.6rem);
          margin: 0;
        }

        .khb-hero .khb-tagline-wrap { position: relative; display: inline-block; margin: 26px 0 30px; }
        .khb-hero .khb-tagline-underline { position: absolute; left: 0; bottom: -2px; width: 100%; height: 10px; }
        .khb-hero .khb-tagline-underline path {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: khb-hero-draw 1.1s cubic-bezier(.16,1,.3,1) .55s forwards;
        }
        @keyframes khb-hero-draw { to { stroke-dashoffset: 0; } }
        @media (prefers-reduced-motion: reduce) { .khb-hero .khb-tagline-underline path { animation: none; stroke-dashoffset: 0; } }

        .khb-hero .khb-tagline {
          position: relative;
          font-family: var(--khb-font-sans), sans-serif;
          font-size: clamp(1.05rem, 2vw, 1.3rem);
          font-weight: 500;
          margin: 0;
        }
        .khb-hero .khb-tagline .khb-dot { color: var(--brass); padding: 0 4px; }

        .khb-hero .khb-copy { max-width: 560px; margin-bottom: 40px; }
        .khb-hero .khb-copy p {
          font-family: var(--khb-font-serif), serif;
          font-size: 16px;
          line-height: 1.7;
          color: var(--muted);
          margin: 0 0 16px;
        }

        .khb-hero .khb-ctas { display: flex; flex-wrap: wrap; align-items: center; gap: 14px 32px; }
        .khb-hero .khb-btn {
          font-family: var(--khb-font-mono), monospace;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 13px 26px;
          border-radius: 3px;
          display: inline-block;
          transition: background-color .2s ease, color .2s ease, border-color .2s ease;
        }
        .khb-hero .khb-btn-primary { background: var(--brass); color: var(--ink); }
        .khb-hero .khb-btn-primary:hover { background: #ecc26a; }
        .khb-hero .khb-btn-secondary { background: transparent; color: var(--teal); border: 1px solid rgba(95,227,214,0.5); }
        .khb-hero .khb-btn-secondary:hover { background: rgba(95,227,214,0.1); }
        .khb-hero .khb-link {
          position: relative;
          font-family: var(--khb-font-mono), monospace;
          font-size: 13px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          padding-bottom: 2px;
          transition: color .2s ease;
        }
        .khb-hero .khb-link::after {
          content: '';
          position: absolute;
          left: 0; right: 100%; bottom: 0;
          height: 1px;
          background: currentColor;
          transition: right .25s cubic-bezier(.16,1,.3,1);
        }
        .khb-hero .khb-link:hover { color: var(--paper); }
        .khb-hero .khb-link:hover::after { right: 0; }
        .khb-hero .khb-btn:focus-visible, .khb-hero .khb-link:focus-visible, .khb-hero .khb-cards:focus-visible {
          outline: 2px solid var(--brass);
          outline-offset: 3px;
        }

        .khb-hero .khb-cards-wrap { display: flex; justify-content: center; perspective: 1000px; }
        @media (min-width: 960px) { .khb-hero .khb-cards-wrap { justify-content: flex-end; } }

        .khb-hero .khb-cards { position: relative; width: 280px; height: 320px; cursor: pointer; user-select: none; transform-style: preserve-3d; }
        @media (min-width: 640px) { .khb-hero .khb-cards { width: 310px; height: 360px; } }

        .khb-hero .khb-card {
          position: absolute;
          inset: 0;
          border-radius: 6px;
          border: 1px solid;
          background: var(--panel);
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform .5s cubic-bezier(.16,1,.3,1), box-shadow .5s ease;
        }
        .khb-hero .khb-card-code { font-family: var(--khb-font-mono), monospace; font-size: 11px; letter-spacing: 0.2em; }
        .khb-hero .khb-card-idx { font-family: var(--khb-font-mono), monospace; font-size: 10px; color: var(--muted-2); }
        .khb-hero .khb-card-label { font-family: var(--khb-font-mono), monospace; font-size: 24px; font-weight: 600; margin: 0 0 10px; }
        .khb-hero .khb-card-detail { font-family: var(--khb-font-serif), serif; font-size: 14px; line-height: 1.5; color: var(--muted); margin: 0; }
        .khb-hero .khb-card-hint { font-family: var(--khb-font-mono), monospace; font-size: 10px; letter-spacing: 0.2em; color: var(--muted-2); margin: 0; }

        .khb-hero .khb-scroll {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          display: none;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: var(--muted-2);
        }
        @media (min-width: 640px) { .khb-hero .khb-scroll { display: flex; } }
        .khb-hero .khb-scroll-label { font-family: var(--khb-font-mono), monospace; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; }
        .khb-hero .khb-scroll-line { width: 1px; height: 32px; background: linear-gradient(to bottom, rgba(217,169,78,0.6), transparent); overflow: hidden; position: relative; }
        .khb-hero .khb-scroll-line::after {
          content: '';
          position: absolute;
          left: 0; top: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(to bottom, transparent, var(--brass));
          animation: khb-hero-scroll-drip 2.2s ease-in-out infinite;
        }
        @keyframes khb-hero-scroll-drip { to { top: 100%; } }
        @media (prefers-reduced-motion: reduce) { .khb-hero .khb-scroll-line::after { animation: none; } }
      `}</style>

      <div className="khb-grid" aria-hidden="true" />
      <div className="khb-vignette" aria-hidden="true" />

      <div className="khb-inner">
        <div>
          <div className="khb-tags khb-rise" style={{ animationDelay: '0s' }}>
            {IDENTITY_CARDS.map((c) => (
              <span key={c.code} className="khb-tag">
                {c.code}
              </span>
            ))}
          </div>

          <h1 className="khb-name khb-rise" style={{ animationDelay: '.08s' }}>
            Khaled
            <br />
            Bin Aziz
          </h1>

          <div className="khb-tagline-wrap khb-rise" style={{ animationDelay: '.16s' }}>
            <svg
              className="khb-tagline-underline"
              viewBox="0 0 360 10"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0,6 Q40,2 80,6 T160,6 T240,6 T320,6 T360,5"
                stroke="#D9A94E"
                strokeWidth="4"
                fill="none"
                opacity="0.45"
              />
            </svg>
            <p className="khb-tagline">
              Software Engineer<span className="khb-dot">•</span>Educator
            </p>
          </div>

          <div className="khb-copy khb-rise" style={{ animationDelay: '.24s' }}>
            <p>
              I build scalable web applications and digital products — turning ideas
              into software that holds up in production, using React, Next.js,
              Laravel, Node.js, and TypeScript.
            </p>
            <p>
              Alongside development, I teach O Level Computer Science, breaking
              complex concepts into lessons and resources that actually help
              students learn.
            </p>
          </div>

          <div className="khb-ctas khb-rise" style={{ animationDelay: '.32s' }}>
            <MagneticLink href={LINKS.projects} className="khb-btn khb-btn-primary">
              View Projects
            </MagneticLink>
          
            <a href={LINKS.resume} className="khb-link">
              Resume ↗
            </a>
            <a href={LINKS.contact} className="khb-link">
              Contact →
            </a>
          </div>
        </div>

        <div className="khb-cards-wrap khb-rise" style={{ animationDelay: '.2s' }}>
          <motion.div
            ref={cardsRef}
            className="khb-cards"
            onClick={cycle}
            onMouseMove={handleCardsMouseMove}
            onMouseLeave={handleCardsMouseLeave}
            style={{ rotateX, rotateY }}
            role="button"
            tabIndex={0}
            aria-label="Cycle through Engineer and Educator cards"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                cycle();
              }
            }}
          >
            {order.map((idx, pos) => {
              const card = IDENTITY_CARDS[idx];
              const rotations = ['-5deg', '4deg'];
              const shifts = [
                { x: '0px', y: '0px' },
                { x: '16px', y: '22px' },
              ];
              const accentColor = card.accent === 'brass' ? '#D9A94E' : '#5FE3D6';
              const isFront = pos === 0;
              return (
                <div
                  key={card.code}
                  className="khb-card"
                  style={{
                    zIndex: 30 - pos * 10,
                    transform: `translate(${shifts[pos].x}, ${shifts[pos].y}) rotate(${rotations[pos]})`,
                    borderColor:
                      card.accent === 'brass'
                        ? 'rgba(217,169,78,0.35)'
                        : 'rgba(95,227,214,0.35)',
                    boxShadow: isFront
                      ? '0 24px 44px -14px rgba(0,0,0,0.65)'
                      : '0 10px 22px -10px rgba(0,0,0,0.45)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="khb-card-code" style={{ color: accentColor }}>
                      {card.code}
                    </span>
                    <span className="khb-card-idx">IDX</span>
                  </div>
                  <div>
                    <p className="khb-card-label">{card.label}</p>
                    <p className="khb-card-detail">{card.detail}</p>
                  </div>
                  <p className="khb-card-hint">TAP TO SHUFFLE</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      <div className="khb-scroll" aria-hidden="true">
        <span className="khb-scroll-label">Scroll</span>
        <span className="khb-scroll-line" />
      </div>
    </section>
  );
}