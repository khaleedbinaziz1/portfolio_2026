'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { lessons } from '@/data/lessons';
import { plexMono, plexSerif, plexSans } from '@/public/fonts';

const ACCENTS = ['teal', 'brass'] as const;

export default function LessonsIndex() {
  const topics = Array.from(new Set(lessons.map((l) => l.topic)));

  return (
    <div className={`khb-lessons ${plexMono.variable} ${plexSerif.variable} ${plexSans.variable}`}>
      <style>{`
        .khb-lessons {
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
          background: var(--ink);
          color: var(--paper);
          font-family: var(--khb-font-sans), sans-serif;
          box-sizing: border-box;
        }
        .khb-lessons *, .khb-lessons *::before, .khb-lessons *::after { box-sizing: border-box; }

        .khb-lessons .khb-lessons-grid-bg {
          position: fixed; inset: 0;
          background-image: radial-gradient(rgba(217,169,78,0.22) 1px, transparent 1px);
          background-size: 26px 26px;
          opacity: 0.3;
          pointer-events: none;
          z-index: 0;
        }

        .khb-lessons .khb-lessons-main {
          position: relative;
          z-index: 1;
          max-width: 1180px;
          margin: 0 auto;
          padding: 128px 24px 120px;
        }
        @media (min-width: 960px) { .khb-lessons .khb-lessons-main { padding: 140px 40px 140px; } }

        .khb-lessons .khb-tag {
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

        .khb-lessons .khb-lessons-cmdline {
          font-family: var(--khb-font-mono), monospace;
          font-size: 13px;
          color: var(--muted);
          margin: 18px 0 14px;
        }
        .khb-lessons .khb-lessons-cmdline .prompt { color: var(--brass); margin-right: 6px; }

        .khb-lessons .khb-lessons-title {
          font-family: var(--khb-font-mono), monospace;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          font-size: clamp(2rem, 5vw, 3rem);
          margin: 0 0 14px;
        }
        .khb-lessons .khb-lessons-rule { height: 1px; background: linear-gradient(to right, rgba(217,169,78,0.4), transparent); margin-bottom: 10px; }
        .khb-lessons .khb-lessons-desc {
          font-family: var(--khb-font-serif), serif;
          font-size: 15px;
          line-height: 1.7;
          color: var(--muted);
          max-width: 640px;
          margin: 14px 0 0;
        }

        .khb-lessons .khb-lessons-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 28px;
        }
        .khb-lessons .khb-filter-chip {
          font-family: var(--khb-font-mono), monospace;
          font-size: 10.5px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--teal);
          border: 1px solid rgba(95,227,214,0.3);
          background: rgba(95,227,214,0.05);
          padding: 6px 11px;
          border-radius: 3px;
        }

        .khb-lessons .khb-lessons-list {
          margin-top: 48px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 720px) { .khb-lessons .khb-lessons-list { grid-template-columns: repeat(2, 1fr); } }

        .khb-lessons .khb-lesson-card {
          position: relative;
          display: flex;
          flex-direction: column;
          background: var(--panel);
          border: 1px solid rgba(245, 241, 232, 0.1);
          border-radius: 8px;
          padding: 22px 22px 20px;
          text-decoration: none;
          color: inherit;
          transition: border-color .3s ease, transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s ease;
        }
        .khb-lessons .khb-lesson-card:hover {
          border-color: var(--card-border, rgba(217,169,78,0.35));
          transform: translateY(-3px);
          box-shadow: 0 18px 30px -18px rgba(0,0,0,0.75);
        }
        .khb-lessons .khb-lesson-card::before,
        .khb-lessons .khb-lesson-card::after {
          content: '';
          position: absolute;
          width: 14px;
          height: 14px;
          border-color: var(--card-accent, var(--brass));
          opacity: 0;
          transition: opacity .3s ease;
          pointer-events: none;
        }
        .khb-lessons .khb-lesson-card::before { top: 8px; left: 8px; border-top: 1.5px solid; border-left: 1.5px solid; }
        .khb-lessons .khb-lesson-card::after { bottom: 8px; right: 8px; border-bottom: 1.5px solid; border-right: 1.5px solid; }
        .khb-lessons .khb-lesson-card:hover::before,
        .khb-lessons .khb-lesson-card:hover::after { opacity: 0.9; }

        .khb-lessons .khb-lesson-card-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .khb-lessons .khb-lesson-card-code {
          font-family: var(--khb-font-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: var(--card-accent, var(--brass));
        }
        .khb-lessons .khb-lesson-card-duration {
          font-family: var(--khb-font-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          color: var(--muted-2);
        }

        .khb-lessons .khb-lesson-card-title {
          font-family: var(--khb-font-mono), monospace;
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 10px;
          line-height: 1.35;
        }
        .khb-lessons .khb-lesson-card-excerpt {
          font-family: var(--khb-font-serif), serif;
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--muted);
          margin: 0 0 18px;
          flex: 1;
        }

        .khb-lessons .khb-lesson-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px dashed rgba(245,241,232,0.14);
        }
        .khb-lessons .khb-lesson-card-topic {
          font-family: var(--khb-font-mono), monospace;
          font-size: 10.5px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .khb-lessons .khb-lesson-card-arrow {
          font-family: var(--khb-font-mono), monospace;
          font-size: 13px;
          color: var(--card-accent, var(--brass));
          transition: transform .25s ease;
        }
        .khb-lessons .khb-lesson-card:hover .khb-lesson-card-arrow { transform: translateX(4px); }

        .khb-lessons .khb-lessons-empty {
          margin-top: 60px;
          text-align: center;
          font-family: var(--khb-font-mono), monospace;
          font-size: 13px;
          color: var(--muted-2);
        }
      `}</style>

      <div className="khb-lessons-grid-bg" aria-hidden="true" />

      <Navigation contentVisible={true} />

      <main className="khb-lessons-main">
        <header>
          <span className="khb-tag">O LEVEL · COMPUTER SCIENCE</span>
          <div className="khb-lessons-cmdline">
            <span className="prompt">$</span>ls lessons/
          </div>
          <h1 className="khb-lessons-title">Lessons</h1>
          <div className="khb-lessons-rule" />
          <p className="khb-lessons-desc">
            Structured notes and walkthroughs for O Level Computer Science — built to connect
            what&apos;s on the syllabus to how the concepts actually work in practice.
          </p>

          {topics.length > 0 && (
            <div className="khb-lessons-filters" aria-label="Topics covered">
              {topics.map((topic) => (
                <span key={topic} className="khb-filter-chip">
                  {topic}
                </span>
              ))}
            </div>
          )}
        </header>

        {lessons.length === 0 ? (
          <p className="khb-lessons-empty">$ no lessons published yet — check back soon</p>
        ) : (
          <div className="khb-lessons-list">
            {lessons.map((lesson, index) => {
              const accent = ACCENTS[index % ACCENTS.length];
              const accentColor = accent === 'brass' ? '#D9A94E' : '#5FE3D6';
              const accentBorder =
                accent === 'brass' ? 'rgba(217,169,78,0.35)' : 'rgba(95,227,214,0.35)';
              const code = `LSN.${String(index + 1).padStart(2, '0')}`;

              return (
                <Link
                  key={lesson.slug}
                  href={`/lessons/${lesson.slug}`}
                  className="khb-lesson-card"
                  style={
                    { '--card-accent': accentColor, '--card-border': accentBorder } as React.CSSProperties
                  }
                >
                  <div className="khb-lesson-card-meta">
                    <span className="khb-lesson-card-code">{code}</span>
                    {lesson.duration && (
                      <span className="khb-lesson-card-duration">{lesson.duration}</span>
                    )}
                  </div>

                  <h2 className="khb-lesson-card-title">{lesson.title}</h2>
                  <p className="khb-lesson-card-excerpt">{lesson.excerpt}</p>

                  <div className="khb-lesson-card-footer">
                    <span className="khb-lesson-card-topic">
                      {lesson.level} · {lesson.topic}
                    </span>
                    <span className="khb-lesson-card-arrow">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}