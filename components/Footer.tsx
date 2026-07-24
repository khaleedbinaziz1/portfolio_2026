'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { personalInfo } from '@/data/personal';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { SiWhatsapp } from 'react-icons/si';
import { plexMono, plexSerif, plexSans } from '@/public/fonts';

const EASE = [0.22, 0.61, 0.36, 1] as const;

const whatsappHref = `https://wa.me/${personalInfo.phone.replace(/\D/g, '')}`;

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Learning Hub', href: '#learning' },
  { label: 'Contact', href: '#contact' },
] as const;

// Placeholder routes — wire these up once the resource pages/files exist.
const RESOURCE_LINKS = [
  { label: 'O Level CS Question Papers', href: '/resources/o-level-question-papers' },
  { label: 'O Level CS Notes', href: '/resources/o-level-notes' },
  { label: 'Cheat Sheets', href: '/resources/cheat-sheets' },
  { label: 'Mock Exams & MCQs', href: '/resources/mock-exams' },
] as const;

const SOCIAL_LINKS = [
  { name: 'GitHub', Icon: FiGithub, href: personalInfo.github },
  { name: 'LinkedIn', Icon: FiLinkedin, href: personalInfo.linkedin },
  { name: 'Email', Icon: FiMail, href: `mailto:${personalInfo.email}` },
  { name: 'WhatsApp', Icon: SiWhatsapp, href: whatsappHref },
] as const;

