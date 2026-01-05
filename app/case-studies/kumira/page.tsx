'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { 
  FaTicketAlt, 
  FaClock, 
  FaCreditCard,
  FaExternalLinkAlt,
  FaDesktop,
  FaUserCog,
  FaShip,
  FaCheckCircle,
  FaArrowLeft
} from "react-icons/fa";
import { 
  SiTailwindcss, 
  SiNextdotjs, 
  SiMongodb, 
  SiExpress, 
  SiVercel,
  SiFirebase
} from "react-icons/si";
import kumira from '../../../public/images/kumira.png';
import kumira_dashboard from '../../../public/images/kumira_dashboard.png';
import kumira_admin from '../../../public/images/Kumira_admin.png';

const primaryColor = '#065D71';

const KumiraCaseStudy = () => {
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
                Boat Ticketing Platform
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight text-gray-900"
            >
              Kumira Guptachara
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed"
            >
              Revolutionizing boat travel in Bangladesh with digital ticketing, real-time schedules, and seamless payment integration.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link 
                href="https://kumiraguptachara.com/" 
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
                src={kumira} 
                alt="Kumira Boat Ticketing Platform" 
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
              Kumira Guptachara is a comprehensive boat ticketing platform serving the Guptachara waterway in Bangladesh. The platform digitizes the entire ticketing process, from browsing schedules to secure payments, eliminating long queues and manual booking hassles. With support for Speed Boats, Service Boats, and Cargo Boats, passengers can choose their preferred travel method with ease.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: FaTicketAlt, title: 'Online Booking', desc: 'Seamless online ticket reservation system' },
                { icon: FaClock, title: 'Real-Time Updates', desc: 'Live schedule information for passengers' },
                { icon: FaDesktop, title: 'Counter Dashboard', desc: 'Dedicated interface for in-person bookings' },
                { icon: FaUserCog, title: 'Admin Panel', desc: 'Business analytics and management tools' },
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
              The traditional boat ticketing system in Guptachara was inefficient, causing long queues and confusion. Kumira solved this by creating a digital platform that streamlines the entire process.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                'Eliminated long waiting lines at ticket counters',
                'Reduced booking errors and double-bookings',
                'Provided real-time availability information'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-5 rounded-xl bg-gray-50 border border-gray-100">
                  <FaCheckCircle className="text-xl mt-0.5 flex-shrink-0" style={{ color: primaryColor }} />
                  <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Management System */}
        <section className="mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Management System</h2>
            <div className="h-1 w-16 mb-12 rounded-full" style={{ backgroundColor: primaryColor }}></div>

            {/* Counter Dashboard */}
            <div className="mb-16 md:mb-20">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
                      <FaDesktop style={{ color: primaryColor, fontSize: '1.75rem' }} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Counter Dashboard</h3>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                    The Counter Dashboard provides ticket agents with a powerful interface for managing in-person bookings and daily operations.
                  </p>
                  <ul className="space-y-4">
                    {[
                      'Process in-person ticket bookings quickly with minimal waiting time',
                      'Track boat availability and manage seat assignments in real-time',
                      'Process cash payments and generate boarding passes instantly',
                      'View daily sales reports and transaction history'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-sm font-bold mt-1 flex-shrink-0 rounded-full w-7 h-7 flex items-center justify-center text-xs text-white" 
                          style={{ backgroundColor: primaryColor }}>{idx + 1}</span>
                        <span className="text-gray-700 leading-relaxed pt-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl overflow-hidden shadow-xl border border-gray-200">
                  <div className="relative w-full aspect-[4/3]">
                    <Image 
                      src={kumira_dashboard} 
                      alt="Kumira Counter Dashboard" 
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Panel */}
            <div>
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div className="order-2 lg:order-1 rounded-xl overflow-hidden shadow-xl border border-gray-200">
                  <div className="relative w-full aspect-[4/3]">
                    <Image 
                      src={kumira_admin} 
                      alt="Kumira Admin Dashboard" 
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
                      <FaUserCog style={{ color: primaryColor, fontSize: '1.75rem' }} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Panel</h3>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                    The comprehensive Admin Panel empowers business owners with powerful tools to track performance, analyze trends, and optimize operations.
                  </p>
                  <div>
                    <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-900">Business Intelligence Features:</h4>
                    <ul className="space-y-4">
                      {[
                        'Comprehensive business analytics with visual data representations',
                        'Monitor revenue streams, ticket sales, and boat utilization rates',
                        'Track customer acquisition and retention metrics',
                        'Manage fleet schedules, pricing strategies, and system configurations'
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-sm font-bold mt-1 flex-shrink-0 rounded-full w-7 h-7 flex items-center justify-center text-xs text-white" 
                            style={{ backgroundColor: primaryColor }}>{idx + 1}</span>
                          <span className="text-gray-700 leading-relaxed pt-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
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
                { icon: FaShip, title: 'Multiple Boat Options', desc: 'Users can choose from Speed Boat, Service Boat, and Mal Boat based on their travel needs and preferences.' },
                { icon: FaClock, title: 'Live Schedule Updates', desc: 'Passengers can check real-time departure and arrival schedules before booking their tickets.' },
                { icon: FaCreditCard, title: 'Aamar Pay Integration', desc: 'Secure and seamless payment processing through Aamar Pay, ensuring safe transactions for all users.' },
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
              {[
                { icon: SiNextdotjs, name: 'Next.js', color: '#1a1a1a' },
                { icon: SiTailwindcss, name: 'Tailwind CSS', color: '#06B6D4' },
                { icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
                { icon: SiExpress, name: 'Express.js', color: '#1a1a1a' },
                { icon: SiFirebase, name: 'Firebase', color: '#FFCA28' },
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
                { value: '80%', title: 'Faster Processing', desc: 'Reduced ticket processing time by 80% compared to manual systems' },
                { value: '60%', title: 'Increased Bookings', desc: 'Online bookings increased by 60% after platform implementation' },
                { value: '95%', title: 'User Satisfaction', desc: 'High satisfaction rate from users across all demographics' },
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

        {/* Transforming Water Travel */}
        <section className="mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Transforming Water Travel</h2>
            <div className="h-1 w-16 mb-12 rounded-full" style={{ backgroundColor: primaryColor }}></div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  heading: 'For Passengers',
                  items: [
                    'Book tickets from anywhere, anytime - no more long queues',
                    'Real-time schedule updates and boat availability',
                    'Secure digital payments via Aamar Pay',
                    'Instant booking confirmation and e-tickets'
                  ]
                },
                {
                  heading: 'For Operators',
                  items: [
                    'Streamlined operations with digital record keeping',
                    'Comprehensive business analytics and insights',
                    'Reduced booking errors and revenue leakage',
                    'Better fleet management and utilization'
                  ]
                }
              ].map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-8 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">{section.heading}</h3>
                  <ul className="space-y-4">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3">
                        <FaCheckCircle className="text-xl mt-0.5 flex-shrink-0" style={{ color: primaryColor }} />
                        <span className="text-gray-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
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
            href="https://kumiraguptachara.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl md:text-3xl font-bold mb-4 inline-block transition-colors hover:opacity-80"
            style={{ color: primaryColor }}
          >
            kumiraguptachara.com
          </Link>
          <p className="text-gray-600 max-w-2xl mx-auto text-base">
            Transforming water travel in Bangladesh with modern technology and user-centered design.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default KumiraCaseStudy;
