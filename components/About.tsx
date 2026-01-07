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
      className="min-h-screen flex flex-col justify-center items-center w-full py-20 md:py-32 retro-pixel-bg-dark relative overflow-hidden"
      style={{
        background: 'var(--retro-bg)',
        color: 'var(--retro-text)',
      }}
    >
      {/* Pixelated decorative elements */}
      <div className="absolute top-10 left-5 w-16 h-16 border-2 border-[var(--retro-cyan)] border-opacity-40 pointer-events-none hidden md:block" style={{ boxShadow: '0 0 10px var(--retro-cyan-soft)' }}></div>
      <div className="absolute bottom-20 right-10 w-12 h-12 border-2 border-[var(--retro-green)] border-opacity-40 pointer-events-none hidden md:block" style={{ boxShadow: '0 0 10px var(--retro-green-soft)' }}></div>
      <div className="absolute top-1/3 right-5 w-8 h-8 border-2 border-[var(--retro-orange)] border-opacity-30 pointer-events-none hidden lg:block" style={{ boxShadow: '0 0 8px var(--retro-orange-soft)' }}></div>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-glow-cyan" style={{ color: 'var(--retro-cyan)', fontFamily: 'var(--font-mono)' }}>About Me</h2>
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
          className="mb-6 md:mb-8 max-w-md md:max-w-lg mx-auto relative"
        >
          {/* Pixelated decorative brackets around terminal */}
              <div className="absolute -left-4 top-0 text-2xl opacity-40 hidden md:block" style={{ fontFamily: 'var(--font-mono)', color: 'var(--retro-cyan)', textShadow: '0 0 10px var(--retro-cyan)' }}>┌</div>
          <div className="absolute -right-4 top-0 text-2xl opacity-40 hidden md:block" style={{ fontFamily: 'var(--font-mono)', color: 'var(--retro-cyan)', textShadow: '0 0 10px var(--retro-cyan)' }}>┐</div>
          <div className="absolute -left-4 bottom-0 text-2xl opacity-40 hidden md:block" style={{ fontFamily: 'var(--font-mono)', color: 'var(--retro-cyan)', textShadow: '0 0 10px var(--retro-cyan)' }}>└</div>
          <div className="absolute -right-4 bottom-0 text-2xl opacity-40 hidden md:block" style={{ fontFamily: 'var(--font-mono)', color: 'var(--retro-cyan)', textShadow: '0 0 10px var(--retro-cyan)' }}>┘</div>
          
          <div className="terminal-window p-1.5 md:p-2 text-[10px] md:text-xs relative" style={{ imageRendering: 'pixelated' }}>
            <div className="terminal-header mb-1.5 md:mb-2 py-0.5 md:py-1">
              <div className="terminal-buttons">
                <span className="terminal-btn terminal-btn-close"></span>
                <span className="terminal-btn terminal-btn-minimize"></span>
                <span className="terminal-btn terminal-btn-maximize"></span>
              </div>
              <div className="terminal-title text-[10px] md:text-xs">
                <span style={{ color: 'var(--retro-green)', textShadow: '0 0 8px var(--retro-green)' }}>┌─</span>
                <span className="mx-1">whoami</span>
                <span style={{ color: 'var(--retro-green)', textShadow: '0 0 8px var(--retro-green)' }}>─┐</span>
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
            <div className="space-y-4 sm:space-y-6 text-center md:text-left relative">
              {/* Pixelated accent line */}
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-[#008b8b] bg-opacity-20 hidden md:block"></div>
              
            <p className="text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto md:mx-0 relative pl-0 md:pl-6" style={{ color: 'var(--retro-text-dim)', fontFamily: 'var(--font-mono)' }}>
              <span className="text-[var(--retro-cyan)] font-mono text-lg md:text-xl mr-2 opacity-80" style={{ textShadow: '0 0 8px var(--retro-cyan)' }}>▸</span>
              Full Stack Engineer with <span className="text-[var(--retro-cyan)] font-semibold font-mono" style={{ textShadow: '0 0 10px var(--retro-cyan)' }}>3+ years</span> of experience building scalable web applications. Expert in TypeScript, Next.js, Node.js, system design, and cloud deployment.
            </p>
            
            <p className="text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto md:mx-0 relative pl-0 md:pl-6" style={{ color: 'var(--retro-text-dim)', fontFamily: 'var(--font-mono)' }}>
              <span className="text-[var(--retro-cyan)] font-mono text-lg md:text-xl mr-2 opacity-80" style={{ textShadow: '0 0 8px var(--retro-cyan)' }}>▸</span>
              Currently pursuing <span className="text-[var(--retro-cyan)] font-semibold font-mono" style={{ textShadow: '0 0 10px var(--retro-cyan)' }}>MSc in CSE</span> with a focus on ML/AI research. Passionate about writing maintainable code and mentoring fellow developers.
            </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative w-full max-w-xs sm:max-w-sm mx-auto"
          >
            <div className="relative group">
              {/* Pixelated border effect */}
              <div className="absolute -top-4 sm:-top-5 -left-4 sm:-left-5 w-full h-full border-2 border-[var(--retro-cyan)] transition-all duration-300 group-hover:border-opacity-100 group-hover:-top-3 group-hover:-left-3 sm:group-hover:-top-4 sm:group-hover:-left-4"
                style={{
                  imageRendering: 'pixelated',
                  boxShadow: '0 0 15px var(--retro-cyan), 0 0 25px var(--retro-cyan-soft)',
                }}
              ></div>
              {/* Inner pixel border */}
              <div className="absolute -top-2 sm:-top-2.5 -left-2 sm:-left-2.5 w-full h-full border border-[var(--retro-cyan)] border-opacity-40 pointer-events-none"></div>
              <div className="retro-image-wrapper relative aspect-square" style={{ imageRendering: 'pixelated' }}>
                <div className="retro-image-inner">
                  <div className="retro-profile-image" style={{ imageRendering: 'pixelated' }}>
                    <Image
                      src="/khaled_bin_aziz.jpg"
                      alt="Khaled Bin Aziz"
                      fill
                      className="object-cover object-center"
                      style={{ 
                        objectPosition: 'center 20%', 
                        transform: 'scale(1.1)',
                        imageRendering: 'pixelated',
                        filter: 'contrast(1.1) brightness(1.05) saturate(0.95)',
                      }}
                      priority
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>
                </div>
              </div>
              {/* Pixel art corner decorations */}
              <div className="absolute -top-1 -left-1 w-3 h-3 bg-[var(--retro-cyan)] opacity-50 group-hover:opacity-100 transition-opacity" style={{ boxShadow: '0 0 8px var(--retro-cyan)' }}></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--retro-cyan)] opacity-50 group-hover:opacity-100 transition-opacity" style={{ boxShadow: '0 0 8px var(--retro-cyan)' }}></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-[var(--retro-cyan)] opacity-50 group-hover:opacity-100 transition-opacity" style={{ boxShadow: '0 0 8px var(--retro-cyan)' }}></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[var(--retro-cyan)] opacity-50 group-hover:opacity-100 transition-opacity" style={{ boxShadow: '0 0 8px var(--retro-cyan)' }}></div>
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
              {/* Pixelated border effect for mobile */}
              <div className="absolute -top-3 -left-3 w-full h-full border-2 border-[var(--retro-cyan)] transition-all duration-300"
                style={{
                  imageRendering: 'pixelated',
                  boxShadow: '0 0 15px var(--retro-cyan), 0 0 25px var(--retro-cyan-soft)',
                }}
              ></div>
              <div className="absolute -top-1.5 -left-1.5 w-full h-full border border-[var(--retro-cyan)] border-opacity-40 pointer-events-none"></div>
              <div className="retro-image-wrapper relative aspect-square" style={{ imageRendering: 'pixelated' }}>
                <div className="retro-image-inner">
                  <div className="retro-profile-image" style={{ imageRendering: 'pixelated' }}>
                    <Image
                      src="/khaled_bin_aziz.jpg"
                      alt="Khaled Bin Aziz"
                      fill
                      className="object-cover object-center"
                      style={{ 
                        objectPosition: 'center 20%', 
                        transform: 'scale(1.1)',
                        imageRendering: 'pixelated',
                        filter: 'contrast(1.1) brightness(1.05) saturate(0.95)',
                      }}
                      priority
                      sizes="192px"
                    />
                  </div>
                </div>
              </div>
              {/* Pixel art corner decorations for mobile */}
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-[var(--retro-cyan)] opacity-50" style={{ boxShadow: '0 0 6px var(--retro-cyan)' }}></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--retro-cyan)] opacity-50" style={{ boxShadow: '0 0 6px var(--retro-cyan)' }}></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[var(--retro-cyan)] opacity-50" style={{ boxShadow: '0 0 6px var(--retro-cyan)' }}></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[var(--retro-cyan)] opacity-50" style={{ boxShadow: '0 0 6px var(--retro-cyan)' }}></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-3 text-center px-4"
          >
            <p className="text-sm leading-relaxed relative pl-4" style={{ color: 'var(--retro-text-dim)', fontFamily: 'var(--font-mono)' }}>
              <span className="text-[var(--retro-cyan)] font-mono text-base mr-2 opacity-80 absolute left-0" style={{ textShadow: '0 0 8px var(--retro-cyan)' }}>▸</span>
              Full Stack Engineer with <span className="text-[var(--retro-cyan)] font-semibold font-mono" style={{ textShadow: '0 0 10px var(--retro-cyan)' }}>3+ years</span> of experience building scalable web applications. Expert in TypeScript, Next.js, and Node.js.
            </p>
            
            <p className="text-sm leading-relaxed relative pl-4" style={{ color: 'var(--retro-text-dim)', fontFamily: 'var(--font-mono)' }}>
              <span className="text-[var(--retro-cyan)] font-mono text-base mr-2 opacity-80 absolute left-0" style={{ textShadow: '0 0 8px var(--retro-cyan)' }}>▸</span>
              Currently pursuing <span className="text-[var(--retro-cyan)] font-semibold font-mono" style={{ textShadow: '0 0 10px var(--retro-cyan)' }}>MSc in CSE</span> with a focus on ML/AI research.
            </p>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Floating Terminal Commands */}
      <FloatingTerminal maxCommands={1} spawnInterval={10000} />
    </section>
  );
}