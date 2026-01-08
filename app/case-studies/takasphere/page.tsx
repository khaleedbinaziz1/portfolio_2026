'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { 
  FaGamepad, 
  FaChartLine, 
  FaTrophy,
  FaExternalLinkAlt,
  FaGraduationCap,
  FaMedal,
  FaCheckCircle,
  FaArrowLeft,
  FaUserCircle,
  FaLock
} from "react-icons/fa";
import { 
  SiTailwindcss, 
  SiNextdotjs, 
  SiClerk,
  SiVercel
} from "react-icons/si";
import takasphere from '../../../public/images/takasphere.png';

const primaryColor = '#1B8A5F';

const TakaSphereCaseStudy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Link 
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              <FaArrowLeft className="text-xs" />
              <span>Back to Projects</span>
            </Link>
          </motion.div>

          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <span className="inline-block text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full" 
                style={{ color: primaryColor, backgroundColor: `${primaryColor}08` }}>
                Financial Literacy Platform
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight text-gray-900"
              >
                TakaSphere
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed"
            >
                Financial literacy platform with gamified learning, interactive dashboards, progress tracking, and secure authentication. Making financial education engaging and accessible.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link 
                href="https://www.takasphere.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 text-white shadow-lg hover:shadow-xl"
                style={{ backgroundColor: primaryColor }}
              >
                Visit Website <FaExternalLinkAlt className="text-sm" />
              </Link>
            </motion.div>
          </div>
            </div>
      </section>

      {/* Hero Image */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="rounded-2xl overflow-hidden shadow-2xl"
            >
            <div className="relative w-full aspect-video">
                <Image 
                  src={takasphere} 
                alt="TakaSphere Financial Literacy Platform" 
                fill
                className="object-cover"
                  priority 
                sizes="100vw"
                />
              </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        
        {/* Project Overview */}
        <section className="mb-20 md:mb-28">
          <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Project Overview</h2>
            <div className="h-1 w-16 mb-8 rounded-full" style={{ backgroundColor: primaryColor }}></div>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-12">
              TakaSphere is a gamified financial literacy platform that makes learning about finance engaging and interactive. Built with modern web technologies for seamless user experience and comprehensive progress tracking. The platform transforms traditional financial education into an enjoyable journey with rewards, achievements, and personalized learning paths.
              </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: FaGamepad, title: 'Gamified Learning', desc: 'Interactive games and challenges for engaging financial education' },
                { icon: FaChartLine, title: 'Progress Tracking', desc: 'Track your financial literacy journey with detailed analytics' },
                { icon: FaTrophy, title: 'Achievements', desc: 'Earn badges and rewards for progress milestones' },
                { icon: FaUserCircle, title: 'User Profiles', desc: 'Personalized learning paths and comprehensive user dashboards' },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="p-6 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg bg-white"
                  >
                <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg flex-shrink-0" style={{ backgroundColor: `${primaryColor}10` }}>
                        <Icon style={{ color: primaryColor, fontSize: '1.5rem' }} />
                  </div>
                  <div>
                        <h3 className="font-semibold text-lg mb-2 text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                  </motion.div>
                );
              })}
                  </div>
          </motion.div>
        </section>

        {/* Challenge & Solution */}
        <section className="mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Challenge & Solution</h2>
            <div className="h-1 w-16 mb-8 rounded-full" style={{ backgroundColor: primaryColor }}></div>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              Traditional financial education often feels dry and inaccessible. TakaSphere solves this by gamifying the learning experience, making financial literacy engaging and motivating through interactive content, progress tracking, and achievement systems.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                'Gamified learning experience with rewards and achievements',
                'Interactive dashboards and progress tracking',
                'Secure authentication with personalized user profiles'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-5 rounded-xl bg-gray-50 border border-gray-100">
                  <FaCheckCircle className="text-xl mt-0.5 flex-shrink-0" style={{ color: primaryColor }} />
                  <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Key Features */}
        <section className="mb-20 md:mb-28">
          <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Key Features</h2>
            <div className="h-1 w-16 mb-12 rounded-full" style={{ backgroundColor: primaryColor }}></div>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                { icon: FaGraduationCap, title: 'Interactive Learning', desc: 'Engaging content and interactive lessons to make financial education accessible and enjoyable for all users.' },
                { icon: FaMedal, title: 'Rewards System', desc: 'Earn achievements, badges, and rewards as you progress through your financial literacy journey.' },
                { icon: FaLock, title: 'Secure Platform', desc: 'Protected with Clerk authentication ensuring user data security and privacy.' },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="text-center"
                  >
                    <div className="mb-6 flex justify-center">
                      <div className="p-4 rounded-2xl" style={{ backgroundColor: `${primaryColor}10` }}>
                        <Icon style={{ color: primaryColor, fontSize: '2rem' }} />
          </div>
            </div>
                    <h3 className="font-semibold text-xl mb-3 text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* Technology Stack */}
        <section className="mb-20 md:mb-28">
          <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Technology Stack</h2>
            <div className="h-1 w-16 mb-12 rounded-full" style={{ backgroundColor: primaryColor }}></div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { icon: SiNextdotjs, name: 'Next.js', color: '#1a1a1a' },
                { icon: SiTailwindcss, name: 'Tailwind CSS', color: '#06B6D4' },
                { icon: SiClerk, name: 'Clerk', color: '#6C47FF' },
                { icon: SiVercel, name: 'Vercel', color: '#1a1a1a' },
              ].map((tech, idx) => {
                const Icon = tech.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="flex flex-col items-center p-6 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg bg-white"
                  >
                    <Icon className="text-4xl mb-3" style={{ color: tech.color }} />
                    <span className="text-sm font-medium text-gray-700 text-center">{tech.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* Results & Impact */}
        <section className="mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Results & Impact</h2>
            <div className="h-1 w-16 mb-12 rounded-full" style={{ backgroundColor: primaryColor }}></div>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                { value: '1000+', title: 'Active Learners', desc: 'Platform engaged over 1000 users in financial literacy education' },
                { value: '85%', title: 'Completion Rate', desc: 'High course completion rate thanks to gamified learning approach' },
                { value: '4.8/5', title: 'User Rating', desc: 'Excellent user satisfaction with engaging and accessible content' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="text-center p-8 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-shadow"
                >
                  <div className="text-5xl md:text-6xl font-bold mb-4" style={{ color: primaryColor }}>{item.value}</div>
                  <h3 className="font-semibold text-xl mb-3 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-16 border-t border-gray-200 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link 
            href="https://www.takasphere.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl md:text-3xl font-bold mb-4 inline-block transition-colors hover:opacity-80"
            style={{ color: primaryColor }}
          >
            takasphere.com
          </Link>
          <p className="text-gray-600 max-w-2xl mx-auto text-base">
            Making financial literacy engaging and accessible through gamification.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TakaSphereCaseStudy;
