'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { projects } from '@/data/projects';
import Link from 'next/link';
import Image from 'next/image';
import {
  FiFileText,
  FiExternalLink,
  FiGithub,
  FiArrowUpRight,
  FiLayers,
  FiStar,
} from 'react-icons/fi';
import TextScramble from '@/components/TextScramble';
import { sound } from '@/lib/sound';

const EASE = [0.16, 1, 0.3, 1] as const;

type ProjectCategory = 'all' | 'fullstack' | 'dashboards' | 'learning';

const CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Works' },
  { id: 'fullstack', label: 'Full-Stack & APIs' },
  { id: 'dashboards', label: 'ERPs & Dashboards' },
  { id: 'learning', label: 'EdTech & Open Source' },
];

function useTilt<T extends HTMLElement>(strength = 4) {
  const ref = useRef<T | null>(null);
  const raf = useRef<number | null>(null);

  const onMouseMove = (e: React.MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${(-py * strength).toFixed(2)}deg) rotateY(${(px * strength).toFixed(2)}deg) translateY(-3px)`;
    });
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    if (raf.current) cancelAnimationFrame(raf.current);
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return { ref, onMouseMove, onMouseLeave };
}

function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const raf = useRef<number | null>(null);

  const onMouseMove = (e: React.MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    });
  };

  return { ref, onMouseMove };
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const tilt = useTilt<HTMLElement>(4);
  const spotlight = useSpotlight<HTMLElement>();
  const code = `SYS.${String(project.id).padStart(2, '0')}`;

  return (
    <motion.article
      ref={tilt.ref}
      onMouseMove={(e) => {
        tilt.onMouseMove(e);
        spotlight.onMouseMove(e);
      }}
      onMouseLeave={tilt.onMouseLeave}
      onMouseEnter={() => sound.tick(1300, 0.01)}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: EASE }}
      className="ln-project-card"
    >
      {/* Header bar */}
      <div className="ln-project-bar">
        <div className="ln-project-code-wrap">
          <span className="ln-project-dot" />
          <span className="ln-project-code">{code}</span>
        </div>
        <span className="ln-project-status">PRODUCTION</span>
      </div>

      {/* Media Preview */}
      <div className="ln-project-media">
        {project.image ? (
          <div className="ln-project-image-wrap">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="ln-project-img"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="ln-project-overlay" />
          </div>
        ) : (
          <div className="ln-project-placeholder">
            <FiLayers size={28} />
            <span>ARCHITECTURE // PREVIEW</span>
          </div>
        )}

        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="ln-project-float-link"
            aria-label={`Open live site for ${project.title}`}
          >
            <span>Live System</span>
            <FiArrowUpRight size={13} />
          </a>
        )}
      </div>

      {/* Content */}
      <div className="ln-project-body">
        <h3 className="ln-project-title">{project.title}</h3>
        <p className="ln-project-desc">{project.description}</p>

        <div className="ln-project-tech-list">
          {project.tech.map((t) => (
            <span key={t} className="ln-tech-pill">
              {t}
            </span>
          ))}
        </div>

        <div className="ln-project-actions">
          {project.caseStudy && (
            <Link
              href={project.caseStudy}
              className="ln-action-btn ln-action-primary"
            >
              <FiFileText size={12} />
              <span>Case Study</span>
            </Link>
          )}

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="ln-action-btn ln-action-secondary"
            >
              <FiExternalLink size={12} />
              <span>Launch</span>
            </a>
          )}

          {project.github && project.github !== '#' && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="ln-action-btn ln-action-ghost"
              aria-label="View source repository"
            >
              <FiGithub size={13} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>('all');

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'fullstack')
      return p.tech.includes('Node.js') || p.tech.includes('MongoDB');
    if (filter === 'dashboards')
      return (
        p.title.toLowerCase().includes('dashboard') ||
        p.title.toLowerCase().includes('admin') ||
        p.title.toLowerCase().includes('erp') ||
        p.title.toLowerCase().includes('autopilot')
      );
    if (filter === 'learning')
      return (
        p.title.toLowerCase().includes('open stack') ||
        p.title.toLowerCase().includes('takasphere')
      );
    return true;
  });

  const featured = projects.find((p) => p.id === 4) || projects[0];

  return (
    <section id="projects" className="ln-projects">
      <style>{`
        .ln-projects {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: var(--void);
          color: var(--ivory);
          padding: var(--section-pad-y) var(--section-pad-x);
        }

        .ln-projects-inner {
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

        /* Flagship Featured Card */
        .ln-featured {
          position: relative;
          background: var(--surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 28px;
          margin-bottom: 48px;
          overflow: hidden;
          backdrop-filter: blur(16px);
          transition: border-color var(--duration-normal) ease, box-shadow var(--duration-normal) ease;
        }

        .ln-featured:hover {
          border-color: var(--border-hover);
          box-shadow: 0 16px 36px -12px rgba(0, 0, 0, 0.7);
        }

        .ln-featured-inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
          align-items: center;
        }

        @media (min-width: 960px) {
          .ln-featured-inner {
            grid-template-columns: 1.15fr 0.85fr;
            gap: 40px;
          }
        }

        .ln-featured-media {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: #0d0f15;
          border: 1px solid var(--border-subtle);
        }

        .ln-featured-img {
          object-fit: cover;
          transition: transform 0.6s var(--ease-out-expo);
        }

        .ln-featured:hover .ln-featured-img {
          transform: scale(1.025);
        }

        .ln-featured-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          background: rgba(8, 9, 13, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border-subtle);
          border-radius: 100px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.12em;
          color: var(--opal-cyan);
          z-index: 2;
        }

        .ln-featured-label {
          font-family: var(--font-mono);
          font-size: 10.5px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--ivory-dim);
          margin-bottom: 8px;
        }

        .ln-featured-title {
          font-family: var(--font-display);
          font-size: clamp(1.4rem, 2.5vw, 1.85rem);
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin-bottom: 12px;
          color: var(--ivory);
        }

        .ln-featured-desc {
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.65;
          color: var(--ivory-muted);
          margin-bottom: 20px;
        }

        .ln-featured-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-bottom: 20px;
          padding: 12px 0;
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }

        .ln-fstat-val {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 600;
          color: var(--ivory);
        }

        .ln-fstat-lbl {
          font-family: var(--font-mono);
          font-size: 9.5px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ivory-dim);
          margin-top: 2px;
        }

        /* Filter Pills */
        .ln-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 36px;
        }

        .ln-filter-btn {
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

        .ln-filter-btn:hover {
          color: var(--ivory);
          border-color: var(--border-hover);
        }

        .ln-filter-btn.active {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.22);
        }

        /* Grid of Cards */
        .ln-projects-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        @media (min-width: 640px) {
          .ln-projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1080px) {
          .ln-projects-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Card Component */
        .ln-project-card {
          position: relative;
          background: var(--surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          backdrop-filter: blur(16px);
          transition: border-color var(--duration-normal) ease, box-shadow var(--duration-normal) ease;
        }

        .ln-project-card:hover {
          border-color: var(--border-hover);
          box-shadow: 0 16px 36px -12px rgba(0, 0, 0, 0.7);
        }

        .ln-project-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          border-bottom: 1px solid var(--border-subtle);
          background: rgba(0, 0, 0, 0.2);
        }

        .ln-project-code-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .ln-project-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--opal-cyan);
        }

        .ln-project-code {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.16em;
          color: var(--ivory-dim);
        }

        .ln-project-status {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.1em;
          color: var(--opal-teal);
        }

        .ln-project-media {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #0d0f15;
          border-bottom: 1px solid var(--border-subtle);
        }

        .ln-project-image-wrap {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .ln-project-img {
          object-fit: cover;
          transition: transform 0.6s var(--ease-out-expo);
        }

        .ln-project-card:hover .ln-project-img {
          transform: scale(1.035);
        }

        .ln-project-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 50%, rgba(8, 9, 13, 0.5) 100%);
        }

        .ln-project-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: var(--ivory-dim);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.14em;
        }

        .ln-project-float-link {
          position: absolute;
          bottom: 10px;
          right: 10px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 5px 10px;
          background: rgba(8, 9, 13, 0.85);
          backdrop-filter: blur(10px);
          border: 1px solid var(--border-subtle);
          border-radius: 100px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--ivory);
          text-decoration: none;
          opacity: 0;
          transform: translateY(4px);
          transition: all 0.2s ease;
          z-index: 2;
        }

        .ln-project-card:hover .ln-project-float-link {
          opacity: 1;
          transform: translateY(0);
        }

        .ln-project-body {
          padding: 18px 18px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .ln-project-title {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 600;
          letter-spacing: -0.01em;
          margin-bottom: 6px;
          line-height: 1.3;
          color: var(--ivory);
        }

        .ln-project-desc {
          font-family: var(--font-body);
          font-size: 13px;
          line-height: 1.55;
          color: var(--ivory-muted);
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .ln-project-tech-list {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: auto;
          margin-bottom: 16px;
          padding-top: 12px;
          border-top: 1px solid var(--border-subtle);
        }

        .ln-tech-pill {
          font-family: var(--font-mono);
          font-size: 9.5px;
          letter-spacing: 0.04em;
          color: var(--ivory-dim);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-subtle);
          padding: 2px 7px;
          border-radius: 4px;
        }

        .ln-project-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ln-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-body);
          font-size: 11.5px;
          font-weight: 500;
          padding: 6px 14px;
          border-radius: 100px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .ln-action-primary {
          background: var(--ivory);
          color: #08090d;
        }

        .ln-action-primary:hover {
          background: #ffffff;
          transform: translateY(-1px);
        }

        .ln-action-secondary {
          background: transparent;
          color: var(--ivory-muted);
          border: 1px solid var(--border-default);
        }

        .ln-action-secondary:hover {
          border-color: var(--border-hover);
          color: var(--ivory);
        }

        .ln-action-ghost {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 100px;
          color: var(--ivory-dim);
          border: 1px solid var(--border-subtle);
          transition: all 0.2s ease;
          margin-left: auto;
        }

        .ln-action-ghost:hover {
          color: var(--ivory);
          border-color: var(--border-hover);
        }
      `}</style>

      <div className="ln-projects-inner">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="ln-section-label">
            <TextScramble text="Works // 04" />
          </div>
          <h2 className="ln-section-title">Production systems & platforms.</h2>
          <p className="ln-section-subtitle">
            A curated index of full-stack platforms, retail ERP suites, and developer tooling engineered for real-world resilience.
          </p>
        </motion.div>

        {/* Flagship Showcase */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.65, ease: EASE }}
            className="ln-featured"
          >
            <div className="ln-featured-inner">
              <div className="ln-featured-media">
                <span className="ln-featured-badge">
                  <FiStar size={11} />
                  <span>FLAGSHIP PLATFORM</span>
                </span>
                {featured.image && (
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="ln-featured-img"
                    priority
                    sizes="(max-width: 960px) 100vw, 620px"
                  />
                )}
              </div>

              <div className="ln-featured-content">
                <div className="ln-featured-label">ENTERPRISE ERP & RETAIL MANAGEMENT</div>
                <h3 className="ln-featured-title">{featured.title}</h3>
                <p className="ln-featured-desc">
                  {featured.longDescription || featured.description}
                </p>

                <div className="ln-featured-stats">
                  <div>
                    <div className="ln-fstat-val">Full-Stack</div>
                    <div className="ln-fstat-lbl">Architecture</div>
                  </div>
                  <div>
                    <div className="ln-fstat-val">Multi-Role</div>
                    <div className="ln-fstat-lbl">RBAC Auth</div>
                  </div>
                  <div>
                    <div className="ln-fstat-val">Real-Time</div>
                    <div className="ln-fstat-lbl">Inventory Sync</div>
                  </div>
                </div>

                <div className="ln-project-tech-list" style={{ marginBottom: '18px' }}>
                  {featured.tech.map((t) => (
                    <span key={t} className="ln-tech-pill">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="ln-project-actions">
                  {featured.caseStudy && (
                    <Link
                      href={featured.caseStudy}
                      className="ln-action-btn ln-action-primary"
                    >
                      <FiFileText size={12} />
                      <span>Case Study</span>
                    </Link>
                  )}
                  {featured.live && (
                    <a
                      href={featured.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ln-action-btn ln-action-secondary"
                    >
                      <FiExternalLink size={12} />
                      <span>Live Dashboard</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filter Pills with Spring Animation */}
        <div className="ln-filters">
          {CATEGORIES.map((cat) => {
            const isActive = filter === cat.id;
            let count = projects.length;
            if (cat.id === 'fullstack') count = projects.filter((p) => p.tech.includes('Node.js') || p.tech.includes('MongoDB')).length;
            else if (cat.id === 'dashboards') count = projects.filter((p) => p.title.toLowerCase().includes('dashboard') || p.title.toLowerCase().includes('erp') || p.title.toLowerCase().includes('autopilot')).length;
            else if (cat.id === 'learning') count = projects.filter((p) => p.title.toLowerCase().includes('open stack') || p.title.toLowerCase().includes('takasphere')).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  sound.tick(1100, 0.02);
                  setFilter(cat.id);
                }}
                className={`ln-filter-btn ${isActive ? 'active' : ''}`}
                style={{ position: 'relative' }}
              >
                {isActive && (
                  <motion.div
                    layoutId="projectFilterPill"
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
                <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span>{cat.label}</span>
                  <span style={{ fontSize: '9px', opacity: 0.6, fontFamily: 'var(--font-mono)' }}>({count})</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid of Projects */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="ln-projects-grid"
          >
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}