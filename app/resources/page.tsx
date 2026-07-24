'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { resources } from '@/data/resources';
import { plexMono, plexSerif, plexSans } from '@/public/fonts';

const ACCENTS = ['teal', 'brass'] as const;

export default function resourcesIndex() {
  const topics = Array.from(new Set(resources.map((r) => r.topic)));

  return (
    <div className={`khb-resources ${plexMono.variable} ${plexSerif.variable} ${plexSans.variable}`}>
      <style>{`
        .khb-resources {
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
        .khb-resources *, .khb-resources *::before, .khb-resources *::after { box-sizing: border-box; }

        .khb-resources .khb-resources-grid-bg {
          position: fixed; inset: 0;
          background-image: radial-gradient(rgba(217,169,78,0.22) 1px, transparent 1px);
          background-size: 26px 26px;
          opacity: 0.3;
          pointer-events: none;
          z-index: 0;
        }

        .khb-resources .khb-resources-main {
          position: relative;
          z-index: 1;
          max-width: 1180px;
          margin: 0 auto;
          padding: 128px 24px 120px;
        }
        @media (min-width: 960px) { .khb-resources .khb-resources-main { padding: 140px 40px 140px; } }

        .khb-resources .khb-tag {
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

        .khb-resources .khb-resources-cmdline {
          font-family: var(--khb-font-mono), monospace;
          font-size: 13px;
          color: var(--muted);
          margin: 18px 0 14px;
        }
        .khb-resources .khb-resources-cmdline .prompt { color: var(--brass); margin-right: 6px; }

        .khb-resources .khb-resources-title {
          font-family: var(--khb-font-mono), monospace;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          font-size: clamp(2rem, 5vw, 3rem);
          margin: 0 0 14px;
        }
        .khb-resources .khb-resources-rule { height: 1px; background: linear-gradient(to right, rgba(217,169,78,0.4), transparent); margin-bottom: 10px; }
        .khb-resources .khb-resources-desc {
          font-family: var(--khb-font-serif), serif;
          font-size: 15px;
          line-height: 1.7;
          color: var(--muted);
          max-width: 640px;
          margin: 14px 0 0;
        }

        .khb-resources .khb-resources-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 28px;
        }
        .khb-resources .khb-filter-chip {
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

        .khb-resources .khb-resources-list {
          margin-top: 48px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 720px) { .khb-resources .khb-resources-list { grid-template-columns: repeat(2, 1fr); } }

        .khb-resources .khb-resource-card {
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
        .khb-resources .khb-resource-card:hover {
          border-color: var(--card-border, rgba(217,169,78,0.35));
          transform: translateY(-3px);
          box-shadow: 0 18px 30px -18px rgba(0,0,0,0.75);
        }
        .khb-resources .khb-resource-card::before,
        .khb-resources .khb-resource-card::after {
          content: '';
          position: absolute;
          width: 14px;
          height: 14px;
          border-color: var(--card-accent, var(--brass));
          opacity: 0;
          transition: opacity .3s ease;
          pointer-events: none;
        }
        .khb-resources .khb-resource-card::before { top: 8px; left: 8px; border-top: 1.5px solid; border-left: 1.5px solid; }
        .khb-resources .khb-resource-card::after { bottom: 8px; right: 8px; border-bottom: 1.5px solid; border-right: 1.5px solid; }
        .khb-resources .khb-resource-card:hover::before,
        .khb-resources .khb-resource-card:hover::after { opacity: 0.9; }

        .khb-resources .khb-resource-card-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .khb-resources .khb-resource-card-code {
          font-family: var(--khb-font-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: var(--card-accent, var(--brass));
        }
        .khb-resources .khb-resource-card-duration {
          font-family: var(--khb-font-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          color: var(--muted-2);
        }

        .khb-resources .khb-resource-card-title {
          font-family: var(--khb-font-mono), monospace;
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 10px;
          line-height: 1.35;
        }
        .khb-resources .khb-resource-card-excerpt {
          font-family: var(--khb-font-serif), serif;
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--muted);
          margin: 0 0 18px;
          flex: 1;
        }

        .khb-resources .khb-resource-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px dashed rgba(245,241,232,0.14);
        }
        .khb-resources .khb-resource-card-topic {
          font-family: var(--khb-font-mono), monospace;
          font-size: 10.5px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .khb-resources .khb-resource-card-arrow {
          font-family: var(--khb-font-mono), monospace;
          font-size: 13px;
          color: var(--card-accent, var(--brass));
          transition: transform .25s ease;
        }
        .khb-resources .khb-resource-card:hover .khb-resource-card-arrow { transform: translateX(4px); }

        .khb-resources .khb-resources-empty {
          margin-top: 60px;
          text-align: center;
          font-family: var(--khb-font-mono), monospace;
          font-size: 13px;
          color: var(--muted-2);
        }
      `}</style>

      <div className="khb-resources-grid-bg" aria-hidden="true" />

      <Navigation contentVisible={true} />

      <main className="khb-resources-main">
        <header>
          <span className="khb-tag">RESOURCE LIBRARY · O LEVEL COMPUTER SCIENCE</span>
          <div className="khb-resources-cmdline">
            <span className="prompt">$</span>ls resources/
          </div>
          <h1 className="khb-resources-title">Learning Resources</h1>
          <div className="khb-resources-rule" />
          <p className="khb-resources-desc">
            Browse a growing collection of O Level Computer Science study materials, including topical notes, solved past papers, topical question papers, mark schemes, revision guides, worksheets, MCQ practice, and exam-focused resources designed to help students prepare with confidence.
          </p>

          {topics.length > 0 && (
            <div className="khb-resources-filters" aria-label="Topics covered">
              {topics.map((topic) => (
                <span key={topic} className="khb-filter-chip">
                  {topic}
                </span>
              ))}
            </div>
          )}
        </header>

        {resources.length === 0 ? (
          <p className="khb-resources-empty">$ no resources published yet — check back soon</p>
        ) : (
          <div className="khb-resources-list">
            {resources.map((resource, index) => {
              const accent = ACCENTS[index % ACCENTS.length];
              const accentColor = accent === 'brass' ? '#D9A94E' : '#5FE3D6';
              const accentBorder =
                accent === 'brass' ? 'rgba(217,169,78,0.35)' : 'rgba(95,227,214,0.35)';
              const code = `RES.${String(index + 1).padStart(2, '0')}`;

              return (
                <Link
                  key={resource.slug}
                  href={`/resources/${resource.slug}`}
                  className="khb-resource-card"
                  style={
                    { '--card-accent': accentColor, '--card-border': accentBorder } as React.CSSProperties
                  }
                >
                  <div className="khb-resource-card-meta">
                    <span className="khb-resource-card-code">{code}</span>
                    {resource.duration && (
                      <span className="khb-resource-card-duration">{resource.duration}</span>
                    )}
                  </div>

                  <h2 className="khb-resource-card-title">{resource.title}</h2>
                  <p className="khb-resource-card-excerpt">{resource.excerpt}</p>

                  <div className="khb-resource-card-footer">
                    <span className="khb-resource-card-topic">
                      {resource.level} · {resource.topic}
                    </span>
                    <span className="khb-resource-card-arrow">→</span>
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