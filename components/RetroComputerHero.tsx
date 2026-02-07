'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { personalInfo } from '@/data/personal';
import TypingAnimation from './TypingAnimation';

export default function RetroComputerHero() {
  return (
    <section
      id="hero"
      className="retro-computer-hero min-h-screen flex flex-col items-center justify-center w-full relative overflow-hidden"
    >
      {/* Background */}
      <div className="retro-computer-hero-bg" aria-hidden />
      <div className="retro-computer-hero-grid" aria-hidden />

      <div className="retro-computer-hero-inner">
        {/* Monitor frame - CRT style */}
        <motion.div
          className="retro-computer-monitor"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Monitor bezel (outer frame) */}
          <div className="retro-computer-bezel">
            {/* Screen area - shows your image + terminal overlay */}
            <div className="retro-computer-screen-wrap">
              <div className="retro-computer-screen">
                {/* Your image as the "display" */}
                <div className="retro-computer-screen-image">
                  <Image
                    src="/khaled_bin_aziz.jpg"
                    alt={personalInfo.name}
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 768px) 90vw, 480px"
                  />
                </div>
                {/* Terminal-style overlay on the screen */}
                <div className="retro-computer-screen-overlay">
                  <div className="retro-computer-terminal-line">
                    <span className="retro-computer-prompt">{'>'}</span>
                    <TypingAnimation
                      text={personalInfo.name}
                      speed={90}
                      showCursor={true}
                      className="retro-computer-terminal-text"
                      style={{ color: '#00ff41' }}
                    />
                  </div>
                  <div className="retro-computer-terminal-line">
                    <span className="retro-computer-prompt">{'>'}</span>
                    <span className="retro-computer-terminal-text" style={{ color: '#00d9ff' }}>
                      {personalInfo.title}
                    </span>
                  </div>
                  <div className="retro-computer-terminal-line">
                    <span className="retro-computer-prompt">{'>'}</span>
                    <span className="retro-computer-terminal-text" style={{ color: '#00ff41' }}>
                      {personalInfo.greeting}
                    </span>
                  </div>
                </div>
                {/* CRT scanlines */}
                <div className="retro-computer-scanlines" aria-hidden />
              </div>
            </div>
            {/* CRT curve effect (inner shadow) */}
            <div className="retro-computer-screen-curve" aria-hidden />
          </div>
          {/* Monitor stand */}
          <div className="retro-computer-stand">
            <div className="retro-computer-stand-neck" />
            <div className="retro-computer-stand-base" />
          </div>
        </motion.div>

        {/* Caption and CTAs below monitor */}
        <motion.div
          className="retro-computer-hero-ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="retro-computer-hero-caption">
            <span className="retro-computer-hero-caption-prompt">$</span> {personalInfo.intro} <strong>{personalInfo.name}</strong>
          </p>
          <div className="retro-computer-hero-buttons">
            <Link href="#contact" className="retro-computer-btn retro-computer-btn-primary">
              Get In Touch
            </Link>
            <Link href="#projects" className="retro-computer-btn">
              View My Work
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="retro-computer-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <span>Scroll</span>
        <span className="retro-computer-scroll-arrow">↓</span>
      </motion.div>
    </section>
  );
}
