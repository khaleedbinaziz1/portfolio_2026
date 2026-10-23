'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { personalInfo } from '@/data/personal';
import {
  FiMail,
  FiSend,
  FiCopy,
  FiCheck,
  FiMapPin,
  FiArrowUpRight,
  FiGithub,
  FiLinkedin,
} from 'react-icons/fi';
import { SiWhatsapp } from 'react-icons/si';
import TextScramble from '@/components/TextScramble';
import { sound } from '@/lib/sound';

const EASE = [0.16, 1, 0.3, 1] as const;

const whatsappHref = `https://wa.me/${personalInfo.phone.replace(/\D/g, '')}`;

const SOCIAL_ITEMS = [
  { name: 'GitHub', icon: FiGithub, href: personalInfo.github },
  { name: 'LinkedIn', icon: FiLinkedin, href: personalInfo.linkedin },
  { name: 'WhatsApp', icon: SiWhatsapp, href: whatsappHref },
  { name: 'Direct Email', icon: FiMail, href: `mailto:${personalInfo.email}` },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    sound.success();
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    sound.tick(1200, 0.03);
    setFormState('submitting');
    setTimeout(() => {
      sound.success();
      setFormState('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormState('idle'), 4000);
    }, 1000);
  };

  return (
    <section id="contact" className="ln-contact">
      <style>{`
        .ln-contact {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: var(--void);
          color: var(--ivory);
          padding: var(--section-pad-y) var(--section-pad-x);
        }

        .ln-contact-inner {
          position: relative;
          max-width: var(--max-w);
          margin: 0 auto;
        }

        /* Section Header */
        .ln-section-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--opal-cyan);
          margin-bottom: 16px;
        }

        .ln-section-label::before {
          content: '';
          width: 24px;
          height: 1px;
          background: var(--opal-cyan);
          opacity: 0.6;
        }

        /* Split Layout */
        .ln-contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: start;
        }

        @media (min-width: 960px) {
          .ln-contact-grid {
            grid-template-columns: 1.1fr 0.9fr;
            gap: 56px;
          }
        }

        /* Left Column */
        .ln-contact-heading {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 3.4vw, 2.6rem);
          font-weight: 600;
          letter-spacing: -0.025em;
          line-height: 1.15;
          margin-bottom: 16px;
          color: var(--ivory);
        }

        .ln-contact-subtitle {
          font-family: var(--font-body);
          font-size: clamp(0.95rem, 1.4vw, 1.05rem);
          color: var(--ivory-muted);
          line-height: 1.65;
          margin-bottom: 32px;
          max-width: 500px;
        }

        /* Beacon Card */
        .ln-beacon-card {
          background: var(--surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 24px;
          margin-bottom: 28px;
          backdrop-filter: blur(16px);
        }

        .ln-beacon-status-line {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 10.5px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--opal-teal);
          margin-bottom: 16px;
        }

        .ln-beacon-blip {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--opal-teal);
          box-shadow: 0 0 8px var(--opal-teal);
          animation: ln-blip 2.2s infinite ease-in-out;
        }

        @keyframes ln-blip {
          0%, 100% { opacity: 0.35; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.25); }
        }

        .ln-beacon-email-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          padding: 12px 16px;
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
        }

        .ln-beacon-email {
          font-family: var(--font-mono);
          font-size: 13.5px;
          color: var(--ivory);
          letter-spacing: 0.02em;
        }

        .ln-copy-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          color: var(--ivory-muted);
          font-family: var(--font-mono);
          font-size: 10.5px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .ln-copy-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--border-hover);
          color: var(--ivory);
        }

        .ln-beacon-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 16px;
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: var(--ivory-dim);
          letter-spacing: 0.06em;
        }

        .ln-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        /* Social Cluster */
        .ln-social-cluster {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .ln-social-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 16px;
          border-radius: 100px;
          background: var(--surface);
          border: 1px solid var(--border-subtle);
          color: var(--ivory-muted);
          font-family: var(--font-mono);
          font-size: 11.5px;
          letter-spacing: 0.04em;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .ln-social-pill:hover {
          color: var(--ivory);
          border-color: var(--border-hover);
          background: rgba(255, 255, 255, 0.04);
          transform: translateY(-1px);
        }

        /* Right Column Form */
        .ln-form-card {
          background: var(--surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 30px 28px;
          backdrop-filter: blur(16px);
        }

        .ln-form-title {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 600;
          letter-spacing: -0.01em;
          margin-bottom: 6px;
          color: var(--ivory);
        }

        .ln-form-desc {
          font-family: var(--font-body);
          font-size: 13px;
          color: var(--ivory-muted);
          margin-bottom: 24px;
          line-height: 1.5;
        }

        .ln-form-group {
          margin-bottom: 18px;
        }

        .ln-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 10.5px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ivory-dim);
          margin-bottom: 6px;
        }

        .ln-input, .ln-textarea {
          width: 100%;
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 10px 14px;
          color: var(--ivory);
          font-family: var(--font-body);
          font-size: 13.5px;
          transition: border-color var(--duration-fast) ease;
          outline: none;
          box-sizing: border-box;
        }

        .ln-input:focus, .ln-textarea:focus {
          border-color: var(--opal-cyan);
        }

        .ln-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .ln-submit-btn {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 20px;
          background: var(--ivory);
          color: #08090d;
          border: none;
          border-radius: 100px;
          font-family: var(--font-body);
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s var(--ease-out-expo);
        }

        .ln-submit-btn:hover:not(:disabled) {
          background: #ffffff;
          transform: translateY(-1px);
        }

        .ln-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .ln-whatsapp-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          margin-top: 20px;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-subtle);
          text-decoration: none;
          color: var(--ivory);
          transition: all 0.2s ease;
        }

        .ln-whatsapp-banner:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: var(--border-hover);
          transform: translateY(-1px);
        }

        .ln-wa-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ln-wa-icon {
          color: #25D366;
          font-size: 18px;
        }

        .ln-wa-text {
          font-family: var(--font-body);
          font-size: 12.5px;
          font-weight: 500;
        }

        .ln-wa-sub {
          font-family: var(--font-mono);
          font-size: 9.5px;
          color: var(--ivory-dim);
          letter-spacing: 0.04em;
        }
      `}</style>

      <div className="ln-contact-inner">
        <div className="ln-section-label">
          <TextScramble text="Signal // 05" />
        </div>

        <div className="ln-contact-grid">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <h2 className="ln-contact-heading">
              Let’s engineer something memorable together.
            </h2>
            <p className="ln-contact-subtitle">
              Open to serious engineering discussions. Whether it&apos;s a new platform, architectural challenge, or a long-term collaboration — reach out.
            </p>

            <div className="ln-beacon-card">
              <div className="ln-beacon-email-row">
                <span className="ln-beacon-email">{personalInfo.email}</span>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="ln-copy-btn"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <FiCheck size={12} />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <FiCopy size={12} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="ln-beacon-meta">
                <div className="ln-meta-item">
                  <FiMapPin size={11} color="var(--opal-teal)" />
                  <span>Chattogram, Bangladesh • GMT+6</span>
                </div>
              </div>
            </div>

            <div className="ln-social-cluster">
              {SOCIAL_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => sound.tick(1400, 0.01)}
                    className="ln-social-pill"
                  >
                    <Icon size={13} />
                    <span>{item.name}</span>
                    <FiArrowUpRight size={11} />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column Form */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
          >
            <div className="ln-form-card">
              <h3 className="ln-form-title">Send a Direct Transmission</h3>
              <p className="ln-form-desc">
                Inquiries are monitored continuously with responses typically dispatched within 24 hours.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="ln-form-group">
                  <label htmlFor="c-name" className="ln-label">
                    Name or Organization
                  </label>
                  <input
                    id="c-name"
                    type="text"
                    required
                    placeholder="Elena Vance"
                    value={formData.name}
                    onFocus={() => sound.tick(1200, 0.01)}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="ln-input"
                  />
                </div>

                <div className="ln-form-group">
                  <label htmlFor="c-email" className="ln-label">
                    Email Address
                  </label>
                  <input
                    id="c-email"
                    type="email"
                    required
                    placeholder="elena@company.com"
                    value={formData.email}
                    onFocus={() => sound.tick(1200, 0.01)}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="ln-input"
                  />
                </div>

                <div className="ln-form-group">
                  <label htmlFor="c-message" className="ln-label">
                    Message / Project Brief
                  </label>
                  <textarea
                    id="c-message"
                    required
                    rows={4}
                    placeholder="Tell me about your product scope, timeline, or engineering goals..."
                    value={formData.message}
                    onFocus={() => sound.tick(1200, 0.01)}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="ln-textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="ln-submit-btn"
                >
                  {formState === 'submitting' ? (
                    <span>Encrypting & Sending...</span>
                  ) : formState === 'success' ? (
                    <>
                      <FiCheck size={14} />
                      <span>Transmission Delivered!</span>
                    </>
                  ) : (
                    <>
                      <FiSend size={13} />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </form>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="ln-whatsapp-banner"
              >
                <div className="ln-wa-left">
                  <SiWhatsapp className="ln-wa-icon" />
                  <div>
                    <div className="ln-wa-text">Instant Messaging Channel</div>
                    <div className="ln-wa-sub">Direct WhatsApp • Online</div>
                  </div>
                </div>
                <FiArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}