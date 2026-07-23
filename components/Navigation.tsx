'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import RetroSoundToggle from './RetroSoundToggle';

const NAV_AMBER = '#f59e0b';
const NAV_TEAL = '#00e5ff';

const navLinks = [
  { name: 'About', href: '#about', channel: '01' },
  { name: 'Skills', href: '#skills', channel: '02' },
  { name: 'Projects', href: '#projects', channel: '03' },
  { name: 'Contact', href: '#contact', channel: '04' },
];

type NavigationProps = { contentVisible?: boolean };

export default function Navigation({ contentVisible = true }: NavigationProps) {
  const [activeSection, setActiveSection] = useState('');
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [booted, setBooted] = useState(false);

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
        const sections = navLinks.map(link => link.href.substring(1));
        const currentSection = sections.find(section => {
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
    <motion.nav
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: booted ? 0 : 30, opacity: booted ? 1 : 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-5 font-mono select-none"
    >
      {navLinks.map((link) => {
        const isActive = activeSection === link.href.substring(1);
        const isHovered = hoveredLink === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-center gap-2"
            onMouseEnter={() => setHoveredLink(link.href)}
            onMouseLeave={() => setHoveredLink(null)}
            aria-label={link.name}
          >
            {/* label — only shown on hover/active */}
            <AnimatePresence>
              {(isHovered || isActive) && (
                <motion.span
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  transition={{ duration: 0.15 }}
                  className="text-[11px] tracking-widest whitespace-nowrap"
                  style={{
                    color: isActive ? NAV_AMBER : NAV_TEAL,
                    textShadow: isActive
                      ? `0 0 8px ${NAV_AMBER}80`
                      : `0 0 6px ${NAV_TEAL}60`,
                  }}
                >
                  {link.name.toUpperCase()}
                </motion.span>
              )}
            </AnimatePresence>

            {/* channel number */}
            <span
              className="text-[10px] tabular-nums transition-all duration-200"
              style={{
                color: isActive ? NAV_AMBER : 'rgba(0,229,255,0.45)',
                opacity: isActive ? 1 : isHovered ? 0.9 : 0.55,
              }}
            >
              {link.channel}
            </span>

            {/* tick mark — grows and glows when active */}
            <motion.span
              className="block h-[2px]"
              animate={{
                width: isActive ? 20 : 10,
                backgroundColor: isActive ? NAV_AMBER : NAV_TEAL,
                opacity: isActive ? 1 : isHovered ? 0.8 : 0.4,
              }}
              transition={{ duration: 0.2 }}
              style={{
                boxShadow: isActive ? `0 0 6px ${NAV_AMBER}` : 'none',
              }}
            />
          </Link>
        );
      })}

      {/* sound toggle, quietly tucked below */}
      <div className="mt-1 opacity-80">
        <RetroSoundToggle />
      </div>
    </motion.nav>
  );
}