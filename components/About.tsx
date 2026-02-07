'use client';

import { motion } from 'framer-motion';
import TerminalCommand from './TerminalCommand';
import { personalInfo } from '@/data/personal';

const EASE = [0.22, 0.61, 0.36, 1] as const;
const STAGGER = 0.08;

export default function About() {
  const aboutLines = personalInfo.about ?? [];

  return (
    <section id="about" className="about-section relative">
      <div className="about-bg" aria-hidden="true" />
      <div className="about-glow" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px', amount: 0.1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="about-content relative z-10"
      >
        <div className="about-header">
          <div className="about-header-line md:hidden" />
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <span className="about-num">01.</span>
            <h2 className="about-title">About Me</h2>
          </div>
          <p className="about-subtitle">The person behind the screen</p>
          <div className="about-header-line hidden md:block" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.5, delay: STAGGER, ease: EASE }}
          className="about-terminal-wrap"
        >
          <div className="about-terminal-window">
            <div className="about-term-header">
              <div className="about-term-dots">
                <span className="dot-r" />
                <span className="dot-y" />
                <span className="dot-g" />
              </div>
              <div className="about-term-title">
                <span className="prompt">┌─</span> about.txt <span className="prompt">─┐</span>
              </div>
            </div>
            <div className="about-term-body">
              <TerminalCommand
                commands={[
                  {
                    prompt: '$',
                    command: 'cat ~/about.txt',
                    output: aboutLines[0] ?? 'Passionate about building for the web.',
                    delay: 2200,
                  },
                  {
                    prompt: '$',
                    command: 'wc -l ~/about.txt',
                    output: `${aboutLines.length} lines · the rest is below`,
                    delay: 1400,
                  },
                ]}
                autoStart={true}
                speed={45}
              />
            </div>
          </div>
        </motion.div>

        <div className="about-story">
          {aboutLines.slice(1).map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10px' }}
              transition={{ duration: 0.5, delay: i * STAGGER, ease: EASE }}
              className="about-story-p"
            >
              <span className="about-story-bullet">▸</span>
              {line}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}