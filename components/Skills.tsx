'use client';

import { motion } from 'framer-motion';
import {
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiMongodb,
  SiTailwindcss,
  SiGit,
  SiNextdotjs,
  SiExpress,
  SiMysql,
  SiFirebase,
  SiDocker,
  SiAwsamplify,
  SiVercel,
  SiPrisma,
  SiStripe,
  SiPhp,
  SiClerk,
} from 'react-icons/si';
import { TbBrandFramerMotion } from 'react-icons/tb';
import { plexMono, plexSerif, plexSans } from '@/public/fonts';

type Accent = 'brass' | 'teal';

const technologyCategories: {
  code: string;
  name: string;
  cmd: string;
  accent: Accent;
  technologies: { name: string; icon: React.ComponentType<{ className?: string }> }[];
}[] = [
  {
    code: 'SKL.01',
    name: 'Frontend Development',
    cmd: 'ls -la /skills/frontend',
    accent: 'teal',
    technologies: [
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'React', icon: SiReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'Framer Motion', icon: TbBrandFramerMotion },
    ],
  },
  {
    code: 'SKL.02',
    name: 'Backend & APIs',
    cmd: 'cat /skills/backend/*',
    accent: 'brass',
    technologies: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Express.js', icon: SiExpress },
      { name: 'PHP', icon: SiPhp },
      { name: 'Prisma ORM', icon: SiPrisma },
    ],
  },
  {
    code: 'SKL.03',
    name: 'Database & Storage',
    cmd: 'show databases',
    accent: 'teal',
    technologies: [
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'Firestore', icon: SiFirebase },
      { name: 'MySQL', icon: SiMysql },
    ],
  },
  {
    code: 'SKL.04',
    name: 'DevOps & Cloud',
    cmd: 'kubectl get deployments',
    accent: 'brass',
    technologies: [
      { name: 'Docker', icon: SiDocker },
      { name: 'AWS', icon: SiAwsamplify },
      { name: 'Vercel', icon: SiVercel },
      { name: 'Git/GitHub', icon: SiGit },
    ],
  },
  {
    code: 'SKL.05',
    name: 'Authentication & Payments',
    cmd: 'auth --status',
    accent: 'teal',
    technologies: [
      { name: 'Clerk', icon: SiClerk },
      { name: 'Firebase Auth', icon: SiFirebase },
      { name: 'Stripe', icon: SiStripe },
    ],
  },
];

const EASE = [0.22, 0.61, 0.36, 1] as const;
const STAGGER = 0.08;

