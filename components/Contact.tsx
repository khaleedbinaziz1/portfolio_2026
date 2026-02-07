'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { personalInfo } from '@/data/personal';
import { FiGithub, FiLinkedin, FiMail, FiSend } from 'react-icons/fi';
import { SiWhatsapp } from 'react-icons/si';

const SOCIAL_LINKS = [
  { name: 'GitHub', Icon: FiGithub, href: personalInfo.github, color: 'var(--retro-amber)' },
  { name: 'LinkedIn', Icon: FiLinkedin, href: personalInfo.linkedin, color: 'var(--retro-cyan-bright)' },
  { name: 'Email', Icon: FiMail, href: `mailto:${personalInfo.email}`, color: 'var(--retro-mint)' },
  { name: 'WhatsApp', Icon: SiWhatsapp, href: 'https://wa.me/8801756922708', color: '#25D366' },
] as const;

const EASE = [0.22, 0.61, 0.36, 1] as const;

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-bg" aria-hidden />
      <motion.div
        className="contact-content"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="contact-header">
          <div className="contact-header-line mobile-only" />
          <span className="contact-num">05.</span>
          <h2 className="contact-title">Get In Touch</h2>
          <div className="contact-header-line desktop-only" />
        </div>
        <p className="contact-desc">
          I&apos;m open to new opportunities and collaborations. Reach out to discuss a project, ask a question, or connect!
        </p>
        <div className="contact-info-grid">
          <a href={`mailto:${personalInfo.email}`} className="contact-info-card">
            <FiMail size={18} style={{ color: 'var(--retro-mint)' }} />
            {personalInfo.email}
          </a>
          <a
            href="https://wa.me/8801756922708"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-info-card"
          >
            <SiWhatsapp size={18} style={{ color: '#25D366' }} />
            +880 1756922708
          </a>
        </div>
        <Link href={`mailto:${personalInfo.email}`} className="contact-cta">
          <FiSend size={18} />
          Say Hello
        </Link>
        <div className="contact-social">
          {SOCIAL_LINKS.map(({ name, Icon, href, color }) => (
            <Link
              key={name}
              href={href}
              target={name === 'Email' ? undefined : '_blank'}
              rel={name === 'Email' ? undefined : 'noopener noreferrer'}
              aria-label={name}
              style={{ borderColor: `${color}50`, color }}
            >
              <Icon size={22} />
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
