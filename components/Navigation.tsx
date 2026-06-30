'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiUser, FiFolder, FiCode, FiMail, FiMenu, FiX } from 'react-icons/fi';
import RetroSoundToggle from './RetroSoundToggle';

const NAV_AMBER = '#f59e0b';
const NAV_RED = '#e6392e';
const NAV_MAGENTA = '#c084fc';
const NAV_TEAL = '#00e5ff';
const NAV_DARK = 'rgba(26, 20, 38, 0.88)';
const NAV_BG = 'transparent';

const navLinks = [
  { name: 'About', href: '#about', number: '01', icon: FiUser },
  { name: 'Skills', href: '#skills', number: '02', icon: FiCode },
  { name: 'Projects', href: '#projects', number: '03', icon: FiFolder },
  { name: 'Contact', href: '#contact', number: '04', icon: FiMail },
];

type NavigationProps = { contentVisible?: boolean };

export default function Navigation({ contentVisible = true }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrolled, setScrolled] = useState(false);

  // Starfield background effect — only run when main content is visible
  useEffect(() => {
    if (!contentVisible) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmallScreen = window.innerWidth <= 768;
    if (reducedMotion || isSmallScreen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = 80;
    };
    resizeCanvas();

    const stars: { x: number; y: number; size: number; opacity: number; speed: number }[] = [];
    for (let i = 0; i < 30; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.2,
        speed: Math.random() * 0.02 + 0.01,
      });
    }

    let animationId: number;
    let lastFrameTime = 0;
    let time = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (document.hidden) return;
      const now = performance.now();
      if (now - lastFrameTime < 33) return;
      lastFrameTime = now;
      time += 0.033;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach((star) => {
        ctx.fillStyle = `rgba(45, 212, 191, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        star.y -= star.speed;
        star.opacity = 0.2 + Math.sin(time + star.x) * 0.2;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }
      });
    };
    animate();

    window.addEventListener('resize', resizeCanvas);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [contentVisible]);

  useEffect(() => {
    let rafId = 0;
    let lastScrolled = scrolled;
    let lastActive = activeSection;

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const nextScrolled = window.scrollY > 50;
        if (nextScrolled !== lastScrolled) {
          lastScrolled = nextScrolled;
          setScrolled(nextScrolled);
        }

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
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 font-mono nav-retro"
      style={{
        backgroundColor: scrolled ? NAV_DARK : NAV_BG,
        backdropFilter: scrolled ? 'blur(6px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(6px)' : 'none',
        borderBottom: scrolled ? '2px solid rgba(230, 57, 46, 0.4)' : 'none',
        boxShadow: scrolled
          ? 'inset 3px 0 0 rgba(0, 229, 255, 0.12), 0 2px 14px rgba(0, 0, 0, 0.28)'
          : 'none',
      }}
    >
      {/* Starfield canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Scan line effect */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-15"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(245, 158, 11, 0.04) 2px, rgba(245, 158, 11, 0.04) 4px)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="flex justify-between items-center h-20 min-h-[80px]">
          {/* Logo with CRT glow */}
          <Link
            href="/"
            className="group relative text-base md:text-lg font-bold transition-all duration-300 flex items-center"
            onMouseEnter={() => setHoveredLink('logo')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <div className="flex items-center gap-2">
              <motion.span
                className="relative"
                style={{
                  color: NAV_AMBER,
                  textShadow: `0 0 10px ${NAV_AMBER}80, 0 0 20px ${NAV_AMBER}40, 0 0 30px ${NAV_AMBER}20`,
                }}
                animate={{
                  textShadow: [
                    `0 0 10px ${NAV_AMBER}80, 0 0 20px ${NAV_AMBER}40`,
                    `0 0 15px ${NAV_AMBER}90, 0 0 30px ${NAV_AMBER}50`,
                    `0 0 10px ${NAV_AMBER}80, 0 0 20px ${NAV_AMBER}40`,
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                Khaled Bin Aziz
              </motion.span>
              
              {/* Blinking cursor */}
              <motion.span
                className="inline-block w-2 h-5 ml-1"
                style={{
                  backgroundColor: NAV_AMBER,
                  boxShadow: `0 0 8px ${NAV_AMBER}`,
                }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            </div>

            {/* Hover effect */}
            <AnimatePresence>
              {hoveredLink === 'logo' && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden ml-3 text-xs"
                  style={{ color: NAV_TEAL }}
                >
                  ~/portfolio
                </motion.div>
              )}
            </AnimatePresence>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-1 lg:gap-2 list-none items-center">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.substring(1);
              const isHovered = hoveredLink === link.href;
              const Icon = link.icon;
              
              return (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Link
                    href={link.href}
                    className="nav-link group relative font-mono text-sm font-medium transition-all duration-200 flex items-center gap-2 px-3 py-2"
                    style={{
                      color: isActive ? '#fff' : NAV_TEAL,
                      backgroundColor: isActive ? NAV_RED : 'transparent',
                      border: `2px solid ${isActive ? NAV_RED : 'transparent'}`,
                      borderRadius: 0,
                      textShadow: isActive ? '0 1px 0 rgba(0,0,0,0.3)' : 'none',
                      boxShadow: isActive ? 'inset 2px 2px 0 rgba(255,255,255,0.15), 2px 2px 0 rgba(0,0,0,0.2)' : 'none',
                    }}
                    onMouseEnter={() => setHoveredLink(link.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <Icon
                      className="transition-all duration-200"
                      style={{
                        color: isActive ? NAV_AMBER : NAV_TEAL,
                        filter: isActive ? `drop-shadow(0 0 6px ${NAV_AMBER})` : 'none',
                      }}
                      size={16}
                    />
                    <span className="text-xs font-mono opacity-80" style={{ color: NAV_MAGENTA }}>
                      {link.number}
                    </span>
                    <span>{link.name}</span>
                    {isHovered && !isActive && (
                      <motion.div
                        layoutId="navHover"
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundColor: 'rgba(230, 57, 46, 0.12)',
                          border: '2px solid rgba(230, 57, 46, 0.5)',
                          borderRadius: 0,
                        }}
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                  </Link>
                </motion.li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <RetroSoundToggle />
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden focus:outline-none transition-all duration-200 flex items-center justify-center min-w-[44px] min-h-[44px]"
              style={{
                color: NAV_AMBER,
                backgroundColor: isMobileMenuOpen ? 'rgba(22, 18, 28, 0.95)' : 'transparent',
                border: `2px solid ${isMobileMenuOpen ? 'rgba(245, 158, 11, 0.5)' : 'transparent'}`,
                borderRadius: 0,
              }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <FiX size={24} style={{ filter: `drop-shadow(0 0 8px ${NAV_AMBER})` }} />
                ) : (
                  <FiMenu size={24} style={{ filter: `drop-shadow(0 0 8px ${NAV_AMBER})` }} />
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden relative"
            style={{
              backgroundColor: 'rgba(22, 18, 28, 0.98)',
              borderTop: '2px solid rgba(245, 158, 11, 0.3)',
              boxShadow: 'inset 0 4px 0 0 rgba(192, 132, 252, 0.1)',
            }}
          >
            <div className="relative py-3 px-4">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.href.substring(1);
                  const Icon = link.icon;
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.06 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="nav-link flex items-center gap-3 px-4 py-3 font-mono text-base transition-all duration-200"
                        style={{
                          color: isActive ? '#fff' : NAV_TEAL,
                          backgroundColor: isActive ? NAV_RED : 'transparent',
                          border: `2px solid ${isActive ? NAV_RED : 'transparent'}`,
                          borderRadius: 0,
                          textShadow: isActive ? '0 1px 0 rgba(0,0,0,0.3)' : 'none',
                          boxShadow: isActive ? 'inset 2px 2px 0 rgba(255,255,255,0.15)' : 'none',
                        }}
                      >
                        <Icon
                          size={20}
                          style={{
                            color: isActive ? NAV_AMBER : NAV_TEAL,
                            filter: isActive ? `drop-shadow(0 0 6px ${NAV_AMBER})` : 'none',
                          }}
                        />
                        <span className="text-xs font-mono" style={{ color: NAV_MAGENTA }}>
                          {link.number}
                        </span>
                        <span className="flex-1">{link.name}</span>
                        {isActive && (
                          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ color: NAV_AMBER }}>
                            ▹
                          </motion.span>
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}