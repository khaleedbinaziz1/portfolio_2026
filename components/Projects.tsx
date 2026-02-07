'use client';

import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import Link from 'next/link';
import Image from 'next/image';
import { FiFileText, FiExternalLink } from 'react-icons/fi';

const ACCENTS = [
  '#065D71', /* Kumira */
  '#589440', /* Better-e-mart */
  '#1B8A5F', /* TakaSphere */
  '#8F75E6', /* Pixentix */
  '#9333ea', /* Open Stack JS */
] as const;

const EASE = [0.22, 0.61, 0.36, 1] as const;

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="proj-bg" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px', amount: 0.1 }}
        transition={{ duration: 0.6, ease: [...EASE] }}
        className="proj-content"
      >
        <div className="proj-header">
          <div className="proj-header-line md:hidden" />
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <span className="proj-num">04.</span>
            <h2 className="proj-title">Some Things I&apos;ve Built</h2>
          </div>
          <div className="proj-header-line hidden md:block" />
        </div>

        <div className="proj-grid">
          {projects.map((project, index) => {
            const accent = ACCENTS[index % ACCENTS.length];
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [...EASE] }}
                className="proj-card"
                style={{ ['--proj-accent' as string]: accent }}
              >
                <div className="proj-accent-bar" />
                <div className="proj-inner">
                  <div className="proj-body">
                    <div className="proj-card-header">
                      <h3 className="proj-card-title">{project.title}</h3>
                      <p className="proj-desc">{project.description}</p>
                    </div>
                    <div className="proj-actions">
                      {project.caseStudy && (
                        <Link
                          href={project.caseStudy}
                          className="proj-btn"
                          aria-label="View Case Study"
                        >
                          <FiFileText size={12} />
                          <span>Case Study</span>
                        </Link>
                      )}
                      {project.live && (
                        <Link
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="proj-btn"
                          aria-label="Visit Live Website"
                        >
                          <FiExternalLink size={12} />
                          <span>Visit</span>
                        </Link>
                      )}
                    </div>
                    <div className="proj-tech">
                      {project.tech.map((tech) => (
                        <span key={tech} className="proj-tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  {project.image && (
                    project.caseStudy ? (
                      <Link href={project.caseStudy} className="proj-img-wrap">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 260px"
                        />
                      </Link>
                    ) : (
                      <div className="proj-img-wrap">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 260px"
                        />
                      </div>
                    )
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

    </section>
  );
}
