'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiMongodb,
  SiTailwindcss,
  SiGraphql,
  SiGit,
  SiNextdotjs,
  SiRedux,
  SiExpress,
  SiPostgresql,
  SiMysql,
  SiFirebase,
  SiDocker,
  SiAwsamplify,
  SiVercel,
  SiPrisma,
  SiSocketdotio,
  SiJest,
  SiCypress,
  SiNginx,
  SiStripe,
  SiFastapi,
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
      { name: 'React 18', icon: SiReact, color: '#00ffcc' },
      { name: 'Next.js 14', icon: SiNextdotjs, color: '#ffffff' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#ffdd99' },
      { name: 'Redux Toolkit', icon: SiRedux, color: 'var(--retro-amber)' },
      { name: 'Framer Motion', icon: TbBrandFramerMotion, color: '#e040fb' },
    ],
  },
  {
    name: 'Backend & APIs',
    cmd: 'cat /skills/backend/*',
    technologies: [
      { name: 'Node.js 20', icon: SiNodedotjs, color: '#e040fb' },
      { name: 'Express.js', icon: SiExpress, color: '#ffffff' },
      { name: 'PHP', icon: SiPhp, color: 'var(--retro-amber)' },
      { name: 'GraphQL', icon: SiGraphql, color: '#00ffcc' },
      { name: 'Socket.io', icon: SiSocketdotio, color: '#e040fb' },
      { name: 'Prisma ORM', icon: SiPrisma, color: '#ffffff' },
      { name: 'FastAPI', icon: SiFastapi, color: '#ffdd99' },
    ],
  },
  {
    name: 'Database & Storage',
    cmd: 'show databases',
    technologies: [
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#e040fb' },
      { name: 'MongoDB', icon: SiMongodb, color: '#00ffcc' },
      { name: 'Firestore', icon: SiFirebase, color: '#ffdd99' },
      { name: 'MySQL', icon: SiMysql, color: 'var(--retro-amber)' },
    ],
  },
  {
    name: 'Testing & Quality',
    cmd: 'npm run test',
    technologies: [
      { name: 'Jest', icon: SiJest, color: '#e040fb' },
      { name: 'Cypress', icon: SiCypress, color: '#ffffff' },
      { name: 'React Testing Library', icon: SiReact, color: '#00ffcc' },
    ],
  },
  {
    name: 'DevOps & Cloud',
    cmd: 'kubectl get deployments',
    technologies: [
      { name: 'Docker', icon: SiDocker, color: '#e040fb' },
      { name: 'AWS', icon: SiAwsamplify, color: 'var(--retro-amber)' },
      { name: 'Vercel', icon: SiVercel, color: '#ffffff' },
      { name: 'Nginx', icon: SiNginx, color: '#00ffcc' },
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
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 0.05);
    }, 200);
    return () => clearInterval(interval);
  }, []);

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
                  className="inline-block w-2 h-4 ml-1 align-middle"
                  style={{
                    backgroundColor: '#e040fb',
                    opacity: Math.floor(time * 2) % 2 === 0 ? 1 : 0,
                  }}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {technologyCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ 
                duration: 0.6, 
                delay: categoryIndex * STAGGER, 
                ease: [...EASE] 
              }}
              onHoverStart={() => setHoveredCard(categoryIndex)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group relative"
            >
              <div 
                className="relative border rounded-lg p-4 md:p-5 transition-all duration-500"
                style={{
                  backgroundColor: hoveredCard === categoryIndex 
                    ? 'rgba(0, 0, 0, 0.7)' 
                    : 'rgba(0, 0, 0, 0.5)',
                  borderColor: hoveredCard === categoryIndex
                    ? 'rgba(224, 64, 251, 0.5)'
                    : 'rgba(224, 64, 251, 0.2)',
                  boxShadow: hoveredCard === categoryIndex
                    ? '0 0 30px rgba(224, 64, 251, 0.15), inset 0 0 20px rgba(224, 64, 251, 0.05)'
                    : '0 0 10px rgba(224, 64, 251, 0.05)',
                }}
              >
                <div 
                  className="absolute top-0 left-0 right-0 h-6 rounded-t-lg border-b flex items-center px-2.5 gap-1"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    borderColor: 'rgba(224, 64, 251, 0.2)',
                  }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#ff6b6b' }} />
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#e040fb' }} />
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4caf50' }} />
                </div>

                <div className="mt-5 mb-3">
                  <div className="font-mono text-xs mb-2" style={{ color: 'rgba(167, 139, 250, 0.5)' }}>
                    <span style={{ color: 'var(--retro-amber)' }}>$</span> {category.cmd}
                  </div>
                  <h3 
                    className="text-base md:text-lg font-bold font-mono transition-all duration-300"
                    style={{ 
                      color: hoveredCard === categoryIndex ? '#e040fb' : 'rgba(167, 139, 250, 0.85)',
                      textShadow: hoveredCard === categoryIndex 
                        ? '0 0 10px rgba(224, 64, 251, 0.3)' 
                        : 'none',
                    }}
                  >
                    {category.name}
                  </h3>
                </div>

                <div className="space-y-0.5">
                  {category.technologies.map((tech, techIndex) => {
                    const Icon = tech.icon;
                    return (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: categoryIndex * STAGGER + techIndex * 0.04,
                          duration: 0.35,
                        }}
                        className="flex items-center gap-2 py-1.5 px-2 rounded transition-all duration-300"
                        style={{
                          backgroundColor: hoveredCard === categoryIndex 
                            ? 'rgba(224, 64, 251, 0.06)' 
                            : 'transparent',
                        }}
                      >
                        <div 
                          className="flex items-center justify-center w-5 h-5 rounded shrink-0 transition-transform duration-300 group-hover:scale-105"
                          style={{ backgroundColor: 'rgba(224, 64, 251, 0.1)' }}
                        >
                          <Icon className="w-3.5 h-3.5" style={{ color: tech.color }} />
                        </div>
                        <span 
                          className="font-mono text-xs md:text-sm flex-1"
                          style={{ color: 'rgba(167, 139, 250, 0.85)' }}
                        >
                          {tech.name}
                        </span>
                        <span 
                          className="font-mono text-[10px] opacity-0 group-hover:opacity-50 transition-opacity"
                          style={{ color: '#e040fb' }}
                        >
                          ✓
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

                <div 
                  className="mt-3 pt-2 border-t font-mono text-[10px] md:text-xs flex items-center gap-1.5"
                  style={{ 
                    borderColor: 'rgba(224, 64, 251, 0.15)',
                    color: 'rgba(167, 139, 250, 0.5)',
                  }}
                >
                  <div 
                    className="w-1 h-1 rounded-full shrink-0"
                    style={{ backgroundColor: '#4caf50', boxShadow: '0 0 4px #4caf50' }}
                  />
                  <span>{category.technologies.length} loaded</span>
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
              className="inline-block w-2 h-4 ml-2 align-middle"
              style={{
                backgroundColor: '#e040fb',
                opacity: Math.floor(time * 2) % 2 === 0 ? 1 : 0,
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}