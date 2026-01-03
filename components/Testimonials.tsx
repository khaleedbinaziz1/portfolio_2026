'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { testimonials } from '@/data/testimonials';
import { FiStar } from 'react-icons/fi';

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="testimonials"
      ref={ref}
      className="min-h-screen flex flex-col justify-center items-center w-full px-4 sm:px-6 md:px-12 lg:px-16 py-20 md:py-32"
      style={{
        background: 'linear-gradient(135deg, rgba(106, 90, 205, 0.1) 0%, rgba(235, 235, 230, 0.92) 40%, rgba(106, 90, 205, 0.08) 100%)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto w-full"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-center text-center sm:text-left mb-12 md:mb-16 gap-4">
          <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-0 mx-auto sm:mx-0">
            <span className="section-number section-number-yellow sm:mr-4">05.</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a] text-glow-yellow">What People Say</h2>
          </div>
          <div className="hidden md:block flex-1 ml-6">
            <div className="retro-line-gradient"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="terminal-window group"
            >
              <div className="terminal-body">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="text-[#b8860b] fill-[#b8860b]" size={16} />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-[#4a4a4a] leading-relaxed mb-6 italic">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="border-t border-[#008b8b] border-opacity-20 pt-4">
                  <div className="font-bold text-[#1a1a1a]">{testimonial.name}</div>
                  <div className="text-sm text-[#4a4a4a]">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

