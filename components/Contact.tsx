'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { personalInfo } from '@/data/personal';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import TerminalCommand from './TerminalCommand';
import FloatingTerminal from './FloatingTerminal';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const socialLinks = [
    { name: 'GitHub', Icon: FiGithub, href: personalInfo.github, color: '#b8860b' },
    { name: 'LinkedIn', Icon: FiLinkedin, href: personalInfo.linkedin, color: '#008b8b' },
    { name: 'Email', Icon: FiMail, href: `mailto:${personalInfo.email}`, color: '#cc6600' },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="min-h-screen flex flex-col justify-center items-center py-20 md:py-32 text-center"
      style={{
        background: 'linear-gradient(135deg, rgba(199, 21, 133, 0.1) 0%, rgba(245, 245, 240, 0.95) 35%, rgba(199, 21, 133, 0.08) 100%)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto w-full md:pl-[calc(5%+5px)]"
        style={{ paddingLeft: '5%', paddingRight: '5%' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center text-center mb-8 md:mb-12 gap-4">
          {/* Mobile: Gradient line above title */}
          <div className="md:hidden w-full mb-2">
            <div className="retro-line-gradient"></div>
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-0 mx-auto sm:mx-0">
            <span className="section-number section-number-yellow sm:mr-4">04.</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a]">What&apos;s Next?</h2>
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
          className="mb-12 md:mb-16 max-w-2xl mx-auto"
        >
          <div className="terminal-window p-4">
            <div className="terminal-header mb-3">
              <div className="terminal-buttons">
                <span className="terminal-btn terminal-btn-close"></span>
                <span className="terminal-btn terminal-btn-minimize"></span>
                <span className="terminal-btn terminal-btn-maximize"></span>
              </div>
              <div className="terminal-title">
                <span className="text-[#008b8b]">┌─</span>
                <span className="mx-2">send_message.sh</span>
                <span className="text-[#008b8b]">─┐</span>
              </div>
            </div>
            <div className="terminal-body">
              <TerminalCommand
                commands={[
                  {
                    prompt: '$',
                    command: `echo "Let's connect!" | mail -s "New Opportunity" ${personalInfo.email}`,
                    output: 'Message queued successfully ✓',
                    delay: 2000,
                  },
                  {
                    prompt: '$',
                    command: 'echo "Phone/WhatsApp: +880 1756922708"',
                    output: 'Phone/WhatsApp: +880 1756922708 ✓',
                    delay: 1500,
                  },
                ]}
                autoStart={isInView}
                speed={50}
              />
            </div>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 gradient-text text-glow-strong"
        >
          Get In Touch
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-[#4a4a4a] mb-8 md:mb-12 leading-relaxed px-4"
        >
          I&apos;m currently looking for new opportunities and my inbox is always open.
          Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8 md:mb-12"
        >
          <Link
            href={`mailto:${personalInfo.email}`}
            className="retro-btn retro-btn-yellow"
          >
            Say Hello
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center gap-6 md:gap-8"
        >
          {socialLinks.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              target={social.name !== 'Email' ? '_blank' : undefined}
              rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
              className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 border-2 transition-all duration-300 hover:-translate-y-1 hover:scale-110"
              style={{
                color: social.color,
                borderColor: `${social.color}40`,
                backgroundColor: `${social.color}10`,
              }}
              aria-label={social.name}
            >
              <social.Icon className="text-xl md:text-2xl" />
            </Link>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Floating Terminal Commands */}
      <FloatingTerminal maxCommands={1} spawnInterval={10000} />
    </section>
  );
}
