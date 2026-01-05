import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollGame from '@/components/ScrollGame';
import FloatingTerminal from '@/components/FloatingTerminal';
import TerminalSnippets from '@/components/TerminalSnippets';
import RetroEffects from '@/components/RetroEffects';


export default function Home() {
  return (
    <main className="relative min-h-screen">
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
      <ScrollGame />
      {/* Global Terminal Effects - Reduced by half */}
      <RetroEffects type="terminal" intensity="medium" />
      <FloatingTerminal maxCommands={2} spawnInterval={6000} />
      <TerminalSnippets />
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
        <Footer />

      </div>
    </main>
  );
}
