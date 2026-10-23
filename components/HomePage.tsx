'use client';

import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';

import Hero3D from '@/components/hero3d/Hero3D';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), { ssr: false });
const CommandPalette = dynamic(() => import('@/components/CommandPalette'), { ssr: false });
const SectionRail = dynamic(() => import('@/components/SectionRail'), { ssr: false });

export default function HomePage() {
  return (
    <main>
      <div className="page-content-wrap">
        <div className="bg-pixel-blocks" aria-hidden="true" />
        <div className="pixel-grid-overlay" aria-hidden="true" />
        <div className="bg-vignette" aria-hidden="true" />

        <ScrollProgress />
        <SectionRail />

        <div className="page-main-content">
          <Hero3D />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
          <Footer />
        </div>

        <div className="page-fixed-ui">
          <div className="page-nav-wrap">
            <Navigation contentVisible={true} />
          </div>
          <CommandPalette />
        </div>
      </div>
    </main>
  );
}
