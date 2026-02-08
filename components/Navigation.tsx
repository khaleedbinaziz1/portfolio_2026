'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiUser, FiFolder, FiCode, FiMail, FiMenu, FiX } from 'react-icons/fi';
import RetroSoundToggle from './RetroSoundToggle';

const NAV_AMBER = '#e040fb';
const NAV_ACCENT = '#00ffcc';
const NAV_DARK = '#160c0a';
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
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        ctx.fillStyle = `rgba(0, 255, 204, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        star.y -= star.speed;
        star.opacity = 0.2 + Math.sin(Date.now() * 0.001 + star.x) * 0.2;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('resize', resizeCanvas);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [contentVisible]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = navLinks.map(link => link.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      setActiveSection(currentSection || '');
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 font-mono"
      style={{
        backgroundColor: NAV_BG,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: 'none',
        boxShadow: scrolled 
          ? '0 4px 30px rgba(0, 0, 0, 0.3), 0 0 40px rgba(224, 64, 251, 0.06)'
          : '0 2px 20px rgba(0, 0, 0, 0.2), 0 0 30px rgba(224, 64, 251, 0.04)',
      }}
    >
      {/* Starfield canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* CRT scan line effect */}
      <div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(224, 64, 251, 0.03) 2px, rgba(224, 64, 251, 0.03) 4px)',
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
                  style={{ color: NAV_ACCENT }}
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
                    className="group relative font-mono text-sm font-medium transition-all duration-300 flex items-center gap-2 px-4 py-2.5 rounded"
                    style={{
                      color: isActive ? NAV_AMBER : 'rgba(0, 255, 204, 0.6)',
                      backgroundColor: isActive ? 'rgba(224, 64, 251, 0.08)' : 'transparent',
                      border: `1px solid ${isActive ? 'rgba(224, 64, 251, 0.3)' : 'transparent'}`,
                      textShadow: isActive ? `0 0 10px ${NAV_AMBER}60` : 'none',
                      boxShadow: isActive ? `0 0 20px rgba(224, 64, 251, 0.15)` : 'none',
                    }}
                    onMouseEnter={() => setHoveredLink(link.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {/* Icon */}
                    <Icon 
                      className="transition-all duration-300"
                      style={{
                        color: isActive ? NAV_AMBER : NAV_ACCENT,
                        filter: isActive ? `drop-shadow(0 0 6px ${NAV_AMBER})` : 'none',
                      }}
                      size={16}
                    />
                    
                    {/* Number */}
                    <span 
                      className="text-xs font-mono"
                      style={{ 
                        color: 'rgba(224, 64, 251, 0.5)',
                      }}
                    >
                      {link.number}
                    </span>
                    
                    {/* Name */}
                    <span>{link.name}</span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded pointer-events-none"
                        style={{
                          border: `1px solid rgba(224, 64, 251, 0.3)`,
                        }}
                        animate={{
                          boxShadow: [
                            '0 0 10px rgba(224, 64, 251, 0.2)',
                            '0 0 20px rgba(224, 64, 251, 0.4)',
                            '0 0 10px rgba(224, 64, 251, 0.2)',
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    )}

                    {/* Hover glow */}
                    {isHovered && (
                      <motion.div
                        layoutId="navHover"
                        className="absolute inset-0 rounded pointer-events-none"
                        style={{
                          backgroundColor: 'rgba(224, 64, 251, 0.05)',
                          boxShadow: '0 0 15px rgba(224, 64, 251, 0.2)',
                        }}
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
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
              className="md:hidden focus:outline-none transition-all duration-300 flex items-center justify-center min-w-[44px] min-h-[44px] rounded"
              style={{ 
                color: NAV_AMBER,
                backgroundColor: isMobileMenuOpen ? 'rgba(224, 64, 251, 0.1)' : 'transparent',
                border: `1px solid ${isMobileMenuOpen ? 'rgba(224, 64, 251, 0.3)' : 'transparent'}`,
              }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <FiX 
                    size={24} 
                    style={{ 
                      filter: `drop-shadow(0 0 8px ${NAV_AMBER})`,
                    }} 
                  />
                ) : (
                  <FiMenu 
                    size={24} 
                    style={{ 
                      filter: `drop-shadow(0 0 8px ${NAV_AMBER})`,
                    }} 
                  />
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
              backgroundColor: 'transparent',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {/* Mobile starfield effect */}
            <div 
              className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(224, 64, 251, 0.03) 2px, rgba(224, 64, 251, 0.03) 4px)',
              }}
            />
            
            <div className="relative py-4 px-4">
              <ul className="flex flex-col space-y-2">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.href.substring(1);
                  const Icon = link.icon;
                  
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-5 py-4 font-mono text-base transition-all duration-300 rounded"
                        style={{
                          color: isActive ? NAV_AMBER : 'rgba(0, 255, 204, 0.7)',
                          backgroundColor: isActive ? 'rgba(224, 64, 251, 0.1)' : 'transparent',
                          border: `1px solid ${isActive ? 'rgba(224, 64, 251, 0.3)' : 'transparent'}`,
                          textShadow: isActive ? `0 0 10px ${NAV_AMBER}60` : 'none',
                          boxShadow: isActive ? `0 0 20px rgba(224, 64, 251, 0.15)` : 'none',
                        }}
                      >
                        <Icon 
                          size={20}
                          style={{
                            color: isActive ? NAV_AMBER : NAV_ACCENT,
                            filter: isActive ? `drop-shadow(0 0 6px ${NAV_AMBER})` : 'none',
                          }}
                        />
                        <span 
                          className="text-xs font-mono"
                          style={{ color: 'rgba(224, 64, 251, 0.5)' }}
                        >
                          {link.number}
                        </span>
                        <span className="flex-1">{link.name}</span>
                        {isActive && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            style={{ color: NAV_AMBER }}
                          >
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