'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { experiences } from '@/data/experience';
import { FiBriefcase, FiCalendar, FiChevronRight, FiCode } from 'react-icons/fi';
import FloatingTerminal from './FloatingTerminal';

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="experience"
      ref={ref}
      className="min-h-screen flex flex-col justify-center items-center w-full py-12 sm:py-16 md:py-20 retro-pixel-bg-light relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(184, 134, 11, 0.1) 0%, rgba(245, 245, 240, 0.95) 40%, rgba(184, 134, 11, 0.08) 100%)',
        color: '#1a1a1a',
        paddingTop: '40px',
        paddingBottom: '40px',
      }}
    >
      {/* Pixelated decorative elements */}
      <div className="absolute top-10 right-5 w-16 h-16 border-2 border-[#006400] border-opacity-20 pointer-events-none hidden md:block" style={{ imageRendering: 'pixelated' }}></div>
      <div className="absolute bottom-20 left-10 w-12 h-12 border-2 border-[#006400] border-opacity-20 pointer-events-none hidden md:block" style={{ imageRendering: 'pixelated' }}></div>
      <div className="absolute top-1/2 left-5 w-8 h-8 border-2 border-[#006400] border-opacity-15 pointer-events-none hidden lg:block" style={{ imageRendering: 'pixelated' }}></div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto w-full md:pl-[calc(5%+5px)]"
        style={{ paddingLeft: '5%', paddingRight: '5%' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-center text-center sm:text-left mb-4 sm:mb-6 md:mb-8 gap-2 sm:gap-3">
          {/* Mobile: Gradient line above title */}
          <div className="md:hidden w-full mb-1">
            <div className="retro-line-gradient"></div>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-0 mx-auto sm:mx-0">
            <span className="section-number section-number-green text-sm sm:text-base sm:mr-3">03.</span>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#1a1a1a] text-glow">Where I&apos;ve Worked</h2>
          </div>
          <div className="hidden md:block flex-1 ml-4">
            <div className="retro-line-gradient"></div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Pixelated decorative brackets */}
                <div className="absolute -left-4 top-0 text-[#006400] text-2xl opacity-20 hidden md:block font-mono" style={{ fontFamily: 'monospace' }}>┌</div>
                <div className="absolute -right-4 top-0 text-[#006400] text-2xl opacity-20 hidden md:block font-mono" style={{ fontFamily: 'monospace' }}>┐</div>
                
                <motion.div
                  className="terminal-window cursor-pointer relative"
                  whileHover={{ scale: 1.01, y: -2 }}
                  transition={{ duration: 0.3 }}
                  style={{ imageRendering: 'pixelated' }}
                >
                  {/* Pixelated border accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#006400] opacity-30 group-hover:opacity-60 transition-opacity"></div>
                  
                  <div className="terminal-header">
                    <div className="terminal-buttons">
                      <span className="terminal-btn terminal-btn-close"></span>
                      <span className="terminal-btn terminal-btn-minimize"></span>
                      <span className="terminal-btn terminal-btn-maximize"></span>
                    </div>
                    <div className="terminal-title">
                      <span className="text-[#006400]">┌─</span>
                      <span className="mx-2 font-mono">{exp.company}</span>
                      <span className="text-[#006400]">─┐</span>
                    </div>
                  </div>
                  
                  <div className="terminal-body p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5 mb-3">
                      {/* Logo */}
                      <div className="flex-shrink-0 relative">
                        {exp.logo ? (
                          <div className="relative w-16 h-16 border-2 overflow-hidden"
                            style={{ 
                              borderColor: 'rgba(0, 100, 0, 0.4)',
                              imageRendering: 'pixelated',
                              boxShadow: '0 0 0 2px rgba(0, 100, 0, 0.1)',
                            }}
                          >
                            {/* Pixel art corner decorations */}
                            <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#006400] opacity-40"></div>
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#006400] opacity-40"></div>
                            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#006400] opacity-40"></div>
                            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#006400] opacity-40"></div>
                            <Image
                              src={exp.logo}
                              alt={exp.company}
                              fill
                              className="object-contain p-2"
                              sizes="64px"
                              style={{ imageRendering: 'pixelated' }}
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 border-2 flex items-center justify-center"
                            style={{ 
                              borderColor: 'rgba(0, 100, 0, 0.4)', 
                              backgroundColor: 'rgba(0, 100, 0, 0.1)',
                              imageRendering: 'pixelated',
                              boxShadow: '0 0 0 2px rgba(0, 100, 0, 0.1)',
                            }}
                          >
                            <FiBriefcase className="text-[#006400]" size={22} />
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 relative pl-0 md:pl-4">
                        {/* Accent line */}
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#006400] bg-opacity-20 hidden md:block"></div>
                        
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[#006400] font-mono text-sm font-bold">$</span>
                          <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#1a1a1a] font-mono">
                            {exp.position}
                          </h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-[#006400] font-semibold font-mono mb-3">
                          <span className="flex items-center gap-1 px-1.5 py-0.5 sm:px-2 sm:py-1 border border-[#006400] border-opacity-20 bg-[#006400] bg-opacity-5">
                            <FiCode size={12} />
                            {exp.company}
                          </span>
                          <span className="flex items-center gap-1 px-1.5 py-0.5 sm:px-2 sm:py-1 border border-[#006400] border-opacity-20 bg-[#006400] bg-opacity-5">
                            <FiCalendar size={12} />
                            {exp.duration}
                          </span>
                        </div>
                      </div>
                      
                      {/* Expand Indicator */}
                      <motion.div
                        animate={{ rotate: hoveredIndex === index ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <FiChevronRight className="text-[#006400] text-xl sm:text-2xl" />
                      </motion.div>
                    </div>

                    {/* Achievements - Collapsible */}
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: hoveredIndex === index ? 'auto' : 0,
                        opacity: hoveredIndex === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 border-t border-[#006400] border-opacity-30 relative">
                        {/* Pixelated accent line */}
                        <div className="absolute left-0 top-0 w-10 h-0.5 bg-[#006400] opacity-40"></div>
                        
                        <div className="terminal-prompt mb-2 relative pl-3">
                          <span className="text-[#006400] font-bold font-mono text-sm">$</span>
                            <span className="text-[#4a4a4a] ml-2 font-mono text-xs sm:text-sm">cat achievements.txt</span>
                          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#006400] bg-opacity-20"></div>
                        </div>
                        <ul className="space-y-2 ml-4 sm:ml-5 relative">
                          {exp.description.map((desc, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ 
                                opacity: hoveredIndex === index ? 1 : 0,
                                x: hoveredIndex === index ? 0 : -10
                              }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-start gap-1.5 text-xs sm:text-sm text-[#4a4a4a] leading-relaxed font-mono relative pl-1.5"
                            >
                              <span className="text-[#006400] mt-0.5 flex-shrink-0 font-bold text-xs">▸</span>
                              <span>{desc}</span>
                            </motion.li>
                          ))}
                        </ul>
                        
                        {/* Tech Stack */}
                        <div className="mt-4 pt-3 border-t border-[#006400] border-opacity-30 relative">
                          <div className="absolute left-0 top-0 w-10 h-0.5 bg-[#006400] opacity-40"></div>
                          
                          <div className="terminal-prompt mb-2 relative pl-3">
                            <span className="text-[#006400] font-bold font-mono text-sm">$</span>
                            <span className="text-[#4a4a4a] ml-2 font-mono text-xs sm:text-sm">tech_stack</span>
                            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#006400] bg-opacity-20"></div>
                          </div>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2 ml-4 sm:ml-5">
                            {exp.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="text-[10px] sm:text-xs font-medium px-2 sm:px-2.5 py-1 font-mono transition-all duration-300 hover:scale-105 cursor-default"
                                style={{
                                  color: '#006400',
                                  border: '1px solid rgba(0, 100, 0, 0.4)',
                                  backgroundColor: 'rgba(0, 100, 0, 0.1)',
                                  imageRendering: 'pixelated',
                                  boxShadow: '0 0 0 1px rgba(0, 100, 0, 0.1)',
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
        </div>
      </motion.div>
      
      {/* Floating Terminal Commands */}
      <FloatingTerminal maxCommands={1} spawnInterval={10000} />
    </section>
  );
}

