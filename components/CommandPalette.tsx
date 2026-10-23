'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch,
  FiFileText,
  FiCopy,
  FiCheck,
  FiExternalLink,
  FiVolume2,
  FiArrowRight,
  FiCornerDownLeft,
} from 'react-icons/fi';
import { personalInfo } from '@/data/personal';
import { sound } from '@/lib/sound';

type CommandItem = {
  id: string;
  title: string;
  category: string;
  shortcut?: string;
  action: () => void;
};

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleOpen = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) sound.tick(1200);
      return next;
    });
  };

  const close = () => {
    setIsOpen(false);
    setQuery('');
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    sound.success();
    setTimeout(() => {
      setCopied(false);
      close();
    }, 1200);
  };

  const scrollToSection = (id: string) => {
    close();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const COMMANDS: CommandItem[] = [
    {
      id: 'projects',
      title: 'Navigate // Production Systems & Works',
      category: 'Navigation',
      shortcut: '04',
      action: () => scrollToSection('projects'),
    },
    {
      id: 'skills',
      title: 'Navigate // Stack & Capabilities',
      category: 'Navigation',
      shortcut: '02',
      action: () => scrollToSection('skills'),
    },
    {
      id: 'experience',
      title: 'Navigate // Career Trajectory & Academia',
      category: 'Navigation',
      shortcut: '03',
      action: () => scrollToSection('experience'),
    },
    {
      id: 'about',
      title: 'Navigate // Identity & Architecture Philosophy',
      category: 'Navigation',
      shortcut: '01',
      action: () => scrollToSection('about'),
    },
    {
      id: 'contact',
      title: 'Navigate // Signal Transmission & Inquiry',
      category: 'Navigation',
      shortcut: '05',
      action: () => scrollToSection('contact'),
    },
    {
      id: 'copy-email',
      title: copied ? 'Email Copied to Clipboard!' : `Copy Email (${personalInfo.email})`,
      category: 'Actions',
      shortcut: '⌘C',
      action: copyEmail,
    },
    {
      id: 'whatsapp',
      title: 'Open Instant WhatsApp Chat',
      category: 'Actions',
      shortcut: 'WA',
      action: () => {
        window.open(`https://wa.me/${personalInfo.phone.replace(/\D/g, '')}`, '_blank');
        close();
      },
    },
    {
      id: 'resources',
      title: 'Explore O Level CS Notes & Solved Papers',
      category: 'Resources',
      shortcut: 'SYS',
      action: () => {
        window.location.href = '/resources';
        close();
      },
    },
    {
      id: 'github',
      title: 'Visit GitHub Architecture Repositories',
      category: 'External',
      shortcut: 'GH',
      action: () => {
        window.open(personalInfo.github, '_blank');
        close();
      },
    },
    {
      id: 'linkedin',
      title: 'Connect on LinkedIn',
      category: 'External',
      shortcut: 'IN',
      action: () => {
        window.open(personalInfo.linkedin, '_blank');
        close();
      },
    },
  ];

  const filtered = COMMANDS.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  // Global keybinding: Cmd+K / Ctrl+K and custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleOpen();
      }
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
      sound.tick(1200);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
      sound.tick(800, 0.015);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      sound.tick(800, 0.015);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    }
  };

  return (
    <>
      {/* Floating launcher trigger button in bottom right corner */}
      <button
        type="button"
        onClick={toggleOpen}
        className="ln-palette-trigger"
        aria-label="Open command palette (Cmd+K)"
      >
        <span className="ln-trigger-glyph">⌘</span>
        <span className="ln-trigger-key">K</span>
        <span className="ln-trigger-text">Commands</span>
      </button>

      <style>{`
        .ln-palette-trigger {
          position: fixed;
          bottom: 24px;
          left: 24px;
          z-index: 80;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 100px;
          background: rgba(14, 16, 23, 0.75);
          backdrop-filter: blur(16px);
          border: 1px solid var(--border-subtle);
          color: var(--ivory-muted);
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.06em;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
        }

        .ln-palette-trigger:hover {
          border-color: var(--border-hover);
          color: var(--ivory);
          background: rgba(20, 23, 33, 0.9);
          transform: translateY(-2px);
        }

        .ln-trigger-glyph {
          font-size: 12px;
          color: var(--opal-cyan);
        }

        .ln-trigger-key {
          font-size: 11px;
          font-weight: 600;
          color: var(--ivory);
        }

        .ln-trigger-text {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--ivory-dim);
          margin-left: 2px;
        }

        /* Dialog Modal */
        .ln-palette-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(5, 6, 9, 0.8);
          backdrop-filter: blur(16px);
          z-index: 1000;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 100px 20px 40px;
        }

        .ln-palette-window {
          position: relative;
          width: 100%;
          max-width: 580px;
          background: #0f1118;
          border: 1px solid var(--border-hover);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 24px 60px -12px rgba(0, 0, 0, 0.85), 0 0 30px rgba(167, 139, 250, 0.08);
        }

        .ln-palette-input-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-subtle);
          background: rgba(0, 0, 0, 0.2);
        }

        .ln-palette-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--ivory);
          font-family: var(--font-body);
          font-size: 14.5px;
        }

        .ln-palette-input::placeholder {
          color: var(--ivory-dim);
        }

        .ln-palette-kbd {
          font-family: var(--font-mono);
          font-size: 9.5px;
          letter-spacing: 0.06em;
          padding: 3px 6px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.06);
          color: var(--ivory-dim);
          border: 1px solid var(--border-subtle);
        }

        .ln-palette-list {
          max-height: 340px;
          overflow-y: auto;
          padding: 8px;
        }

        .ln-palette-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.15s ease;
          color: var(--ivory-muted);
          font-family: var(--font-body);
          font-size: 13px;
        }

        .ln-palette-item.active {
          background: rgba(255, 255, 255, 0.06);
          color: #ffffff;
        }

        .ln-palette-item-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ln-palette-category {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--opal-cyan);
          padding: 2px 6px;
          background: rgba(125, 211, 252, 0.08);
          border-radius: 3px;
        }

        .ln-palette-shortcut {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--ivory-dim);
        }

        .ln-palette-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 18px;
          border-top: 1px solid var(--border-subtle);
          background: rgba(0, 0, 0, 0.2);
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--ivory-dim);
        }
      `}</style>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="ln-palette-backdrop"
            onClick={close}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: -16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -16 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="ln-palette-window"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="ln-palette-input-wrap">
                <FiSearch size={16} color="var(--opal-cyan)" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or navigate..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleInputKeyDown}
                  className="ln-palette-input"
                />
                <span className="ln-palette-kbd">ESC</span>
              </div>

              <div className="ln-palette-list">
                {filtered.length === 0 ? (
                  <div style={{ padding: '24px', textAlign: 'center', color: 'var(--ivory-dim)', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
                    NO MATCHING COMMANDS FOUND
                  </div>
                ) : (
                  filtered.map((cmd, idx) => {
                    const isActive = idx === selectedIndex;
                    return (
                      <div
                        key={cmd.id}
                        className={`ln-palette-item ${isActive ? 'active' : ''}`}
                        onClick={cmd.action}
                        onMouseEnter={() => setSelectedIndex(idx)}
                      >
                        <div className="ln-palette-item-left">
                          <span className="ln-palette-category">{cmd.category}</span>
                          <span>{cmd.title}</span>
                        </div>
                        {cmd.shortcut && (
                          <span className="ln-palette-shortcut">{cmd.shortcut}</span>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              <div className="ln-palette-footer">
                <div style={{ display: 'flex', gap: '14px' }}>
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                </div>
                <div>Khaled Bin Aziz // 2026 Edition</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
