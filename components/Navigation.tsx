'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiMenu, FiX, FiArrowUpRight, FiSearch } from 'react-icons/fi';
import { sound } from '@/lib/sound';

const NAV_LINKS = [
  { num: '01', name: 'About', href: '#about' },
  { num: '02', name: 'Skills', href: '#skills' },
  { num: '03', name: 'Experience', href: '#experience' },
  { num: '04', name: 'Works', href: '#projects' },
  { num: '05', name: 'Contact', href: '#contact' },
  { num: 'SYS', name: 'Resources', href: '/resources' },
];

type NavigationProps = {
  contentVisible?: boolean;
};

export default function Navigation({ contentVisible = true }: NavigationProps) {
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/audio.mp3');
    audio.loop = true;
    audio.volume = 0.22;
    setAudioEl(audio);

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggleAudio = () => {
    sound.tick(1200, 0.03);
    if (!audioEl) return;
    if (isPlayingAudio) {
      audioEl.pause();
      setIsPlayingAudio(false);
    } else {
      audioEl
        .play()
        .then(() => setIsPlayingAudio(true))
        .catch(() => {});
    }
  };

  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        setScrolled(window.scrollY > 20);

        const sections = NAV_LINKS.filter((l) => l.href.startsWith('#')).map((l) =>
          l.href.substring(1)
        );

        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 180 && rect.bottom >= 140) {
              setActiveSection(section);
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
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <header className={`ln-nav-wrap ${scrolled ? 'scrolled' : ''}`}>
      <style>{`
        .ln-nav-wrap {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 16px 20px;
          transition: all 0.35s var(--ease-out-expo);
          pointer-events: none;
        }

        @media (min-width: 960px) {
          .ln-nav-wrap {
            padding: 20px 32px;
          }
          .ln-nav-wrap.scrolled {
            padding: 12px 32px;
          }
        }

        .ln-nav-bar {
          max-width: var(--max-w);
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 16px;
          border-radius: 100px;
          background: rgba(13, 15, 21, 0.7);
          backdrop-filter: blur(20px) saturate(1.5);
          -webkit-backdrop-filter: blur(20px) saturate(1.5);
          border: 1px solid var(--border-subtle);
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
          pointer-events: auto;
          transition: all 0.3s ease;
        }

        .ln-nav-wrap.scrolled .ln-nav-bar {
          background: rgba(13, 15, 21, 0.88);
          border-color: var(--border-hover);
          box-shadow: 0 16px 36px -12px rgba(0, 0, 0, 0.8);
        }

        /* Brand Left */
        .ln-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: var(--ivory);
        }

        .ln-brand-mark {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 12px;
          color: var(--ivory);
        }

        .ln-brand-text {
          display: flex;
          flex-direction: column;
        }

        .ln-brand-name {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 13px;
          letter-spacing: -0.01em;
          color: var(--ivory);
        }

        .ln-brand-status {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.12em;
          color: var(--opal-teal);
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .ln-brand-blip {
          width: 4.5px;
          height: 4.5px;
          border-radius: 50%;
          background: var(--opal-teal);
          box-shadow: 0 0 6px var(--opal-teal);
          animation: ln-nav-blip 2s infinite ease-in-out;
        }

        @keyframes ln-nav-blip {
          0%, 100% { opacity: 0.35; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.25); }
        }

        /* Desktop Nav Links */
        .ln-links-wrap {
          display: none;
          align-items: center;
          gap: 4px;
        }

        @media (min-width: 860px) {
          .ln-links-wrap {
            display: flex;
          }
        }

        .ln-link-item {
          position: relative;
          padding: 6px 14px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ivory-muted);
          text-decoration: none;
          border-radius: 100px;
          transition: color 0.2s ease;
          display: inline-flex;
          align-items: center;
        }

        .ln-link-item:hover {
          color: var(--ivory);
        }

        .ln-link-item.active {
          color: #ffffff;
        }

        .ln-active-pill {
          position: absolute;
          inset: 0;
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.14);
          z-index: -1;
        }

        /* Nav Actions Right */
        .ln-nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ln-cmd-trigger {
          display: none;
          align-items: center;
          gap: 6px;
          padding: 5px 11px;
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          color: var(--ivory-muted);
          cursor: pointer;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.04em;
          transition: all 0.2s ease;
        }

        @media (min-width: 680px) {
          .ln-cmd-trigger {
            display: inline-flex;
          }
        }

        .ln-cmd-trigger:hover {
          border-color: var(--border-hover);
          color: var(--ivory);
          background: rgba(255, 255, 255, 0.06);
        }

        .ln-cmd-kbd {
          padding: 1px 5px;
          border-radius: 3px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--border-subtle);
          font-size: 9px;
          color: var(--opal-cyan);
        }

        /* Audio Equalizer Button */
        .ln-audio-toggle {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 5px 12px;
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          color: var(--ivory-muted);
          cursor: pointer;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: all 0.2s ease;
        }

        .ln-audio-toggle:hover {
          border-color: var(--border-hover);
          color: var(--ivory);
        }

        .ln-soundwave {
          display: flex;
          align-items: flex-end;
          gap: 2px;
          height: 10px;
        }

        .ln-wave-bar {
          width: 1.5px;
          background: var(--opal-cyan);
          border-radius: 2px;
          height: 3px;
          transition: height 0.2s ease;
        }

        .ln-soundwave.playing .ln-wave-bar:nth-child(1) {
          animation: wave-bounce 1s ease-in-out infinite alternate;
        }
        .ln-soundwave.playing .ln-wave-bar:nth-child(2) {
          animation: wave-bounce 0.8s ease-in-out 0.2s infinite alternate;
        }
        .ln-soundwave.playing .ln-wave-bar:nth-child(3) {
          animation: wave-bounce 1.1s ease-in-out 0.4s infinite alternate;
        }
        .ln-soundwave.playing .ln-wave-bar:nth-child(4) {
          animation: wave-bounce 0.9s ease-in-out 0.1s infinite alternate;
        }

        @keyframes wave-bounce {
          0% { height: 2px; }
          100% { height: 10px; }
        }

        /* Mobile Hamburger */
        .ln-mobile-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          color: var(--ivory);
          cursor: pointer;
        }

        @media (min-width: 860px) {
          .ln-mobile-btn {
            display: none;
          }
        }

        /* Fullscreen Mobile Drawer */
        .ln-mobile-drawer {
          position: fixed;
          inset: 0;
          background: rgba(8, 9, 13, 0.96);
          backdrop-filter: blur(24px);
          z-index: 99;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 32px;
          pointer-events: auto;
        }

        .ln-mobile-links {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .ln-mobile-link {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: var(--ivory);
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 12px;
        }

        .ln-mobile-link span.num {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--opal-cyan);
        }
      `}</style>

      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="ln-nav-bar"
      >
        <Link href="/" className="ln-brand">
          <div className="ln-brand-mark">K</div>
          <div className="ln-brand-text">
            <span className="ln-brand-name">Khaled Bin Aziz</span>
            <div className="ln-brand-status">
              <span className="ln-brand-blip" />
              <span>ONLINE // BD</span>
            </div>
          </div>
        </Link>

        <div className="ln-links-wrap">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href.startsWith('#') &&
              activeSection === link.href.substring(1);

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => sound.tick(1100, 0.02)}
                className={`ln-link-item ${isActive ? 'active' : ''}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="ln-active-pill"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="ln-nav-actions">
          <button
            type="button"
            onClick={() => {
              sound.tick(1200, 0.02);
              window.dispatchEvent(new CustomEvent('open-command-palette'));
            }}
            className="ln-cmd-trigger"
            aria-label="Open Command Palette (Cmd+K)"
          >
            <FiSearch size={11} />
            <span className="ln-cmd-kbd">⌘K</span>
          </button>

          <button
            type="button"
            onClick={toggleAudio}
            className="ln-audio-toggle"
            aria-label={isPlayingAudio ? 'Mute ambient sound' : 'Play ambient sound'}
          >
            <div className={`ln-soundwave ${isPlayingAudio ? 'playing' : ''}`}>
              <span className="ln-wave-bar" />
              <span className="ln-wave-bar" />
              <span className="ln-wave-bar" />
              <span className="ln-wave-bar" />
            </div>
            <span>{isPlayingAudio ? 'On' : 'Sound'}</span>
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="ln-mobile-btn"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <FiX size={16} /> : <FiMenu size={16} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="ln-mobile-drawer"
          >
            <div className="ln-mobile-links">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="ln-mobile-link"
                >
                  <span>{link.name}</span>
                  <span className="num">{link.num}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}