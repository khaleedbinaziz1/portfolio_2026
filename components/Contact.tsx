'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { personalInfo } from '@/data/personal';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { SiWhatsapp } from 'react-icons/si';
import FloatingTerminal from './FloatingTerminal';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const socialLinks = [
    { name: 'GitHub', Icon: FiGithub, href: personalInfo.github, color: '#b8860b' },
    { name: 'LinkedIn', Icon: FiLinkedin, href: personalInfo.linkedin, color: '#008b8b' },
    { name: 'Email', Icon: FiMail, href: `mailto:${personalInfo.email}`, color: '#cc6600' },
    { name: 'WhatsApp', Icon: SiWhatsapp, href: 'https://wa.me/8801756922708', color: '#25D366' },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="min-h-screen flex flex-col justify-center items-center py-20 md:py-32 text-center retro-pixel-bg-dark relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #151515 40%, #0f0f0f 60%, #0a0a0a 100%)',
        color: '#e0e0e0',
      }}
    >
      {/* Pixelated decorative elements */}
      <div className="absolute top-10 left-10 w-16 h-16 border-2 border-[#b8860b] border-opacity-40 pointer-events-none hidden md:block" style={{ imageRendering: 'pixelated', boxShadow: '0 0 10px #b8860b' }}></div>
      <div className="absolute bottom-20 right-10 w-12 h-12 border-2 border-[#b8860b] border-opacity-40 pointer-events-none hidden md:block" style={{ imageRendering: 'pixelated', boxShadow: '0 0 10px #b8860b' }}></div>
      <div className="absolute top-1/2 right-5 w-8 h-8 border-2 border-[#b8860b] border-opacity-30 pointer-events-none hidden lg:block" style={{ imageRendering: 'pixelated', boxShadow: '0 0 8px #b8860b' }}></div>
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
            <span className="section-number section-number-yellow sm:mr-4" style={{ color: '#b8860b', textShadow: '0 0 8px #b8860b' }}>05.</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-glow-strong" style={{ color: '#e0e0e0', textShadow: '0 0 10px rgba(184, 134, 11, 0.6)' }}>Get In Touch</h2>
          </div>
          <div className="hidden md:block flex-1 ml-6">
            <div className="retro-line-gradient"></div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl mb-8 md:mb-12 leading-relaxed px-4"
          style={{ color: '#b0b0b0' }}
        >
          I&apos;m open to new opportunities and collaborations. Feel free to reach out if you&apos;d like to discuss a project, have a question, or just want to connect!
        </motion.p>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 md:mb-12 space-y-4"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center">
            <div className="flex items-center gap-3">
              <FiMail className="text-xl text-[#cc6600]" />
              <a 
                href={`mailto:${personalInfo.email}`}
                className="text-base sm:text-lg transition-colors"
                style={{ color: '#b0b0b0' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#b8860b'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#b0b0b0'}
              >
                {personalInfo.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <SiWhatsapp className="text-xl text-[#25D366]" />
              <a 
                href="https://wa.me/8801756922708"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base sm:text-lg transition-colors"
                style={{ color: '#b0b0b0' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#25D366'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#b0b0b0'}
              >
                +880 1756922708
              </a>
            </div>
          </div>
        </motion.div>

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