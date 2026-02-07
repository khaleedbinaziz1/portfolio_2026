'use client';

import { useRef, useEffect, useState } from 'react';

const PARTICLE_STEP = 5; // sample every N pixels (lower = more particles, heavier)
const REFORM_DURATION_MS = 1600;
const SCATTER_RADIUS = 120;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

type Particle = {
  nx: number;
  ny: number;
  r: number;
  g: number;
  b: number;
  a: number;
  scatterX: number;
  scatterY: number;
  targetScatterX: number;
  targetScatterY: number;
};

type Phase = 'idle' | 'reforming' | 'formed';

interface ParticleImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  playReform: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function ParticleImage({
  src,
  alt,
  width,
  height,
  playReform,
  className = '',
  style = {},
}: ParticleImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const [particlesReady, setParticlesReady] = useState(false);
  const startTimeRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  // Load image and build particle list from image data (centered crop)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !width || !height) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageRef.current = img;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = width;
      canvas.height = height;

      // Draw image centered cover into a small buffer to sample
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(width / iw, height / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      const sx = (iw - sw / scale) / 2;
      const sy = (ih - sh / scale) / 2;

      const sampleW = Math.min(width, 320);
      const sampleH = Math.min(height, 320);
      const off = document.createElement('canvas');
      off.width = sampleW;
      off.height = sampleH;
      const octx = off.getContext('2d');
      if (!octx) return;
      octx.drawImage(img, sx, sy, iw / scale, ih / scale, 0, 0, sampleW, sampleH);
      const id = octx.getImageData(0, 0, sampleW, sampleH);
      const data = id.data;

      const step = PARTICLE_STEP;
      const particles: Particle[] = [];

      for (let py = 0; py < sampleH; py += step) {
        for (let px = 0; px < sampleW; px += step) {
          const i = (py * sampleW + px) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          if (a < 20) continue;
          const nx = px / sampleW;
          const ny = py / sampleH;
          const angle = Math.random() * Math.PI * 2;
          const radius = SCATTER_RADIUS * (0.4 + Math.random() * 0.6);
          const scatterX = Math.cos(angle) * radius * (Math.random() > 0.5 ? 1 : -1);
          const scatterY = Math.sin(angle) * radius * (Math.random() > 0.5 ? 1 : -1);
          particles.push({
            nx,
            ny,
            r,
            g,
            b,
            a: a / 255,
            scatterX,
            scatterY,
            targetScatterX: 0,
            targetScatterY: 0,
          });
        }
      }

      particlesRef.current = particles;
      setParticlesReady(true);
    };
    img.onerror = () => {
      particlesRef.current = [];
    };
    img.src = src;
  }, [src, width, height]);

  // When playReform is true and particles are ready, start reform animation (once)
  useEffect(() => {
    if (!playReform || !particlesReady || phase !== 'idle') return;
    setPhase('reforming');
    startTimeRef.current = performance.now();
  }, [playReform, particlesReady, phase]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !width || !height) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = true;

    const draw = (now: number) => {
      if (!running) return;

      const particles = particlesRef.current;
      const w = width;
      const h = height;

      ctx.clearRect(0, 0, w, h);

      if (phase === 'idle') {
        if (particles.length > 0) {
          particles.forEach((p) => {
            const x = p.nx * w + p.scatterX;
            const y = p.ny * h + p.scatterY;
            ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.a})`;
            ctx.beginPath();
            ctx.arc(x, y, 1.2, 0, Math.PI * 2);
            ctx.fill();
          });
        }
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      if (phase === 'reforming') {
        const elapsed = now - startTimeRef.current;
        const t = Math.min(1, elapsed / REFORM_DURATION_MS);
        const e = easeOutCubic(t);

        particles.forEach((p) => {
          const scatterX = p.scatterX * (1 - e);
          const scatterY = p.scatterY * (1 - e);
          const x = p.nx * w + scatterX;
          const y = p.ny * h + scatterY;
          ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.a})`;
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        });

        if (t >= 1) {
          setPhase('formed');
        }
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      if (phase === 'formed' && imageRef.current) {
        // Draw full image for crisp result
        const img = imageRef.current;
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;
        const scale = Math.max(width / iw, height / ih);
        const sw = iw * scale;
        const sh = ih * scale;
        const dx = (width - sw) / 2;
        const dy = (height - sh) / 2;
        ctx.drawImage(img, 0, 0, iw, ih, dx, dy, sw, sh);
      }

      if (phase !== 'formed') {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [phase, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        display: 'block',
        background: 'transparent',
        ...style,
      }}
      width={width}
      height={height}
      aria-label={alt}
      role="img"
    />
  );
}
