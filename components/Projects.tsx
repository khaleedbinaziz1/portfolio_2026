'use client';

import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import Link from 'next/link';
import Image from 'next/image';
import { FiFileText, FiExternalLink } from 'react-icons/fi';
import { plexMono, plexSerif, plexSans } from '@/public/fonts';

const EASE = [0.22, 0.61, 0.36, 1] as const;

export default function Projects() {
  return (
    <section
      id="projects"
      className={`khb-projects ${plexMono.variable} ${plexSerif.variable} ${plexSans.variable}`}
    >
      <style>{`
        .khb-projects {
          --ink: #0b0d12;
          --panel: #12151c;
          --paper: #f5f1e8;
          --brass: #d9a94e;
          --teal: #5fe3d6;
          --muted: rgba(245, 241, 232, 0.62);
          --muted-2: rgba(245, 241, 232, 0.34);
          position: relative;
          width: 100%;
          overflow: hidden;
          background: var(--ink);
          color: var(--paper);
          font-family: var(--khb-font-sans), sans-serif;
          padding: 96px 24px;
          box-sizing: border-box;
        }
        .khb-projects *, .khb-projects *::before, .khb-projects *::after { box-sizing: border-box; }
        @media (min-width: 960px) { .khb-projects { padding: 140px 40px; } }

        .khb-projects .khb-grid { position: absolute; inset: 0; background-image: radial-gradient(rgba(217,169,78,0.35) 1px, transparent 1px); background-size: 26px 26px; opacity: 0.4; pointer-events: none; }
        .khb-projects .khb-vignette { position: absolute; inset: 0; background: radial-gradient(ellipse at top, transparent 0%, var(--ink) 78%); pointer-events: none; }

        .khb-projects .khb-inner { position: relative; max-width: 1180px; margin: 0 auto; }

        .khb-projects .khb-rise { animation: khb-projects-rise .7s cubic-bezier(.16,1,.3,1) both; }
        @keyframes khb-projects-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) { .khb-projects .khb-rise { animation: none; opacity: 1; } }

        .khb-projects .khb-tag {
          font-family: var(--khb-font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--brass);
          border: 1px solid rgba(217,169,78,0.35);
          padding: 5px 10px;
          border-radius: 3px;
          display: inline-block;
        }

        .khb-projects .khb-cmdline {
          font-family: var(--khb-font-mono), monospace;
          font-size: 13px;
          color: var(--muted);
          margin: 18px 0 14px;
        }
        .khb-projects .khb-cmdline .prompt { color: var(--brass); margin-right: 6px; }

        .khb-projects .khb-title {
          font-family: var(--khb-font-mono), monospace;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          font-size: clamp(2rem, 5vw, 3rem);
          margin: 0 0 14px;
        }
        .khb-projects .khb-rule { height: 1px; background: linear-gradient(to right, rgba(217,169,78,0.4), transparent); margin-bottom: 10px; }
        .khb-projects .khb-count { font-family: var(--khb-font-mono), monospace; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted-2); }

        /* ---- sleek card grid ---- */
        .khb-projects .khb-rail {
          margin-top: 56px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(252px, 1fr));
          gap: 26px 22px;
        }

        .khb-projects .khb-card {
          position: relative;
          background: var(--panel);
          border: 1px solid rgba(245, 241, 232, 0.1);
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: background-color .35s ease, border-color .35s ease, transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s ease;
        }
        .khb-projects .khb-card:hover,
        .khb-projects .khb-card:focus-within {
          background: #171b24;
          border-color: var(--card-border, rgba(217,169,78,0.35));
          transform: translateY(-3px);
          box-shadow: 0 18px 30px -18px rgba(0,0,0,0.75);
        }

        /* corner brackets — draw in on hover, precise not decorative-fussy */
        .khb-projects .khb-card::before,
        .khb-projects .khb-card::after {
          content: '';
          position: absolute;
          width: 14px;
          height: 14px;
          border-color: var(--card-accent, var(--brass));
          opacity: 0;
          transition: opacity .3s ease;
          pointer-events: none;
          z-index: 3;
        }
        .khb-projects .khb-card::before {
          top: 8px; left: 8px;
          border-top: 1.5px solid; border-left: 1.5px solid;
        }
        .khb-projects .khb-card::after {
          bottom: 8px; right: 8px;
          border-bottom: 1.5px solid; border-right: 1.5px solid;
        }
        .khb-projects .khb-card:hover::before,
        .khb-projects .khb-card:hover::after { opacity: 0.9; }

        .khb-projects .khb-card-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          border-bottom: 1px solid rgba(245,241,232,0.08);
        }
        .khb-projects .khb-card-code {
          font-family: var(--khb-font-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: var(--card-accent, var(--brass));
        }
        .khb-projects .khb-card-idx {
          font-family: var(--khb-font-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          color: var(--muted-2);
        }

        .khb-projects .khb-card-thumb {
          position: relative;
          display: block;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          border-bottom: 1px solid rgba(245,241,232,0.08);
        }
        .khb-projects .khb-card-thumb-img {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform .5s cubic-bezier(.16,1,.3,1);
        }
        .khb-projects .khb-card:hover .khb-card-thumb-img { transform: scale(1.035); }

        .khb-projects .khb-card-noimg {
          width: 100%;
          aspect-ratio: 4 / 3;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid rgba(245,241,232,0.08);
          background: linear-gradient(135deg, rgba(245,241,232,0.025), transparent 60%);
        }
        .khb-projects .khb-card-noimg span {
          font-family: var(--khb-font-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.25em;
          color: var(--muted-2);
        }

        .khb-projects .khb-card-body { padding: 16px; flex: 1; display: flex; flex-direction: column; }
        .khb-projects .khb-card-title {
          font-family: var(--khb-font-mono), monospace;
          font-size: 14.5px;
          font-weight: 600;
          margin: 0 0 8px;
          line-height: 1.3;
          letter-spacing: -0.01em;
        }
        .khb-projects .khb-card-desc {
          font-family: var(--khb-font-serif), serif;
          font-size: 13px;
          line-height: 1.55;
          color: var(--muted);
          margin: 0 0 16px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .khb-projects .khb-card-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: auto; margin-bottom: 14px; }
        .khb-projects .khb-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--khb-font-mono), monospace;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 7px 11px;
          border-radius: 2px;
          transition: background-color .2s ease, color .2s ease, border-color .2s ease;
        }
        .khb-projects .khb-btn-primary { background: var(--brass); color: var(--ink); }
        .khb-projects .khb-btn-primary:hover { background: #ecc26a; }
        .khb-projects .khb-btn-outline { background: transparent; color: var(--teal); border: 1px solid rgba(95,227,214,0.5); }
        .khb-projects .khb-btn-outline:hover { background: rgba(95,227,214,0.1); }
        .khb-projects .khb-btn:focus-visible { outline: 2px solid var(--brass); outline-offset: 2px; }

        .khb-projects .khb-card-tech {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin: 0;
          padding: 12px 0 0;
          border-top: 1px solid rgba(245,241,232,0.08);
        }
        .khb-projects .khb-card-tech-tag {
          font-family: var(--khb-font-mono), monospace;
          font-size: 9.5px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .khb-projects .khb-card-tech-tag:not(:last-child)::after { content: '/'; margin-left: 5px; color: var(--muted-2); }
      `}</style>

      <div className="khb-grid" aria-hidden="true" />
      <div className="khb-vignette" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px', amount: 0.1 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="khb-inner"
      >
        <header>
          <span className="khb-tag">PROJECTS · 02</span>
          <div className="khb-cmdline">
            <span className="prompt">$</span>cat projects
          </div>
          <h2 className="khb-title">Some Things I&apos;ve Built</h2>
          <div className="khb-rule" />
          <p className="khb-count" aria-hidden="true">
            ls — {projects.length} project{projects.length !== 1 ? 's' : ''} found
          </p>
        </header>

        <div className="khb-rail">
          {projects.map((project, index) => {
            const accent = index % 2 === 0 ? 'teal' : 'brass';
            const accentColor = accent === 'brass' ? '#D9A94E' : '#5FE3D6';
            const accentBorder = accent === 'brass' ? 'rgba(217,169,78,0.35)' : 'rgba(95,227,214,0.35)';
            const code = `PRJ.${String(index + 1).padStart(2, '0')}`;

            const image = project.image && (
              <div className="khb-card-thumb-img">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </div>
            );

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-24px' }}
                transition={{ duration: 0.4, delay: index * 0.04, ease: EASE }}
                className="khb-card"
                style={{ '--card-accent': accentColor, '--card-border': accentBorder } as React.CSSProperties}
              >
                <div className="khb-card-bar">
                  <span className="khb-card-code">{code}</span>
                  <span className="khb-card-idx">{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
                </div>

                {project.image ? (
                  project.caseStudy ? (
                    <Link href={project.caseStudy} className="khb-card-thumb">
                      {image}
                    </Link>
                  ) : (
                    <div className="khb-card-thumb">{image}</div>
                  )
                ) : (
                  <div className="khb-card-noimg">
                    <span>NO PREVIEW</span>
                  </div>
                )}

                <div className="khb-card-body">
                  <h3 className="khb-card-title">{project.title}</h3>
                  <p className="khb-card-desc">{project.description}</p>

                  <div className="khb-card-actions">
                    {project.caseStudy && (
                      <Link
                        href={project.caseStudy}
                        className="khb-btn khb-btn-primary"
                        aria-label={`View case study for ${project.title}`}
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
                        className="khb-btn khb-btn-outline"
                        aria-label={`Visit live site for ${project.title}`}
                      >
                        <FiExternalLink size={12} />
                        <span>Visit</span>
                      </Link>
                    )}
                  </div>

                  <ul className="khb-card-tech" aria-label="Technologies">
                    {project.tech.map((tech) => (
                      <li key={tech} className="khb-card-tech-tag">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}