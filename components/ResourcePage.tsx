'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Navigation from './Navigation';
import { plexMono, plexSerif, plexSans } from '@/public/fonts';
import Footer from './Footer';

export type PdfFile = {
  name: string;
  href: string;
  sizeKB: number;
  videos?: { title: string; url: string }[];
};

type Props = {
  title: string;
  html: string;
  pdfUrl?: string;
  pdfFiles?: PdfFile[];
};

function prettifyPdfName(fileName: string) {
  return fileName
    .replace(/\.pdf$/i, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function ResourcePage({ title, html, pdfUrl, pdfFiles }: Props) {
  const [progress, setProgress] = useState(0);
  const [showPdf, setShowPdf] = useState(false);
  const [readMinutes, setReadMinutes] = useState<number | null>(null);
  const [pdfQuery, setPdfQuery] = useState('');
  const articleRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const filteredPdfFiles = useMemo(() => {
    if (!pdfFiles) return [];
    const q = pdfQuery.trim().toLowerCase();
    if (!q) return pdfFiles;
    return pdfFiles.filter(
      (f) =>
        f.name.toLowerCase().includes(q) || prettifyPdfName(f.name).toLowerCase().includes(q)
    );
  }, [pdfFiles, pdfQuery]);

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

  // Estimate reading time from the rendered word count (~200 wpm)
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const words = (el.textContent || '').trim().split(/\s+/).filter(Boolean).length;
    setReadMinutes(Math.max(1, Math.round(words / 200)));
  }, [html]);

  const isComplete = progress >= 99;

  return (
    <div className={`khb-resource ${plexMono.variable} ${plexSerif.variable} ${plexSans.variable}`}>
      <style>{`
        .khb-resource {
          --ink: #0b0d12;
          --panel: #12151c;
          --panel-raised: #161a23;
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
        .khb-resource *, .khb-resource *::before, .khb-resource *::after { box-sizing: border-box; }

        .khb-resource .khb-resource-grid {
          position: fixed; inset: 0;
          background-image: radial-gradient(rgba(217,169,78,0.22) 1px, transparent 1px);
          background-size: 26px 26px;
          opacity: 0.3;
          pointer-events: none;
          z-index: 0;
        }

        /* reading progress bar, fixed under the navbar */
        .khb-resource .khb-resource-progress-track {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: rgba(245, 241, 232, 0.08);
          z-index: 60;
        }
        .khb-resource .khb-resource-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--brass), var(--teal));
          transition: width 0.1s linear;
          box-shadow: 0 0 12px rgba(95,227,214,0.5);
        }

        .khb-resource .khb-resource-main {
          position: relative;
          z-index: 1;
          max-width: 820px;
          margin: 0 auto;
          padding: 128px 24px 120px;
        }
        @media (min-width: 768px) { .khb-resource .khb-resource-main { padding: 140px 40px 140px; } }

        .khb-resource .khb-resource-crumbs {
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
        .khb-resource .khb-resource-crumbs a {
          color: var(--teal);
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color .2s ease;
        }
        .khb-resource .khb-resource-crumbs a:hover { border-color: currentColor; }

        .khb-resource .khb-resource-meta-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 18px;
        }

        .khb-resource .khb-resource-tag {
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

        .khb-resource .khb-resource-readtime {
          font-family: var(--khb-font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.08em;
          color: var(--muted-2);
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .khb-resource .khb-resource-readtime::before {
          content: '';
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--muted-2);
          display: inline-block;
        }

        .khb-resource .khb-resource-title {
          font-family: var(--khb-font-mono), monospace;
          font-weight: 700;
          letter-spacing: -0.01em;
          font-size: clamp(1.7rem, 4.2vw, 2.6rem);
          line-height: 1.25;
          margin: 0 0 28px;
        }

        /* terminal-style file header wrapping the resource body */
        .khb-resource .khb-resource-window {
          background: var(--panel);
          border: 1px solid rgba(245,241,232,0.1);
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 24px 60px -30px rgba(0,0,0,0.6);
        }
        .khb-resource .khb-resource-window-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 10px 16px;
          background: rgba(245,241,232,0.04);
          border-bottom: 1px solid rgba(245,241,232,0.08);
        }
        .khb-resource .khb-resource-window-bar-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .khb-resource .khb-resource-dots { display: flex; gap: 6px; }
        .khb-dot { width: 9px; height: 9px; border-radius: 50%; display: inline-block; }
        .khb-dot-teal { background: var(--teal); opacity: 0.7; }
        .khb-dot-brass { background: var(--brass); opacity: 0.7; }
        .khb-dot-muted { background: var(--muted-2); }
        .khb-resource .khb-resource-window-title {
          font-family: var(--khb-font-mono), monospace;
          font-size: 11px;
          color: var(--muted);
        }
        .khb-resource .khb-resource-window-status {
          font-family: var(--khb-font-mono), monospace;
          font-size: 10.5px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--muted-2);
          transition: color .3s ease;
        }
        .khb-resource .khb-resource-window-status.is-complete { color: var(--teal); }
        .khb-resource .khb-resource-cursor {
          width: 6px;
          height: 12px;
          background: var(--brass);
          display: inline-block;
          animation: khb-blink 1.1s steps(1) infinite;
        }
        .khb-resource .khb-resource-window-status.is-complete .khb-resource-cursor { display: none; }
        @keyframes khb-blink { 50% { opacity: 0; } }

        .khb-resource .khb-resource-body {
          padding: 40px 32px 48px;
        }
        @media (min-width: 768px) { .khb-resource .khb-resource-body { padding: 48px 56px 56px; } }

        /* ---- prose styling for the raw resource HTML ---- */
        .khb-resource .khb-resource-body h1,
        .khb-resource .khb-resource-body h2,
        .khb-resource .khb-resource-body h3,
        .khb-resource .khb-resource-body h4 {
          font-family: var(--khb-font-mono), monospace;
          font-weight: 700;
          color: var(--paper);
          letter-spacing: -0.005em;
          margin: 2em 0 0.7em;
        }
        .khb-resource .khb-resource-body h1:first-child,
        .khb-resource .khb-resource-body h2:first-child,
        .khb-resource .khb-resource-body h3:first-child { margin-top: 0; }

        .khb-resource .khb-resource-body h2 {
          font-size: 1.4rem;
          padding-bottom: 0.5em;
          border-bottom: 1px solid rgba(245,241,232,0.1);
        }
        .khb-resource .khb-resource-body h3 {
          font-size: 1.15rem;
          color: var(--teal);
        }
        .khb-resource .khb-resource-body h4 {
          font-size: 1rem;
          color: var(--brass);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .khb-resource .khb-resource-body p {
          font-family: var(--khb-font-serif), serif;
          font-size: 16.5px;
          line-height: 1.85;
          color: var(--muted);
          margin: 0 0 1.2em;
        }

        .khb-resource .khb-resource-body strong { color: var(--paper); font-weight: 700; }
        .khb-resource .khb-resource-body em { color: var(--teal); font-style: italic; }

        .khb-resource .khb-resource-body a {
          color: var(--teal);
          text-decoration: none;
          border-bottom: 1px solid rgba(95,227,214,0.4);
          transition: border-color .2s ease, color .2s ease;
        }
        .khb-resource .khb-resource-body a:hover { border-color: var(--teal); }

        .khb-resource .khb-resource-body ul,
        .khb-resource .khb-resource-body ol {
          font-family: var(--khb-font-serif), serif;
          font-size: 16.5px;
          line-height: 1.85;
          color: var(--muted);
          margin: 0 0 1.4em;
          padding-left: 1.4em;
        }
        .khb-resource .khb-resource-body li { margin-bottom: 0.55em; }
        .khb-resource .khb-resource-body li::marker { color: var(--brass); }
        .khb-resource .khb-resource-body ul { list-style: none; padding-left: 0; }
        .khb-resource .khb-resource-body ul li {
          position: relative;
          padding-left: 1.4em;
        }
        .khb-resource .khb-resource-body ul li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: var(--brass);
        }

        /* Key-term / definition callouts, if the source HTML marks them with <blockquote> */
        .khb-resource .khb-resource-body blockquote {
          margin: 1.8em 0;
          padding: 14px 20px;
          border-left: 3px solid var(--brass);
          background: rgba(217,169,78,0.06);
          border-radius: 0 6px 6px 0;
          font-family: var(--khb-font-serif), serif;
          font-style: italic;
          color: var(--muted);
        }

        .khb-resource .khb-resource-body code {
          font-family: var(--khb-font-mono), monospace;
          font-size: 0.88em;
          color: var(--teal);
          background: rgba(95,227,214,0.08);
          border: 1px solid rgba(95,227,214,0.18);
          border-radius: 3px;
          padding: 2px 6px;
        }

        .khb-resource .khb-resource-body pre {
          background: var(--ink);
          border: 1px solid rgba(245,241,232,0.1);
          border-radius: 6px;
          padding: 18px 20px;
          overflow-x: auto;
          margin: 0 0 1.6em;
        }
        .khb-resource .khb-resource-body pre code {
          background: transparent;
          border: none;
          padding: 0;
          color: var(--paper);
          font-size: 13.5px;
          line-height: 1.7;
        }

        .khb-resource .khb-resource-body img {
          max-width: 100%;
          height: auto;
          border-radius: 6px;
          border: 1px solid rgba(245,241,232,0.1);
          margin: 1.6em 0;
        }

        .khb-resource .khb-resource-body hr {
          border: none;
          height: 1px;
          background: linear-gradient(to right, rgba(217,169,78,0.4), transparent);
          margin: 2.4em 0;
        }

        .khb-resource .khb-resource-body table {
          width: 100%;
          border-collapse: collapse;
          font-family: var(--khb-font-mono), monospace;
          font-size: 13px;
          margin: 0 0 1.6em;
        }
        .khb-resource .khb-resource-body th,
        .khb-resource .khb-resource-body td {
          text-align: left;
          padding: 10px 12px;
          border: 1px solid rgba(245,241,232,0.1);
        }
        .khb-resource .khb-resource-body th {
          color: var(--brass);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-size: 11px;
          background: rgba(245,241,232,0.03);
        }
        .khb-resource .khb-resource-body td { color: var(--muted); }

        .khb-resource .khb-resource-footer {
          margin-top: 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .khb-resource .khb-resource-back {
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
        .khb-resource .khb-resource-back:hover {
          color: var(--paper);
          border-color: rgba(95,227,214,0.4);
          background: rgba(95,227,214,0.06);
        }
        .khb-resource .khb-resource-eof {
          font-family: var(--khb-font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--muted-2);
        }

        /* PDF attachment: collapsed by default, opens on click instead of always loading an iframe */
        .khb-resource-pdf-card {
          margin-top: 32px;
          border: 1px solid rgba(95,227,214,0.2);
          border-radius: 8px;
          overflow: hidden;
          background: var(--panel-raised);
        }
        .khb-resource-pdf-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 16px 20px;
        }
        .khb-resource-pdf-info {
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 0;
        }
        .khb-resource-pdf-icon {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          border-radius: 6px;
          background: rgba(95,227,214,0.1);
          border: 1px solid rgba(95,227,214,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--khb-font-mono), monospace;
          font-size: 10px;
          font-weight: 700;
          color: var(--teal);
        }
        .khb-resource-pdf-text { min-width: 0; }
        .khb-resource-pdf-label {
          font-family: var(--khb-font-mono), monospace;
          font-size: 13px;
          color: var(--paper);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .khb-resource-pdf-sub {
          font-family: var(--khb-font-mono), monospace;
          font-size: 10.5px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted-2);
          margin-top: 2px;
        }
        .khb-resource-pdf-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .khb-resource-pdf-btn {
          font-family: var(--khb-font-mono), monospace;
          font-size: 11.5px;
          letter-spacing: 0.05em;
          text-decoration: none;
          border-radius: 5px;
          padding: 9px 14px;
          cursor: pointer;
          border: 1px solid rgba(245,241,232,0.15);
          background: transparent;
          color: var(--muted);
          transition: border-color .2s ease, color .2s ease, background-color .2s ease;
        }
        .khb-resource-pdf-btn:hover {
          color: var(--paper);
          border-color: rgba(95,227,214,0.4);
          background: rgba(95,227,214,0.06);
        }
        .khb-resource-pdf-btn.is-primary {
          color: var(--ink);
          background: var(--teal);
          border-color: var(--teal);
        }
        .khb-resource-pdf-btn.is-primary:hover {
          background: #7cede1;
        }
        .khb-resource-pdf-frame-wrap {
          border-top: 1px solid rgba(245,241,232,0.08);
        }
        .khb-resource-pdf-frame {
          width: 100%;
          height: 640px;
          border: none;
          display: block;
        }

        /* PDF folder mode: searchable list, nothing opens until clicked */
        .khb-resource .khb-resource-pdflib {
          margin-top: 32px;
          background: var(--panel-raised);
          border: 1px solid rgba(95,227,214,0.2);
          border-radius: 10px;
          overflow: hidden;
        }
        .khb-resource .khb-resource-pdflib-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 10px 16px;
          background: rgba(245,241,232,0.04);
          border-bottom: 1px solid rgba(245,241,232,0.08);
        }
        .khb-resource .khb-resource-pdflib-bar-left { display: flex; align-items: center; gap: 10px; }
        .khb-resource .khb-resource-pdflib-count {
          font-family: var(--khb-font-mono), monospace;
          font-size: 10.5px;
          letter-spacing: 0.06em;
          color: var(--muted-2);
        }
        .khb-resource .khb-resource-pdflib-search {
          position: relative;
          padding: 14px 16px;
          border-bottom: 1px solid rgba(245,241,232,0.08);
        }
        .khb-resource .khb-resource-pdflib-search input {
          width: 100%;
          background: var(--ink);
          border: 1px solid rgba(245,241,232,0.12);
          border-radius: 6px;
          padding: 9px 12px 9px 30px;
          font-family: var(--khb-font-mono), monospace;
          font-size: 13px;
          color: var(--paper);
          outline: none;
          transition: border-color .2s ease;
        }
        .khb-resource .khb-resource-pdflib-search::before {
          content: '$';
          position: absolute;
          left: 26px;
          top: 50%;
          transform: translateY(-50%);
          font-family: var(--khb-font-mono), monospace;
          color: var(--brass);
          font-size: 13px;
          pointer-events: none;
        }
        .khb-resource .khb-resource-pdflib-search input:focus { border-color: rgba(95,227,214,0.5); }

        .khb-resource .khb-resource-pdflib-list {
          list-style: none;
          margin: 0;
          padding: 6px;
        }
        .khb-resource .khb-resource-pdflib-item {
          border-bottom: 1px solid rgba(245,241,232,0.06);
        }
        .khb-resource .khb-resource-pdflib-item:last-child { border-bottom: none; }
        .khb-resource .khb-resource-pdflib-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px;
          flex-wrap: wrap;
        }
        .khb-resource .khb-resource-pdflib-link {
          flex: 1;
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 9px 10px;
          text-decoration: none;
          color: inherit;
          border-radius: 6px;
          transition: background-color .15s ease;
        }
        .khb-resource .khb-resource-pdflib-link:hover { background: rgba(95,227,214,0.06); }
        .khb-resource .khb-resource-pdflib-link:hover .khb-resource-pdflib-name { color: var(--teal); }
        .khb-resource .khb-resource-pdflib-link:hover .khb-resource-pdflib-open {
          opacity: 1;
          transform: translateX(0);
        }
        .khb-resource .khb-resource-pdflib-text { min-width: 0; flex: 1; }
        .khb-resource .khb-resource-pdflib-name {
          font-family: var(--khb-font-sans), sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: var(--paper);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color .15s ease;
        }
        .khb-resource .khb-resource-pdflib-meta {
          font-family: var(--khb-font-mono), monospace;
          font-size: 10.5px;
          letter-spacing: 0.03em;
          color: var(--muted-2);
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .khb-resource .khb-resource-pdflib-open {
          flex-shrink: 0;
          font-family: var(--khb-font-mono), monospace;
          font-size: 11px;
          color: var(--teal);
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity .15s ease, transform .15s ease;
        }
        .khb-resource .khb-resource-pdflib-video-group {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          flex-shrink: 0;
          max-width: 100%;
        }
        .khb-resource .khb-resource-pdflib-video {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--khb-font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.03em;
          text-decoration: none;
          color: var(--muted);
          border: 1px solid rgba(245,241,232,0.15);
          border-radius: 5px;
          padding: 8px 12px;
          max-width: 220px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: border-color .2s ease, color .2s ease, background-color .2s ease;
        }
        .khb-resource .khb-resource-pdflib-video:hover {
          color: #ff6d6d;
          border-color: rgba(255,109,109,0.4);
          background: rgba(255,109,109,0.06);
        }
        .khb-resource .khb-resource-pdflib-video-icon {
          font-size: 9px;
          color: #ff6d6d;
          flex-shrink: 0;
        }
        .khb-resource .khb-resource-pdflib-empty {
          padding: 36px 20px;
          text-align: center;
          font-family: var(--khb-font-serif), serif;
          font-size: 13.5px;
          color: var(--muted);
        }
      `}</style>

      <div className="khb-resource-grid" aria-hidden="true" />

      <div className="khb-resource-progress-track" aria-hidden="true" style={{ display: pdfFiles ? 'none' : 'block' }}>
        <div className="khb-resource-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <Navigation contentVisible={true} />

      <main className="khb-resource-main">
        <div className="khb-resource-crumbs">
          <Link href="/resources">O Level CS</Link>
          <span>/</span>
          <span>Resource</span>
        </div>

        <div className="khb-resource-meta-row">
          <span className="khb-resource-tag">O LEVEL · COMPUTER SCIENCE</span>
          {readMinutes && !pdfFiles && (
            <span className="khb-resource-readtime">{readMinutes} min read</span>
          )}
        </div>

        <h1 className="khb-resource-title">{title}</h1>

        {!pdfFiles && (
          <div className="khb-resource-window" ref={articleRef}>
            <div className="khb-resource-window-bar">
              <div className="khb-resource-window-bar-left">
                <div className="khb-resource-dots">
                  <span className="khb-dot khb-dot-teal" />
                  <span className="khb-dot khb-dot-brass" />
                  <span className="khb-dot khb-dot-muted" />
                </div>
                <span className="khb-resource-window-title">resource.md</span>
              </div>
              <span className={`khb-resource-window-status ${isComplete ? 'is-complete' : ''}`}>
                {isComplete ? '✓ complete' : <>reading<span className="khb-resource-cursor" /></>}
              </span>
            </div>

            <article
              className="khb-resource-body"
              ref={bodyRef}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        )}

   {pdfFiles ? (
  <div className="khb-resource-pdflib">
    <div className="khb-resource-pdflib-bar">
      <div className="khb-resource-pdflib-bar-left">
        <div className="khb-resource-dots">
          <span className="khb-dot khb-dot-teal" />
          <span className="khb-dot khb-dot-brass" />
          <span className="khb-dot khb-dot-muted" />
        </div>
        <span className="khb-resource-window-title">files/</span>
      </div>
      <span className="khb-resource-pdflib-count">
        {pdfFiles.length} file{pdfFiles.length === 1 ? "" : "s"}
      </span>
    </div>

    {pdfFiles.length > 0 && (
      <div className="khb-resource-pdflib-search">
        <input
          type="text"
          value={pdfQuery}
          onChange={(e) => setPdfQuery(e.target.value)}
          placeholder="Search files…"
          aria-label="Search PDF files"
        />
      </div>
    )}

    {pdfFiles.length === 0 ? (
      <div className="khb-resource-pdflib-empty">
        No files here yet — check back soon.
      </div>
    ) : filteredPdfFiles.length === 0 ? (
      <div className="khb-resource-pdflib-empty">
        No matches for &ldquo;{pdfQuery}&rdquo;.
      </div>
    ) : (
      <ul className="khb-resource-pdflib-list">
        {filteredPdfFiles.map((file) => (
          <li key={file.href} className="khb-resource-pdflib-item">
            <div className="khb-resource-pdflib-row">
              <a
                href={file.href}
                className="khb-resource-pdflib-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="khb-resource-pdf-icon">PDF</span>

                <span className="khb-resource-pdflib-text">
                  <span className="khb-resource-pdflib-name">
                    {prettifyPdfName(file.name)}
                  </span>
                </span>

                <span className="khb-resource-pdflib-open">
                  open ↗
                </span>
              </a>

              {file.videos && file.videos.length > 0 && (
                <div className="khb-resource-pdflib-video-group">
                  {file.videos.map((v, i) => (
                    <a
                      key={i}
                      href={v.url}
                      className="khb-resource-pdflib-video"
                      target="_blank"
                      rel="noopener noreferrer"
                      title={v.title}
                    >
                      <span className="khb-resource-pdflib-video-icon">
                        ▶
                      </span>
                      {v.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
) : (
  pdfUrl && (
    <div className="khb-resource-pdf-card">
      <div className="khb-resource-pdf-row">
        <div className="khb-resource-pdf-info">
          <span className="khb-resource-pdf-icon">PDF</span>

          <div className="khb-resource-pdf-text">
            <div className="khb-resource-pdf-label">
              Printable version available
            </div>
            <div className="khb-resource-pdf-sub">
              Opens on click
            </div>
          </div>
        </div>

        <div className="khb-resource-pdf-actions">
          <button
            type="button"
            className="khb-resource-pdf-btn"
            onClick={() => setShowPdf((v) => !v)}
          >
            {showPdf ? "Hide preview" : "Preview"}
          </button>

          <a
            href={pdfUrl}
            className="khb-resource-pdf-btn is-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open ↗
          </a>
        </div>
      </div>

      {showPdf && (
        <div className="khb-resource-pdf-frame-wrap">
          <iframe
            src={pdfUrl}
            className="khb-resource-pdf-frame"
            title="PDF Preview"
          />
        </div>
      )}
    </div>
  )
)}

        <div className="khb-resource-footer">
          <Link href="/resources" className="khb-resource-back">
            ← Back to Resources
          </Link>
          <span className="khb-resource-eof">$ end of resource</span>
        </div>
      </main>
          <Footer />  
    </div>


  );
}