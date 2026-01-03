'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { achievements } from '@/data/achievements';

export default function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="achievements"
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
            <span className="section-number section-number-purple sm:mr-4">04.</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a] text-glow">Achievements & Stats</h2>
          </div>
          <div className="hidden md:block flex-1 ml-6">
            <div className="retro-line-gradient"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="terminal-window group"
            >
              <div className="terminal-body text-center">
                <div 
                  className="flex justify-center mb-4"
                  style={{ color: achievement.color }}
                >
                  <achievement.icon className="text-4xl md:text-5xl" />
                </div>
                <div 
                  className="text-3xl md:text-4xl font-bold mb-2"
                  style={{ color: achievement.color }}
                >
                  {achievement.value}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 text-[#1a1a1a]">
                  {achievement.title}
                </h3>
                <p className="text-sm text-[#4a4a4a]">
                  {achievement.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

