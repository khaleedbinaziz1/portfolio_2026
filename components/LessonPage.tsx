'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Navigation from './Navigation';
import { plexMono, plexSerif, plexSans } from '@/public/fonts';

type Props = {
  title: string;
  html: string;
};

export default function LessonPage({ title, html }: Props) {
  const [progress, setProgress] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const el = articleRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const viewport = window.innerHeight;
        const total = rect.height - viewport;
        const scrolled = -rect.top;
        const pct = total > 0 ? Math.min(100, Math.max(0, (scrolled / total) * 100)) : 0;
        setProgress(pct);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className={`khb-lesson ${plexMono.variable} ${plexSerif.variable} ${plexSans.variable}`}>
      <style>{`
        .khb-lesson {
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
        .khb-lesson *, .khb-lesson *::before, .khb-lesson *::after { box-sizing: border-box; }

        .khb-lesson .khb-lesson-grid {
          position: fixed; inset: 0;
          background-image: radial-gradient(rgba(217,169,78,0.22) 1px, transparent 1px);
          background-size: 26px 26px;
          opacity: 0.3;
          pointer-events: none;
          z-index: 0;
        }

        /* reading progress bar, fixed under the navbar */
        .khb-lesson .khb-lesson-progress-track {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: rgba(245, 241, 232, 0.08);
          z-index: 60;
        }
        .khb-lesson .khb-lesson-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--brass), var(--teal));
          transition: width 0.1s linear;
        }

        .khb-lesson .khb-lesson-main {
          position: relative;
          z-index: 1;
          max-width: 820px;
          margin: 0 auto;
          padding: 128px 24px 120px;
        }
        @media (min-width: 768px) { .khb-lesson .khb-lesson-main { padding: 140px 40px 140px; } }

        .khb-lesson .khb-lesson-crumbs {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          font-family: var(--khb-font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted-2);
          margin-bottom: 20px;
        }
        .khb-lesson .khb-lesson-crumbs a {
          color: var(--teal);
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color .2s ease;
        }
        .khb-lesson .khb-lesson-crumbs a:hover { border-color: currentColor; }

        .khb-lesson .khb-lesson-tag {
          font-family: var(--khb-font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--brass);
          border: 1px solid rgba(217,169,78,0.35);
          padding: 5px 10px;
          border-radius: 3px;
          display: inline-block;
          margin-bottom: 18px;
        }

        .khb-lesson .khb-lesson-title {
          font-family: var(--khb-font-mono), monospace;
          font-weight: 700;
          letter-spacing: -0.01em;
          font-size: clamp(1.7rem, 4.2vw, 2.6rem);
          line-height: 1.25;
          margin: 0 0 28px;
        }

        /* terminal-style file header wrapping the lesson body */
        .khb-lesson .khb-lesson-window {
          background: var(--panel);
          border: 1px solid rgba(245,241,232,0.1);
          border-radius: 8px;
          overflow: hidden;
        }
        .khb-lesson .khb-lesson-window-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          background: rgba(245,241,232,0.04);
          border-bottom: 1px solid rgba(245,241,232,0.08);
        }
        .khb-lesson .khb-lesson-dots { display: flex; gap: 6px; }
        .khb-lesson .khb-dot { width: 9px; height: 9px; border-radius: 50%; display: inline-block; }
        .khb-lesson .khb-dot-teal { background: var(--teal); opacity: 0.7; }
        .khb-lesson .khb-dot-brass { background: var(--brass); opacity: 0.7; }
        .khb-lesson .khb-dot-muted { background: var(--muted-2); }
        .khb-lesson .khb-lesson-window-title {
          font-family: var(--khb-font-mono), monospace;
          font-size: 11px;
          color: var(--muted);
        }

        .khb-lesson .khb-lesson-body {
          padding: 40px 32px 48px;
        }
        @media (min-width: 768px) { .khb-lesson .khb-lesson-body { padding: 48px 56px 56px; } }

        /* ---- prose styling for the raw lesson HTML ---- */
        .khb-lesson .khb-lesson-body h1,
        .khb-lesson .khb-lesson-body h2,
        .khb-lesson .khb-lesson-body h3,
        .khb-lesson .khb-lesson-body h4 {
          font-family: var(--khb-font-mono), monospace;
          font-weight: 700;
          color: var(--paper);
          letter-spacing: -0.005em;
          margin: 2em 0 0.7em;
        }
        .khb-lesson .khb-lesson-body h1:first-child,
        .khb-lesson .khb-lesson-body h2:first-child,
        .khb-lesson .khb-lesson-body h3:first-child { margin-top: 0; }

        .khb-lesson .khb-lesson-body h2 {
          font-size: 1.4rem;
          padding-bottom: 0.5em;
          border-bottom: 1px solid rgba(245,241,232,0.1);
        }
        .khb-lesson .khb-lesson-body h3 {
          font-size: 1.15rem;
          color: var(--teal);
        }
        .khb-lesson .khb-lesson-body h4 {
          font-size: 1rem;
          color: var(--brass);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .khb-lesson .khb-lesson-body p {
          font-family: var(--khb-font-serif), serif;
          font-size: 16.5px;
          line-height: 1.8;
          color: var(--muted);
          margin: 0 0 1.2em;
        }

        .khb-lesson .khb-lesson-body strong { color: var(--paper); font-weight: 700; }
        .khb-lesson .khb-lesson-body em { color: var(--teal); font-style: italic; }

        .khb-lesson .khb-lesson-body a {
          color: var(--teal);
          text-decoration: none;
          border-bottom: 1px solid rgba(95,227,214,0.4);
          transition: border-color .2s ease, color .2s ease;
        }
        .khb-lesson .khb-lesson-body a:hover { border-color: var(--teal); }

        .khb-lesson .khb-lesson-body ul,
        .khb-lesson .khb-lesson-body ol {
          font-family: var(--khb-font-serif), serif;
          font-size: 16.5px;
          line-height: 1.8;
          color: var(--muted);
          margin: 0 0 1.4em;
          padding-left: 1.4em;
        }
        .khb-lesson .khb-lesson-body li { margin-bottom: 0.5em; }
        .khb-lesson .khb-lesson-body li::marker { color: var(--brass); }
        .khb-lesson .khb-lesson-body ul { list-style: none; padding-left: 0; }
        .khb-lesson .khb-lesson-body ul li {
          position: relative;
          padding-left: 1.4em;
        }
        .khb-lesson .khb-lesson-body ul li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: var(--brass);
        }

        .khb-lesson .khb-lesson-body blockquote {
          margin: 1.6em 0;
          padding: 4px 0 4px 20px;
          border-left: 3px solid var(--brass);
          font-family: var(--khb-font-serif), serif;
          font-style: italic;
          color: var(--muted);
        }

        .khb-lesson .khb-lesson-body code {
          font-family: var(--khb-font-mono), monospace;
          font-size: 0.88em;
          color: var(--teal);
          background: rgba(95,227,214,0.08);
          border: 1px solid rgba(95,227,214,0.18);
          border-radius: 3px;
          padding: 2px 6px;
        }

        .khb-lesson .khb-lesson-body pre {
          background: var(--ink);
          border: 1px solid rgba(245,241,232,0.1);
          border-radius: 6px;
          padding: 18px 20px;
          overflow-x: auto;
          margin: 0 0 1.6em;
        }
        .khb-lesson .khb-lesson-body pre code {
          background: transparent;
          border: none;
          padding: 0;
          color: var(--paper);
          font-size: 13.5px;
          line-height: 1.7;
        }

        .khb-lesson .khb-lesson-body img {
          max-width: 100%;
          height: auto;
          border-radius: 6px;
          border: 1px solid rgba(245,241,232,0.1);
          margin: 1.6em 0;
        }

        .khb-lesson .khb-lesson-body hr {
          border: none;
          height: 1px;
          background: linear-gradient(to right, rgba(217,169,78,0.4), transparent);
          margin: 2.4em 0;
        }

        .khb-lesson .khb-lesson-body table {
          width: 100%;
          border-collapse: collapse;
          font-family: var(--khb-font-mono), monospace;
          font-size: 13px;
          margin: 0 0 1.6em;
        }
        .khb-lesson .khb-lesson-body th,
        .khb-lesson .khb-lesson-body td {
          text-align: left;
          padding: 10px 12px;
          border: 1px solid rgba(245,241,232,0.1);
        }
        .khb-lesson .khb-lesson-body th {
          color: var(--brass);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-size: 11px;
          background: rgba(245,241,232,0.03);
        }
        .khb-lesson .khb-lesson-body td { color: var(--muted); }

        .khb-lesson .khb-lesson-footer {
          margin-top: 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .khb-lesson .khb-lesson-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--khb-font-mono), monospace;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--muted);
          border: 1px solid rgba(245,241,232,0.15);
          padding: 10px 16px;
          border-radius: 4px;
          transition: border-color .2s ease, color .2s ease, background-color .2s ease;
        }
        .khb-lesson .khb-lesson-back:hover {
          color: var(--paper);
          border-color: rgba(95,227,214,0.4);
          background: rgba(95,227,214,0.06);
        }
        .khb-lesson .khb-lesson-eof {
          font-family: var(--khb-font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--muted-2);
        }
      `}</style>

      <div className="khb-lesson-grid" aria-hidden="true" />

      <div className="khb-lesson-progress-track" aria-hidden="true">
        <div className="khb-lesson-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <Navigation contentVisible={true} />

      <main className="khb-lesson-main">
        <div className="khb-lesson-crumbs">
          <Link href="/lessons">O Level CS</Link>
          <span>/</span>
          <span>Lesson</span>
        </div>

        <span className="khb-lesson-tag">O LEVEL · COMPUTER SCIENCE</span>
        <h1 className="khb-lesson-title">{title}</h1>

        <div className="khb-lesson-window" ref={articleRef}>
          <div className="khb-lesson-window-bar">
            <div className="khb-lesson-dots">
              <span className="khb-dot khb-dot-teal" />
              <span className="khb-dot khb-dot-brass" />
              <span className="khb-dot khb-dot-muted" />
            </div>
            <span className="khb-lesson-window-title">lesson.md</span>
          </div>

          <article className="khb-lesson-body" dangerouslySetInnerHTML={{ __html: html }} />
        </div>

        <div className="khb-lesson-footer">
          <Link href="/lessons" className="khb-lesson-back">
            ← Back to Lessons
          </Link>
          <span className="khb-lesson-eof">$ end of lesson</span>
        </div>
      </main>
    </div>
  );
}