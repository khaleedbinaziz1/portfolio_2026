'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiBriefcase, FiBookOpen, FiCalendar, FiMapPin, FiChevronRight, FiCheckCircle } from 'react-icons/fi';
import TextScramble from '@/components/TextScramble';
import { sound } from '@/lib/sound';

const EASE = [0.16, 1, 0.3, 1] as const;

const CAREER_DATA = [
  {
    type: 'work',
    code: 'EXP.01',
    role: 'Software Engineer',
    company: 'Pixentix Web Agency',
    location: 'Remote',
    duration: 'March 2023 – Present',
    status: 'Active',
    description:
      'Engineered production web applications, SaaS analytics dashboards, and e-commerce systems serving thousands of active users with robust microservices and secure auth systems.',
    achievements: [
      'Architected full-stack platforms including Boat Ticketing (Kumira), E-Commerce (Better-e-mart), and Retail ERP (Autopilot POS).',
      'Implemented secure authentication flows with multi-factor login, RBAC, and session encryption.',
      'Mentored junior developers on React, TypeScript best practices, and performance optimization — achieving up to 70% faster page loads.',
      'Integrated payment gateways (AamarPay, Stripe) and real-time inventory management.',
    ],
    tech: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'Tailwind CSS', 'Docker'],
  },
  {
    type: 'education',
    code: 'EDU.01',
    role: 'MSc in Computer Science & Engineering',
    company: 'East Delta University',
    location: 'Chattogram, Bangladesh',
    duration: 'January 2025 – Present',
    status: 'In Progress',
    description:
      'Postgraduate research focused on Artificial Intelligence, Machine Learning, and Deep Learning applications in healthcare informatics and high-throughput web systems.',
    achievements: [
      'Researching automated diagnostic pipelines and medical imaging classification models.',
      'Studying advanced distributed architectures, neural networks, and scalable ML model serving.',
    ],
    tech: ['Python', 'PyTorch', 'TensorFlow', 'Computer Vision', 'Deep Learning', 'System Design'],
  },
  {
    type: 'education',
    code: 'EDU.02',
    role: 'BSc in Computer Science & Engineering',
    company: 'East Delta University',
    location: 'Chattogram, Bangladesh',
    duration: 'January 2021 – December 2024',
    status: 'Graduated',
    description:
      'Undergraduate degree establishing rigorous foundations in data structures, algorithms, operating systems, database management, and software engineering.',
    achievements: [
      'Published thesis: "Chest X-ray Classification Using a Hybrid MobileNet-DenseNet Model".',
      'Designed end-to-end full-stack capstone projects and led student engineering study groups.',
    ],
    tech: ['Algorithms', 'Data Structures', 'C++', 'Java', 'SQL', 'DBMS', 'Software Engineering'],
  },
];

