'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { personalInfo } from '@/data/personal';

export default function Footer() {
  return (
    <footer className="footer-crt" role="contentinfo">
      <div className="footer-crt-glow" aria-hidden />
      <div className="footer-crt-scanline" aria-hidden />
      <motion.p
        className="footer-crt-credit"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Designed &amp; built by{' '}
        <Link href="#hero" className="footer-crt-link">
          {personalInfo.name}
        </Link>
      </motion.p>
    </footer>
  );
}
