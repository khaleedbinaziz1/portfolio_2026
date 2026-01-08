'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { 
  FaRocket, 
  FaPuzzlePiece, 
  FaCreditCard,
  FaExternalLinkAlt,
  FaDesktop,
  FaLayerGroup,
  FaTools,
  FaCheckCircle,
  FaArrowLeft,
  FaMousePointer,
  FaGlobe
} from "react-icons/fa";
import { 
  SiTailwindcss, 
  SiNextdotjs, 
  SiMongodb, 
  SiExpress, 
  SiTypescript,
  SiVercel
} from "react-icons/si";
import website_builder from '../../../public/images/website_builder.png';
import pixentix_dashboard from '../../../public/images/pixentix_dashboard.png';

const primaryColor = '#8F75E6';

const PixentixAutoPilotCaseStudy = () => {
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
                E-commerce Website Builder
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight text-gray-900"
              >
                Pixentix Auto Pilot
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed"
            >
                E-commerce website builder using prebuilt Next.js components. Create functional stores in under 10 minutes with drag-and-drop selection, payment integration, and responsive templates.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link 
                href="https://www.pixentix.com/" 
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
                  src={website_builder} 
                alt="Pixentix Auto Pilot Website Builder" 
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
              Pixentix Auto Pilot is a revolutionary e-commerce website builder that allows users to create functional online stores in minutes using prebuilt Next.js components and a drag-and-drop interface. The platform eliminates the need for extensive coding knowledge, making e-commerce accessible to everyone.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: FaRocket, title: 'Fast Creation', desc: 'Build functional e-commerce stores in under 10 minutes' },
                { icon: FaPuzzlePiece, title: 'Prebuilt Components', desc: 'Extensive library of ready-to-use Next.js components' },
                { icon: FaCreditCard, title: 'Payment Integration', desc: 'Built-in payment gateway support for seamless transactions' },
                { icon: FaDesktop, title: 'Responsive Templates', desc: 'Mobile-first responsive design templates for all devices' },
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
              Creating an e-commerce website from scratch is time-consuming and complex. Pixentix Auto Pilot simplifies this by providing prebuilt components and a streamlined builder interface, enabling users to launch professional stores without extensive technical knowledge.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                'Drag-and-drop component selection',
                'Instant store creation with prebuilt templates',
                'Integrated payment gateway support'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-5 rounded-xl bg-gray-50 border border-gray-100">
                  <FaCheckCircle className="text-xl mt-0.5 flex-shrink-0" style={{ color: primaryColor }} />
                  <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Builder Interface */}
        <section className="mb-20 md:mb-28">
          <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Builder Interface</h2>
            <div className="h-1 w-16 mb-12 rounded-full" style={{ backgroundColor: primaryColor }}></div>
          
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
                    <FaTools style={{ color: primaryColor, fontSize: '1.75rem' }} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Intuitive Builder</h3>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                  The builder interface provides a seamless experience for creating custom e-commerce stores with prebuilt components and drag-and-drop functionality.
                </p>
                <ul className="space-y-4">
                  {[
                    'Select from prebuilt component library',
                    'Customize templates and layouts easily',
                    'Deploy instantly with one click'
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
                    src={pixentix_dashboard} 
                    alt="Pixentix Builder Interface" 
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
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
                { icon: FaLayerGroup, title: 'Component Library', desc: 'Extensive library of prebuilt Next.js components for rapid website development.' },
                { icon: FaMousePointer, title: 'Easy Customization', desc: 'Simple drag-and-drop interface for customizing layouts and components without coding.' },
                { icon: FaGlobe, title: 'Quick Deployment', desc: 'Deploy your store instantly with integrated hosting and domain management.' },
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
                { icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
                { icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
                { icon: SiExpress, name: 'Express.js', color: '#1a1a1a' },
                { icon: SiTailwindcss, name: 'Tailwind CSS', color: '#06B6D4' },
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
                { value: '10 min', title: 'Store Creation', desc: 'Users can create functional e-commerce stores in under 10 minutes' },
                { value: '100+', title: 'Components', desc: 'Extensive library with over 100 prebuilt components available' },
                { value: '99.9%', title: 'Uptime', desc: 'Reliable hosting infrastructure ensuring maximum availability' },
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
            href="https://www.pixentix.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl md:text-3xl font-bold mb-4 inline-block transition-colors hover:opacity-80"
            style={{ color: primaryColor }}
          >
            pixentix.com
          </Link>
          <p className="text-gray-600 max-w-2xl mx-auto text-base">
            Create functional e-commerce stores in minutes with prebuilt components.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PixentixAutoPilotCaseStudy;
