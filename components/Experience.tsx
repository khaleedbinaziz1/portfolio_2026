'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { experiences } from '@/data/experience';
import { FiBriefcase, FiCalendar, FiChevronRight, FiCode } from 'react-icons/fi';

const EASE = [0.22, 0.61, 0.36, 1] as const;

export default function Experience() {
  return (
    <section id="experience" className="experience-section">
      <div className="exp-bg" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px', amount: 0.1 }}
        transition={{ duration: 0.6, ease: [...EASE] }}
        className="exp-content"
      >
        <div className="exp-header">
          <div className="exp-header-line md:hidden" />
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <span className="exp-num">03.</span>
            <h2 className="exp-title">Where I&apos;ve Worked</h2>
          </div>
          <div className="exp-header-line hidden md:block" />
        </div>

        <div className="exp-cards">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [...EASE] }}
              className="exp-card"
            >
              <div className="exp-accent" />
              <div className="exp-terminal-header">
                <div className="exp-terminal-dots">
                  <span className="dot-r" />
                  <span className="dot-y" />
                  <span className="dot-g" />
                </div>
                <div className="exp-terminal-title">
                  <span className="prompt">┌─</span> {exp.company} <span className="prompt">─┐</span>
                </div>
              </div>

              <div className="exp-card-body">
                <div className="exp-company-header">
                  <div className="exp-logo-wrap">
                    {exp.logo ? (
                      <Image
                        src={exp.logo}
                        alt={exp.company}
                        fill
                        className="object-contain p-2"
                        sizes="56px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FiBriefcase size={24} style={{ color: 'var(--retro-mint)' }} />
                      </div>
                    )}
                  </div>
                  <div className="exp-company-info">
                    <div className="exp-position">
                      <span className="prompt">$</span>
                      {exp.position}
                    </div>
                    <div className="exp-meta">
                      <span className="exp-badge">
                        <FiCode size={12} /> {exp.company}
                      </span>
                      <span className="exp-badge">
                        <FiCalendar size={12} /> {exp.duration}
                      </span>
                    </div>
                  </div>
                  <div className="exp-chevron">
                    <FiChevronRight size={20} />
                  </div>
                </div>

                <div className="exp-expandable">
                  <div className="exp-divider" />
                  <div className="exp-section-label">
                    <span className="prompt">$</span> cat achievements.txt
                  </div>
                  <ul className="exp-achievements">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="exp-achievement">
                        <span className="bullet">▸</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="exp-divider" style={{ marginTop: '1rem' }} />
                  <div className="exp-section-label">
                    <span className="prompt">$</span> tech_stack
                  </div>
                  <div className="exp-tech-stack">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="exp-tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </section>
  );
}
