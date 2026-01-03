'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScrollGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
      <motion.div
        className="absolute top-1/2 left-1/2 w-4 h-4"
        style={{
          x: useTransform(x, (v) => `${v - 50}vw`),
          y: useTransform(y, (v) => `${v - 50}vh`),
          opacity,
          backgroundColor: '#006400',
          boxShadow: '0 0 20px rgba(0, 100, 0, 0.4)',
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-3 h-3"
        style={{
          x: useTransform(x, (v) => `${50 - v}vw`),
          y: useTransform(y, (v) => `${50 - v}vh`),
          opacity,
          backgroundColor: '#008b8b',
          boxShadow: '0 0 15px rgba(0, 139, 139, 0.4)',
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-2 h-2"
        style={{
          x: useTransform(x, (v) => `${v * 0.5 - 25}vw`),
          y: useTransform(y, (v) => `${v * 0.5 - 25}vh`),
          opacity,
          backgroundColor: '#cc6600',
          boxShadow: '0 0 10px rgba(204, 102, 0, 0.4)',
        }}
      />
    </div>
  );
}

