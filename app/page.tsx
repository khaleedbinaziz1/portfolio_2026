'use client';

import Navigation from '@/components/Navigation';
import Hero3D from '@/components/hero3d/Hero3D';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import TerminalSnippets from '@/components/TerminalSnippets';
import RetroEffects from '@/components/RetroEffects';
import RetroSoundHandler from '@/components/RetroSoundHandler';

export default function Home() {
  return (
    <main>
      <div className="page-content-wrap">
        <div className="bg-pixel-blocks" aria-hidden />
        <div className="pixel-dots-overlay" aria-hidden />
        <div className="pixel-grid-overlay" aria-hidden />

        <RetroSoundHandler />

        <div className="bg-layer-1"></div>
        <div className="bg-layer-2"></div>
        <div className="bg-noise"></div>
        <div className="bg-corners"></div>
        <div className="bg-vignette"></div>

        <div className="bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>

        <div className="bg-pattern"></div>

        <ScrollProgress />
        <RetroEffects type="terminal" intensity="medium" />
        <TerminalSnippets />

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