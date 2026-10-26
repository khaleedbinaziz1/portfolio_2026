'use client';

/**
 * SectionPatterns — Per-section interactive background patterns
 *
 * Hero    → flowing neural-network particle web (mouse-reactive)
 * About   → soft topographic contour lines (CSS animated)
 * Skills  → matrix rain / binary cascade (canvas, green rain)
 * Experience → subtle circuit-board PCB traces (CSS + JS animated)
 * Projects → animated wireframe mesh grid (canvas, mouse warp)
 * Contact  → radial sound-wave / ripple rings (canvas, mouse ripple)
 */

import { useEffect, useRef, useCallback } from 'react';

/* ─────────────────────────── TYPES ─────────────────────────── */
interface PatternProps {
  className?: string;
  style?: React.CSSProperties;
}

/* ═══════════════════════════════════════════════════════════════
   1. HERO — Neural Network Particle Web
   Mouse-reactive dots + elastic edges, opal accent colours
   ═══════════════════════════════════════════════════════════════ */
export function HeroParticleWeb({ className = '', style }: PatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const COLORS = ['#a78bfa', '#7dd3fc', '#5eead4', '#fda4af'];
    const PARTICLE_COUNT = 90;
    const CONNECTION_DIST = 160;
    const MOUSE_REPEL = 120;

    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      r: number; col: string;
    };

    let W = 0, H = 0;
    let particles: Particle[] = [];

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    };

    const spawn = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 2 + 1,
        col: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        const dx = p.x - mx, dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_REPEL && dist > 0) {
          const force = (MOUSE_REPEL - dist) / MOUSE_REPEL;
          p.x += (dx / dist) * force * 2.2;
          p.y += (dy / dist) * force * 2.2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.col;
        ctx.globalAlpha = 0.7;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECTION_DIST) {
            const alpha = (1 - d / CONNECTION_DIST) * 0.22;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = a.col;
            ctx.lineWidth = 0.8;
            ctx.globalAlpha = alpha;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };

    resize();
    spawn();
    draw();

    const handleResize = () => { resize(); spawn(); };
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'all', zIndex: 0, opacity: 0.55,
        ...style,
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   2. ABOUT — Topographic Contour Lines (CSS + SVG animated)
   ═══════════════════════════════════════════════════════════════ */
