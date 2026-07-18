'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import TerminalCommand from './TerminalCommand';
import { personalInfo } from '@/data/personal';

const EASE = [0.22, 0.61, 0.36, 1] as const;
const STAGGER = 0.08;

export default function About() {
  const aboutLines = personalInfo.about ?? [];
  const terminalAboutLines = [
    aboutLines[1] ?? 'Built e-commerce platforms and complex web apps. Focus on accessible, scalable products for clients.',
    `▸ ${aboutLines[2] ?? 'Pursuing MSc in CSE with focus on AI/ML in healthcare and web tech.'}`,
    '— end of about.txt —',
  ];

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
        <div className="about-layout">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="about-image-wrap"
          >
            <div className="about-image-frame">
              <Image
                src="/images/me.jpg"
                alt="Pixel art illustration: developer at desk in a cozy room"
                width={400}
                height={520}
                className="about-image"
                sizes="(max-width: 767px) 100vw,  min(42vw, 380px)"
                priority={false}
              />
            </div>
          </motion.div>

          <div className="about-main">
            <div className="about-header">
              <div className="about-header-line md:hidden" />
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                <span className="about-num">01.</span>
                <h2 className="about-title">About Me</h2>
              </div>
              <p className="about-subtitle">// the person behind the screen</p>
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
                  <p className="about-term-static">
                    <span className="prompt">$</span> whoami
                  </p>
                  <p className="about-term-static output">
                    {personalInfo.name} · {personalInfo.title}
                  </p>
                  <TerminalCommand
                    commands={[
                      {
                        prompt: '$',
                        command: 'cat ~/about.txt',
                        output: terminalAboutLines.join('\n'),
                        delay: 2200,
                      },
                      {
                        prompt: '$',
                        command: 'years of experience',
                        output: '3+ years building products',
                        delay: 1400,
                      },
                    ]}
                    autoStart={true}
                    speed={45}
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}