'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  SiReact, SiNodedotjs, SiTypescript, SiMongodb, SiTailwindcss, SiGit,
  SiNextdotjs, SiExpress, SiMysql, SiFirebase, SiDocker, SiVercel,
  SiPrisma, SiStripe, SiPhp, SiClerk,
} from 'react-icons/si';
import { TbBrandFramerMotion } from 'react-icons/tb';
import { FiCopy, FiCheck } from 'react-icons/fi';
import TextScramble from '@/components/TextScramble';
import { sound } from '@/lib/sound';

const EASE = [0.16, 1, 0.3, 1] as const;

type SkillCategory = {
  code: string;
  name: string;
  description: string;
  technologies: {
    name: string;
    icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
    color: string;
    highlight?: string;
    proficiency?: number;
  }[];
};

const CATEGORIES: SkillCategory[] = [
  {
    code: '01',
    name: 'Frontend & UI',
    description: 'High-performance reactive interfaces and design systems',
    technologies: [
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', highlight: 'Strict typing' },
      { name: 'React', icon: SiReact, color: '#61DAFB', highlight: 'v18 / v19' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#f1f3f7', highlight: 'App Router' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38BDF8', highlight: 'Utility Design' },
      { name: 'Framer Motion', icon: TbBrandFramerMotion, color: '#EF008F', highlight: 'Kinetic Physics' },
    ],
  },
  {
    code: '02',
    name: 'Backend & APIs',
    description: 'Scalable service architectures and distributed endpoints',
    technologies: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E', highlight: 'Event Loop' },
      { name: 'Express.js', icon: SiExpress, color: '#f1f3f7', highlight: 'RESTful Services' },
      { name: 'PHP', icon: SiPhp, color: '#8892BF', highlight: 'Legacy & Modern' },
      { name: 'Prisma ORM', icon: SiPrisma, color: '#5A67D8', highlight: 'Type-Safe Queries' },
    ],
  },
  {
    code: '03',
    name: 'Data & Storage',
    description: 'Relational & document data models with optimized indexes',
    technologies: [
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248', highlight: 'Document Store' },
      { name: 'Firestore', icon: SiFirebase, color: '#FFCA28', highlight: 'Real-Time Sync' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1', highlight: 'ACID Transactions' },
    ],
  },
  {
    code: '04',
    name: 'Cloud & Infrastructure',
    description: 'Automated CI/CD pipelines, containerization, and hosting',
    technologies: [
      { name: 'Docker', icon: SiDocker, color: '#2496ED', highlight: 'Containers' },
      { name: 'Vercel', icon: SiVercel, color: '#f1f3f7', highlight: 'Edge Deploy' },
      { name: 'Git & GitHub', icon: SiGit, color: '#F05133', highlight: 'Version Control' },
    ],
  },
  {
    code: '05',
    name: 'Security & Auth',
    description: 'Session authentication, token validation, and payments',
    technologies: [
      { name: 'Clerk', icon: SiClerk, color: '#6C47FF', highlight: 'User Management' },
      { name: 'Firebase Auth', icon: SiFirebase, color: '#FFCA28', highlight: 'Multi-Factor' },
      { name: 'Stripe', icon: SiStripe, color: '#635BFF', highlight: 'Checkout APIs' },
    ],
  },
];

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

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [copiedStack, setCopiedStack] = useState(false);
  const spotlight = useSpotlight<HTMLDivElement>();

  const copyStack = () => {
    const list = CATEGORIES.flatMap((c) => c.technologies.map((t) => t.name)).join(', ');
    navigator.clipboard.writeText(`Khaled Bin Aziz Tech Stack: ${list}`);
    setCopiedStack(true);
    sound.success();
    setTimeout(() => setCopiedStack(false), 2400);
  };

  const filteredCategories =
    activeFilter === 'all'
      ? CATEGORIES
      : CATEGORIES.filter((c) =>
          c.name.toLowerCase().includes(activeFilter.toLowerCase())
        );

  return (
    <section id="skills" className="ln-skills">
      <style>{`
        .ln-skills {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: var(--void);
          color: var(--ivory);
          padding: var(--section-pad-y) var(--section-pad-x);
        }

        .ln-skills-inner {
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
        .ln-skills-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 44px;
        }

        .ln-filter-chip {
          position: relative;
          font-family: var(--font-mono);
          font-size: 11.5px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 7px 16px;
          border-radius: 100px;
          background: transparent;
          border: 1px solid var(--border-subtle);
          color: var(--ivory-dim);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .ln-filter-chip:hover {
          color: var(--ivory);
          border-color: var(--border-hover);
        }

        .ln-filter-chip.active {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.22);
        }

        /* Category Grid */
        .ln-categories-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        @media (min-width: 768px) {
          .ln-categories-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1100px) {
          .ln-categories-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Category Card */
        .ln-skill-card {
          position: relative;
          background: var(--surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 24px;
          display: flex;
          flex-direction: column;
          backdrop-filter: blur(16px);
          transition: border-color var(--duration-normal) ease, box-shadow var(--duration-normal) ease;
        }

        .ln-skill-card:hover {
          border-color: var(--border-hover);
          box-shadow: 0 16px 36px -12px rgba(0, 0, 0, 0.7);
        }

        .ln-card-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .ln-card-code {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.16em;
          color: var(--opal-cyan);
        }

        .ln-card-count {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.1em;
          color: var(--ivory-dim);
        }

        .ln-card-title {
          font-family: var(--font-display);
          font-size: 17px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--ivory);
          margin-bottom: 6px;
        }

        .ln-card-desc {
          font-family: var(--font-body);
          font-size: 12.5px;
          color: var(--ivory-muted);
          line-height: 1.5;
          margin-bottom: 20px;
        }

        /* Tech Pills */
        .ln-tech-stack {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: auto;
        }

        .ln-tech-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
        }

        .ln-tech-row:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: var(--border-hover);
          transform: translateX(2px);
        }

        .ln-tech-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ln-tech-icon {
          font-size: 16px;
          flex-shrink: 0;
        }

        .ln-tech-name {
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 500;
          color: var(--ivory);
        }

        .ln-tech-highlight {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.06em;
          color: var(--ivory-dim);
        }
      `}</style>

      <div className="ln-skills-inner">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div className="ln-section-label" style={{ margin: 0 }}>
              <TextScramble text="Capabilities // 02" />
            </div>

            <button
              type="button"
              onClick={copyStack}
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
                cursor: 'pointer',
              }}
            >
              {copiedStack ? (
                <>
                  <FiCheck size={11} color="var(--opal-teal)" />
                  <span style={{ color: 'var(--opal-teal)' }}>Stack Copied!</span>
                </>
              ) : (
                <>
                  <FiCopy size={11} />
                  <span>Copy Full Stack</span>
                </>
              )}
            </button>
          </div>

          <h2 className="ln-section-title">Engineered stack & technical competencies.</h2>
          <p className="ln-section-subtitle">
            A comprehensive overview of production tooling, runtime environments, and database technologies utilized across client and open-source platforms.
          </p>
        </motion.div>

        {/* Filter Pills with Spring Animation */}
        <div className="ln-skills-filters">
          {[
            { id: 'all', label: 'All Technologies' },
            { id: 'frontend', label: 'Frontend & UI' },
            { id: 'backend', label: 'Backend & APIs' },
            { id: 'data', label: 'Data & Storage' },
            { id: 'cloud', label: 'Cloud & DevOps' },
          ].map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  sound.tick(1100, 0.02);
                  setActiveFilter(cat.id);
                }}
                className={`ln-filter-chip ${isActive ? 'active' : ''}`}
                style={{ position: 'relative' }}
              >
                {isActive && (
                  <motion.div
                    layoutId="skillFilterPill"
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
                <span style={{ position: 'relative', zIndex: 1 }}>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Grid of Categories */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="ln-categories-grid"
          >
            {filteredCategories.map((category, idx) => (
              <motion.div
                key={category.code}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: EASE }}
                className="ln-skill-card"
              >
                <div className="ln-card-meta">
                  <span className="ln-card-code">DOMAIN // {category.code}</span>
                  <span className="ln-card-count">{category.technologies.length} TECHNOLOGIES</span>
                </div>

                <h3 className="ln-card-title">{category.name}</h3>
                <p className="ln-card-desc">{category.description}</p>

                <div className="ln-tech-stack">
                  {category.technologies.map((t) => {
                    const Icon = t.icon;
                    return (
                      <div
                        key={t.name}
                        className="ln-tech-row"
                        onMouseEnter={() => sound.tick(1300, 0.01)}
                      >
                        <div className="ln-tech-left">
                          <Icon className="ln-tech-icon" style={{ color: t.color }} />
                          <span className="ln-tech-name">{t.name}</span>
                        </div>
                        {t.highlight && (
                          <span className="ln-tech-highlight">{t.highlight}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}