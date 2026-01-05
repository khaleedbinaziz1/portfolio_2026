'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { projects } from '@/data/projects';
import Link from 'next/link';
import Image from 'next/image';
import { FiFileText } from 'react-icons/fi';
import FloatingTerminal from './FloatingTerminal';

const accentColors = [
  { primary: '#065D71', secondary: '#0a7a94', name: 'teal' }, // Kumira
  { primary: '#589440', secondary: '#6ba84f', name: 'green' }, // Better-e-mart
  { primary: '#1B8A5F', secondary: '#22a572', name: 'green-teal' }, // TakaSphere
  { primary: '#8F75E6', secondary: '#a68ef0', name: 'purple' }, // Pixentix
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="projects"
      ref={ref}
      className="min-h-screen flex flex-col justify-center items-center w-full py-16 sm:py-20 md:py-16 lg:py-20 xl:py-32"
      style={{
        background: 'linear-gradient(135deg, rgba(204, 102, 0, 0.05) 0%, rgba(250, 250, 245, 0.98) 35%, rgba(204, 102, 0, 0.05) 100%)',
        color: '#1a1a1a',
        paddingTop: '50px',
        paddingBottom: '50px',
      }}
    >
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto w-full relative z-10 md:pl-[calc(5%+5px)]"
        style={{ paddingLeft: '5%', paddingRight: '5%' }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-center text-center sm:text-left gap-3 sm:gap-4">
            {/* Mobile: Gradient line above title */}
            <div className="md:hidden w-full mb-2">
              <div className="retro-line-gradient"></div>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-0 mx-auto sm:mx-0">
              <span className="section-number section-number-orange text-sm sm:text-base sm:mr-4">04.</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a1a1a] text-glow-orange">
                Some Things I&apos;ve Built
              </h2>
            </div>
            <div className="hidden md:block flex-1 ml-6">
              <div className="retro-line-gradient"></div>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-6 md:gap-7 lg:gap-8">
          {projects.map((project, index) => {
            const accent = accentColors[index % accentColors.length];
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group m-2.5 sm:m-0"
              >
                <div 
                  className="relative p-5 sm:p-6 md:p-7 lg:p-8 xl:p-10 border-2 transition-all duration-300 shadow-md hover:shadow-lg"
                  style={{
                    borderColor: `${accent.primary}30`,
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    boxShadow: `0 2px 8px ${accent.primary}10, 0 1px 3px rgba(0, 0, 0, 0.08)`,
                  }}
                >
                  {/* Accent line on left */}
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300"
                    style={{
                      backgroundColor: accent.primary,
                      opacity: 0.6,
                    }}
                  ></div>

                  <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_300px] gap-5 sm:gap-6 md:gap-6 items-center">
                    <div className="pl-7 sm:pl-9 project-card-content">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4 sm:mb-5 md:mb-5 lg:mb-6">
                        <div className="flex-1 text-center sm:text-left">
                          <h3 
                            className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold mb-1.5 sm:mb-2 md:mb-2 leading-tight"
                            style={{ color: accent.primary }}
                          >
                            {project.title}
                          </h3>
                          <p className="text-[10px] sm:text-xs md:text-base text-[#4a4a4a] leading-relaxed mt-0.5 sm:mt-1">
                            {project.longDescription}
                          </p>
                        </div>
                        
                        {/* Case Study Link */}
                        {project.caseStudy && (
                          <div className="flex-shrink-0 justify-center sm:justify-start">
                            <Link
                              href={project.caseStudy}
                              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg border transition-all duration-300 hover:scale-105 active:scale-95 font-medium text-sm sm:text-base"
                              style={{
                                color: accent.primary,
                                borderColor: `${accent.primary}40`,
                                backgroundColor: `${accent.primary}08`,
                              }}
                              aria-label="View Case Study"
                            >
                              <FiFileText className="text-base sm:text-lg" />
                              <span>Case Study</span>
                            </Link>
                          </div>
                        )}
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 sm:gap-2.5 justify-center sm:justify-start mt-4 sm:mt-5">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] sm:text-xs font-medium px-2.5 sm:px-3 md:px-3 py-1 sm:py-1.5 md:py-1.5 transition-all duration-300"
                            style={{
                              color: `${accent.primary}cc`,
                              border: `1px solid ${accent.primary}30`,
                              backgroundColor: `${accent.primary}08`,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Project Image */}
                    {project.image && project.caseStudy && (
                      <Link 
                        href={project.caseStudy}
                        className="relative w-full h-32 sm:h-52 md:h-56 lg:h-64 overflow-hidden border-2 group/image order-first md:order-last block cursor-pointer"
                        style={{ borderColor: `${accent.primary}30` }}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover/image:scale-105 md:group-hover/image:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 300px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                    )}
                    {project.image && !project.caseStudy && (
                      <div className="relative w-full h-32 sm:h-52 md:h-56 lg:h-64 overflow-hidden border-2 group/image order-first md:order-last"
                        style={{ borderColor: `${accent.primary}30` }}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover/image:scale-105 md:group-hover/image:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 300px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    )}
                  </div>

                  {/* Subtle hover glow effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      boxShadow: `0 0 30px ${accent.primary}15, 0 4px 12px ${accent.primary}10`,
                    }}
                  ></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
      
      {/* Floating Terminal Commands */}
      <FloatingTerminal maxCommands={2} spawnInterval={8000} />
    </section>
  );
}
