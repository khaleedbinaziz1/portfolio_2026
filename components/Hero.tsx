'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { personalInfo } from '@/data/personal';
import TypingAnimation from './TypingAnimation';
import TerminalWindow from './TerminalWindow';
import RetroEffects from './RetroEffects';
import FloatingTerminal from './FloatingTerminal';
import TerminalSnippets from './TerminalSnippets';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center w-full retro-pixel-bg-light relative overflow-hidden"
      style={{
        color: '#1a1a1a',
        background: 'linear-gradient(135deg, rgba(184, 134, 11, 0.1) 0%, rgba(245, 245, 240, 0.95) 40%, rgba(184, 134, 11, 0.08) 100%)',
      }}
    >
      {/* Pixelated decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border-2 border-[#008b8b] border-opacity-20 pointer-events-none hidden md:block" style={{ imageRendering: 'pixelated' }}></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 border-2 border-[#006400] border-opacity-20 pointer-events-none hidden md:block" style={{ imageRendering: 'pixelated' }}></div>
      <div className="absolute top-1/2 right-5 w-12 h-12 border-2 border-[#cc6600] border-opacity-15 pointer-events-none hidden lg:block" style={{ imageRendering: 'pixelated' }}></div>
      <div className="retro-grid-pattern"></div>
      <div className="retro-scanlines"></div>
      <div className="w-full max-w-7xl mb-5 mx-auto py-12 sm:py-16 md:py-20 relative z-10 md:pl-[calc(5%+5px)]" style={{ paddingLeft: '5%', paddingRight: '5%' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col items-center text-center"
        >
          <motion.div
            variants={itemVariants}
            className="text-xs sm:text-sm md:text-base lg:text-lg mb-3 sm:mb-4 font-medium text-glow-cyan"
            style={{ color: '#00ced1' }}
          >
            <span className="code-comment-style">{`// ${personalInfo.intro}`}</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-3 sm:mb-4 leading-tight text-glow-strong glitch-text break-words"
            style={{ 
              color: '#016400',
              textShadow: '0 0 10px rgba(7, 204, 0, 0.6), 0 0 20px rgba(204, 102, 0, 0.4), 0 0 30px rgba(204, 102, 0, 0.2)',
            }}
          >
            {personalInfo.name}
            <span className="terminal-cursor"></span>
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 sm:mb-5 md:mb-6 leading-tight break-words"
            style={{ color: '#1a1a1a', textShadow: '0 0 10px rgba(0, 206, 209, 0.2)' }}
          >
            {personalInfo.greeting}
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="max-w-full md:max-w-2xl mb-8 sm:mb-10 md:mb-12"
            style={{ margin: '0 5px' }}
          >
            <TerminalWindow 
              title="about.txt" 
              className="mb-4 hero-terminal-light-bg"
              prompt="cat"
            >
              <div className="terminal-content">
                <TypingAnimation 
                  text={personalInfo.bio}
                  speed={30}
                  className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed"
                  style={{ color: '#4a4a4a' }}
                  showCursor={false}
                />
              </div>
            </TerminalWindow>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10"
            style={{ marginTop: '30px' }}
          >
            <Link
              href="#contact"
              className="retro-gaming-btn text-center text-sm sm:text-base"
            >
              Get In Touch
            </Link>
            <Link
              href="#projects"
              className="retro-gaming-btn text-center text-sm sm:text-base"
              style={{ borderColor: 'var(--retro-cyan)', color: 'var(--retro-cyan)' }}
            >
              View My Work
            </Link>
          </motion.div>

          {/* Snake Game emerges from cursor */}
          {/* <motion.div
            variants={itemVariants}
            className="w-full max-w-full sm:max-w-md"
          >
            <SnakeGame />
          </motion.div> */}
        </motion.div>
      </div>
      
      {/* Background Retro Effects */}
      <RetroEffects type="terminal" intensity="medium" />
      <FloatingTerminal maxCommands={2} spawnInterval={7000} />
      <TerminalSnippets />
    </section>
  );
}