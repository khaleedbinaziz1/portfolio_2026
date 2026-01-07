'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { projects } from '@/data/projects';
import Link from 'next/link';
import Image from 'next/image';
import { FiFileText, FiExternalLink } from 'react-icons/fi';
import FloatingTerminal from './FloatingTerminal';

const accentColors = [
  { primary: '#065D71', secondary: '#0a7a94', name: 'teal' }, // Kumira
  { primary: '#589440', secondary: '#6ba84f', name: 'green' }, // Better-e-mart
  { primary: '#1B8A5F', secondary: '#22a572', name: 'green-teal' }, // TakaSphere
  { primary: '#8F75E6', secondary: '#a68ef0', name: 'purple' }, // Pixentix
  { primary: '#9333ea', secondary: '#a855f7', name: 'purple' }, // Open Stack JS
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="projects"
      ref={ref}
      className="min-h-screen flex flex-col justify-center items-center w-full py-16 sm:py-20 md:py-16 lg:py-20 xl:py-32 retro-pixel-bg-light relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(204, 102, 0, 0.05) 0%, rgba(250, 250, 245, 0.98) 35%, rgba(204, 102, 0, 0.05) 100%)',
        color: '#1a1a1a',
        paddingTop: '50px',
        paddingBottom: '50px',
      }}
    >
      {/* Pixelated decorative elements */}
      <div className="absolute top-10 right-5 w-16 h-16 border-2 border-[#cc6600] border-opacity-20 pointer-events-none hidden md:block" style={{ imageRendering: 'pixelated' }}></div>
      <div className="absolute bottom-20 left-10 w-12 h-12 border-2 border-[#cc6600] border-opacity-20 pointer-events-none hidden md:block" style={{ imageRendering: 'pixelated' }}></div>
      <div className="absolute top-1/2 left-5 w-8 h-8 border-2 border-[#cc6600] border-opacity-15 pointer-events-none hidden lg:block" style={{ imageRendering: 'pixelated' }}></div>
      
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
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-5 lg:gap-6">
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
                  className="relative p-4 sm:p-5 md:p-5 lg:p-6 border-2 transition-all duration-300 shadow-md hover:shadow-lg group/card"
                  style={{
                    borderColor: `${accent.primary}30`,
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    boxShadow: `0 2px 8px ${accent.primary}10, 0 1px 3px rgba(0, 0, 0, 0.08)`,
                    imageRendering: 'pixelated',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = `${accent.primary}50`;
                    e.currentTarget.style.boxShadow = `0 8px 24px ${accent.primary}20, 0 4px 12px rgba(0, 0, 0, 0.12)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = `${accent.primary}30`;
                    e.currentTarget.style.boxShadow = `0 2px 8px ${accent.primary}10, 0 1px 3px rgba(0, 0, 0, 0.08)`;
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

                  <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] lg:grid-cols-[1fr_260px] gap-4 sm:gap-5 items-center">
                    <div className="pl-6 sm:pl-7 project-card-content">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3 sm:mb-4">
                        <div className="flex-1 text-center sm:text-left">
                          <h3 
                            className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-1 sm:mb-1.5 leading-tight"
                            style={{ color: accent.primary }}
                          >
                            {project.title}
                          </h3>
                          <p className="text-[10px] sm:text-xs text-[#4a4a4a] leading-relaxed mt-0.5 line-clamp-2">
                            {project.description}
                          </p>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex-shrink-0 flex flex-row gap-1.5 sm:gap-2 justify-center sm:justify-start">
                          {project.caseStudy && (
                            <Link
                              href={project.caseStudy}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 border-2 transition-all duration-300 hover:scale-105 active:scale-95 font-medium text-xs sm:text-xs font-mono"
                              style={{
                                color: accent.primary,
                                borderColor: accent.primary,
                                backgroundColor: 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = `${accent.primary}10`;
                                e.currentTarget.style.boxShadow = `0 0 8px ${accent.primary}30`;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.boxShadow = 'none';
                              }}
                              aria-label="View Case Study"
                            >
                              <FiFileText className="text-xs sm:text-sm" />
                              <span>Case Study</span>
                            </Link>
                          )}
                          {project.live && (
                            <Link
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 border-2 transition-all duration-300 hover:scale-105 active:scale-95 font-medium text-xs sm:text-xs font-mono"
                              style={{
                                color: accent.primary,
                                borderColor: accent.primary,
                                backgroundColor: 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = `${accent.primary}10`;
                                e.currentTarget.style.boxShadow = `0 0 8px ${accent.primary}30`;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.boxShadow = 'none';
                              }}
                              aria-label="Visit Live Website"
                            >
                              <FiExternalLink className="text-xs sm:text-sm" />
                              <span>Visit</span>
                            </Link>
                          )}
                        </div>
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center sm:justify-start mt-3 sm:mt-4">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="text-[9px] sm:text-[10px] font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 transition-all duration-300 font-mono"
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
                        className="relative w-full h-28 sm:h-40 md:h-44 lg:h-48 overflow-hidden border-2 group/image order-first md:order-last block cursor-pointer"
                        style={{ borderColor: `${accent.primary}30` }}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover/image:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 260px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                    )}
                    {project.image && !project.caseStudy && (
                      <div className="relative w-full h-28 sm:h-40 md:h-44 lg:h-48 overflow-hidden border-2 group/image order-first md:order-last"
                        style={{ borderColor: `${accent.primary}30` }}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover/image:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 260px"
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
