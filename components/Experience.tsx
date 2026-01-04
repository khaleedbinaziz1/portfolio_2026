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
      className="min-h-screen flex flex-col justify-center items-center w-full py-20 md:py-32"
      style={{
        background: 'linear-gradient(135deg, rgba(0, 100, 0, 0.12) 0%, rgba(228, 228, 223, 0.92) 40%, rgba(0, 100, 0, 0.1) 100%)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto w-full md:pl-[calc(5%+5px)]"
        style={{ paddingLeft: '5%', paddingRight: '5%' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-center text-center sm:text-left mb-8 md:mb-12 gap-4">
          {/* Mobile: Gradient line above title */}
          <div className="md:hidden w-full mb-2">
            <div className="retro-line-gradient"></div>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-0 mx-auto sm:mx-0">
            <span className="section-number section-number-green sm:mr-4">03.</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a] text-glow">Where I&apos;ve Worked</h2>
          </div>
          <div className="hidden md:block flex-1 ml-6">
            <div className="retro-line-gradient"></div>
          </div>
        </div>

        <div className="space-y-6 md:space-y-8">
          {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.div
                  className="terminal-window cursor-pointer"
                  whileHover={{ scale: 1.01, y: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="terminal-header">
                    <div className="terminal-buttons">
                      <span className="terminal-btn terminal-btn-close"></span>
                      <span className="terminal-btn terminal-btn-minimize"></span>
                      <span className="terminal-btn terminal-btn-maximize"></span>
                    </div>
                    <div className="terminal-title">
                      <span className="text-[#008b8b]">┌─</span>
                      <span className="mx-2">{exp.company}</span>
                      <span className="text-[#008b8b]">─┐</span>
                    </div>
                  </div>
                  
                  <div className="terminal-body">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-4">
                      {/* Logo */}
                      <div className="flex-shrink-0">
                        {exp.logo ? (
                          <div className="relative w-16 h-16 border-2 overflow-hidden retro-gaming-border"
                            style={{ borderColor: 'rgba(0, 100, 0, 0.4)' }}
                          >
                            <Image
                              src={exp.logo}
                              alt={exp.company}
                              fill
                              className="object-contain p-2"
                              sizes="64px"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 border-2 flex items-center justify-center retro-gaming-border"
                            style={{ borderColor: 'rgba(0, 100, 0, 0.4)', backgroundColor: 'rgba(0, 100, 0, 0.1)' }}
                          >
                            <FiBriefcase className="text-[#006400]" size={24} />
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[#006400] font-mono text-sm">$</span>
                          <h3 className="text-xl md:text-2xl font-bold text-[#1a1a1a] font-mono">
                            {exp.position}
                          </h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-[#008b8b] font-semibold font-mono mb-4">
                          <span className="flex items-center gap-1.5">
                            <FiCode size={14} />
                            {exp.company}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <FiCalendar size={14} />
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
                        <FiChevronRight className="text-[#006400] text-2xl" />
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
                      <div className="pt-4 border-t border-[#008b8b] border-opacity-30">
                        <div className="terminal-prompt mb-3">
                          <span className="text-[#006400] font-bold">$</span>
                          <span className="text-[#4a4a4a] ml-2 font-mono">cat achievements.txt</span>
                        </div>
                        <ul className="space-y-2.5 ml-4">
                          {exp.description.map((desc, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ 
                                opacity: hoveredIndex === index ? 1 : 0,
                                x: hoveredIndex === index ? 0 : -10
                              }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-start gap-2 text-sm text-[#4a4a4a] leading-relaxed font-mono"
                            >
                              <span className="text-[#006400] mt-1 flex-shrink-0">▹</span>
                              <span>{desc}</span>
                            </motion.li>
                          ))}
                        </ul>
                        
                        {/* Tech Stack */}
                        <div className="mt-5 pt-4 border-t border-[#008b8b] border-opacity-30">
                          <div className="terminal-prompt mb-3">
                            <span className="text-[#006400] font-bold">$</span>
                            <span className="text-[#4a4a4a] ml-2 font-mono">tech_stack</span>
                          </div>
                          <div className="flex flex-wrap gap-2 ml-4">
                            {exp.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="text-xs font-medium px-2.5 py-1.5 font-mono transition-all duration-300 hover:scale-105 cursor-default"
                                style={{
                                  color: '#006400',
                                  border: '1px solid rgba(0, 100, 0, 0.4)',
                                  backgroundColor: 'rgba(0, 100, 0, 0.1)',
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

