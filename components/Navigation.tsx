'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import { plexMono } from '@/public/fonts';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
  { name: 'Lessons', href: '/lessons' },
];

type NavigationProps = { contentVisible?: boolean };

export default function Navigation({ contentVisible = true }: NavigationProps) {
  const [activeSection, setActiveSection] = useState('');
  const [booted, setBooted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!contentVisible) return;
    const t = setTimeout(() => setBooted(true), 150);
    return () => clearTimeout(t);
  }, [contentVisible]);

  useEffect(() => {
    let rafId = 0;
    let lastActive = activeSection;

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        setScrolled(window.scrollY > 12);

        const sections = navLinks
          .filter((link) => link.href.startsWith('#'))
          .map((link) => link.href.substring(1));
        const currentSection =
          sections.find((section) => {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              return rect.top <= 150 && rect.bottom >= 150;
            }
            return false;
          }) || '';

        if (currentSection !== lastActive) {
          lastActive = currentSection;
          setActiveSection(currentSection);
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
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: booted ? 0 : -20, opacity: booted ? 1 : 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`khb-nav ${plexMono.variable} ${scrolled ? 'khb-nav-scrolled' : ''}`}
    >
      <style>{`
        .khb-nav {
          --brass: #d9a94e;
          --teal: #5fe3d6;
          --ink: #0b0d12;
          --paper: #f5f1e8;
          --muted: rgba(245, 241, 232, 0.62);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          font-family: var(--khb-font-mono), monospace;
          background: rgba(11, 13, 18, 0.4);
          border-bottom: 1px solid transparent;
          transition: background-color .3s ease, border-color .3s ease, backdrop-filter .3s ease;
        }
        .khb-nav-scrolled {
          background: rgba(11, 13, 18, 0.82);
          backdrop-filter: blur(10px);
          border-bottom-color: rgba(245, 241, 232, 0.1);
        }
        .khb-nav *, .khb-nav *::before, .khb-nav *::after { box-sizing: border-box; }

        .khb-nav-inner {
          max-width: 1180px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        @media (min-width: 960px) { .khb-nav-inner { padding: 16px 40px; } }

        .khb-nav-brand {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--paper);
          text-decoration: none;
        }
        .khb-nav-brand span { color: var(--brass); }

        .khb-nav-links {
          display: none;
          align-items: center;
          gap: 28px;
        }
        @media (min-width: 768px) { .khb-nav-links { display: flex; } }

        .khb-nav-link {
          position: relative;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--muted);
          padding: 4px 0;
          transition: color .2s ease;
        }
        .khb-nav-link:hover { color: var(--paper); }
        .khb-nav-link-active { color: var(--brass); }

        .khb-nav-underline {
          position: absolute;
          left: 0;
          bottom: -3px;
          height: 1.5px;
          background: var(--brass);
          border-radius: 1px;
        }

        .khb-nav-toggle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 4px;
          border: 1px solid rgba(245, 241, 232, 0.15);
          color: var(--paper);
          background: transparent;
        }
        @media (min-width: 768px) { .khb-nav-toggle { display: none; } }
        .khb-nav-toggle:focus-visible { outline: 2px solid var(--brass); outline-offset: 2px; }

        .khb-nav-mobile {
          overflow: hidden;
          border-top: 1px solid rgba(245, 241, 232, 0.1);
          background: rgba(11, 13, 18, 0.96);
          backdrop-filter: blur(10px);
        }
        @media (min-width: 768px) { .khb-nav-mobile { display: none; } }

        .khb-nav-mobile-inner {
          padding: 10px 24px 18px;
          display: flex;
          flex-direction: column;
        }

        .khb-nav-mobile-link {
          padding: 13px 0;
          border-bottom: 1px dashed rgba(245, 241, 232, 0.1);
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--muted);
        }
        .khb-nav-mobile-link:last-child { border-bottom: none; }
        .khb-nav-mobile-link-active { color: var(--brass); }
      `}</style>

      <div className="khb-nav-inner">
        <Link href="/" className="khb-nav-brand">
          KHB<span>.</span>SYS
        </Link>

        <nav className="khb-nav-links" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = link.href.startsWith('#') && activeSection === link.href.substring(1);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`khb-nav-link ${isActive ? 'khb-nav-link-active' : ''}`}
                aria-current={isActive ? 'true' : undefined}
              >
                {link.name}
                {isActive && (
                  <motion.span layoutId="khb-nav-underline" className="khb-nav-underline" style={{ width: '100%' }} />
                )}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="khb-nav-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <FiX size={17} /> : <FiMenu size={17} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="khb-nav-mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="khb-nav-mobile-inner">
              {navLinks.map((link) => {
                const isActive = link.href.startsWith('#') && activeSection === link.href.substring(1);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`khb-nav-mobile-link ${isActive ? 'khb-nav-mobile-link-active' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}