'use client';

import { useState } from 'react';
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

const technologyCategories = [
  {
    name: 'Frontend Development',
    cmd: 'ls -la /skills/frontend',
    technologies: [
      { name: 'TypeScript', icon: SiTypescript, color: '#e040fb' },
      { name: 'React', icon: SiReact, color: '#00ffcc' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#ffdd99' },
      // { name: 'Redux Toolkit', icon: SiRedux, color: 'var(--retro-amber)' },
      { name: 'Framer Motion', icon: TbBrandFramerMotion, color: '#e040fb' },
    ],
  },
  {
    name: 'Backend & APIs',
    cmd: 'cat /skills/backend/*',
    technologies: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#e040fb' },
      { name: 'Express.js', icon: SiExpress, color: '#ffffff' },
      { name: 'PHP', icon: SiPhp, color: 'var(--retro-amber)' },
      // { name: 'GraphQL', icon: SiGraphql, color: '#00ffcc' },
      // { name: 'Socket.io', icon: SiSocketdotio, color: '#e040fb' },
      { name: 'Prisma ORM', icon: SiPrisma, color: '#ffffff' },
      // { name: 'FastAPI', icon: SiFastapi, color: '#ffdd99' },
    ],
  },
  {
    name: 'Database & Storage',
    cmd: 'show databases',
    technologies: [
      // { name: 'PostgreSQL', icon: SiPostgresql, color: '#e040fb' },
      { name: 'MongoDB', icon: SiMongodb, color: '#00ffcc' },
      { name: 'Firestore', icon: SiFirebase, color: '#ffdd99' },
      { name: 'MySQL', icon: SiMysql, color: 'var(--retro-amber)' },
    ],
  },
  // {
  //   name: 'Testing & Quality',
  //   cmd: 'npm run test',
  //   technologies: [
  //     { name: 'Jest', icon: SiJest, color: '#e040fb' },
  //     { name: 'Cypress', icon: SiCypress, color: '#ffffff' },
  //     { name: 'React Testing Library', icon: SiReact, color: '#00ffcc' },
  //   ],
  // },
  {
    name: 'DevOps & Cloud',
    cmd: 'kubectl get deployments',
    technologies: [
      { name: 'Docker', icon: SiDocker, color: '#e040fb' },
      { name: 'AWS', icon: SiAwsamplify, color: 'var(--retro-amber)' },
      { name: 'Vercel', icon: SiVercel, color: '#ffffff' },
      // { name: 'Nginx', icon: SiNginx, color: '#00ffcc' },
      { name: 'Git/GitHub', icon: SiGit, color: '#ffdd99' },
    ],
  },
  {
    name: 'Authentication & Payments',
    cmd: 'auth --status',
    technologies: [
      { name: 'Clerk', icon: SiClerk, color: '#e040fb' },
      { name: 'Firebase Auth', icon: SiFirebase, color: '#ffdd99' },
      { name: 'Stripe', icon: SiStripe, color: '#00ffcc' },
    ],
  },
];

const EASE = [0.22, 0.61, 0.36, 1] as const;
const STAGGER = 0.1;

export default function Skills() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section
      id="skills"
      className="skills-section relative min-h-screen py-20 md:py-28 overflow-hidden"
    >
      <div className="skills-bg" aria-hidden="true" />
      <div className="skills-glow" aria-hidden="true" />
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 1px, rgba(224,64,251,0.4) 1px, transparent 2px)',
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 90% 70% at 50% 50%, transparent 0%, rgba(20,12,8,0.3) 50%, rgba(10,6,4,0.85) 100%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [...EASE] }}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
      >
        <div className="mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [...EASE] }}
            className="relative inline-block"
          >
            <div className="mb-4 font-mono text-xs md:text-sm">
              <div 
                className="inline-block px-3 py-1.5 rounded-t-lg border-t border-x"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  borderColor: 'rgba(224, 64, 251, 0.3)',
                }}
              >
                <span style={{ color: 'var(--retro-amber)' }}>$</span>
                <span style={{ color: 'rgba(167, 139, 250, 0.75)' }}> cd /skills</span>
                <span 
                  className="skills-terminal-cursor inline-block w-2 h-4 ml-1 align-middle"
                  style={{ backgroundColor: '#e040fb' }}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <span 
                className="font-mono text-lg md:text-xl font-bold"
                style={{ color: 'var(--retro-amber)' }}
              >
                02.
              </span>
              <h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
                style={{ 
                  color: '#e040fb',
                  textShadow: '0 0 20px rgba(224, 64, 251, 0.3), 0 0 40px rgba(224, 64, 251, 0.1)',
                }}
              >
                Skills & Expertise
              </h2>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="mt-3 font-mono text-sm md:text-base"
              style={{ color: 'rgba(167, 139, 250, 0.75)' }}
            >
              &gt; Technologies for modern, scalable applications
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-1 font-mono text-xs"
              style={{ color: 'rgba(255, 187, 85, 0.4)' }}
              aria-hidden
            >
              // {technologyCategories.length} categories loaded
            </motion.p>
          </motion.div>
        </div>

        <div className="skills-cards-grid">
          {technologyCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: categoryIndex * STAGGER,
                ease: [...EASE],
              }}
              onHoverStart={() => setHoveredCard(categoryIndex)}
              onHoverEnd={() => setHoveredCard(null)}
              className="skills-card group"
            >
              <div className="skills-card-inner">
                <div className="skills-card-title-bar">
                  <span className="skills-card-dot skills-card-dot-r" />
                  <span className="skills-card-dot skills-card-dot-m" />
                  <span className="skills-card-dot skills-card-dot-g" />
                </div>

                <div className="skills-card-body">
                  <div className="skills-card-cmd">
                    <span className="skills-card-prompt">$</span> {category.cmd}
                  </div>
                  <h3 className="skills-card-heading">{category.name}</h3>

                  <ul className="skills-tech-list">
                    {category.technologies.map((tech, techIndex) => {
                      const Icon = tech.icon;
                      return (
                        <motion.li
                          key={tech.name}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: categoryIndex * STAGGER + techIndex * 0.04,
                            duration: 0.35,
                          }}
                          className="skills-tech-row"
                        >
                          <span className="skills-tech-icon-wrap">
                            <Icon className="skills-tech-icon-svg" style={{ color: tech.color }} />
                          </span>
                          <span className="skills-tech-label">{tech.name}</span>
                          <span className="skills-tech-check">✓</span>
                        </motion.li>
                      );
                    })}
                  </ul>

                  <div className="skills-card-footer">
                    <span className="skills-card-footer-dot" />
                    <span>{category.technologies.length} loaded</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8, ease: [...EASE] }}
          className="mt-12 font-mono text-xs"
        >
          <div 
            className="inline-block px-3 py-1.5 rounded border"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderColor: 'rgba(224, 64, 251, 0.3)',
              color: 'rgba(167, 139, 250, 0.75)',
            }}
          >
            <span style={{ color: '#4caf50' }}>●</span> All systems operational
            <span 
              className="skills-terminal-cursor inline-block w-2 h-4 ml-2 align-middle"
              style={{ backgroundColor: '#e040fb' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}