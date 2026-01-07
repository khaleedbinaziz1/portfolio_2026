'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { 
  FaBook, 
  FaCode, 
  FaPalette,
  FaExternalLinkAlt,
  FaDesktop,
  FaRocket,
  FaCheckCircle,
  FaArrowLeft,
  FaGithub,
  FaEye,
  FaMobile,
  FaSearch,
  FaUniversalAccess,
  FaChartLine,
  FaLayerGroup
} from "react-icons/fa";
import { 
  SiTailwindcss, 
  SiNextdotjs, 
  SiTypescript,
  SiVercel,
  SiReact
} from "react-icons/si";
import openstack from '../../../public/images/openstack.png';

const primaryColor = '#9333ea';

const OpenStackJSCaseStudy = () => {
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
              className="mb-6 flex flex-wrap gap-3"
            >
              <span className="inline-block text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full" 
                style={{ color: primaryColor, backgroundColor: `${primaryColor}08` }}>
                Visual Learning Platform
              </span>
              <span className="inline-block text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full" 
                style={{ color: primaryColor, backgroundColor: `${primaryColor}08` }}>
                Open Source
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight text-gray-900"
            >
              Open Stack JS
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed"
            >
              Master production-ready development with visual guides, interactive examples, and hands-on learning paths for fullstack web development.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link 
                href="https://opentackjs.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 text-white shadow-lg hover:shadow-xl"
                style={{ backgroundColor: primaryColor }}
              >
                Visit Website <FaExternalLinkAlt className="text-sm" />
              </Link>
              <Link 
                href="https://github.com/khaleedbinaziz1/openstackjs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 border-2"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                <FaGithub className="text-sm" />
                View on GitHub
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
                src={openstack} 
                alt="Open Stack JS Visual Learning Platform" 
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
              Open Stack JS is an open-source visual learning platform designed to help developers master fullstack web development through interactive guides, visual explanations, and comprehensive documentation. The platform covers frontend, backend, databases, authentication, testing, and DevOps technologies with production-ready examples.
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '40+', label: 'Technology Guides' },
                { value: '6', label: 'Main Categories' },
                { value: '100%', label: 'Open Source' },
                { value: 'MIT', label: 'License' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="text-center p-6 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: primaryColor }}>{stat.value}</div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Problem Statement */}
        <section className="mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">The Problem</h2>
            <div className="h-1 w-16 mb-8 rounded-full" style={{ backgroundColor: primaryColor }}></div>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              Learning fullstack web development can be overwhelming. Developers often struggle with:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Understanding how different technologies work together',
                'Finding reliable, comprehensive documentation',
                'Visualizing complex concepts like routing, state management, and API design',
                'Choosing compatible technology stacks',
                'Learning through text-heavy, static documentation'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-5 rounded-xl bg-gray-50 border border-gray-100">
                  <FaCheckCircle className="text-xl mt-0.5 flex-shrink-0" style={{ color: primaryColor }} />
                  <span className="text-gray-700 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Solution */}
        <section className="mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Our Solution</h2>
            <div className="h-1 w-16 mb-8 rounded-full" style={{ backgroundColor: primaryColor }}></div>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              Open Stack JS provides a comprehensive, visual learning platform that:
            </p>
            <div className="space-y-6">
              {[
                { 
                  title: 'Visual Learning', 
                  desc: 'Interactive flow diagrams, concept cards, and code examples help developers understand complex concepts quickly' 
                },
                { 
                  title: 'Stack Builder', 
                  desc: 'Interactive tool to combine technologies and analyze compatibility scores' 
                },
                { 
                  title: 'Comprehensive Coverage', 
                  desc: 'Guides for frontend, backend, databases, authentication, testing, and DevOps' 
                },
                { 
                  title: 'Production-Ready Examples', 
                  desc: 'Real-world code examples and best practices' 
                },
                { 
                  title: 'Open Source', 
                  desc: 'Community-driven improvements and contributions' 
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-6 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-xl mb-2 text-gray-900" style={{ color: primaryColor }}>{item.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{item.desc}</p>
                </motion.div>
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
            <div className="grid sm:grid-cols-2 gap-8">
              {[
                { 
                  icon: FaEye, 
                  title: 'Visual Learning', 
                  desc: 'Interactive flow diagrams and visual explanations for complex concepts like Next.js routing, React component trees, Node.js event loop, and TypeScript type relationships.' 
                },
                { 
                  icon: FaCode, 
                  title: 'Stack Builder', 
                  desc: 'Interactive tool that allows developers to select technologies, view compatibility scores, see benefits and conflicts, and generate installation commands.' 
                },
                { 
                  icon: FaBook, 
                  title: 'Comprehensive Guides', 
                  desc: 'In-depth guides covering 40+ individual technologies with core concepts, fundamentals, code examples, best practices, and real-world use cases.' 
                },
                { 
                  icon: FaPalette, 
                  title: 'Modern UI/UX', 
                  desc: 'Professional design with glassmorphism effects, responsive layouts, dark theme optimization, smooth animations, and accessibility features.' 
                },
                { 
                  icon: FaSearch, 
                  title: 'SEO Optimized', 
                  desc: 'Built for discoverability with dynamic metadata generation, Open Graph tags, Twitter cards, and semantic HTML.' 
                },
                { 
                  icon: FaUniversalAccess, 
                  title: 'Accessible', 
                  desc: 'WCAG compliance features including skip links, ARIA labels, keyboard navigation, focus states, and reduced motion support.' 
                },
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
            
            <div className="space-y-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Frontend Framework</h3>
                <div className="grid sm:grid-cols-3 gap-6">
                  {[
                    { icon: SiNextdotjs, name: 'Next.js 15.2.1', desc: 'React framework with App Router', color: '#1a1a1a' },
                    { icon: SiReact, name: 'React 18.3.1', desc: 'UI library', color: '#61DAFB' },
                    { icon: SiTypescript, name: 'TypeScript 5', desc: 'Type safety', color: '#3178C6' },
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
                        <span className="text-sm font-semibold mb-1 text-gray-900 text-center">{tech.name}</span>
                        <span className="text-xs text-gray-600 text-center">{tech.desc}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Styling & Deployment</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    { icon: SiTailwindcss, name: 'Tailwind CSS 3.4.17', desc: 'Utility-first CSS framework', color: '#06B6D4' },
                    { icon: SiVercel, name: 'Vercel', desc: 'Hosting and deployment', color: '#1a1a1a' },
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
                        <span className="text-sm font-semibold mb-1 text-gray-900 text-center">{tech.name}</span>
                        <span className="text-xs text-gray-600 text-center">{tech.desc}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Categories Covered */}
        <section className="mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Categories Covered</h2>
            <div className="h-1 w-16 mb-12 rounded-full" style={{ backgroundColor: primaryColor }}></div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { 
                  title: 'Frontend Development', 
                  techs: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux', 'Framer Motion'] 
                },
                { 
                  title: 'Backend Development', 
                  techs: ['Node.js', 'Express.js', 'FastAPI', 'GraphQL', 'Socket.io', 'Prisma'] 
                },
                { 
                  title: 'Databases', 
                  techs: ['PostgreSQL', 'MongoDB', 'MySQL', 'Firestore'] 
                },
                { 
                  title: 'Authentication', 
                  techs: ['Clerk', 'Firebase Auth', 'Stripe'] 
                },
                { 
                  title: 'Testing', 
                  techs: ['Jest', 'Cypress', 'React Testing Library'] 
                },
                { 
                  title: 'DevOps', 
                  techs: ['Docker', 'AWS', 'Vercel', 'Nginx', 'Git'] 
                },
              ].map((category, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-6 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-lg mb-4 text-gray-900" style={{ color: primaryColor }}>{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.techs.map((tech, techIdx) => (
                      <span 
                        key={techIdx}
                        className="text-xs px-3 py-1 rounded-full border"
                        style={{ 
                          borderColor: `${primaryColor}30`, 
                          backgroundColor: `${primaryColor}08`,
                          color: primaryColor
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Performance Metrics */}
        <section className="mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Performance Metrics</h2>
            <div className="h-1 w-16 mb-12 rounded-full" style={{ backgroundColor: primaryColor }}></div>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                { value: '105-141 KB', title: 'First Load JS', desc: 'Optimized bundle sizes' },
                { value: '40 Pages', title: 'Static Generation', desc: 'Pre-rendered at build time' },
                { value: '90+', title: 'Lighthouse Score', desc: 'Performance, Accessibility, SEO' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="text-center p-8 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl md:text-5xl font-bold mb-4" style={{ color: primaryColor }}>{item.value}</div>
                  <h3 className="font-semibold text-xl mb-3 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Open Source */}
        <section className="mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Open Source</h2>
            <div className="h-1 w-16 mb-8 rounded-full" style={{ backgroundColor: primaryColor }}></div>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              Open Stack JS is fully open source under the MIT License. The project welcomes contributions from the community.
            </p>
            <div className="space-y-4 mb-8">
              {[
                { icon: FaGithub, text: 'GitHub: github.com/khaleedbinaziz1/openstackjs', href: 'https://github.com/khaleedbinaziz1/openstackjs' },
                { icon: FaCode, text: 'License: MIT', href: null },
                { icon: FaRocket, text: 'Contributing: See CONTRIBUTING.md', href: null },
              ].map((item, idx) => {
                const Icon = item.icon;
                const content = item.href ? (
                  <Link href={item.href} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: primaryColor }}>
                    {item.text}
                  </Link>
                ) : (
                  <span>{item.text}</span>
                );
                return (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <Icon style={{ color: primaryColor, fontSize: '1.25rem' }} />
                    <span className="text-gray-700">{content}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* Future Roadmap */}
        <section className="mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Future Roadmap</h2>
            <div className="h-1 w-16 mb-8 rounded-full" style={{ backgroundColor: primaryColor }}></div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { status: 'completed', text: 'Core platform and visual learning features' },
                { status: 'completed', text: 'Stack builder with compatibility analysis' },
                { status: 'completed', text: '40+ technology guides' },
                { status: 'in-progress', text: 'More technology guides (ongoing)' },
                { status: 'planned', text: 'Interactive code playground' },
                { status: 'planned', text: 'Multi-language support' },
                { status: 'planned', text: 'Mobile app version' },
                { status: 'planned', text: 'Video tutorials integration' },
                { status: 'planned', text: 'Community forum' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  {item.status === 'completed' ? (
                    <FaCheckCircle className="text-xl mt-0.5 flex-shrink-0" style={{ color: primaryColor }} />
                  ) : item.status === 'in-progress' ? (
                    <FaChartLine className="text-xl mt-0.5 flex-shrink-0" style={{ color: '#f59e0b' }} />
                  ) : (
                    <div className="w-5 h-5 mt-0.5 flex-shrink-0 rounded-full border-2" style={{ borderColor: '#9ca3af' }}></div>
                  )}
                  <span className="text-gray-700 leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-16 border-t border-gray-200 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link 
            href="https://opentackjs.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl md:text-3xl font-bold mb-4 inline-block transition-colors hover:opacity-80"
            style={{ color: primaryColor }}
          >
            opentackjs.vercel.app
          </Link>
          <p className="text-gray-600 max-w-2xl mx-auto text-base">
            Master fullstack web development with visual guides, interactive examples, and comprehensive documentation. Learn how technologies work together.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link 
              href="https://github.com/khaleedbinaziz1/openstackjs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 border-2"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              <FaGithub />
              Contribute on GitHub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OpenStackJSCaseStudy;
