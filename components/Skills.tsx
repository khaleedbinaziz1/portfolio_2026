'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiChevronRight } from 'react-icons/fi';
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
  SiClerk
} from 'react-icons/si';
import { TbBrandFramerMotion } from 'react-icons/tb';

const technologyCategories = [
  {
    name: 'Frontend Development',
    technologies: [
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'React 18', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js 14', icon: SiNextdotjs, color: '#ffffff' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Redux Toolkit', icon: SiRedux, color: '#764ABC' },
      { name: 'Framer Motion', icon: TbBrandFramerMotion, color: '#FF0055' },
    ],
    color: { primary: '#006400', name: 'green' }
  },
  {
    name: 'Backend & APIs',
    technologies: [
      { name: 'Node.js 20', icon: SiNodedotjs, color: '#339933' },
      { name: 'Express.js', icon: SiExpress, color: '#ffffff' },
      { name: 'PHP', icon: SiPhp, color: '#777BB4' },
      { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
      { name: 'Socket.io', icon: SiSocketdotio, color: '#010101' },
      { name: 'Prisma ORM', icon: SiPrisma, color: '#2D3748' },
      { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
    ],
    color: { primary: '#008b8b', name: 'cyan' }
  },
  {
    name: 'Database & Storage',
    technologies: [
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'Firestore', icon: SiFirebase, color: '#FFCA28' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
    ],
    color: { primary: '#b19cd9', name: 'purple' }
  },
  {
    name: 'Testing & Quality',
    technologies: [
      { name: 'Jest', icon: SiJest, color: '#C21325' },
      { name: 'Cypress', icon: SiCypress, color: '#17202C' },
      { name: 'React Testing Library', icon: SiReact, color: '#61DAFB' },
    ],
    color: { primary: '#cc6600', name: 'orange' }
  },
  {
    name: 'DevOps & Cloud',
    technologies: [
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'AWS', icon: SiAwsamplify, color: '#FF9900' },
      { name: 'Vercel', icon: SiVercel, color: '#ffffff' },
      { name: 'Nginx', icon: SiNginx, color: '#009639' },
      { name: 'Git/GitHub', icon: SiGit, color: '#F05032' },
    ],
    color: { primary: '#ff1493', name: 'pink' }
  },
  {
    name: 'Authentication & Payments',
    technologies: [
      { name: 'Clerk', icon: SiClerk, color: '#6C47FF' },
      { name: 'Firebase Auth', icon: SiFirebase, color: '#FFCA28' },
      { name: 'Stripe', icon: SiStripe, color: '#635BFF' },
    ],
    color: { primary: '#b8860b', name: 'yellow' }
  },
];

// Floating Terminal Component (simplified for this demo)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FloatingTerminal = ({ maxCommands = 1, spawnInterval = 9000 }) => {
  return null; // Placeholder - replace with your actual FloatingTerminal component
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="skills"
      ref={ref}
      className="min-h-screen flex flex-col justify-center items-center w-full py-16 sm:py-20 md:py-24 lg:py-32 relative"
      style={{
        color: '#e0e0e0',
        backgroundColor: '#0a0a0a',
        paddingTop: '50px',
        paddingBottom: '50px',
      }}
    >
      {/* Background Effects */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(184, 134, 11, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(184, 134, 11, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      ></div>
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(184, 134, 11, 0.05) 50%, transparent 100%)',
          animation: 'scanline 8s linear infinite',
        }}
      ></div>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto w-full relative z-10 md:pl-[calc(5%+5px)]"
        style={{ paddingLeft: '5%', paddingRight: '5%' }}
      >
        {/* Skills & Expertise Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-center text-center sm:text-left mb-8 sm:mb-10 md:mb-12 gap-3 sm:gap-4">
          {/* Mobile: Gradient line above title */}
          <div className="md:hidden w-full mb-2">
            <div 
              className="h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(184, 134, 11, 0.6), transparent)',
              }}
            ></div>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-0 mx-auto sm:mx-0">
            <span 
              className="text-base sm:text-lg font-mono mr-4"
              style={{ color: '#b8860b' }}
            >
              02.
            </span>
            <h2 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold" 
              style={{ 
                color: '#e0e0e0', 
                textShadow: '0 0 10px rgba(184, 134, 11, 0.4)' 
              }}
            >
              Skills & Expertise
            </h2>
          </div>
          <div className="hidden md:block flex-1 ml-6">
            <div 
              className="h-px"
              style={{
                background: 'linear-gradient(90deg, rgba(184, 134, 11, 0.6), transparent)',
              }}
            ></div>
          </div>
        </div>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs sm:text-sm md:text-base max-w-2xl text-center mx-auto mb-8 sm:mb-10 md:mb-12" 
          style={{ color: '#b0b0b0' }}
        >
          Technologies for building modern, scalable applications
        </motion.p>

        {/* Technology Categories Grid - Enhanced Mobile-Friendly Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          {technologyCategories.map((category, categoryIndex) => {
            const color = category.color;
            
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + categoryIndex * 0.1 }}
                className="group relative p-6 sm:p-8 backdrop-blur-sm transition-all duration-300"
                style={{
                  border: `2px solid ${color.primary}60`,
                  backgroundColor: `rgba(30, 30, 30, 0.7)`,
                  boxShadow: `0 0 20px ${color.primary}30, 0 6px 16px rgba(0, 0, 0, 0.4)`,
                }}
                whileHover={{ 
                  y: -6,
                  boxShadow: `0 0 30px ${color.primary}50, 0 10px 25px rgba(0, 0, 0, 0.5)`,
                }}
              >
                {/* Category Header */}
                <h3 
                  className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3"
                  style={{ color: color.primary }}
                >
                  <FiChevronRight className="text-lg sm:text-xl md:text-2xl flex-shrink-0" />
                  <span>{category.name}</span>
                </h3>

                {/* Technology Grid - Extra Large Icons with Names Below */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-6">
                  {category.technologies.map((tech, techIndex) => {
                    const Icon = tech.icon;
                    return (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ 
                          duration: 0.3, 
                          delay: 0.2 + categoryIndex * 0.1 + techIndex * 0.05 
                        }}
                        className="flex flex-col items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 transition-all duration-300 cursor-pointer group/item"
                        style={{}}
                        whileHover={{ 
                          scale: 1.1, 
                          y: -6,
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon 
                          className="text-lg sm:text-xl md:text-2xl flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300" 
                          style={{ color: tech.color }}
                        />
                        <span 
                          className="text-xs sm:text-sm font-medium text-center group-hover/item:text-white transition-colors duration-300 mt-1"
                          style={{ color: '#b0b0b0' }}
                        >
                          {tech.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
                
                {/* Retro glow effect on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${color.primary}10, transparent)`,
                    boxShadow: `0 0 25px ${color.primary}20`,
                  }}
                ></div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
      
      {/* Floating Terminal Commands */}
      <FloatingTerminal maxCommands={1} spawnInterval={9000} />

      <style jsx>{`
        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </section>
  );
}