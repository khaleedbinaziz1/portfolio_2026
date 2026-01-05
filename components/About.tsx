'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import TerminalCommand from './TerminalCommand';
import FloatingTerminal from './FloatingTerminal';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen flex flex-col justify-center items-center w-full py-20 md:py-32"
      style={{
        background: 'linear-gradient(135deg, rgba(0, 100, 0, 0.1) 0%, rgba(232, 232, 227, 0.9) 40%, rgba(0, 100, 0, 0.08) 100%)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto w-full md:pl-[calc(5%+5px)]"
        style={{ paddingLeft: '5%', paddingRight: '5%' }}
      >
        {/* About Me Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-center text-center sm:text-left mb-8 md:mb-12 gap-4">
          {/* Mobile: Gradient line above title */}
          <div className="md:hidden w-full mb-2">
            <div className="retro-line-gradient"></div>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-0 mx-auto sm:mx-0">
            <span className="section-number section-number-cyan sm:mr-4">01.</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a] text-glow-cyan">About Me</h2>
          </div>
          <div className="hidden md:block flex-1 ml-6">
            <div className="retro-line-gradient"></div>
          </div>
        </div>

        {/* Terminal Command Storytelling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 md:mb-8 max-w-md md:max-w-lg mx-auto"
        >
          <div className="terminal-window p-1.5 md:p-2 text-[10px] md:text-xs">
            <div className="terminal-header mb-1.5 md:mb-2 py-0.5 md:py-1">
              <div className="terminal-buttons">
                <span className="terminal-btn terminal-btn-close"></span>
                <span className="terminal-btn terminal-btn-minimize"></span>
                <span className="terminal-btn terminal-btn-maximize"></span>
              </div>
              <div className="terminal-title text-[10px] md:text-xs">
                <span className="text-[#008b8b]">┌─</span>
                <span className="mx-1">whoami</span>
                <span className="text-[#008b8b]">─┐</span>
              </div>
            </div>
            <div className="terminal-body p-1.5 md:p-2">
              <TerminalCommand
                commands={[
                  {
                    prompt: '$',
                    command: 'whoami',
                    output: 'Full Stack Engineer | TypeScript | Problem Solver',
                    delay: 2000,
                  },
                  {
                    prompt: '$',
                    command: 'cat ~/.bashrc | grep experience',
                    output: 'export EXPERIENCE="3+ years"',
                    delay: 1500,
                  },
                ]}
                autoStart={isInView}
                speed={50}
              />
            </div>
          </div>
        </motion.div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-[3fr_2fr] gap-8 md:gap-12 items-center mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 sm:space-y-6 text-center md:text-left"
          >
            <p className="text-sm sm:text-base md:text-lg text-[#4a4a4a] leading-relaxed max-w-3xl mx-auto md:mx-0">
              Full Stack Engineer with <span className="text-[#008b8b] font-semibold">3+ years</span> of experience building scalable web applications. Expert in TypeScript, Next.js, Node.js, system design, and cloud deployment.
            </p>
            
            <p className="text-sm sm:text-base md:text-lg text-[#4a4a4a] leading-relaxed max-w-3xl mx-auto md:mx-0">
              Currently pursuing <span className="text-[#008b8b] font-semibold">MSc in CSE</span> with a focus on ML/AI research. Passionate about writing maintainable code and mentoring fellow developers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative w-full max-w-xs sm:max-w-sm mx-auto"
          >
            <div className="relative group">
              <div className="absolute -top-3 sm:-top-4 -left-3 sm:-left-4 w-full h-full border border-[#008b8b] border-opacity-30 transition-all duration-300 group-hover:border-opacity-60 group-hover:-top-2 group-hover:-left-2 sm:group-hover:-top-3 sm:group-hover:-left-3"></div>
              <div className="retro-image-wrapper relative aspect-square">
                <div className="retro-image-inner">
                  <div className="retro-profile-image">
                    <Image
                      src="/khaled_bin_aziz.jpg"
                      alt="Khaled Bin Aziz"
                      fill
                      className="object-cover object-center"
                      style={{ objectPosition: 'center 20%', transform: 'scale(1.1)' }}
                      priority
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-center gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-48 h-48 mx-auto"
          >
            <div className="relative group">
              <div className="absolute -top-2 -left-2 w-full h-full border border-[#008b8b] border-opacity-30 transition-all duration-300"></div>
              <div className="retro-image-wrapper relative aspect-square">
                <div className="retro-image-inner">
                  <div className="retro-profile-image">
                    <Image
                      src="/khaled_bin_aziz.jpg"
                      alt="Khaled Bin Aziz"
                      fill
                      className="object-cover object-center"
                      style={{ objectPosition: 'center 20%', transform: 'scale(1.1)' }}
                      priority
                      sizes="192px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-3 text-center px-4"
          >
            <p className="text-sm text-[#4a4a4a] leading-relaxed">
              Full Stack Engineer with <span className="text-[#008b8b] font-semibold">3+ years</span> of experience building scalable web applications. Expert in TypeScript, Next.js, and Node.js.
            </p>
            
            <p className="text-sm text-[#4a4a4a] leading-relaxed">
              Currently pursuing <span className="text-[#008b8b] font-semibold">MSc in CSE</span> with a focus on ML/AI research.
            </p>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Floating Terminal Commands */}
      <FloatingTerminal maxCommands={1} spawnInterval={10000} />
    </section>
  );
}