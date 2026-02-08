'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { personalInfo } from '@/data/personal';
import { FiGithub, FiLinkedin, FiMail, FiSend } from 'react-icons/fi';
import { SiWhatsapp } from 'react-icons/si';

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
    <section id="contact" className="contact-section">
      <div className="contact-gif-bg" aria-hidden />
      <div className="contact-scanline" aria-hidden />

      <motion.div
        className="contact-content"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <header className="contact-header">
          <h2 className="contact-title">Get In Touch</h2>
          <div className="contact-header-line" />
          <p className="contact-status" aria-hidden>&gt; connection open</p>
        </header>

        <motion.div
          className="contact-panel"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.45, delay: STAGGER, ease: EASE }}
        >
          <p className="contact-panel-desc">
            Open to new opportunities and collaborations. Reach out to discuss a project or say hello.
          </p>
          <div className="contact-lines">
            <a href={`mailto:${personalInfo.email}`} className="contact-line">
              <span className="contact-line-label">email</span>
              <span className="contact-line-value">{personalInfo.email}</span>
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-line"
            >
              <span className="contact-line-label">phone</span>
              <span className="contact-line-value">{personalInfo.phone}</span>
            </a>
          </div>
          <Link href={`mailto:${personalInfo.email}`} className="contact-cta">
            <FiSend size={16} />
            <span>Say Hello</span>
          </Link>
          <div className="contact-social">
            {SOCIAL_LINKS.map(({ name, Icon, href }, i) => (
              <motion.a
                key={name}
                href={href}
                target={name === 'Email' ? undefined : '_blank'}
                rel={name === 'Email' ? undefined : 'noopener noreferrer'}
                aria-label={name}
                className="contact-social-link"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: STAGGER * 2 + i * 0.05 }}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