export function AboutTopoLines({ className = '', style }: PatternProps) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0, zIndex: 0,
        overflow: 'hidden', pointerEvents: 'none',
        ...style,
      }}
    >
      <style>{`
        @keyframes topoFlow {
          0%   { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -600; }
        }
        @keyframes topoFloat {
          0%, 100% { transform: translateY(0px) scaleX(1); }
          50%       { transform: translateY(-18px) scaleX(1.03); }
        }
        .topo-svg {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          opacity: 0.18;
          animation: topoFloat 18s ease-in-out infinite;
        }
        .topo-path {
          fill: none;
          stroke-width: 1;
          stroke-dasharray: 12 6;
          animation: topoFlow 22s linear infinite;
        }
      `}</style>

      <svg className="topo-svg" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
        <ellipse className="topo-path" cx="600" cy="350" rx="560" ry="310" stroke="#a78bfa" style={{ animationDelay: '0s', animationDuration: '28s' }} />
        <ellipse className="topo-path" cx="600" cy="350" rx="480" ry="260" stroke="#a78bfa" style={{ animationDelay: '-4s', animationDuration: '24s' }} />
        <ellipse className="topo-path" cx="600" cy="350" rx="400" ry="215" stroke="#7dd3fc" style={{ animationDelay: '-8s', animationDuration: '20s' }} />
        <ellipse className="topo-path" cx="600" cy="350" rx="320" ry="170" stroke="#7dd3fc" style={{ animationDelay: '-2s', animationDuration: '18s' }} />
        <ellipse className="topo-path" cx="600" cy="350" rx="240" ry="125" stroke="#5eead4" style={{ animationDelay: '-6s', animationDuration: '16s' }} />
        <ellipse className="topo-path" cx="600" cy="350" rx="160" ry="80"  stroke="#5eead4" style={{ animationDelay: '-10s', animationDuration: '14s' }} />
        <ellipse className="topo-path" cx="600" cy="350" rx="80"  ry="38"  stroke="#fda4af" style={{ animationDelay: '-3s', animationDuration: '12s' }} />
        <ellipse className="topo-path" cx="200" cy="140" rx="200" ry="110" stroke="#a78bfa" style={{ animationDelay: '-5s', animationDuration: '30s' }} />
        <ellipse className="topo-path" cx="200" cy="140" rx="140" ry="75"  stroke="#7dd3fc" style={{ animationDelay: '-12s', animationDuration: '26s' }} />
        <ellipse className="topo-path" cx="200" cy="140" rx="80"  ry="42"  stroke="#5eead4" style={{ animationDelay: '-9s', animationDuration: '22s' }} />
        <ellipse className="topo-path" cx="980" cy="580" rx="220" ry="120" stroke="#fda4af" style={{ animationDelay: '-7s', animationDuration: '25s' }} />
        <ellipse className="topo-path" cx="980" cy="580" rx="150" ry="80"  stroke="#a78bfa" style={{ animationDelay: '-14s', animationDuration: '21s' }} />
        <ellipse className="topo-path" cx="980" cy="580" rx="80"  ry="42"  stroke="#7dd3fc" style={{ animationDelay: '-1s', animationDuration: '18s' }} />
      </svg>

      <div style={{
        position: 'absolute', top: '15%', left: '10%',
        width: 400, height: 260,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(167,139,250,0.06) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '8%',
        width: 350, height: 220,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(125,211,252,0.06) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   3. SKILLS — Matrix Binary Rain (canvas) - Slow, Calm, Ambient
   ═══════════════════════════════════════════════════════════════ */
export function SkillsMatrixRain({ className = '', style }: PatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]();';
    const FONT_SIZE = 14;
    const COLORS_PRIMARY = ['#5eead4', '#7dd3fc', '#a78bfa'];
    const COLOR_HEAD = '#ffffff';

    let W = 0, H = 0, cols = 0;
    let drops: number[] = [];
    let speeds: number[] = [];
    let colColors: string[] = [];
    let currentChars: string[] = [];

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      cols = Math.floor(W / FONT_SIZE);
      // Stagger drops starting above the screen
      drops = Array.from({ length: cols }, () => Math.random() * -65);
      // Slow, relaxing descent speeds (4-5x slower than original)
      speeds = Array.from({ length: cols }, () => 0.09 + Math.random() * 0.11);
      colColors = Array.from({ length: cols }, () =>
        COLORS_PRIMARY[Math.floor(Math.random() * COLORS_PRIMARY.length)]
      );
      currentChars = Array.from({ length: cols }, () =>
        CHARS[Math.floor(Math.random() * CHARS.length)]
      );
    };

    const draw = () => {
      // Gentle dark wash creates long, elegant, calm dissolving trails
      ctx.fillStyle = 'rgba(8, 9, 13, 0.038)';
      ctx.fillRect(0, 0, W, H);

      ctx.font = `${FONT_SIZE}px 'JetBrains Mono', monospace`;

      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (let i = 0; i < drops.length; i++) {
        // Mutate characters very gently (not every frame) to prevent frantic flickering
        if (Math.random() < 0.04) {
          currentChars[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        const char = currentChars[i];
        const y = drops[i] * FONT_SIZE;
        const x = i * FONT_SIZE;

        const distToMouse = Math.hypot(x - mx, y - my);
        const isNearMouse = distToMouse < 110;

        if (y > 0) {
          // Leading drop glyph
          ctx.fillStyle = isNearMouse ? '#7dd3fc' : COLOR_HEAD;
          ctx.globalAlpha = isNearMouse ? 1 : 0.85;
          ctx.fillText(char, x, y);

          // Second trail glyph
          ctx.fillStyle = colColors[i];
          ctx.globalAlpha = isNearMouse ? 0.75 : 0.45;
          ctx.fillText(
            CHARS[(i * 11 + Math.floor(drops[i])) % CHARS.length],
            x,
            y - FONT_SIZE
          );
        }

        ctx.globalAlpha = 1;

        if (y > H && Math.random() > 0.985) {
          drops[i] = 0;
          speeds[i] = 0.09 + Math.random() * 0.11;
        }

        // Smooth slow progression
        drops[i] += speeds[i];
      }

      animRef.current = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };

    resize();
    draw();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: 0.24,
        ...style,
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   4. EXPERIENCE — Circuit-Board PCB Traces (CSS SVG)
   ═══════════════════════════════════════════════════════════════ */
export function ExperienceCircuit({ className = '', style }: PatternProps) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0, zIndex: 0,
        overflow: 'hidden', pointerEvents: 'none',
        ...style,
      }}
    >
      <style>{`
        @keyframes circuitPulse {
          0%, 100% { stroke-opacity: 0.12; }
          50%       { stroke-opacity: 0.32; }
        }
        @keyframes circuitDash {
          to { stroke-dashoffset: -80; }
        }
        .ckt-path {
          fill: none;
          stroke-width: 1;
          stroke-dasharray: 8 16;
          animation: circuitDash 6s linear infinite, circuitPulse 4s ease-in-out infinite;
        }
        .ckt-node {
          animation: circuitPulse 3s ease-in-out infinite;
        }
      `}</style>

      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.4 }}
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
      >
        {[50, 120, 200, 280, 360, 440, 510].map((y, i) => (
          <path
            key={`h${i}`}
            className="ckt-path"
            d={`M 0 ${y} H 1200`}
            stroke={i % 2 === 0 ? '#7dd3fc' : '#a78bfa'}
            style={{ animationDelay: `${i * 0.5}s`, animationDuration: `${5 + i}s` }}
          />
        ))}

        {[80, 180, 310, 480, 640, 800, 960, 1100].map((x, i) => (
          <path
            key={`v${i}`}
            className="ckt-path"
            d={`M ${x} 0 V 600`}
            stroke={i % 3 === 0 ? '#5eead4' : i % 3 === 1 ? '#a78bfa' : '#7dd3fc'}
            style={{ animationDelay: `${i * 0.4}s`, animationDuration: `${4 + i * 0.8}s` }}
          />
        ))}

        <path className="ckt-path" d="M 200 0 V 120 H 640 V 280 H 960 V 440" stroke="#5eead4" style={{ strokeDasharray: '6 12', animationDuration: '8s' }} />
        <path className="ckt-path" d="M 0 360 H 310 V 120 H 800 V 440 H 1200" stroke="#fda4af" style={{ strokeDasharray: '10 20', animationDuration: '10s', animationDelay: '-3s' }} />
        <path className="ckt-path" d="M 480 600 V 280 H 1100 V 50" stroke="#a78bfa" style={{ strokeDasharray: '8 14', animationDuration: '9s', animationDelay: '-1s' }} />

        {([[200, 120], [640, 120], [640, 280], [960, 280], [310, 360], [800, 360], [800, 440], [480, 280], [1100, 50]] as [number, number][]).map(([cx, cy], i) => (
          <circle
            key={`n${i}`}
            className="ckt-node"
            cx={cx} cy={cy} r={3}
            fill={i % 2 === 0 ? '#7dd3fc' : '#a78bfa'}
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}

        {([[80, 50], [960, 440], [1100, 280], [310, 510]] as [number, number][]).map(([cx, cy], i) => (
          <circle
            key={`p${i}`}
            className="ckt-node"
            cx={cx} cy={cy} r={6}
            fill="none"
            stroke={i % 2 === 0 ? '#5eead4' : '#fda4af'}
            strokeWidth={1.5}
            style={{ animationDelay: `${i * 0.7}s` }}
          />
        ))}
      </svg>

      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 30% 50%, rgba(94,234,212,0.04) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(167,139,250,0.04) 0%, transparent 60%)',
      }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   5. PROJECTS — Warping Wireframe Mesh (canvas, mouse-interactive)
   ═══════════════════════════════════════════════════════════════ */
