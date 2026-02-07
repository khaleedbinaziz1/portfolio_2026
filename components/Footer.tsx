'use client';

import { motion } from 'framer-motion';
import { personalInfo } from '@/data/personal';

export default function Footer() {
  return (
    <footer className="text-center py-8 text-sm border-t border-[var(--retro-yellow)] border-opacity-40 md:pl-[calc(5%+5px)] retro-pixel-bg-dark relative overflow-hidden" style={{
      paddingLeft: '5%',
      paddingRight: '5%',
      background: 'linear-gradient(135deg, var(--retro-bg) 0%, #151515 40%, #0f0f0f 60%, var(--retro-bg) 100%)',
      color: 'var(--retro-text-dim)',
    }}>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span style={{ color: 'var(--retro-text-dim)' }}>Designed & Built by{' '}</span>
        <a
          href="#hero"
          className="retro-link"
          style={{ color: 'var(--retro-yellow)', textShadow: '0 0 8px var(--retro-yellow)' }}
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
        style={{ color: 'var(--retro-text-dim)' }}
      >
        © {new Date().getFullYear()} All rights reserved
      </motion.p>
    </footer>
  );
}