export default function Experience() {
  const [activeTab, setActiveTab] = useState<'all' | 'work' | 'education'>('all');
  const filtered = activeTab === 'all' ? CAREER_DATA : CAREER_DATA.filter((i) => i.type === activeTab);

  return (
    <section id="experience" className="ln-exp">
      <style>{`
        .ln-exp {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: var(--void);
          color: var(--ivory);
          padding: var(--section-pad-y) var(--section-pad-x);
        }

        .ln-exp-inner {
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

        .ln-section-title {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(1.75rem, 3.2vw, 2.4rem);
          letter-spacing: -0.025em;
          line-height: 1.15;
          margin-bottom: 12px;
          color: var(--ivory);
        }

        .ln-section-subtitle {
          font-family: var(--font-body);
          font-size: clamp(0.95rem, 1.4vw, 1.05rem);
          color: var(--ivory-muted);
          max-width: 580px;
          line-height: 1.6;
          margin-bottom: 40px;
        }

        /* Filter Tabs */
        .ln-exp-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 44px;
        }

        .ln-exp-tab {
          font-family: var(--font-mono);
          font-size: 11.5px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 7px 16px;
          border-radius: 100px;
          border: 1px solid var(--border-subtle);
          background: transparent;
          color: var(--ivory-dim);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .ln-exp-tab:hover {
          color: var(--ivory);
          border-color: var(--border-hover);
        }

        .ln-exp-tab.active {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.22);
        }

        /* Timeline Container */
        .ln-timeline-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
          position: relative;
        }

        .ln-timeline-list::before {
          content: '';
          position: absolute;
          left: 18px;
          top: 10px;
          bottom: 10px;
          width: 1px;
          background: var(--border-subtle);
        }

        @media (max-width: 640px) {
          .ln-timeline-list::before {
            display: none;
          }
        }

        /* Timeline Item Card */
        .ln-timeline-item {
          position: relative;
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          padding-left: 0;
        }

        @media (min-width: 640px) {
          .ln-timeline-item {
            padding-left: 48px;
          }
        }

        .ln-timeline-marker {
          position: absolute;
          left: 14px;
          top: 26px;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--void);
          border: 2px solid var(--opal-cyan);
          box-shadow: 0 0 10px rgba(125, 211, 252, 0.4);
          z-index: 2;
          display: none;
        }

        @media (min-width: 640px) {
          .ln-timeline-marker {
            display: block;
          }
        }

        .ln-exp-card {
          background: var(--surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 26px 28px;
          backdrop-filter: blur(16px);
          transition: border-color var(--duration-normal) ease, box-shadow var(--duration-normal) ease;
        }

        .ln-exp-card:hover {
          border-color: var(--border-hover);
          box-shadow: 0 16px 36px -12px rgba(0, 0, 0, 0.7);
        }

        .ln-exp-header {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 12px;
        }

        .ln-exp-role {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 600;
          color: var(--ivory);
          letter-spacing: -0.01em;
        }

        .ln-exp-company {
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.04em;
          color: var(--opal-cyan);
        }

        .ln-exp-badge {
          font-family: var(--font-mono);
          font-size: 9.5px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: 4px;
          background: rgba(125, 211, 252, 0.08);
          border: 1px solid rgba(125, 211, 252, 0.2);
          color: var(--opal-cyan);
        }

        .ln-exp-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.04em;
          color: var(--ivory-dim);
          margin-bottom: 16px;
        }

        .ln-exp-desc {
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.65;
          color: var(--ivory-muted);
          margin-bottom: 20px;
        }

        .ln-achievements {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 22px;
        }

        .ln-achievement-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-family: var(--font-body);
          font-size: 13.5px;
          color: var(--ivory-muted);
          line-height: 1.55;
        }

        .ln-achieve-icon {
          color: var(--opal-teal);
          margin-top: 3px;
          flex-shrink: 0;
        }

        .ln-exp-techs {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          padding-top: 16px;
          border-top: 1px solid var(--border-subtle);
        }

        .ln-exp-pill {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.04em;
          color: var(--ivory-dim);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-subtle);
          padding: 3px 8px;
          border-radius: 4px;
        }
      `}</style>

      <div className="ln-exp-inner">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div className="ln-section-label" style={{ margin: 0 }}>
              <TextScramble text="Trajectory // 03" />
            </div>

            <a
              href="/Khaled_Bin_Aziz_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.tick(1200, 0.02)}
              className="ln-copy-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '100px',
                padding: '4px 12px',
                fontSize: '10.5px',
                fontFamily: 'var(--font-mono)',
                color: 'var(--ivory-dim)',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              <span>Download CV</span>
              <span style={{ fontSize: '10px', color: 'var(--opal-cyan)' }}>↗</span>
            </a>
          </div>

          <h2 className="ln-section-title">Professional experience & postgraduate research.</h2>
          <p className="ln-section-subtitle">
            A chronological timeline of engineering roles in production web agencies, academic appointments, and computer science degrees.
          </p>
        </motion.div>

        {/* Filter Tabs with Spring Pill */}
        <div className="ln-exp-tabs">
          {[
            { id: 'all', label: 'All Milestones' },
            { id: 'work', label: 'Engineering Roles' },
            { id: 'education', label: 'Academic & Research' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  sound.tick(1100, 0.02);
                  setActiveTab(tab.id as any);
                }}
                className={`ln-exp-tab ${isActive ? 'active' : ''}`}
                style={{ position: 'relative' }}
              >
                {isActive && (
                  <motion.div
                    layoutId="expFilterPill"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '100px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.22)',
                      zIndex: 0,
                    }}
                    transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                  />
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="ln-timeline-list">
          {filtered.map((item, idx) => (
            <motion.div
              key={item.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: EASE }}
              className="ln-timeline-item"
            >
              <div className="ln-timeline-marker" />

              <div
                className="ln-exp-card"
                onMouseEnter={() => sound.tick(1300, 0.01)}
              >
                <div className="ln-exp-header">
                  <div>
                    <h3 className="ln-exp-role">{item.role}</h3>
                    <div className="ln-exp-company">{item.company}</div>
                  </div>
                  <span className="ln-exp-badge">{item.status}</span>
                </div>

                <div className="ln-exp-meta">
                  <span>{item.duration}</span>
                  <span>•</span>
                  <span>{item.location}</span>
                </div>

                <p className="ln-exp-desc">{item.description}</p>

                <div className="ln-achievements">
                  {item.achievements.map((ach) => (
                    <div key={ach} className="ln-achievement-row">
                      <FiCheckCircle size={13} className="ln-achieve-icon" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                <div className="ln-exp-techs">
                  {item.tech.map((t) => (
                    <span key={t} className="ln-exp-pill">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