export function ProjectsWireMesh({ className = '', style }: PatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouse = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const COLS = 28, ROWS = 16;
    const WARP_RADIUS = 200;
    const WARP_STRENGTH = 36;

    let W = 0, H = 0;
    let cellW = 0, cellH = 0;

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      cellW = W / COLS;
      cellH = H / ROWS;
    };

    const getPoint = (col: number, row: number, t: number) => {
      const bx = col * cellW;
      const by = row * cellH;
      const wx = Math.sin(row * 0.5 + t * 0.4) * 3;
      const wy = Math.cos(col * 0.4 + t * 0.3) * 3;
      let x = bx + wx;
      let y = by + wy;
      const dx = x - mouse.current.x;
      const dy = y - mouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < WARP_RADIUS && dist > 0) {
        const force = (1 - dist / WARP_RADIUS) ** 2;
        x += (dx / dist) * force * WARP_STRENGTH;
        y += (dy / dist) * force * WARP_STRENGTH;
      }
      return { x, y };
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const t = timeRef.current;
      timeRef.current += 0.016;

      ctx.lineWidth = 0.55;

      for (let row = 0; row <= ROWS; row++) {
        ctx.beginPath();
        for (let col = 0; col <= COLS; col++) {
          const { x, y } = getPoint(col, row, t);
          if (col === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const alpha = 0.08 + (row / ROWS) * 0.1;
        ctx.strokeStyle = '#7dd3fc';
        ctx.globalAlpha = alpha;
        ctx.stroke();
      }

      for (let col = 0; col <= COLS; col++) {
        ctx.beginPath();
        for (let row = 0; row <= ROWS; row++) {
          const { x, y } = getPoint(col, row, t);
          if (row === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const alpha = 0.06 + (col / COLS) * 0.08;
        ctx.strokeStyle = '#a78bfa';
        ctx.globalAlpha = alpha;
        ctx.stroke();
      }

      ctx.globalAlpha = 0.08;
      const grd = ctx.createRadialGradient(
        mouse.current.x, mouse.current.y, 0,
        mouse.current.x, mouse.current.y, 200
      );
      grd.addColorStop(0, '#7dd3fc');
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;

      animRef.current = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMove);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'all', zIndex: 0, opacity: 0.65,
        ...style,
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   6. CONTACT — Radial Ripple Waves (canvas, click + mouse)
   ═══════════════════════════════════════════════════════════════ */
type Ring = { x: number; y: number; r: number; maxR: number; alpha: number; col: string };

export function ContactRipple({ className = '', style }: PatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const rings = useRef<Ring[]>([]);
  const idleTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const addRing = useCallback((x: number, y: number, auto = false) => {
    const COLS = ['#a78bfa', '#7dd3fc', '#5eead4', '#fda4af', '#fcd34d'];
    const count = auto ? 1 : 3;
    for (let i = 0; i < count; i++) {
      rings.current.push({
        x, y,
        r: i * 18,
        maxR: 280 + Math.random() * 120,
        alpha: auto ? 0.3 : 0.55,
        col: COLS[Math.floor(Math.random() * COLS.length)],
      });
    }
    if (rings.current.length > 60) rings.current.splice(0, rings.current.length - 60);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    let W = 0, H = 0;
    const resize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (const ring of rings.current) {
        ring.r += 1.4;
        ring.alpha *= 0.982;

        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = ring.col;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = ring.alpha;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      rings.current = rings.current.filter(r => r.r < r.maxR && r.alpha > 0.003);

      animRef.current = requestAnimationFrame(draw);
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      addRing(e.clientX - rect.left, e.clientY - rect.top);
    };
    const onMove = (e: MouseEvent) => {
      if (Math.random() > 0.94) {
        const rect = canvas.getBoundingClientRect();
        addRing(e.clientX - rect.left, e.clientY - rect.top, true);
      }
    };

    idleTimer.current = setInterval(() => {
      if (W && H) addRing(W / 2, H / 2, true);
    }, 2200);

    resize();
    draw();
    window.addEventListener('resize', resize);
    canvas.addEventListener('click', onClick);
    canvas.addEventListener('mousemove', onMove);

    return () => {
      cancelAnimationFrame(animRef.current);
      if (idleTimer.current) clearInterval(idleTimer.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('click', onClick);
      canvas.removeEventListener('mousemove', onMove);
    };
  }, [addRing]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'all', zIndex: 0, opacity: 0.55,
        cursor: 'crosshair',
        ...style,
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   7. FOOTER — Minimal Architectural Dot Grid & Ambient Light Beam
   Ultra-clean, silent, minimal architectural dot grid.
   No chaotic motion, no rain, no wireframe cages.
   Just subtle, elegant micro-dots, a razor-thin top light beam,
   and a soft, responsive mouse spotlight.
   ═══════════════════════════════════════════════════════════════ */
export function FooterMinimal({ className = '', style }: PatternProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const parent = el.parentElement || el;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
      el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
    };

    parent.addEventListener('mousemove', handleMove);
    return () => {
      parent.removeEventListener('mousemove', handleMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        ...style,
      }}
    >
      <style>{`
        .ln-footer-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.35;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.15));
          -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.15));
        }

        .ln-footer-spotlight {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            420px circle at var(--spot-x, 50%) var(--spot-y, 30%),
            rgba(125, 211, 252, 0.07),
            rgba(167, 139, 250, 0.03) 40%,
            transparent 75%
          );
          pointer-events: none;
        }

        .ln-footer-ambient-top {
          position: absolute;
          top: -60px;
          left: 50%;
          transform: translateX(-50%);
          width: 640px;
          height: 120px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(125, 211, 252, 0.07) 0%, rgba(167, 139, 250, 0.025) 50%, transparent 80%);
          filter: blur(40px);
          pointer-events: none;
        }

        .ln-footer-beam-line {
          position: absolute;
          top: 0;
          left: 20%;
          right: 20%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(125, 211, 252, 0.3) 50%, transparent);
          pointer-events: none;
        }
      `}</style>

      {/* Top subtle light beam line */}
      <div className="ln-footer-beam-line" />

      {/* Soft ambient light at the top edge */}
      <div className="ln-footer-ambient-top" />

      {/* Precision architectural micro-dot grid */}
      <div className="ln-footer-dots" />

      {/* Responsive interactive mouse spotlight */}
      <div className="ln-footer-spotlight" />
    </div>
  );
}

// Backwards-compatible aliases
export const FooterDigitalHorizon = FooterMinimal;
export const FooterAurora = FooterMinimal;


