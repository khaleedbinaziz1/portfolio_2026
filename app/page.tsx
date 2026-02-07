'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero3D from '@/components/hero3d/Hero3D';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import TerminalSnippets from '@/components/TerminalSnippets';
import RetroEffects from '@/components/RetroEffects';
import RetroSoundHandler from '@/components/RetroSoundHandler';
import ExploreGate from '@/components/ExploreGate';

export default function Home() {
  const [exploreStarted, setExploreStarted] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  return (
    <main className={exploreStarted ? '' : 'explore-gate-only'}>
      {!exploreStarted && (
        <div className="explore-gate-wrap">
          <ExploreGate
            onExplore={() => setExploreStarted(true)}
            disabled={!heroLoaded}
          />
        </div>
      )}

      <div
        className="page-content-wrap"
        aria-hidden={!exploreStarted}
        style={{
          visibility: exploreStarted ? 'visible' : 'hidden',
          pointerEvents: exploreStarted ? 'auto' : 'none',
        }}
      >
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
        <div className="relative z-10">
          <Navigation />
          <Hero3D
            experienceStarted={exploreStarted}
            onLoaded={() => setHeroLoaded(true)}
          />
          <About />
          <Skills />
          {/* <Experience /> */}
          <Projects />
          <Contact />
          <Footer />
        </div>
      </div>
    </main>
  );
}
