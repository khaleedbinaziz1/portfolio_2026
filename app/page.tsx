'use client';

import Navigation from '@/components/Navigation';
import Hero3D from '@/components/hero3d/Hero3D';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import RetroSoundHandler from '@/components/RetroSoundHandler';

export default function Home() {
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