export default function Footer() {
  return (
    <footer
      className={`khb-footer ${plexMono.variable} ${plexSerif.variable} ${plexSans.variable}`}
      role="contentinfo"
    >
      <style>{`
        .khb-footer {
          --ink: #0b0d12;
          --panel: #12151c;
          --paper: #f5f1e8;
          --brass: #d9a94e;
          --teal: #5fe3d6;
          --muted: rgba(245, 241, 232, 0.62);
          --muted-2: rgba(245, 241, 232, 0.34);
          position: relative;
          width: 100%;
          overflow: hidden;
          background: var(--ink);
          color: var(--paper);
          font-family: var(--khb-font-sans), sans-serif;
          border-top: 1px solid rgba(217,169,78,0.2);
          padding: 64px 24px 28px;
          box-sizing: border-box;
        }
        .khb-footer *, .khb-footer *::before, .khb-footer *::after { box-sizing: border-box; }
        @media (min-width: 960px) { .khb-footer { padding: 84px 40px 32px; } }

        .khb-footer .khb-footer-grid { position: absolute; inset: 0; background-image: radial-gradient(rgba(217,169,78,0.22) 1px, transparent 1px); background-size: 26px 26px; opacity: 0.25; pointer-events: none; }

        .khb-footer .khb-footer-inner { position: relative; max-width: 1180px; margin: 0 auto; }

        .khb-footer .khb-footer-top {
          display: grid;
          grid-template-columns: 1fr;
          gap: 44px;
          padding-bottom: 44px;
        }
        @media (min-width: 720px) {
          .khb-footer .khb-footer-top { grid-template-columns: 1.2fr 1fr 1fr 0.9fr; gap: 32px; }
        }

        .khb-footer .khb-tag {
          font-family: var(--khb-font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--brass);
          border: 1px solid rgba(217,169,78,0.35);
          padding: 5px 10px;
          border-radius: 3px;
          display: inline-block;
          margin-bottom: 16px;
        }

        .khb-footer .khb-footer-brand-name {
          font-family: var(--khb-font-mono), monospace;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          font-size: 1.4rem;
          margin: 0 0 10px;
        }
        .khb-footer .khb-footer-brand-copy {
          font-family: var(--khb-font-serif), serif;
          font-size: 13.5px;
          line-height: 1.65;
          color: var(--muted);
          max-width: 320px;
          margin: 0 0 20px;
        }

        .khb-footer .khb-footer-social { display: flex; gap: 8px; }
        .khb-footer .khb-footer-social-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 4px;
          border: 1px solid rgba(95,227,214,0.3);
          color: var(--teal);
          transition: background-color .2s ease, border-color .2s ease, transform .2s ease;
        }
        .khb-footer .khb-footer-social-link:hover { background: rgba(95,227,214,0.1); border-color: var(--teal); transform: translateY(-2px); }
        .khb-footer .khb-footer-social-link:focus-visible { outline: 2px solid var(--brass); outline-offset: 2px; }

        .khb-footer .khb-footer-col-title {
          font-family: var(--khb-font-mono), monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted-2);
          margin: 0 0 16px;
        }
        .khb-footer .khb-footer-links { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 11px; }
        .khb-footer .khb-footer-link {
          font-family: var(--khb-font-sans), sans-serif;
          font-size: 13.5px;
          color: var(--muted);
          text-decoration: none;
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          transition: color .2s ease, padding-left .2s ease;
        }
        .khb-footer .khb-footer-link::before {
          content: '→';
          font-family: var(--khb-font-mono), monospace;
          color: var(--brass);
          opacity: 0;
          transition: opacity .2s ease;
        }
        .khb-footer .khb-footer-link:hover { color: var(--paper); padding-left: 2px; }
        .khb-footer .khb-footer-link:hover::before { opacity: 1; }

        .khb-footer .khb-footer-soon {
          font-family: var(--khb-font-mono), monospace;
          font-size: 9px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted-2);
          border: 1px solid rgba(245,241,232,0.14);
          border-radius: 3px;
          padding: 1px 5px;
        }

        .khb-footer .khb-footer-rule { height: 1px; background: linear-gradient(to right, rgba(217,169,78,0.3), rgba(95,227,214,0.15), transparent); }

        .khb-footer .khb-footer-bottom {
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-items: flex-start;
          padding-top: 22px;
        }
        @media (min-width: 720px) {
          .khb-footer .khb-footer-bottom { flex-direction: row; align-items: center; justify-content: space-between; }
        }
        .khb-footer .khb-footer-credit {
          font-family: var(--khb-font-mono), monospace;
          font-size: 12px;
          color: var(--muted-2);
          margin: 0;
        }
        .khb-footer .khb-footer-credit-link {
          color: var(--muted);
          text-decoration: none;
          border-bottom: 1px solid rgba(245,241,232,0.2);
          transition: color .2s ease, border-color .2s ease;
        }
        .khb-footer .khb-footer-credit-link:hover { color: var(--teal); border-color: var(--teal); }
        .khb-footer .khb-footer-exit {
          font-family: var(--khb-font-mono), monospace;
          font-size: 12px;
          color: var(--teal);
          margin: 0;
          opacity: 0.75;
        }
      `}</style>

      <div className="khb-footer-grid" aria-hidden="true" />

      <div className="khb-footer-inner">
        <div className="khb-footer-top">
          <div>
            <span className="khb-tag">KHB.SYS</span>
            <p className="khb-footer-brand-name">{personalInfo.name}</p>
            <p className="khb-footer-brand-copy">
              Software engineer and educator building products and sharing practical CS
              knowledge, one project and lesson at a time.
            </p>
            <div className="khb-footer-social">
              {SOCIAL_LINKS.map(({ name, Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  target={name === 'Email' ? undefined : '_blank'}
                  rel={name === 'Email' ? undefined : 'noopener noreferrer'}
                  aria-label={name}
                  className="khb-footer-social-link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="khb-footer-col-title">Navigate</p>
            <ul className="khb-footer-links">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="khb-footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="khb-footer-col-title">O Level Resources</p>
            <ul className="khb-footer-links">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="khb-footer-link">
                    <span>{link.label}</span>
                    <span className="khb-footer-soon">Soon</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="khb-footer-col-title">Contact</p>
            <ul className="khb-footer-links">
              <li>
                <a href={`mailto:${personalInfo.email}`} className="khb-footer-link">
                  {personalInfo.email}
                </a>
              </li>
              <li>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="khb-footer-link">
                  {personalInfo.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="khb-footer-rule" />

        <motion.div
          className="khb-footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <p className="khb-footer-credit">
            © {new Date().getFullYear()} · Designed &amp; built by{' '}
            <Link href="#hero" className="khb-footer-credit-link">
              {personalInfo.name}
            </Link>
          </p>
          <p className="khb-footer-exit" aria-hidden>
            $ exit 0
          </p>
        </motion.div>
      </div>
    </footer>
  );
}