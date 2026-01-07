'use client';

import { motion } from 'framer-motion';
import { personalInfo } from '@/data/personal';

export default function Footer() {
  return (
    <footer className="text-center py-8 text-sm border-t border-[#b8860b] border-opacity-40 md:pl-[calc(5%+5px)] retro-pixel-bg-dark relative overflow-hidden" style={{ 
      paddingLeft: '5%', 
      paddingRight: '5%',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #151515 40%, #0f0f0f 60%, #0a0a0a 100%)',
      color: '#b0b0b0',
    }}>
      {/* Pixelated decorative elements */}
      <div className="absolute top-5 left-10 w-12 h-12 border-2 border-[#b8860b] border-opacity-20 pointer-events-none hidden md:block" style={{ imageRendering: 'pixelated' }}></div>
      <div className="absolute top-5 right-10 w-12 h-12 border-2 border-[#b8860b] border-opacity-20 pointer-events-none hidden md:block" style={{ imageRendering: 'pixelated' }}></div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span style={{ color: '#b0b0b0' }}>Designed & Built by{' '}</span>
        <a
          href="#hero"
          className="retro-link"
          style={{ color: '#b8860b', textShadow: '0 0 8px #b8860b' }}
        >
          {personalInfo.name}
        </a>
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-2 text-xs"
        style={{ color: '#b0b0b0' }}
      >
        © {new Date().getFullYear()} All rights reserved
      </motion.p>
    </footer>
  );
}
