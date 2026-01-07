'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiUser, FiFolder, FiCode, FiBriefcase, FiMail, FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { name: 'About', href: '#about', number: '01.', color: '#008b8b', icon: FiUser, command: 'cat about.txt' },
  { name: 'Skills', href: '#skills', number: '02.', color: '#b8860b', icon: FiCode, command: 'npm list --depth=0' },
  { name: 'Experience', href: '#experience', number: '03.', color: '#006400', icon: FiBriefcase, command: 'cat experience.json' },
  { name: 'Projects', href: '#projects', number: '04.', color: '#cc6600', icon: FiFolder, command: 'ls projects/' },
  { name: 'Contact', href: '#contact', number: '05.', color: '#c71585', icon: FiMail, command: 'mail -s "Hello" user@example.com' },
];

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Detect active section
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
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 backdrop-blur-md"
      style={{
        backgroundColor: 'rgba(245, 245, 240, 0.95)',
        borderBottom: '1px solid rgba(0, 100, 0, 0.3)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1), 0 0 30px rgba(0, 100, 0, 0.1)',
        top: 0,
        left: 0,
        right: 0,
        margin: 0,
        paddingTop: 'max(0px, env(safe-area-inset-top, 0px))',
      }}
    >
      {/* Terminal-style top border */}
      <div 
        className="h-0.5 opacity-100"
        style={{
          background: `linear-gradient(90deg, 
            transparent 0%, 
            #008b8b 20%, 
            #cc6600 40%,
            #b8860b 50%,
            #cc6600 60%,
            #008b8b 80%, 
            transparent 100%)`,
          boxShadow: '0 0 8px rgba(0, 139, 139, 0.4), 0 0 15px rgba(204, 102, 0, 0.3)',
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16" style={{ paddingLeft: '10px', paddingRight: '10px' }}>
        <div className="flex justify-between items-center h-16 md:h-20 min-h-[64px]">
          {/* Terminal-style Logo */}
          <Link
            href="/"
            className="group relative font-mono text-sm sm:text-base md:text-lg font-bold transition-all duration-300 flex items-center"
            style={{
              color: '#008b8b',
              textShadow: '0 0 8px rgba(0, 139, 139, 0.4)',
            }}
            onMouseEnter={() => setHoveredLink('logo')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <div className="flex items-center gap-2 h-full">
              <span 
                style={{
                  textShadow: '0 0 8px rgba(0, 139, 139, 0.5), 0 0 15px rgba(0, 139, 139, 0.3)',
                }}
              >
                Khaled Bin Aziz
              </span>
              {hoveredLink === 'logo' && (
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{ color: '#006400' }}
                  className="text-xs ml-2"
                >
                  cd ~/
                </motion.span>
              )}
            </div>
            {/* Terminal cursor on hover */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredLink === 'logo' ? 1 : 0 }}
              className="inline-block w-2 h-4 ml-1"
              style={{
                backgroundColor: '#008b8b',
                boxShadow: '0 0 6px rgba(0, 139, 139, 0.6)',
              }}
            />
          </Link>

          {/* Desktop Navigation - Terminal Style */}
          <ul className="hidden md:flex gap-3 lg:gap-4 list-none items-center h-full">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.substring(1);
              const isHovered = hoveredLink === link.href;
              const Icon = link.icon;
              
              return (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <Link
                    href={link.href}
                    className="group relative font-mono text-xs sm:text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 px-4 py-2.5 h-full"
                    style={{
                      color: isActive ? link.color : '#4a4a4a',
                      backgroundColor: isActive ? `${link.color}15` : 'transparent',
                      border: isActive ? `1px solid ${link.color}50` : '1px solid transparent',
                      textShadow: isActive ? `0 0 6px ${link.color}60` : 'none',
                    }}
                    onMouseEnter={() => setHoveredLink(link.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {/* Icon with retro glow */}
                    <Icon 
                      className="transition-all duration-300"
                      style={{
                        color: link.color,
                        filter: isActive ? `drop-shadow(0 0 4px ${link.color})` : 'none',
                      }}
                      size={18}
                    />
                    
                    {/* Terminal prompt indicator */}
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="font-bold"
                        style={{ color: '#006400' }}
                      >
                        ▹
                      </motion.span>
                    )}
                    
                    <span style={{ color: '#008b8b', fontSize: '11px' }}>{link.number}</span>
                    <span>{link.name}</span>
                    
                    {/* Terminal command tooltip on hover */}
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 text-[10px] font-mono whitespace-nowrap z-50 pointer-events-none"
                        style={{
                          backgroundColor: 'rgba(245, 245, 240, 0.98)',
                          border: `1px solid ${link.color}60`,
                          color: link.color,
                          boxShadow: `0 4px 12px rgba(0, 0, 0, 0.2), 0 0 15px ${link.color}30`,
                        }}
                      >
                        <span style={{ color: '#006400' }}>$</span> {link.command}
                        <div 
                          className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
                          style={{
                            backgroundColor: 'rgba(245, 245, 240, 0.98)',
                            borderLeft: `1px solid ${link.color}60`,
                            borderTop: `1px solid ${link.color}60`,
                          }}
                        ></div>
                      </motion.div>
                    )}
                    
                    {/* Active indicator glow */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 opacity-50"
                        style={{
                          boxShadow: `0 0 8px ${link.color}40`,
                        }}
                        animate={{
                          boxShadow: [
                            `0 0 8px ${link.color}40`,
                            `0 0 12px ${link.color}60`,
                            `0 0 8px ${link.color}40`,
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    )}
                  </Link>
                </motion.li>
              );
            })}
          </ul>

          {/* Mobile Menu Button - Terminal Style */}
          <button
            className="md:hidden font-mono text-sm focus:outline-none transition-colors duration-300 flex items-center justify-center h-full"
            style={{
              color: '#008b8b',
            }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="flex items-center">
              {isMobileMenuOpen ? (
                <FiX 
                  size={28} 
                  style={{ 
                    color: '#008b8b',
                    filter: 'drop-shadow(0 0 4px rgba(0, 139, 139, 0.6))',
                  }} 
                />
              ) : (
                <FiMenu 
                  size={28} 
                  style={{ 
                    color: '#008b8b',
                    filter: 'drop-shadow(0 0 4px rgba(0, 139, 139, 0.6))',
                  }} 
                />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Terminal Window Style */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden terminal-window border-t-0 rounded-t-none"
            style={{
              borderLeft: 'none',
              borderRight: 'none',
              borderBottom: 'none',
            }}
          >
            {/* Terminal Header */}
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="terminal-btn terminal-btn-close"></span>
                <span className="terminal-btn terminal-btn-minimize"></span>
                <span className="terminal-btn terminal-btn-maximize"></span>
              </div>
              <div className="terminal-title">
                <span style={{ color: '#008b8b' }}>┌─</span>
                <span className="mx-2">navigation.sh</span>
                <span style={{ color: '#008b8b' }}>─┐</span>
              </div>
            </div>
            
            {/* Terminal Body */}
            <div className="terminal-body py-2">
              <div className="terminal-prompt mb-3">
                <span className="font-bold" style={{ color: '#006400' }}>$</span>
                <span className="text-[#4a4a4a] ml-2 font-mono text-sm">cat menu.txt</span>
              </div>
              
              <ul className="flex flex-col space-y-2">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.href.substring(1);
                  const Icon = link.icon;
                  
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-5 py-3 font-mono text-base transition-all duration-300"
                        style={{
                          color: isActive ? link.color : '#4a4a4a',
                          backgroundColor: isActive ? `${link.color}15` : 'transparent',
                          border: isActive ? `1px solid ${link.color}40` : '1px solid transparent',
                          textShadow: isActive ? `0 0 6px ${link.color}50` : 'none',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = link.color;
                          e.currentTarget.style.backgroundColor = `${link.color}20`;
                          e.currentTarget.style.textShadow = `0 0 6px ${link.color}50`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = isActive ? link.color : '#4a4a4a';
                          e.currentTarget.style.backgroundColor = isActive ? `${link.color}15` : 'transparent';
                          e.currentTarget.style.textShadow = isActive ? `0 0 6px ${link.color}50` : 'none';
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <Icon 
                            size={20}
                            style={{
                              color: link.color,
                              filter: isActive ? `drop-shadow(0 0 4px ${link.color})` : 'none',
                            }}
                          />
                          {isActive && (
                            <span style={{ color: '#006400' }}>▹</span>
                          )}
                          <span style={{ color: '#008b8b', fontSize: '12px' }}>{link.number}</span>
                          <span>{link.name}</span>
                          <span className="text-[#6a6a6a] text-sm ml-auto">→</span>
                        </div>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
              
              <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(0, 139, 139, 0.2)' }}>
                <div className="terminal-prompt">
                  <span className="font-bold" style={{ color: '#006400' }}>$</span>
                  <span className="text-[#4a4a4a] ml-2 font-mono text-sm">_</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