export default function Skills() {
  return (
    <section
      id="skills"
      className={`khb-skills ${plexMono.variable} ${plexSerif.variable} ${plexSans.variable}`}
    >
      <style>{`
        .khb-skills {
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
        .khb-skills *, .khb-skills *::before, .khb-skills *::after { box-sizing: border-box; }
        @media (min-width: 960px) { .khb-skills { padding: 140px 40px; } }

        .khb-skills .khb-skills-grid-bg {
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(217,169,78,0.22) 1px, transparent 1px);
          background-size: 26px 26px;
          opacity: 0.3;
          pointer-events: none;
        }

        .khb-skills .khb-skills-inner {
          position: relative;
          max-width: 1180px;
          margin: 0 auto;
        }

        .khb-skills .khb-tag {
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
        .khb-skills .khb-tag--teal { color: var(--teal); border-color: rgba(95,227,214,0.35); }

        .khb-skills .khb-skills-cmdline {
          font-family: var(--khb-font-mono), monospace;
          font-size: 13px;
          color: var(--muted);
          margin-bottom: 18px;
        }
        .khb-skills .khb-skills-cmdline .prompt { color: var(--brass); margin-right: 6px; }
        .khb-skills .khb-skills-cursor {
          display: inline-block;
          width: 7px;
          height: 14px;
          margin-left: 4px;
          background: var(--teal);
          vertical-align: middle;
          animation: khb-skills-blink 1.1s steps(2, start) infinite;
        }
        @keyframes khb-skills-blink { to { opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .khb-skills .khb-skills-cursor { animation: none; } }

        .khb-skills .khb-skills-title {
          font-family: var(--khb-font-mono), monospace;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          font-size: clamp(2rem, 5vw, 3rem);
          margin: 14px 0 8px;
        }
        .khb-skills .khb-skills-subtitle {
          font-style: italic;
          font-family: var(--khb-font-serif), serif;
          color: var(--muted);
          margin: 0 0 4px;
        }
        .khb-skills .khb-skills-note {
          font-family: var(--khb-font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--muted-2);
        }

        .khb-skills .khb-skills-cards {
          margin-top: 48px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 640px) { .khb-skills .khb-skills-cards { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .khb-skills .khb-skills-cards { grid-template-columns: repeat(3, 1fr); } }

        .khb-skills .khb-skills-card {
          background: var(--panel);
          border: 1px solid var(--card-border, rgba(217,169,78,0.3));
          border-radius: 6px;
          overflow: hidden;
          transition: transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s ease, border-color .3s ease;
        }
        .khb-skills .khb-skills-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 36px -18px rgba(0,0,0,0.6);
        }

        .khb-skills .khb-skills-card-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          background: rgba(245,241,232,0.04);
          border-bottom: 1px solid rgba(245,241,232,0.08);
        }
        .khb-skills .khb-skills-card-code {
          font-family: var(--khb-font-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: var(--card-accent, var(--brass));
        }
        .khb-skills .khb-skills-card-dots { display: flex; gap: 6px; }
        .khb-skills .khb-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
        .khb-skills .khb-dot-teal { background: var(--teal); opacity: 0.7; }
        .khb-skills .khb-dot-brass { background: var(--brass); opacity: 0.7; }
        .khb-skills .khb-dot-muted { background: var(--muted-2); }

        .khb-skills .khb-skills-card-body { padding: 20px 20px 18px; }
        .khb-skills .khb-skills-card-cmd {
          font-family: var(--khb-font-mono), monospace;
          font-size: 12px;
          color: var(--muted);
          margin-bottom: 10px;
        }
        .khb-skills .khb-skills-card-cmd .prompt { color: var(--card-accent, var(--brass)); margin-right: 6px; }
        .khb-skills .khb-skills-card-heading {
          font-family: var(--khb-font-mono), monospace;
          font-size: 17px;
          font-weight: 600;
          margin: 0 0 16px;
        }

        .khb-skills .khb-skills-tech-list { list-style: none; margin: 0; padding: 0; }
        .khb-skills .khb-skills-tech-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 7px 0;
          border-bottom: 1px solid rgba(245,241,232,0.06);
        }
        .khb-skills .khb-skills-tech-row:last-child { border-bottom: none; }
        .khb-skills .khb-skills-tech-icon {
          font-size: 15px;
          color: var(--muted);
          flex-shrink: 0;
        }
        .khb-skills .khb-skills-tech-label {
          font-family: var(--khb-font-sans), sans-serif;
          font-size: 13.5px;
          color: var(--paper);
          flex: 1;
        }
        .khb-skills .khb-skills-tech-check {
          font-family: var(--khb-font-mono), monospace;
          font-size: 12px;
          color: var(--card-accent, var(--brass));
        }

        .khb-skills .khb-skills-card-footer {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 14px;
          padding-top: 12px;
          border-top: 1px dashed rgba(245,241,232,0.14);
          font-family: var(--khb-font-mono), monospace;
          font-size: 10.5px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted-2);
        }
        .khb-skills .khb-skills-card-footer-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--card-accent, var(--brass));
        }

        .khb-skills .khb-skills-status {
          margin-top: 40px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--khb-font-mono), monospace;
          font-size: 12px;
          color: var(--muted);
          background: var(--panel);
          border: 1px solid rgba(217,169,78,0.25);
          border-radius: 4px;
          padding: 8px 14px;
        }
        .khb-skills .khb-skills-status-dot { color: var(--teal); }
      `}</style>

      <div className="khb-skills-grid-bg" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: EASE }}
        className="khb-skills-inner"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="khb-tag khb-tag--teal">SKILLS · 01</span>

          <div className="khb-skills-cmdline" style={{ marginTop: 18 }}>
            <span className="prompt">$</span>cd /skills
            <span className="khb-skills-cursor" aria-hidden="true" />
          </div>

          <h2 className="khb-skills-title">Skills &amp; Expertise</h2>
          <p className="khb-skills-subtitle">Technologies for modern, scalable applications.</p>
          <p className="khb-skills-note" aria-hidden="true">
            // {technologyCategories.length} categories loaded
          </p>
        </motion.div>

        <div className="khb-skills-cards">
          {technologyCategories.map((category, categoryIndex) => {
            const accentColor = category.accent === 'brass' ? '#D9A94E' : '#5FE3D6';
            const accentBorder =
              category.accent === 'brass' ? 'rgba(217,169,78,0.3)' : 'rgba(95,227,214,0.3)';
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: categoryIndex * STAGGER, ease: EASE }}
                className="khb-skills-card"
                style={
                  {
                    '--card-accent': accentColor,
                    '--card-border': accentBorder,
                  } as React.CSSProperties
                }
              >
                <div className="khb-skills-card-bar">
                  <span className="khb-skills-card-code">{category.code}</span>
                  <div className="khb-skills-card-dots">
                    <span className="khb-dot khb-dot-teal" />
                    <span className="khb-dot khb-dot-brass" />
                    <span className="khb-dot khb-dot-muted" />
                  </div>
                </div>

                <div className="khb-skills-card-body">
                  <div className="khb-skills-card-cmd">
                    <span className="prompt">$</span>
                    {category.cmd}
                  </div>
                  <h3 className="khb-skills-card-heading">{category.name}</h3>

                  <ul className="khb-skills-tech-list">
                    {category.technologies.map((tech) => {
                      const Icon = tech.icon;
                      return (
                        <li key={tech.name} className="khb-skills-tech-row">
                          <Icon className="khb-skills-tech-icon" />
                          <span className="khb-skills-tech-label">{tech.name}</span>
                          <span className="khb-skills-tech-check">✓</span>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="khb-skills-card-footer">
                    <span className="khb-skills-card-footer-dot" />
                    <span>{category.technologies.length} loaded</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7, ease: EASE }}
          className="khb-skills-status"
        >
          <span className="khb-skills-status-dot">●</span>
          All systems operational
          <span className="khb-skills-cursor" aria-hidden="true" />
        </motion.div>
      </motion.div>
    </section>
  );
}