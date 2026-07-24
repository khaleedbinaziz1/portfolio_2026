'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { personalInfo } from '@/data/personal';
import { FiGithub, FiLinkedin, FiMail, FiSend } from 'react-icons/fi';
import { SiWhatsapp } from 'react-icons/si';
import { plexMono, plexSerif, plexSans } from '@/public/fonts';

const EASE = [0.22, 0.61, 0.36, 1] as const;
const STAGGER = 0.06;

const whatsappHref = `https://wa.me/${personalInfo.phone.replace(/\D/g, '')}`;

const SOCIAL_LINKS = [
  { name: 'GitHub', Icon: FiGithub, href: personalInfo.github },
  { name: 'LinkedIn', Icon: FiLinkedin, href: personalInfo.linkedin },
  { name: 'Email', Icon: FiMail, href: `mailto:${personalInfo.email}` },
  { name: 'WhatsApp', Icon: SiWhatsapp, href: whatsappHref },
] as const;

export default function Contact() {
  return (
    <section
      id="contact"
      className={`khb-contact ${plexMono.variable} ${plexSerif.variable} ${plexSans.variable}`}
    >
      <style>{`
        .khb-contact {
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
          padding: 96px 24px;
          box-sizing: border-box;
        }
        .khb-contact *, .khb-contact *::before, .khb-contact *::after { box-sizing: border-box; }
        @media (min-width: 960px) { .khb-contact { padding: 140px 40px; } }

        .khb-contact .khb-grid { position: absolute; inset: 0; background-image: radial-gradient(rgba(217,169,78,0.35) 1px, transparent 1px); background-size: 26px 26px; opacity: 0.4; pointer-events: none; }
        .khb-contact .khb-vignette { position: absolute; inset: 0; background: radial-gradient(ellipse at center, transparent 0%, var(--ink) 82%); pointer-events: none; }

        .khb-contact .khb-inner { position: relative; max-width: 620px; margin: 0 auto; text-align: center; }

        .khb-contact .khb-tag {
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

        .khb-contact .khb-cmdline {
          font-family: var(--khb-font-mono), monospace;
          font-size: 13px;
          color: var(--muted);
          margin: 18px 0 14px;
        }
        .khb-contact .khb-cmdline .prompt { color: var(--brass); margin-right: 6px; }

        .khb-contact .khb-title {
          font-family: var(--khb-font-mono), monospace;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          font-size: clamp(2rem, 5vw, 3rem);
          margin: 0 0 16px;
        }

        .khb-contact .khb-status {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--khb-font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--teal);
          margin: 0 0 48px;
        }
        .khb-contact .khb-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--teal);
          box-shadow: 0 0 0 0 rgba(95,227,214,0.6);
          animation: khb-contact-pulse 2s ease-out infinite;
        }
        @keyframes khb-contact-pulse {
          0% { box-shadow: 0 0 0 0 rgba(95,227,214,0.5); }
          70% { box-shadow: 0 0 0 7px rgba(95,227,214,0); }
          100% { box-shadow: 0 0 0 0 rgba(95,227,214,0); }
        }
        @media (prefers-reduced-motion: reduce) { .khb-contact .khb-status-dot { animation: none; } }

        /* ---- panel ---- */
        .khb-contact .khb-panel {
          position: relative;
          background: var(--panel);
          border: 1px solid rgba(245, 241, 232, 0.1);
          border-radius: 10px;
          padding: 40px 32px;
          text-align: left;
          transition: border-color .35s ease;
        }
        .khb-contact .khb-panel::before,
        .khb-contact .khb-panel::after {
          content: '';
          position: absolute;
          width: 16px;
          height: 16px;
          border-color: var(--brass);
          opacity: 0.5;
          pointer-events: none;
        }
        .khb-contact .khb-panel::before { top: 10px; left: 10px; border-top: 1.5px solid; border-left: 1.5px solid; }
        .khb-contact .khb-panel::after { bottom: 10px; right: 10px; border-bottom: 1.5px solid; border-right: 1.5px solid; }

        .khb-contact .khb-panel-desc {
          font-family: var(--khb-font-serif), serif;
          font-size: 15px;
          line-height: 1.7;
          color: var(--muted);
          margin: 0 0 30px;
          text-align: center;
        }

        .khb-contact .khb-lines { display: flex; flex-direction: column; margin-bottom: 30px; }
        .khb-contact .khb-line {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
          padding: 16px 4px;
          border-top: 1px dashed rgba(245,241,232,0.14);
          text-decoration: none;
          transition: padding-left .25s ease;
        }
        .khb-contact .khb-lines a.khb-line:last-child { border-bottom: 1px dashed rgba(245,241,232,0.14); }
        .khb-contact .khb-line:hover { padding-left: 10px; }
        .khb-contact .khb-line-label {
          font-family: var(--khb-font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted-2);
          flex-shrink: 0;
        }
        .khb-contact .khb-line-value {
          font-family: var(--khb-font-mono), monospace;
          font-size: 14px;
          color: var(--paper);
          text-align: right;
          word-break: break-word;
          transition: color .25s ease;
        }
        .khb-contact .khb-line:hover .khb-line-value { color: var(--teal); }

        .khb-contact .khb-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          font-family: var(--khb-font-mono), monospace;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          background: var(--brass);
          color: var(--ink);
          padding: 15px 22px;
          border-radius: 4px;
          margin-bottom: 26px;
          transition: background-color .2s ease, transform .2s ease;
        }
        .khb-contact .khb-cta:hover { background: #ecc26a; transform: translateY(-2px); }
        .khb-contact .khb-cta:focus-visible { outline: 2px solid var(--brass); outline-offset: 3px; }

        .khb-contact .khb-social { display: flex; justify-content: center; gap: 10px; }
        .khb-contact .khb-social-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 4px;
          border: 1px solid rgba(95,227,214,0.35);
          color: var(--teal);
          transition: background-color .2s ease, border-color .2s ease, transform .2s ease;
        }
        .khb-contact .khb-social-link:hover { background: rgba(95,227,214,0.1); border-color: var(--teal); transform: translateY(-2px); }
        .khb-contact .khb-social-link:focus-visible { outline: 2px solid var(--brass); outline-offset: 2px; }
      `}</style>

      <div className="khb-grid" aria-hidden="true" />
      <div className="khb-vignette" aria-hidden="true" />

      <motion.div
        className="khb-inner"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <span className="khb-tag">CONTACT · 05</span>
        <div className="khb-cmdline">
          <span className="prompt">$</span>ping khaleed
        </div>
        <h2 className="khb-title">Get In Touch</h2>
        <p className="khb-status" aria-hidden>
          <span className="khb-status-dot" />
          connection open
        </p>

        <motion.div
          className="khb-panel"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.45, delay: STAGGER, ease: EASE }}
        >
          <p className="khb-panel-desc">
            Open to new opportunities and collaborations. Reach out to discuss a project or say
            hello.
          </p>

          <div className="khb-lines">
            <a href={`mailto:${personalInfo.email}`} className="khb-line">
              <span className="khb-line-label">email</span>
              <span className="khb-line-value">{personalInfo.email}</span>
            </a>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="khb-line">
              <span className="khb-line-label">phone</span>
              <span className="khb-line-value">{personalInfo.phone}</span>
            </a>
          </div>

          <Link href={`mailto:${personalInfo.email}`} className="khb-cta">
            <FiSend size={15} />
            <span>Say Hello</span>
          </Link>

          <div className="khb-social">
            {SOCIAL_LINKS.map(({ name, Icon, href }, i) => (
              <motion.a
                key={name}
                href={href}
                target={name === 'Email' ? undefined : '_blank'}
                rel={name === 'Email' ? undefined : 'noopener noreferrer'}
                aria-label={name}
                className="khb-social-link"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: STAGGER * 2 + i * 0.05 }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}