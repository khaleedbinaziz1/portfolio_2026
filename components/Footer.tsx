'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { personalInfo } from '@/data/personal';
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiArrowUp,
  FiArrowUpRight,
  FiCheckCircle,
} from 'react-icons/fi';
import { SiWhatsapp } from 'react-icons/si';
import { sound } from '@/lib/sound';

const whatsappHref = `https://wa.me/${personalInfo.phone.replace(/\D/g, '')}`;

const NAV_LINKS = [
  { label: 'Hero // Index', href: '#' },
  { label: 'Identity // About', href: '#about' },
  { label: 'Capabilities // Skills', href: '#skills' },
  { label: 'Trajectory // Experience', href: '#experience' },
  { label: 'Works // Projects', href: '#projects' },
  { label: 'Signal // Contact', href: '#contact' },
];

const RESOURCE_LINKS = [
  { label: 'O Level CS Past Papers', href: '/resources/solved-past-papers' },
  { label: 'O Level Revision Notes', href: '/resources/topical-notes' },
  { label: 'Open Stack JS Platform', href: 'https://opentackjs.vercel.app/' },
  { label: 'CS Education Archive', href: '/resources' },
];

const SOCIAL_LINKS = [
  { name: 'GitHub', icon: FiGithub, href: personalInfo.github },
  { name: 'LinkedIn', icon: FiLinkedin, href: personalInfo.linkedin },
  { name: 'WhatsApp', icon: SiWhatsapp, href: whatsappHref },
  { name: 'Direct Mail', icon: FiMail, href: `mailto:${personalInfo.email}` },
];

export default function Footer() {
  const scrollToTop = () => {
    sound.tick(1300, 0.03);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="ln-footer" role="contentinfo">
      <style>{`
        .ln-footer {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: var(--void);
          color: var(--ivory);
          border-top: 1px solid var(--border-subtle);
          padding: 64px var(--section-pad-x) 32px;
        }

        .ln-footer-inner {
          position: relative;
          max-width: var(--max-w);
          margin: 0 auto;
        }

        /* 4-column layout */
        .ln-footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 36px;
          padding-bottom: 44px;
          border-bottom: 1px solid var(--border-subtle);
        }

        @media (min-width: 640px) {
          .ln-footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .ln-footer-grid {
            grid-template-columns: 1.4fr 0.9fr 1.1fr 0.8fr;
            gap: 36px;
          }
        }

        /* Brand Column */
        .ln-footer-brand-title {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 600;
          letter-spacing: -0.01em;
          margin-bottom: 10px;
          color: var(--ivory);
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .ln-footer-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--opal-cyan);
        }

        .ln-footer-bio {
          font-family: var(--font-body);
          font-size: 13px;
          line-height: 1.6;
          color: var(--ivory-muted);
          margin-bottom: 18px;
          max-width: 300px;
        }

        .ln-footer-system-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-subtle);
          border-radius: 100px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.08em;
          color: var(--opal-teal);
        }

        /* Column Headers */
        .ln-footer-col-title {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--ivory-dim);
          margin-bottom: 16px;
        }

        .ln-footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .ln-footer-link {
          font-family: var(--font-body);
          font-size: 13px;
          color: var(--ivory-muted);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          transition: all 0.2s ease;
        }

        .ln-footer-link:hover {
          color: var(--ivory);
          transform: translateX(3px);
        }

        .ln-footer-link svg {
          opacity: 0;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .ln-footer-link:hover svg {
          opacity: 1;
          color: var(--opal-cyan);
          transform: translate(2px, -2px);
        }

        /* Bottom Row */
        .ln-footer-bottom {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding-top: 26px;
        }

        .ln-footer-copy {
          font-family: var(--font-mono);
          font-size: 10.5px;
          letter-spacing: 0.04em;
          color: var(--ivory-dim);
        }

        .ln-footer-copy strong {
          color: var(--ivory);
          font-weight: 500;
        }

        .ln-back-to-top {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-subtle);
          border-radius: 100px;
          color: var(--ivory-muted);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .ln-back-to-top:hover {
          color: var(--ivory);
          border-color: var(--border-hover);
          background: rgba(255, 255, 255, 0.04);
          transform: translateY(-1px);
        }
      `}</style>

      <div className="ln-footer-inner">
        <div className="ln-footer-grid">
          {/* Brand Col */}
          <div>
            <div className="ln-footer-brand-title">
              <span className="ln-footer-dot" />
              <span>{personalInfo.name}</span>
            </div>
            <div className="ln-footer-system-status">
              <FiCheckCircle size={11} />
              <span>SYSTEM ONLINE // 2026 EDITION</span>
            </div>
          </div>

          {/* Navigation Col */}
          <div>
            <div className="ln-footer-col-title">Navigation</div>
            <ul className="ln-footer-links">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="ln-footer-link"
                    onMouseEnter={() => sound.tick(1400, 0.01)}
                  >
                    <span>{link.label}</span>
                    <FiArrowUpRight size={11} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CS Resources Col */}
          <div>
            <div className="ln-footer-col-title">CS Education</div>
            <ul className="ln-footer-links">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="ln-footer-link"
                    onMouseEnter={() => sound.tick(1400, 0.01)}
                  >
                    <span>{link.label}</span>
                    <FiArrowUpRight size={11} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials Col */}
          <div>
            <div className="ln-footer-col-title">Channels</div>
            <ul className="ln-footer-links">
              {SOCIAL_LINKS.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ln-footer-link"
                      onMouseEnter={() => sound.tick(1400, 0.01)}
                    >
                      <Icon size={12} />
                      <span>{item.name}</span>
                      <FiArrowUpRight size={11} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="ln-footer-bottom">
          <div className="ln-footer-copy">
            © 2026 <strong>Khaled Bin Aziz</strong>. Engineered with Next.js, React, Three.js & TypeScript.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="ln-back-to-top"
            aria-label="Back to top"
          >
            <span>Ascend</span>
            <FiArrowUp size={11} />
          </button>
        </div>
      </div>
    </footer>
  );
}