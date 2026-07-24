'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import TerminalCommand from './TerminalCommand';
import { personalInfo } from '@/data/personal';
import { plexMono, plexSerif, plexSans } from '@/public/fonts';

const EASE = [0.22, 0.61, 0.36, 1] as const;

const learningHighlights = [
  {
    code: 'LRN.01',
    title: 'O Level Computer Science',
    description:
      'Structured notes, practical programming, past papers, MCQs, and revision guides for students.',
    points: ['Complete notes', 'Video lessons', 'Mock exams', 'Practical programming'],
  },
  {
    code: 'LRN.02',
    title: 'Programming & Web Development',
    description:
      'Clear tutorials and real-world examples covering JavaScript, React, Laravel, Node.js, and Git.',
    points: ['Hands-on projects', 'Beginner-friendly lessons', 'Best practices', 'Production mindset'],
  },
  {
    code: 'LRN.03',
    title: 'Resources & Study Tools',
    description:
      'Downloadable study materials and cheat sheets designed to make learning easier and more practical.',
    points: ['PDF notes', 'Cheat sheets', 'Revision checklists', 'Exercise sets'],
  },
] as const;

export default function About() {
  const aboutLines = personalInfo.about ?? [];

  // Falls back to solid default copy if personalInfo.about isn't populated yet.
  const paragraphs = [
    aboutLines[0] ??
      "I'm a Full-Stack Software Engineer building modern web applications with React, Next.js, Laravel, Node.js, TypeScript, and cloud tooling — turning ideas into software that holds up in production.",
    aboutLines[1] ??
      'I like solving hard problems and designing systems that scale. But the technology is only half of it.',
    aboutLines[2] ??
      'Alongside development, I care about computer science education. Through tutorials, structured notes, and practical resources, I help students connect classroom concepts to the kind of software actually being built.',
  ];

  return (
    <section
      id="about"
      className={`khb-about ${plexMono.variable} ${plexSerif.variable} ${plexSans.variable}`}
    >
      <style>{`
        .khb-about {
          --ink: #0b0d12;
          --panel: #12151c;
          --paper: #f5f1e8;
          --brass: #d9a94e;
          --teal: #5fe3d6;
          --muted: rgba(245, 241, 232, 0.62);
          --muted-2: rgba(245, 241, 232, 0.34);
          position: relative;
          width: 100%;
          overflow: hidden;
          background: var(--ink);
          color: var(--paper);
          font-family: var(--khb-font-sans), sans-serif;
          padding: 96px 24px;
          box-sizing: border-box;
        }
        .khb-about *, .khb-about *::before, .khb-about *::after { box-sizing: border-box; }
        @media (min-width: 960px) { .khb-about { padding: 140px 40px; } }

        .khb-about .khb-about-grid {
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(217,169,78,0.22) 1px, transparent 1px);
          background-size: 26px 26px;
          opacity: 0.3;
          pointer-events: none;
        }

        .khb-about .khb-about-inner {
          position: relative;
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
          align-items: start;
        }
        @media (min-width: 960px) {
          .khb-about .khb-about-inner { grid-template-columns: 0.72fr 1.28fr; gap: 72px; }
        }

        .khb-about .khb-rise { animation: khb-about-rise .7s cubic-bezier(.16,1,.3,1) both; }
        @keyframes khb-about-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) { .khb-about .khb-rise { animation: none; opacity: 1; } }

        .khb-about .khb-tag {
          font-family: var(--khb-font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--brass);
          border: 1px solid rgba(217,169,78,0.35);
          padding: 5px 10px;
          border-radius: 3px;
          display: inline-block;
        }
        .khb-about .khb-tag--teal { color: var(--teal); border-color: rgba(95,227,214,0.35); }

        .khb-about .khb-eyebrow {
          font-family: var(--khb-font-mono), monospace;
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
        }

        /* ID card */
        .khb-about .khb-about-card-wrap { display: flex; justify-content: center; }
        @media (min-width: 960px) {
          .khb-about .khb-about-card-wrap { justify-content: flex-start; position: sticky; top: 120px; }
        }
        .khb-about .khb-about-card {
          width: 100%;
          max-width: 320px;
          background: var(--panel);
          border: 1px solid rgba(217,169,78,0.3);
          border-radius: 6px;
          padding: 18px;
          transform: rotate(-2deg);
          box-shadow: 0 24px 44px -18px rgba(0,0,0,0.65);
        }
        .khb-about .khb-about-card-tag-row {
          display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;
        }
        .khb-about .khb-about-card-idx {
          font-family: var(--khb-font-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: var(--muted-2);
        }
        .khb-about .khb-about-photo-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 400 / 520;
          overflow: hidden;
          border-radius: 3px;
          border: 1px solid rgba(245,241,232,0.08);
        }
        .khb-about .khb-about-photo { width: 100%; height: 100%; object-fit: cover; display: block; }
        .khb-about .khb-about-card-caption {
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px dashed rgba(245,241,232,0.16);
        }
        .khb-about .khb-about-card-name { font-family: var(--khb-font-mono), monospace; font-size: 13px; font-weight: 600; color: var(--paper); }
        .khb-about .khb-about-card-role { font-family: var(--khb-font-serif), serif; font-size: 12px; color: var(--muted); }

        /* Main column */
        .khb-about .khb-about-header { margin-bottom: 24px; }
        .khb-about .khb-about-title {
          font-family: var(--khb-font-mono), monospace;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          font-size: clamp(2rem, 5vw, 3rem);
          margin: 14px 0 8px;
        }
        .khb-about .khb-about-subtitle {
          font-style: italic;
          font-family: var(--khb-font-serif), serif;
          color: var(--muted);
        }

        .khb-about .khb-about-copy { max-width: 640px; margin-bottom: 24px; }
        .khb-about .khb-about-copy p {
          font-family: var(--khb-font-serif), serif;
          font-size: 16px;
          line-height: 1.75;
          color: var(--muted);
          margin: 0 0 16px;
        }

        .khb-about .khb-about-facts { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 36px; }

        /* Terminal */
        .khb-about .khb-about-terminal-wrap { max-width: 640px; }
        .khb-about .khb-about-terminal {
          background: var(--panel);
          border: 1px solid rgba(245,241,232,0.1);
          border-radius: 6px;
          overflow: hidden;
        }
        .khb-about .khb-about-term-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background: rgba(245,241,232,0.04);
          border-bottom: 1px solid rgba(245,241,232,0.08);
        }
        .khb-about .khb-about-term-dots { display: flex; gap: 6px; }
        .khb-about .khb-dot { width: 9px; height: 9px; border-radius: 50%; display: inline-block; }
        .khb-about .khb-dot-teal { background: var(--teal); opacity: 0.7; }
        .khb-about .khb-dot-brass { background: var(--brass); opacity: 0.7; }
        .khb-about .khb-dot-muted { background: var(--muted-2); }
        .khb-about .khb-about-term-title { font-family: var(--khb-font-mono), monospace; font-size: 12px; color: var(--muted); }
        .khb-about .khb-about-term-body {
          padding: 18px 20px 22px;
          font-family: var(--khb-font-mono), monospace;
          font-size: 13.5px;
          line-height: 1.7;
        }
        .khb-about .khb-about-term-static { margin: 0 0 4px; color: var(--paper); }
        .khb-about .khb-about-prompt { color: var(--brass); margin-right: 6px; }
        .khb-about .khb-about-term-output { color: var(--teal); margin-bottom: 12px; }

        /* Learning hub */
        .khb-about .khb-learning {
          position: relative;
          max-width: 1180px;
          margin: 88px auto 0;
        }
        .khb-about .khb-learning-header { margin-bottom: 36px; }
        .khb-about .khb-learning-cmdline {
          font-family: var(--khb-font-mono), monospace;
          font-size: 13px;
          color: var(--muted);
          margin: 18px 0 14px;
        }
        .khb-about .khb-learning-cmdline .khb-about-prompt { color: var(--brass); margin-right: 6px; }
        .khb-about .khb-learning-title {
          font-family: var(--khb-font-mono), monospace;
          font-weight: 700;
          letter-spacing: -0.01em;
          font-size: clamp(1.5rem, 3.4vw, 2.1rem);
          margin: 0 0 12px;
        }
        .khb-about .khb-learning-desc {
          font-family: var(--khb-font-serif), serif;
          font-size: 15px;
          line-height: 1.7;
          color: var(--muted);
          max-width: 640px;
          margin: 0;
        }

        .khb-about .khb-learning-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 22px;
        }
        @media (min-width: 720px) { .khb-about .khb-learning-grid { grid-template-columns: repeat(3, 1fr); } }

        .khb-about .khb-learning-card {
          position: relative;
          background: var(--panel);
          border: 1px solid rgba(245, 241, 232, 0.1);
          border-radius: 8px;
          padding: 22px 20px;
          transition: border-color .35s ease, transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s ease;
        }
        .khb-about .khb-learning-card:hover {
          border-color: var(--card-border, rgba(217,169,78,0.35));
          transform: translateY(-3px);
          box-shadow: 0 18px 30px -18px rgba(0,0,0,0.75);
        }
        .khb-about .khb-learning-card::before,
        .khb-about .khb-learning-card::after {
          content: '';
          position: absolute;
          width: 14px;
          height: 14px;
          border-color: var(--card-accent, var(--brass));
          opacity: 0;
          transition: opacity .3s ease;
          pointer-events: none;
        }
        .khb-about .khb-learning-card::before { top: 8px; left: 8px; border-top: 1.5px solid; border-left: 1.5px solid; }
        .khb-about .khb-learning-card::after { bottom: 8px; right: 8px; border-bottom: 1.5px solid; border-right: 1.5px solid; }
        .khb-about .khb-learning-card:hover::before,
        .khb-about .khb-learning-card:hover::after { opacity: 0.9; }

        .khb-about .khb-learning-card-code {
          font-family: var(--khb-font-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: var(--card-accent, var(--brass));
          display: block;
          margin-bottom: 14px;
        }
        .khb-about .khb-learning-card-title {
          font-family: var(--khb-font-mono), monospace;
          font-size: 15px;
          font-weight: 600;
          margin: 0 0 10px;
          line-height: 1.3;
        }
        .khb-about .khb-learning-card-desc {
          font-family: var(--khb-font-serif), serif;
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--muted);
          margin: 0 0 16px;
        }
        .khb-about .khb-learning-card-points {
          list-style: none;
          margin: 0;
          padding: 14px 0 0;
          border-top: 1px dashed rgba(245,241,232,0.14);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .khb-about .khb-learning-card-points li {
          display: flex;
          align-items: baseline;
          gap: 8px;
          font-family: var(--khb-font-mono), monospace;
          font-size: 12px;
          letter-spacing: 0.02em;
          color: var(--muted);
        }
        .khb-about .khb-learning-card-points li span.khb-bullet {
          color: var(--card-accent, var(--brass));
        }
      `}</style>

      <div className="khb-about-grid" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px', amount: 0.1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="khb-about-inner"
      >
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="khb-about-card-wrap"
        >
          <div className="khb-about-card">
            <div className="khb-about-card-tag-row">
              <span className="khb-tag">IDX.00</span>
              <span className="khb-about-card-idx">ABOUT</span>
            </div>
            <div className="khb-about-photo-frame">
              <Image
                src="/images/me.jpg"
                alt={`Portrait of ${personalInfo.name}`}
                width={400}
                height={520}
                className="khb-about-photo"
                sizes="(max-width: 767px) 100vw, min(38vw, 360px)"
                priority={false}
              />
            </div>
            <div className="khb-about-card-caption">
              <span className="khb-about-card-name">{personalInfo.name}</span>
              <span className="khb-about-card-role">{personalInfo.title}</span>
            </div>
          </div>
        </motion.div>

        <div className="khb-about-main">
          <div className="khb-about-header khb-rise">
            <span className="khb-tag khb-tag--teal">ABOUT · 00</span>
            <h2 className="khb-about-title">About</h2>
            <p className="khb-eyebrow khb-about-subtitle">// the person behind the screen</p>
          </div>

          <div className="khb-about-copy khb-rise" style={{ animationDelay: '.08s' }}>
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="khb-about-facts khb-rise" style={{ animationDelay: '.16s' }}>
            <span className="khb-tag">3+ YRS EXPERIENCE</span>
            <span className="khb-tag khb-tag--teal">MSC CSE · AI/ML IN HEALTHCARE</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.5, delay: 0.24, ease: EASE }}
            className="khb-about-terminal-wrap"
          >
            <div className="khb-about-terminal">
              <div className="khb-about-term-header">
                <div className="khb-about-term-dots">
                  <span className="khb-dot khb-dot-teal" />
                  <span className="khb-dot khb-dot-brass" />
                  <span className="khb-dot khb-dot-muted" />
                </div>
                <div className="khb-about-term-title">about.txt</div>
              </div>
              <div className="khb-about-term-body">
                <p className="khb-about-term-static">
                  <span className="khb-about-prompt">$</span> whoami
                </p>
                <p className="khb-about-term-static khb-about-term-output">
                  {personalInfo.name} · {personalInfo.title}
                </p>
                <TerminalCommand
                  commands={[
                    {
                      prompt: '$',
                      command: 'cat ~/about.txt',
                      output: paragraphs.slice(1).join('\n'),
                      delay: 2200,
                    },
                    {
                      prompt: '$',
                      command: 'years of experience',
                      output: '3+ years building products',
                      delay: 1400,
                    },
                  ]}
                  autoStart={true}
                  speed={45}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px', amount: 0.1 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="khb-learning"
      >
        <header className="khb-learning-header">
          <span className="khb-tag khb-tag--teal">ABOUT · 00b</span>
          <div className="khb-learning-cmdline">
            <span className="khb-about-prompt">$</span>cat learning-hub
          </div>
          <h3 className="khb-learning-title">Building software. Sharing knowledge.</h3>
          <p className="khb-learning-desc">
            This is where product building, education, and practical impact come together
            through tutorials, study materials, and long-form resources.
          </p>
        </header>

        <div className="khb-learning-grid">
          {learningHighlights.map((item, index) => {
            const accent = index % 2 === 0 ? 'brass' : 'teal';
            const accentColor = accent === 'brass' ? '#D9A94E' : '#5FE3D6';
            const accentBorder =
              accent === 'brass' ? 'rgba(217,169,78,0.35)' : 'rgba(95,227,214,0.35)';

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-24px' }}
                transition={{ duration: 0.4, delay: index * 0.06, ease: EASE }}
                className="khb-learning-card"
                style={
                  { '--card-accent': accentColor, '--card-border': accentBorder } as React.CSSProperties
                }
              >
                <span className="khb-learning-card-code">{item.code}</span>
                <h4 className="khb-learning-card-title">{item.title}</h4>
                <p className="khb-learning-card-desc">{item.description}</p>
                <ul className="khb-learning-card-points">
                  {item.points.map((point) => (
                    <li key={point}>
                      <span className="khb-bullet">▸</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}