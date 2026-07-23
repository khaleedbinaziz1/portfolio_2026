'use client';

import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import Link from 'next/link';
import Image from 'next/image';
import { FiFileText, FiExternalLink } from 'react-icons/fi';

const EASE = [0.22, 0.61, 0.36, 1] as const;

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="proj-bg" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px', amount: 0.1 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="proj-content"
      >
        <header className="proj-header">
          <span className="proj-prompt">$ cat projects</span>
          <h2 className="proj-title">Some Things I&apos;ve Built</h2>
          <div className="proj-header-line" />
          <p className="proj-count" aria-hidden>
            ls — {projects.length} project{projects.length !== 1 ? 's' : ''} found
          </p>
        </header>

        <div className="proj-grid">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-24px' }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: EASE }}
              whileHover={{ y: -3 }}
              className="proj-card"
            >
              <div className="proj-inner">
                <div className="proj-body">
                  <div className="proj-card-header">
                    <span className="proj-num">{String(index + 1).padStart(2, '0')}.</span>
                    <h3 className="proj-card-title">{project.title}</h3>
                  </div>
                  <p className="proj-desc">{project.description}</p>
                  <div className="proj-actions">
                    {project.caseStudy && (
                      <Link
                        href={project.caseStudy}
                        className="proj-btn proj-btn-primary"
                        aria-label="View Case Study"
                      >
                        <FiFileText size={14} />
                        <span>Case Study</span>
                      </Link>
                    )}
                    {project.live && (
                      <Link
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="proj-btn proj-btn-outline"
                        aria-label="Visit Live Website"
                      >
                        <FiExternalLink size={14} />
                        <span>Visit</span>
                      </Link>
                    )}
                  </div>
                  <ul className="proj-tech" aria-label="Technologies">
                    {project.tech.map((tech) => (
                      <li key={tech} className="proj-tech-tag">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
                {project.image && (
                  project.caseStudy ? (
                    <Link href={project.caseStudy} className="proj-img-wrap" style={{ overflow: 'hidden' }}>
                      <div className="proj-img-zoom">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 280px"
                        />
                      </div>
                    </Link>
                  ) : (
                    <div className="proj-img-wrap" style={{ overflow: 'hidden' }}>
                      <div className="proj-img-zoom">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 280px"
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}