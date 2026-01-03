'use client';

import { motion } from 'framer-motion';
import { personalInfo } from '@/data/personal';

export default function Footer() {
  return (
    <footer className="text-center py-8 text-[#4a4a4a] text-sm border-t border-[#006400] border-opacity-30 md:pl-[calc(5%+5px)]" style={{ paddingLeft: '5%', paddingRight: '5%' }}>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Designed & Built by{' '}
        <a
          href="#hero"
          className="retro-link"
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
      >
        © {new Date().getFullYear()} All rights reserved
      </motion.p>
    </footer>
  );
}
