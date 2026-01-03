'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { certifications } from '@/data/certifications';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="certifications"
      ref={ref}
      className="min-h-screen flex flex-col justify-center items-center w-full px-4 sm:px-6 md:px-12 lg:px-16 py-20 md:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto w-full"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-center text-center sm:text-left mb-12 md:mb-16 gap-4">
          <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-0 mx-auto sm:mx-0">
            <span className="section-number section-number-cyan sm:mr-4">06.</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a] text-glow-cyan">Certifications</h2>
          </div>
          <div className="hidden md:block flex-1 ml-6">
            <div className="retro-line-gradient"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="terminal-window group"
            >
              <div className="terminal-body">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a] mb-2">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-[#008b8b] font-semibold mb-1">
                      {cert.issuer}
                    </p>
                    <p className="text-xs text-[#4a4a4a]">
                      Issued: {cert.date}
                      {cert.credentialId && (
                        <span className="ml-2">• ID: {cert.credentialId}</span>
                      )}
                    </p>
                  </div>
                  {cert.link && (
                    <Link
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 border transition-all duration-300 hover:scale-110 flex-shrink-0"
                      style={{
                        color: 'var(--retro-cyan)',
                        borderColor: 'rgba(0, 139, 139, 0.4)',
                        backgroundColor: 'rgba(0, 139, 139, 0.1)',
                      }}
                      aria-label="View Certificate"
                    >
                      <FiExternalLink className="text-lg" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

