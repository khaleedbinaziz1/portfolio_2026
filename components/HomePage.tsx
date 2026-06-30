'use client';

import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';

const Hero3D = dynamic(() => import('@/components/hero3d/Hero3D'), { ssr: false });
const About = dynamic(() => import('@/components/About'));
const Skills = dynamic(() => import('@/components/Skills'));
const Projects = dynamic(() => import('@/components/Projects'));
const Contact = dynamic(() => import('@/components/Contact'));
const Footer = dynamic(() => import('@/components/Footer'));
const RetroSoundHandler = dynamic(() => import('@/components/RetroSoundHandler'), { ssr: false });

export default function HomePage() {
  return (
    <main>
      <div className="page-content-wrap">
        <div className="bg-pixel-blocks" aria-hidden />
        <div className="pixel-grid-overlay" aria-hidden />

        <RetroSoundHandler />

        <div className="bg-vignette"></div>

        <div className="page-main-content">
          <Hero3D experienceStarted={true} />
          <About />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </div>

        <div className="page-fixed-ui">
          <div className="page-nav-wrap">
            <Navigation contentVisible={true} />
          </div>
        </div>
      </div>
    </main>
  );
}
