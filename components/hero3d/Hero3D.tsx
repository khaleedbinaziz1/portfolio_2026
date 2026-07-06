'use client';

import { useRef, useState, useEffect } from 'react';
import { personalInfo } from '@/data/personal';
import {
  playTyping,
  resumeAudioForTyping,
  playGameStart,
  playGameEat,
  playGameBounce,
  playGameBreak,
  playGameOver,
} from '@/lib/retroSound';
import type * as THREE from 'three';

function valMap(x: number, from: [number, number], to: [number, number]): number {
  const y = ((x - from[0]) / (from[1] - from[0])) * (to[1] - to[0]) + to[0];
  if (to[0] < to[1]) {
    if (y < to[0]) return to[0];
    if (y > to[1]) return to[1];
  } else {
    if (y > to[0]) return to[0];
    if (y < to[1]) return to[1];
  }
  return y;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

type HeroViewport = {
  width: number;
  height: number;
  aspect: number;
  cameraZOffset: number;
  cameraFov: number;
  sceneScale: number;
};

function getHeroViewport(): HeroViewport {
  const vv = window.visualViewport;
  const width = vv?.width ?? window.innerWidth;
  const height = vv?.height ?? window.innerHeight;
  const aspect = width / height;
  const portraitRatio = height / width;
  const isPortrait = aspect < 1;
  const isCompact = width <= 768;

  const cameraZOffset = isPortrait
    ? valMap(portraitRatio, [1.25, 2.4], [1.5, 4.25])
    : isCompact
      ? valMap(aspect, [0.85, 1.2], [0.75, 0])
      : 0;

  const cameraFov = isPortrait
    ? valMap(aspect, [0.42, 0.78], [64, 50])
    : isCompact
      ? valMap(aspect, [0.85, 1.2], [54, 50])
      : 50;

  const sceneScale = isPortrait && isCompact
    ? valMap(aspect, [0.42, 0.72], [0.68, 0.88])
    : 1;

  return { width, height, aspect, cameraZOffset, cameraFov, sceneScale };
}

// Enhanced Bayer matrix for superior dithering
const BAYER_4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

function luminance(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

const MONITOR_TYPE: 'commodore' | 'blocky' = 'commodore';

type ScreenTextureResult = {
  texture: import('three').CanvasTexture;
  baseCanvas: HTMLCanvasElement;
  displayCanvas: HTMLCanvasElement;
  W: number;
  H: number;
  drawTypedHero: (ctx: CanvasRenderingContext2D, nameLen: number, greetingLen: number, showCursor: boolean) => void;
};

type ScreenTextureParams = {
  name: string;
  title: string;
  greeting: string;
  intro: string;
  whoami: string;
  stack?: string;
  statusLine?: string;
  email?: string;
  bio?: string;
  role?: string;
};

function createScreenTexture(
  THREE: typeof import('three'),
  imageUrl: string,
  params: ScreenTextureParams
): Promise<ScreenTextureResult> {
  const W = 640;
  const H = 480;
  // Unified palette: base, panel, status, primary (magenta), accent (teal), label (amber), dim
  const colorDark = 'rgb(26, 22, 32)';
  const colorDarkPanel = 'rgba(22, 18, 28, 0.96)';
  const colorDarkStatus = 'rgba(18, 15, 24, 0.98)';
  const colorBright = '#f59e0b';
  const colorAccent = '#2dd4bf';
  const colorMagenta = '#c084fc';
  const colorLabel = 'rgba(251, 191, 36, 0.8)';
  const colorMuted = 'rgba(200, 180, 220, 0.7)';
  const colorDim = 'rgba(160, 150, 180, 0.5)';
  const colorBorder = 'rgba(245, 158, 11, 0.4)';

  const gridW = 280;
  const gridH = 210;
  const imageLeft = 20;
  const imageTop = 36;
  const lineHeight = 18;
  const lineHeightSmall = 13;
  const fontMono = '17px "Courier New", monospace';
  const fontMonoSmall = '13px "Courier New", monospace';
  const fontBold = 'bold 26px "Courier New", monospace';
  const heroIntroFont = '16px "Courier New", monospace';
  const heroNameFont = 'bold 34px "Courier New", monospace';
  const heroGreetingFont = 'bold 26px "Courier New", monospace';
  const heroGreetingLineHeight = 28;
  const rightPanelX = 308;
  const rightPanelW = W - rightPanelX - 16;
  const maxTextWidth = rightPanelW - 24;
  const statusBarH = 28;
  const lineH = 17;
  const space = 8;      // base unit
  const pad = 16;      // panel inner padding
  const labelW = 42;   // fixed width for labels (role, email, stack)

  const baseCanvas = document.createElement('canvas');
  baseCanvas.width = W;
  baseCanvas.height = H;
  const displayCanvas = document.createElement('canvas');
  displayCanvas.width = W;
  displayCanvas.height = H;
  const baseCtx = baseCanvas.getContext('2d');
  if (!baseCtx) return Promise.reject(new Error('No 2d context'));

  const {
    name,
    title,
    greeting,
    intro,
    whoami,
    stack = 'React · Next.js · Node · TypeScript',
    statusLine = '● Ready',
    email = '',
    bio = 'Building scalable web apps. MSc CSE @ East Delta University.',
    role = 'Full-Stack Developer',
  } = params;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const ctx = baseCtx;
      ctx.fillStyle = colorDark;
      ctx.fillRect(0, 0, W, H);

      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const srcCanvas = document.createElement('canvas');
      srcCanvas.width = gridW;
      srcCanvas.height = gridH;
      const sctx = srcCanvas.getContext('2d');
      if (!sctx) {
        reject(new Error('No 2d context'));
        return;
      }
      sctx.drawImage(img, 0, 0, iw, ih, 0, 0, gridW, gridH);
      const id = sctx.getImageData(0, 0, gridW, gridH);
      const data = id.data;

      for (let gy = 0; gy < gridH; gy++) {
        for (let gx = 0; gx < gridW; gx++) {
          const i = (gy * gridW + gx) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          const lum = a < 30 ? 0 : luminance(r, g, b);
          const threshold = (BAYER_4[gy % 4][gx % 4] + 0.5) / 16;
          const useBright = lum / 255 > threshold;
          ctx.fillStyle = useBright ? colorBright : colorDark;
          ctx.fillRect(imageLeft + gx, imageTop + gy, 1, 1);
        }
      }

      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(0.35, 'rgba(40, 28, 48, 0.04)');
      grad.addColorStop(0.7, 'rgba(24, 18, 32, 0.15)');
      grad.addColorStop(1, 'rgba(18, 14, 24, 0.35)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Title bar
      ctx.font = '11px "Courier New", monospace';
      ctx.fillStyle = colorLabel;
      ctx.fillText('khaledbinaziz.dev', pad, 15);

      // Subtitle under photo: role + stack shorthand
      ctx.font = '11px "Courier New", monospace';
      ctx.fillStyle = colorAccent;
      ctx.fillText(`${role} · ${stack.split(' · ').slice(0, 3).join(' · ')}`, imageLeft, imageTop + gridH + 10);

      ctx.font = fontMono;
      function wrapText(measureCtx: CanvasRenderingContext2D, text: string, maxW: number): string[] {
        const words = text.split(' ');
        const lines: string[] = [];
        let line = '';
        for (const w of words) {
          const test = line ? line + ' ' + w : w;
          const m = measureCtx.measureText(test);
          if (m.width > maxW && line) {
            lines.push(line);
            line = w;
          } else {
            line = test;
          }
        }
        if (line) lines.push(line);
        return lines;
      }

      // ─── Hero block left ───
      const heroX = imageLeft;
      const heroYStart = imageTop + gridH + 24;
      // Intro is 15px; name is 32px (extends above baseline). Keep name baseline below intro.
      const heroYName = heroYStart + 28;
      const heroYGreeting = heroYName + 42;
      ctx.font = heroIntroFont;
      ctx.fillStyle = colorLabel;
      ctx.fillText(intro, heroX, heroYStart);

      function drawTypedHero(
        drawCtx: CanvasRenderingContext2D,
        nameLen: number,
        greetingLen: number,
        showCursor: boolean
      ) {
        drawCtx.font = heroNameFont;
        drawCtx.fillStyle = colorBright;
        drawCtx.fillText(name.substring(0, nameLen), heroX, heroYName);
        const visibleGreeting = greeting.substring(0, greetingLen);
        if (visibleGreeting) {
          drawCtx.font = heroGreetingFont;
          drawCtx.fillStyle = colorMagenta;
          let gy = heroYGreeting;
          const gLines = wrapText(drawCtx, visibleGreeting, gridW);
          gLines.forEach((line) => {
            drawCtx.fillText(line, heroX, gy);
            gy += heroGreetingLineHeight;
          });
          if (showCursor && greetingLen === greeting.length) {
            const lastLine = gLines[gLines.length - 1] ?? '';
            const cursorX = heroX + drawCtx.measureText(lastLine).width + 4;
            drawCtx.fillStyle = colorMagenta;
            drawCtx.fillRect(cursorX, gy - heroGreetingLineHeight - 22, 4, 24);
          }
        }
      }

      // ─── Right panel: info card ───
      const panelY = imageTop;
      const panelH = 208;
      const sectionGap = space * 1.5;  // 12

      ctx.fillStyle = colorDarkPanel;
      ctx.fillRect(rightPanelX, panelY, rightPanelW, panelH);
      ctx.strokeStyle = colorBorder;
      ctx.lineWidth = 1;
      ctx.strokeRect(rightPanelX, panelY, rightPanelW, panelH);
      // Left accent (magenta hint)
      ctx.fillStyle = 'rgba(192, 132, 252, 0.35)';
      ctx.fillRect(rightPanelX, panelY, 3, panelH);

      let py = panelY + pad;
      ctx.font = 'bold 11px "Courier New", monospace';
      ctx.fillStyle = colorMagenta;
      ctx.fillText('INFO', rightPanelX + pad, py);
      py += 2;
      ctx.strokeStyle = colorBorder;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(rightPanelX + pad, py);
      ctx.lineTo(rightPanelX + rightPanelW - pad, py);
      ctx.stroke();
      py += space + 2;

      const valueX = rightPanelX + pad + labelW;
      ctx.font = fontMonoSmall;
      ctx.fillStyle = colorMagenta;
      ctx.fillText('role', rightPanelX + pad, py);
      ctx.fillStyle = colorAccent;
      ctx.fillText(role, valueX, py);
      py += lineH;

      ctx.fillStyle = colorMagenta;
      ctx.fillText('email', rightPanelX + pad, py);
      ctx.fillStyle = colorAccent;
      const emailShort = email.length > 28 ? email.slice(0, 25) + '…' : email;
      ctx.fillText(emailShort, valueX, py);
      py += lineH + sectionGap;

      ctx.fillStyle = colorMagenta;
      ctx.fillText('stack', rightPanelX + pad, py);
      py += lineH;
      ctx.fillStyle = colorAccent;
      const stackLines = wrapText(ctx, stack, maxTextWidth);
      stackLines.slice(0, 2).forEach((line) => {
        ctx.fillText(line, rightPanelX + pad, py);
        py += lineHeightSmall + 2;
      });
      py += sectionGap;

      ctx.fillStyle = colorBright;
      ctx.font = '11px "Courier New", monospace';
      const bioLines = wrapText(ctx, bio, maxTextWidth);
      bioLines.slice(0, 2).forEach((line) => {
        ctx.fillText(line, rightPanelX + pad, py);
        py += lineHeightSmall + 1;
      });
      py += space;

      ctx.strokeStyle = colorBorder;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(rightPanelX + pad, py);
      ctx.lineTo(rightPanelX + rightPanelW - pad, py);
      ctx.stroke();
      py += space + 2;

      ctx.fillStyle = colorMagenta;
      ctx.fillText('↓ scroll to explore', rightPanelX + pad, py);
      ctx.shadowBlur = 0;

      // ─── Play games ───
      const playGameGap = space * 2;
      const playGameBoxH = 28;
      const playGameBoxW = 260;
      const playGameBoxY = panelY + panelH + playGameGap;
      const px = rightPanelX + (rightPanelW - playGameBoxW) / 2;
      const pw = playGameBoxW;
      ctx.fillStyle = 'rgba(22, 18, 28, 0.98)';
      ctx.fillRect(px, playGameBoxY, pw, playGameBoxH);
      ctx.strokeStyle = colorBorder;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(px, playGameBoxY, pw, playGameBoxH);
      ctx.lineWidth = 1;
      ctx.font = 'bold 13px "Courier New", monospace';
      ctx.fillStyle = colorMagenta;
      ctx.fillText('▶  P L A Y   G A M E S  ◀', px + (pw - ctx.measureText('▶  P L A Y   G A M E S  ◀').width) / 2, playGameBoxY + playGameBoxH / 2 + 4);

      // ─── Status bar ───
      const statusY = H - statusBarH - 2;
      ctx.fillStyle = colorDarkStatus;
      ctx.fillRect(0, statusY, W, statusBarH + 2);
      ctx.strokeStyle = colorBorder;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, statusY);
      ctx.lineTo(W, statusY);
      ctx.stroke();
      const statusMid = statusY + Math.floor(statusBarH / 2) + 5;
      ctx.font = '11px "Courier New", monospace';
      ctx.fillStyle = colorLabel;
      const whoamiW = ctx.measureText(whoami).width;
      ctx.fillText(whoami, (W - whoamiW) / 2, statusMid);
      ctx.fillStyle = colorDim;
      ctx.fillText('Scroll ↓', W - pad - ctx.measureText('Scroll ↓').width, statusMid);

      const tex = new THREE.CanvasTexture(displayCanvas);
      tex.flipY = true;
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      const dctx = displayCanvas.getContext('2d');
      if (dctx) {
        dctx.drawImage(baseCanvas, 0, 0);
        drawTypedHero(dctx, 0, 0, false);
      }
      resolve({ texture: tex, baseCanvas, displayCanvas, W, H, drawTypedHero });
    };
    img.onerror = reject;
    img.src = imageUrl;
  });
}

type Hero3DProps = {
  experienceStarted: boolean;
  onLoaded?: () => void;
};

export default function Hero3D({ experienceStarted, onLoaded }: Hero3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [canvasOpacity, setCanvasOpacity] = useState(1);
  const [loadProgress, setLoadProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const scrollRef = useRef(0);
  const lastOpacityRef = useRef(1);
  const timeRef = useRef(0);
  const typingStartTimeRef = useRef<number | null>(null);
  const [gameMode, setGameMode] = useState<'desktop' | 'menu' | 'snake' | 'pong' | 'breakout' | 'dodge'>('desktop');
  const setGameModeRef = useRef(setGameMode);
  setGameModeRef.current = setGameMode;

  useEffect(() => {
    setMounted(true);
  }, []);

  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;
    const canvas = canvasRef.current;
    let animationId: number;

    (async () => {
      const THREE = await import('three');
      setLoadProgress(0.1);
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isSmallScreen = window.innerWidth <= 768;
      const isLikelyMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
      const isLowPowerDevice = prefersReducedMotion || isSmallScreen || isLikelyMobile;
      
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
      const { TextureLoader } = await import('three');
      const { EffectComposer } = await import('three/examples/jsm/postprocessing/EffectComposer.js');
      const { RenderPass } = await import('three/examples/jsm/postprocessing/RenderPass.js');
      const { UnrealBloomPass } = await import('three/examples/jsm/postprocessing/UnrealBloomPass.js');
      const { ShaderPass } = await import('three/examples/jsm/postprocessing/ShaderPass.js');
      setLoadProgress(0.3);

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x2b2140);
      
      const ambientLight = new THREE.AmbientLight(0xe8e0f0, 0.5);
      scene.add(ambientLight);
      
      const keyLight = new THREE.DirectionalLight(0xffd4a8, 1.4);
      keyLight.position.set(2, 3, 2);
      scene.add(keyLight);
      
      const rimLight = new THREE.DirectionalLight(0xb8a8e0, 0.85);
      rimLight.position.set(-2, 1, -2);
      scene.add(rimLight);
      
      const fillLight = new THREE.PointLight(0xc084fc, 0.45, 12);
      fillLight.position.set(1, 0.5, 1);
      scene.add(fillLight);

      const initialViewport = getHeroViewport();
      const camera = new THREE.PerspectiveCamera(initialViewport.cameraFov, initialViewport.aspect, 0.1, 100);
      camera.position.set(0, 0, -2.5);
      camera.rotation.set(-Math.PI, 0, Math.PI);
      scene.add(camera);

      const renderer = new THREE.WebGLRenderer({ 
        canvas, 
        antialias: !isLowPowerDevice, 
        alpha: false,
        powerPreference: isLowPowerDevice ? 'default' : 'high-performance'
      });
      renderer.setSize(initialViewport.width, initialViewport.height);
      renderer.setPixelRatio(Math.min(isLowPowerDevice ? 1.25 : 2, window.devicePixelRatio));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.5;

      const composer = new EffectComposer(renderer);
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(initialViewport.width, initialViewport.height),
        isLowPowerDevice ? 0.05 : 0.08,
        isLowPowerDevice ? 0.12 : 0.15,
        isLowPowerDevice ? 0.75 : 0.68
      );
      composer.addPass(bloomPass);

      const VignetteShader = {
        uniforms: {
          tDiffuse: { value: null },
          offset: { value: 1.05 },
          darkness: { value: 0.18 }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D tDiffuse;
          uniform float offset;
          uniform float darkness;
          varying vec2 vUv;
          void main() {
            vec4 texel = texture2D(tDiffuse, vUv);
            vec2 uv = (vUv - vec2(0.5)) * vec2(offset);
            float vignette = 1.0 - dot(uv, uv);
            texel.rgb *= pow(vignette, darkness);
            gl_FragColor = texel;
          }
        `
      };

      const vignettePass = new ShaderPass(VignetteShader);
      composer.addPass(vignettePass);

      const computerHeight = 1.5;
      const computerAngle = Math.PI * 0.2;
      const computerHorizontal = 0.5;

      const textureLoader = new TextureLoader();

      const screenTextureResult = await createScreenTexture(THREE, '/khaled_bin_aziz.jpg', {
        name: personalInfo.name,
        title: personalInfo.title,
        greeting: personalInfo.greeting,
        intro: personalInfo.intro,
        whoami: personalInfo.whoami,
        stack: 'React · Next.js · Node · TypeScript',
        statusLine: '● Ready',
        email: personalInfo.email,
        bio: personalInfo.bio,
        role: personalInfo.title,
      });
      setLoadProgress(0.5);

      const contentTexture = screenTextureResult.texture;
      const { baseCanvas, displayCanvas, W: screenW, H: screenH, drawTypedHero } = screenTextureResult;
      const displayCtx = displayCanvas.getContext('2d');

      const CRT_NOISE_FRAG = `
        uniform sampler2D uDiffuse;
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(uDiffuse, vUv);
          color.rgb *= 1.06;
          color.rgb += vec3(0.015, 0.012, 0.02);

          vec2 centered = vUv - 0.5;
          float dist = length(centered);
          float pulse = 0.85 + 0.15 * sin(uTime * 1.4);

          float edgeGlow = 1.0 - smoothstep(0.28, 0.55, dist);
          color.rgb += vec3(0.06, 0.035, 0.07) * edgeGlow * pulse;

          float centerGlow = 1.0 - smoothstep(0.0, 0.42, dist);
          color.rgb += vec3(0.03, 0.02, 0.04) * centerGlow * 0.55;

          float scan = sin(vUv.y * 480.0 * 3.14159) * 0.007;
          color.rgb += scan;

          gl_FragColor = color;
        }
      `;
      const CRT_VERT = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;
      const crtRenderTarget = new THREE.WebGLRenderTarget(screenW, screenH, { format: THREE.RGBAFormat });
      crtRenderTarget.texture.colorSpace = THREE.SRGBColorSpace;
      const crtMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uDiffuse: { value: contentTexture },
          uTime: { value: 0 },
        },
        vertexShader: CRT_VERT,
        fragmentShader: CRT_NOISE_FRAG,
      });
      const crtAspect = screenW / screenH;
      const crtCamera = new THREE.OrthographicCamera(-0.5 * crtAspect, 0.5 * crtAspect, 0.5, -0.5, 1, 3);
      crtCamera.position.set(0, 0, 1);
      const crtScene = new THREE.Scene();
      crtScene.add(crtCamera);
      const crtPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(1 * crtAspect, 1, 1, 1),
        crtMaterial
      );
      crtScene.add(crtPlane);
      const nameStr = personalInfo.name;
      const greetingStr = personalInfo.greeting;
      const NAME_TYPING_SPEED = 20;
      const GREETING_TYPING_SPEED = 20;
      const GREETING_START_DELAY = 0.5;

      const computerColor = new THREE.Color(0xffffff);
      const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0x000000,
        roughness: 0.9,
        metalness: 0.1
      });

      const screenMaterial = new THREE.MeshBasicMaterial({
        map: crtRenderTarget.texture,
        side: THREE.DoubleSide
      });

      let bakeTexture: THREE.Texture | null = null;
      let screenMeshForPick: THREE.Mesh | null = null;
      const computerGroup = new THREE.Group();
      computerGroup.position.set(computerHorizontal, computerHeight, 0);
      computerGroup.rotation.y = computerAngle;

      // Galaxy-like starfield behind the computer: very slow, night-sky vibe
      const galaxyRadius = 14;
      const galaxyDepth = 12;
      const smallStarCount = isLowPowerDevice ? 220 : 420;
      const bigStarCount = isLowPowerDevice ? 40 : 100;
      const particleSpeeds = new Float32Array(smallStarCount + bigStarCount);

      // Particles only behind computer: z well in front of camera, behind monitor
      const zMin = 1.2;
      const zMax = galaxyDepth * 0.5;
      function fillGalaxyPositions(positions: Float32Array, count: number) {
        for (let i = 0; i < count; i++) {
          const r = Math.pow(Math.random(), 0.65) * galaxyRadius;
          const angle = Math.random() * Math.PI * 2;
          positions[i * 3] = Math.cos(angle) * r + (Math.random() - 0.5) * 2;
          positions[i * 3 + 1] = Math.sin(angle) * r * 0.35 + (Math.random() - 0.5) * 1.2;
          positions[i * 3 + 2] = zMin + Math.random() * (zMax - zMin);
          particleSpeeds[i] = 0.0003 + Math.random() * 0.0007;
        }
      }

      const posSmall = new Float32Array(smallStarCount * 3);
      fillGalaxyPositions(posSmall, smallStarCount);
      const geoSmall = new THREE.BufferGeometry();
      geoSmall.setAttribute('position', new THREE.BufferAttribute(posSmall, 3));
      const matSmall = new THREE.PointsMaterial({
        color: 0xe8d4b8,
        size: 0.018,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });
      const starsSmall = new THREE.Points(geoSmall, matSmall);
      starsSmall.rotation.x = 0.06;
      scene.add(starsSmall);

      const posBig = new Float32Array(bigStarCount * 3);
      for (let i = 0; i < bigStarCount; i++) {
        const r = Math.pow(Math.random(), 0.5) * galaxyRadius * 0.8;
        const angle = Math.random() * Math.PI * 2;
        posBig[i * 3] = Math.cos(angle) * r + (Math.random() - 0.5);
        posBig[i * 3 + 1] = Math.sin(angle) * r * 0.35;
        posBig[i * 3 + 2] = zMin + Math.random() * (zMax * 0.8 - zMin);
        particleSpeeds[smallStarCount + i] = 0.0002 + Math.random() * 0.0005;
      }
      const geoBig = new THREE.BufferGeometry();
      geoBig.setAttribute('position', new THREE.BufferAttribute(posBig, 3));
      const matBig = new THREE.PointsMaterial({
        color: 0xf0c878,
        size: 0.042,
        transparent: true,
        opacity: 0.72,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });
      const starsBig = new THREE.Points(geoBig, matBig);
      starsBig.rotation.x = 0.06;
      scene.add(starsBig);

      if (MONITOR_TYPE === 'blocky') {
        const bodyMat = new THREE.MeshStandardMaterial({
          color: computerColor,
          roughness: 0.4,
          metalness: 0.6
        });
        const screenAspect = 640 / 480;
        const screenWid = 0.72;
        const screenHei = screenWid / screenAspect;
        const screenGeo = new THREE.PlaneGeometry(screenWid, screenHei);
        const screenPlane = new THREE.Mesh(screenGeo, screenMaterial);
        screenPlane.position.set(0, 0, 0.06);
        screenPlane.rotation.x = -0.02;
        const crtGeo = new THREE.BoxGeometry(screenWid + 0.08, screenHei + 0.08, 0.14);
        const crtMesh = new THREE.Mesh(crtGeo, bodyMat);
        crtMesh.position.set(0, 0, -0.03);
        const keyGeo = new THREE.BoxGeometry(0.55, 0.04, 0.18);
        const keyMesh = new THREE.Mesh(keyGeo, bodyMat);
        keyMesh.position.set(0, -screenHei / 2 - 0.08, 0.08);
        computerGroup.add(crtMesh);
        computerGroup.add(screenPlane);
        screenMeshForPick = screenPlane;
        computerGroup.add(keyMesh);
        const floorPlane = new THREE.Mesh(
          new THREE.PlaneGeometry(4, 4),
          floorMaterial
        );
        floorPlane.rotation.x = -Math.PI / 2;
        floorPlane.position.set(0, 0, 0);
        scene.add(floorPlane);
      } else {
        const [bakeTex, gltfScene] = await Promise.all([
          new Promise<THREE.Texture>((res, rej) => {
            textureLoader.load('/textures/bake-quality-5.jpg', res, undefined, rej);
          }).then((tex) => {
            setLoadProgress(0.75);
            return tex;
          }),
          new Promise<THREE.Group>((res, rej) => {
            const loader = new GLTFLoader();
            loader.load('/models/Commodore710_33.5.glb', (g) => res(g.scene), undefined, rej);
          }).then((scene) => {
            setLoadProgress(0.9);
            return scene;
          }),
        ]);
        bakeTexture = bakeTex;
        bakeTexture.flipY = false;
        bakeTexture.colorSpace = THREE.SRGBColorSpace;

        const clone = gltfScene.clone();
        const screenMesh = clone.children.find((c) => (c as THREE.Mesh).name === 'Screen') as THREE.Mesh | undefined;
        const computerMesh = clone.children.find((c) => (c as THREE.Mesh).name === 'Computer') as THREE.Mesh | undefined;
        const crtMesh = clone.children.find((c) => (c as THREE.Mesh).name === 'CRT') as THREE.Mesh | undefined;
        const keyboardMesh = clone.children.find((c) => (c as THREE.Mesh).name === 'Keyboard') as THREE.Mesh | undefined;
        const shadowPlaneMesh = clone.children.find((c) => (c as THREE.Mesh).name === 'ShadowPlane') as THREE.Mesh | undefined;
        
        const computerMaterial = new THREE.MeshStandardMaterial({
          map: bakeTexture,
          color: computerColor,
          roughness: 0.5,
          metalness: 0.3
        });
        
        if (screenMesh) screenMesh.material = screenMaterial;
        if (computerMesh) computerMesh.material = computerMaterial;
        if (crtMesh) crtMesh.material = computerMaterial;
        if (keyboardMesh) keyboardMesh.material = computerMaterial;
        if (shadowPlaneMesh) shadowPlaneMesh.material = floorMaterial;
        computerGroup.add(clone);
        screenMeshForPick = screenMesh ?? null;
      }

      scene.add(computerGroup);
      setLoadProgress(1);
      setLoaded(true);
      onLoaded?.();

      const PLAY_GAME_RECT = { x: 338, y: 260, w: 260, h: 28 };
      const BACK_BUTTON_RECT = { x: 60, y: 58, w: 72, h: 22 };
      const GAME_COLS = 32;
      const GAME_ROWS = 24;
      const GAME_CELL = 20;
      type GameMode = 'desktop' | 'menu' | 'snake' | 'pong' | 'breakout' | 'dodge';
      let gameMode: GameMode = 'desktop';
      const syncGameMode = (mode: GameMode) => {
        gameMode = mode;
        setGameModeRef.current(mode);
      };
      let menuSelectedIndex = 0;
      let snake: { x: number; y: number }[] = [];
      let snakeDir: 'up' | 'down' | 'left' | 'right' | null = null;
      let nextSnakeDir: 'up' | 'down' | 'left' | 'right' | null = null;
      let food: { x: number; y: number } = { x: 0, y: 0 };
      let gameTicks = 0;
      let gameOver = false;

      function spawnFood() {
        const occupied = new Set(snake.map((s) => `${s.x},${s.y}`));
        let x: number, y: number;
        do {
          x = Math.floor(Math.random() * GAME_COLS);
          y = Math.floor(Math.random() * GAME_ROWS);
        } while (occupied.has(`${x},${y}`));
        food = { x, y };
      }

      function initSnakeGame() {
        snake = [{ x: 16, y: 12 }, { x: 15, y: 12 }, { x: 14, y: 12 }];
        snakeDir = 'right';
        nextSnakeDir = 'right';
        gameOver = false;
        gameTicks = 0;
        spawnFood();
        playGameStart();
      }

      const MENU_ITEMS = [
        { id: 'snake' as const, label: '1. Snake', rect: { x: 220, y: 178, w: 200, h: 24 } },
        { id: 'pong' as const, label: '2. Pong', rect: { x: 220, y: 204, w: 200, h: 24 } },
        { id: 'breakout' as const, label: '3. Breakout', rect: { x: 220, y: 230, w: 200, h: 24 } },
        { id: 'dodge' as const, label: '4. Dodge', rect: { x: 220, y: 256, w: 200, h: 24 } },
      ];

      const GAME_BG = 'rgb(28, 22, 32)';
      const GAME_PRIMARY = '#f59e0b';
      const GAME_ACCENT = '#2dd4bf';
      const GAME_MUTED = 'rgba(251, 191, 36, 0.75)';

      function drawBackButton(ctx: CanvasRenderingContext2D, time: number) {
        const r = BACK_BUTTON_RECT;
        const pulse = 0.5 + 0.5 * Math.sin(time * 3);
        ctx.fillStyle = `rgba(24, 18, 30, ${0.88 + 0.08 * pulse})`;
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.strokeStyle = `rgba(245, 158, 11, ${0.5 + 0.25 * pulse})`;
        ctx.lineWidth = 2;
        ctx.strokeRect(r.x, r.y, r.w, r.h);
        ctx.font = 'bold 13px "Courier New", monospace';
        ctx.fillStyle = GAME_PRIMARY;
        ctx.fillText('← Back', r.x + 8, r.y + 16);
      }

      function drawMenuScreen(ctx: CanvasRenderingContext2D, selectedIndex: number, time: number) {
        const W = screenW;
        const H = screenH;
        ctx.fillStyle = GAME_BG;
        ctx.fillRect(0, 0, W, H);
        drawBackButton(ctx, time);
        ctx.font = 'bold 18px "Courier New", monospace';
        ctx.fillStyle = '#c084fc';
        ctx.fillText('Select game', 220, 158);
        ctx.font = '16px "Courier New", monospace';
        const pulse = 0.5 + 0.5 * Math.sin(time * 4);
        MENU_ITEMS.forEach((item, i) => {
          const r = item.rect;
          const isSelected = i === selectedIndex;
          if (isSelected) {
            ctx.fillStyle = `rgba(245, 158, 11, ${0.18 + 0.12 * pulse})`;
            ctx.fillRect(r.x - 8, r.y - 2, r.w + 16, r.h + 6);
            ctx.strokeStyle = `rgba(245, 158, 11, ${0.55 + 0.3 * pulse})`;
            ctx.lineWidth = 2;
            ctx.strokeRect(r.x - 8, r.y - 2, r.w + 16, r.h + 6);
            ctx.lineWidth = 1;
            ctx.fillStyle = '#fcd34d';
            ctx.fillText('►', r.x - 18, r.y + 20);
          }
          ctx.fillStyle = isSelected ? '#fcd34d' : GAME_ACCENT;
          ctx.fillText(item.label, r.x, r.y + 20);
        });
        ctx.font = '13px "Courier New", monospace';
        ctx.fillStyle = GAME_MUTED;
        ctx.fillText('↑↓ select   Enter start   B back   X close', 220, 298);
      }

      function drawGameScreen(ctx: CanvasRenderingContext2D) {
        const W = screenW;
        const H = screenH;
        ctx.fillStyle = GAME_BG;
        ctx.fillRect(0, 0, W, H);
        drawBackButton(ctx, time);
        ctx.font = '14px "Courier New", monospace';
        if (gameOver) {
          ctx.fillStyle = GAME_PRIMARY;
          ctx.fillText('Game Over', W / 2 - 40, H / 2 - 20);
          ctx.fillStyle = GAME_MUTED;
          ctx.fillText('Esc: back to menu', W / 2 - 55, H / 2 + 10);
          return;
        }
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        for (let c = 0; c <= GAME_COLS; c++) ctx.fillRect(c * GAME_CELL, 0, 1, H);
        for (let r = 0; r <= GAME_ROWS; r++) ctx.fillRect(0, r * GAME_CELL, W, 1);
        ctx.fillStyle = 'rgba(45, 212, 191, 0.9)';
        ctx.fillRect(food.x * GAME_CELL + 2, food.y * GAME_CELL + 2, GAME_CELL - 4, GAME_CELL - 4);
        ctx.fillStyle = GAME_PRIMARY;
        ctx.shadowColor = GAME_PRIMARY;
        ctx.shadowBlur = 3;
        snake.forEach((seg, i) => {
          const pad = i === 0 ? 1 : 2;
          ctx.fillRect(seg.x * GAME_CELL + pad, seg.y * GAME_CELL + pad, GAME_CELL - pad * 2, GAME_CELL - pad * 2);
        });
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(245, 158, 11, 0.7)';
        ctx.fillText('Esc: back to menu', 10, H - 8);
      }

      let pongPaddleY = 0.5;
      let pongBall = { x: 0.5, y: 0.5, vx: 0.012, vy: 0.008 };
      let pongGameOver = false;
      const PONG_PADDLE_W = 12;
      const PONG_PADDLE_H = 80;
      const PONG_BALL_R = 6;

      function initPongGame() {
        pongPaddleY = 0.5;
        pongBall = { x: 0.12, y: 0.5, vx: 0.012, vy: 0.008 };
        pongGameOver = false;
        playGameStart();
      }

      function drawPongScreen(ctx: CanvasRenderingContext2D) {
        const W = screenW;
        const H = screenH;
        ctx.fillStyle = GAME_BG;
        ctx.fillRect(0, 0, W, H);
        drawBackButton(ctx, time);
        ctx.font = '14px "Courier New", monospace';
        if (pongGameOver) {
          ctx.fillStyle = GAME_PRIMARY;
          ctx.fillText('Game Over', W / 2 - 40, H / 2 - 20);
          ctx.fillStyle = GAME_MUTED;
          ctx.fillText('Esc: back to menu', W / 2 - 55, H / 2 + 10);
          return;
        }
        const paddleX = 24;
        const py = pongPaddleY * H;
        ctx.fillStyle = GAME_PRIMARY;
        ctx.fillRect(paddleX, py - PONG_PADDLE_H / 2, PONG_PADDLE_W, PONG_PADDLE_H);
        const bx = pongBall.x * W;
        const by = pongBall.y * H;
        ctx.beginPath();
        ctx.arc(bx, by, PONG_BALL_R, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(245, 158, 11, 0.7)';
        ctx.fillText('Esc: back to menu', 10, H - 8);
      }

      // Breakout
      const BRICK_COLS = 10;
      const BRICK_ROWS = 4;
      let breakoutPaddleX = 0.5;
      let breakoutBall = { x: 0.5, y: 0.85, vx: 0.008, vy: -0.01 };
      let breakoutBricks: { x: number; y: number }[] = [];
      let breakoutGameOver = false;
      const BRICK_W = 58;
      const BRICK_H = 18;
      const BREAKOUT_PADDLE_W = 70;
      const BREAKOUT_PADDLE_H = 12;
      const BREAKOUT_BALL_R = 5;

      function initBreakoutGame() {
        breakoutPaddleX = 0.5;
        breakoutBall = { x: 0.5, y: 0.85, vx: 0.008, vy: -0.01 };
        breakoutBricks = [];
        for (let row = 0; row < BRICK_ROWS; row++) {
          for (let col = 0; col < BRICK_COLS; col++) {
            breakoutBricks.push({
              x: (col / BRICK_COLS) * (screenW - BRICK_W - 20) + 10 + BRICK_W / 2,
              y: 50 + row * (BRICK_H + 4),
            });
          }
        }
        breakoutGameOver = false;
        playGameStart();
      }

      function drawBreakoutScreen(ctx: CanvasRenderingContext2D) {
        const W = screenW;
        const H = screenH;
        ctx.fillStyle = GAME_BG;
        ctx.fillRect(0, 0, W, H);
        drawBackButton(ctx, time);
        ctx.font = '14px "Courier New", monospace';
        if (breakoutGameOver) {
          ctx.fillStyle = GAME_PRIMARY;
          ctx.fillText('Game Over', W / 2 - 40, H / 2 - 20);
          ctx.fillStyle = GAME_MUTED;
          ctx.fillText('Esc: back to menu', W / 2 - 55, H / 2 + 10);
          return;
        }
        ctx.fillStyle = GAME_PRIMARY;
        breakoutBricks.forEach((b) => {
          ctx.fillRect(b.x - BRICK_W / 2, b.y - BRICK_H / 2, BRICK_W, BRICK_H);
        });
        const paddleLeft = breakoutPaddleX * W - BREAKOUT_PADDLE_W / 2;
        ctx.fillRect(paddleLeft, H - 30, BREAKOUT_PADDLE_W, BREAKOUT_PADDLE_H);
        ctx.beginPath();
        ctx.arc(breakoutBall.x * W, breakoutBall.y * H, BREAKOUT_BALL_R, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(245, 158, 11, 0.7)';
        ctx.fillText('Esc: back to menu', 10, H - 8);
      }

      // Dodge
      let dodgePlayerX = 0.5;
      let dodgeObstacles: { x: number; y: number }[] = [];
      let dodgeGameOver = false;
      let dodgeSpawnTicks = 0;
      const DODGE_PLAYER_W = 40;
      const DODGE_OBSTACLE_W = 36;
      const DODGE_OBSTACLE_H = 24;

      function initDodgeGame() {
        dodgePlayerX = 0.5;
        dodgeObstacles = [];
        dodgeSpawnTicks = 0;
        dodgeGameOver = false;
        playGameStart();
      }

      function drawDodgeScreen(ctx: CanvasRenderingContext2D) {
        const W = screenW;
        const H = screenH;
        ctx.fillStyle = GAME_BG;
        ctx.fillRect(0, 0, W, H);
        drawBackButton(ctx, time);
        ctx.font = '14px "Courier New", monospace';
        if (dodgeGameOver) {
          ctx.fillStyle = GAME_PRIMARY;
          ctx.fillText('Game Over', W / 2 - 40, H / 2 - 20);
          ctx.fillStyle = GAME_MUTED;
          ctx.fillText('Esc: back to menu', W / 2 - 55, H / 2 + 10);
          return;
        }
        ctx.fillStyle = GAME_PRIMARY;
        const px = dodgePlayerX * W - DODGE_PLAYER_W / 2;
        ctx.fillRect(px, H - 50, DODGE_PLAYER_W, 24);
        ctx.fillStyle = '#f97316';
        dodgeObstacles.forEach((o) => {
          ctx.fillRect(o.x - DODGE_OBSTACLE_W / 2, o.y - DODGE_OBSTACLE_H / 2, DODGE_OBSTACLE_W, DODGE_OBSTACLE_H);
        });
        ctx.fillStyle = 'rgba(245, 158, 11, 0.7)';
        ctx.fillText('Esc: back to menu', 10, H - 8);
      }

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      let playGameHovered = false;
      const onPointerMove = (e: PointerEvent) => {
        if (gameMode !== 'desktop') {
          playGameHovered = false;
          return;
        }
        const rect = canvas.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        if (!screenMeshForPick) return;
        const hits = raycaster.intersectObject(screenMeshForPick);
        if (hits.length === 0) { playGameHovered = false; return; }
        const uv = hits[0].uv;
        if (!uv) { playGameHovered = false; return; }
        const px = uv.x * screenW;
        const py = (1 - uv.y) * screenH;
        const r = PLAY_GAME_RECT;
        playGameHovered = gameMode === 'desktop' && px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h;
      };
      const onPointerDown = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        if (!screenMeshForPick) return;
        const hits = raycaster.intersectObject(screenMeshForPick);
        if (hits.length === 0) return;
        const uv = hits[0].uv;
        if (!uv) return;
        const px = uv.x * screenW;
        const py = (1 - uv.y) * screenH;
        const back = BACK_BUTTON_RECT;
        const hitBack = px >= back.x && px <= back.x + back.w && py >= back.y && py <= back.y + back.h;
        if (hitBack && (gameMode === 'menu' || gameMode === 'snake' || gameMode === 'pong' || gameMode === 'breakout' || gameMode === 'dodge')) {
          if (gameMode === 'menu') syncGameMode('desktop');
          else syncGameMode('menu');
          return;
        }
        if (gameMode === 'desktop') {
          const r = PLAY_GAME_RECT;
          if (px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h) {
            syncGameMode('menu');
            menuSelectedIndex = 0;
          }
        } else if (gameMode === 'menu') {
          for (const item of MENU_ITEMS) {
            const r = item.rect;
            if (px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h) {
              syncGameMode(item.id);
              if (item.id === 'snake') initSnakeGame();
              else if (item.id === 'pong') initPongGame();
              else if (item.id === 'breakout') initBreakoutGame();
              else if (item.id === 'dodge') initDodgeGame();
              break;
            }
          }
        }
      };
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          if (gameMode === 'menu') syncGameMode('desktop');
          else if (['snake', 'pong', 'breakout', 'dodge'].includes(gameMode)) syncGameMode('menu');
          return;
        }
        if (gameMode === 'menu') {
          if (e.key === 'ArrowDown') {
            menuSelectedIndex = (menuSelectedIndex + 1) % MENU_ITEMS.length;
            e.preventDefault();
          } else if (e.key === 'ArrowUp') {
            menuSelectedIndex = (menuSelectedIndex - 1 + MENU_ITEMS.length) % MENU_ITEMS.length;
            e.preventDefault();
          } else if (e.key === 'Enter') {
            const item = MENU_ITEMS[menuSelectedIndex];
            syncGameMode(item.id);
            if (item.id === 'snake') initSnakeGame();
            else if (item.id === 'pong') initPongGame();
            else if (item.id === 'breakout') initBreakoutGame();
            else if (item.id === 'dodge') initDodgeGame();
            e.preventDefault();
          } else if (e.key === 'b' || e.key === 'B') {
            syncGameMode('desktop');
            e.preventDefault();
          } else if (e.key === 'x' || e.key === 'X') {
            syncGameMode('desktop');
            e.preventDefault();
          } else if (e.key === '1') { syncGameMode('snake'); initSnakeGame(); e.preventDefault(); }
          else if (e.key === '2') { syncGameMode('pong'); initPongGame(); e.preventDefault(); }
          else if (e.key === '3') { syncGameMode('breakout'); initBreakoutGame(); e.preventDefault(); }
          else if (e.key === '4') { syncGameMode('dodge'); initDodgeGame(); e.preventDefault(); }
          return;
        }
        if (gameMode === 'snake' && !gameOver) {
          if (e.key === 'ArrowUp') { nextSnakeDir = 'up'; e.preventDefault(); }
          else if (e.key === 'ArrowDown') { nextSnakeDir = 'down'; e.preventDefault(); }
          else if (e.key === 'ArrowLeft') { nextSnakeDir = 'left'; e.preventDefault(); }
          else if (e.key === 'ArrowRight') { nextSnakeDir = 'right'; e.preventDefault(); }
        }
        if (gameMode === 'pong' && !pongGameOver) {
          if (e.key === 'ArrowUp') { pongPaddleY = Math.max(0.15, pongPaddleY - 0.02); e.preventDefault(); }
          else if (e.key === 'ArrowDown') { pongPaddleY = Math.min(0.85, pongPaddleY + 0.02); e.preventDefault(); }
        }
        if (gameMode === 'breakout' && !breakoutGameOver) {
          if (e.key === 'ArrowLeft') { breakoutPaddleX = Math.max(0.08, breakoutPaddleX - 0.03); e.preventDefault(); }
          else if (e.key === 'ArrowRight') { breakoutPaddleX = Math.min(0.92, breakoutPaddleX + 0.03); e.preventDefault(); }
        }
        if (gameMode === 'dodge' && !dodgeGameOver) {
          if (e.key === 'ArrowLeft') { dodgePlayerX = Math.max(0.1, dodgePlayerX - 0.04); e.preventDefault(); }
          else if (e.key === 'ArrowRight') { dodgePlayerX = Math.min(0.9, dodgePlayerX + 0.04); e.preventDefault(); }
        }
      };
      const onPointerLeave = () => { playGameHovered = false; };
      canvas.addEventListener('pointerdown', onPointerDown);
      canvas.addEventListener('pointermove', onPointerMove);
      canvas.addEventListener('pointerleave', onPointerLeave);
      window.addEventListener('keydown', onKeyDown);

      let time = 0;
      let lastTypingNameLen = -1;
      let lastTypingGreetingLen = -1;
      let frameSkipCounter = 0;
      const snakeOpposite: Record<'up' | 'down' | 'left' | 'right', 'up' | 'down' | 'left' | 'right'> = {
        up: 'down',
        down: 'up',
        left: 'right',
        right: 'left',
      };

      const ROTATION_CAP = 0.08;
      function tick() {
        animationId = requestAnimationFrame(tick);
        if (document.hidden) return;
        if (scrollRef.current > 2) return;
        if (isLowPowerDevice) {
          frameSkipCounter = (frameSkipCounter + 1) % 2;
          if (frameSkipCounter !== 0) return;
        }
        time += 0.016;
        timeRef.current = time;
        const rawTypingTime = typingStartTimeRef.current === null ? 0 : time - typingStartTimeRef.current;
        const TYPING_DELAY = 1;
        const typingTime = Math.max(0, rawTypingTime - TYPING_DELAY);
        const scroll = scrollRef.current;
        const easedScroll = easeInOutCubic(Math.min(1, scroll));
        const anim = easedScroll * ROTATION_CAP;
        const viewport = getHeroViewport();

        if (Math.abs(camera.fov - viewport.cameraFov) > 0.05) {
          camera.fov = viewport.cameraFov;
          camera.updateProjectionMatrix();
        }
        if (Math.abs(camera.aspect - viewport.aspect) > 0.001) {
          camera.aspect = viewport.aspect;
          camera.updateProjectionMatrix();
        }
        computerGroup.scale.setScalar(viewport.sceneScale);
        //for mobile
        // Smooth camera movement with easing (only up to 8% of full journey)
        camera.position.z = valMap(anim, [0, ROTATION_CAP], [-0.7 - viewport.cameraZOffset, -10 - viewport.cameraZOffset]);
        camera.lookAt(0, 0, 0);
        
        // Computer group animations with easing (only up to 8% rotation/zoom)
        computerGroup.position.x = computerHorizontal * anim;
        computerGroup.position.y = valMap(anim, [0, ROTATION_CAP], [0, computerHeight]);
        computerGroup.rotation.y = computerAngle * anim;
        
        // Subtle floating animation
        computerGroup.position.y += Math.sin(time * 0.5) * 0.01;
        computerGroup.rotation.z = Math.sin(time * 0.3) * 0.005;

        // Galaxy: very slow upward drift + gentle rotation
        const posS = geoSmall.attributes.position.array as Float32Array;
        for (let i = 0; i < smallStarCount; i++) {
          posS[i * 3 + 1] -= particleSpeeds[i];
          if (posS[i * 3 + 1] < -6) posS[i * 3 + 1] = 5;
        }
        geoSmall.attributes.position.needsUpdate = true;
        const posB = geoBig.attributes.position.array as Float32Array;
        for (let i = 0; i < bigStarCount; i++) {
          posB[i * 3 + 1] -= particleSpeeds[smallStarCount + i];
          if (posB[i * 3 + 1] < -6) posB[i * 3 + 1] = 5;
        }
        geoBig.attributes.position.needsUpdate = true;
        starsSmall.rotation.y += 0.00006;
        starsBig.rotation.y += 0.00006;

        // Dynamic lighting — soft pulse
        fillLight.intensity = 0.45 + Math.sin(time * 1.8) * 0.12;
        fillLight.position.x = Math.cos(time * 0.5) * 1.5;
        fillLight.position.z = Math.sin(time * 0.5) * 1.5;

        // Update screen texture: menu / game / desktop
        if (displayCtx) {
          if (gameMode === 'menu') {
            drawMenuScreen(displayCtx, menuSelectedIndex, time);
          } else if (gameMode === 'snake') {
            if (!gameOver) {
              gameTicks++;
              if (nextSnakeDir && (gameTicks % 8 === 0)) {
                if (snakeOpposite[nextSnakeDir] !== snakeDir) snakeDir = nextSnakeDir;
                const head = snake[0];
                let nx = head.x; let ny = head.y;
                if (snakeDir === 'up') ny--; else if (snakeDir === 'down') ny++; else if (snakeDir === 'left') nx--; else nx++;
                if (nx < 0 || nx >= GAME_COLS || ny < 0 || ny >= GAME_ROWS || snake.some((s) => s.x === nx && s.y === ny)) {
                  gameOver = true;
                  playGameOver();
                } else {
                  snake.unshift({ x: nx, y: ny });
                  if (nx === food.x && ny === food.y) {
                    spawnFood();
                    playGameEat();
                  } else snake.pop();
                }
              }
            }
            drawGameScreen(displayCtx);
          } else if (gameMode === 'pong') {
            if (!pongGameOver) {
              pongBall.x += pongBall.vx;
              pongBall.y += pongBall.vy;
              if (pongBall.y <= 0 || pongBall.y >= 1) {
                pongBall.vy *= -1;
                playGameBounce();
              }
              const paddleLeft = 24 / screenW;
              const paddleTop = (pongPaddleY * screenH - PONG_PADDLE_H / 2) / screenH;
              const paddleBottom = (pongPaddleY * screenH + PONG_PADDLE_H / 2) / screenH;
              if (pongBall.x <= paddleLeft + (PONG_PADDLE_W + PONG_BALL_R * 2) / screenW && pongBall.x >= paddleLeft - 0.02) {
                if (pongBall.y >= paddleTop && pongBall.y <= paddleBottom) {
                  pongBall.vx *= -1;
                  pongBall.x = paddleLeft + (PONG_PADDLE_W + PONG_BALL_R) / screenW;
                  playGameBounce();
                }
              }
              if (pongBall.x >= 1) {
                pongBall.vx *= -1;
                playGameBounce();
              }
              if (pongBall.x < -0.05) {
                pongGameOver = true;
                playGameOver();
              }
            }
            drawPongScreen(displayCtx);
          } else if (gameMode === 'breakout') {
            if (!breakoutGameOver) {
              breakoutBall.x += breakoutBall.vx;
              breakoutBall.y += breakoutBall.vy;
              const bx = breakoutBall.x * screenW;
              const by = breakoutBall.y * screenH;
              if (breakoutBall.x <= 0.02 || breakoutBall.x >= 0.98) {
                breakoutBall.vx *= -1;
                playGameBounce();
              }
              if (breakoutBall.y <= 0.04) {
                breakoutBall.vy *= -1;
                playGameBounce();
              }
              const paddleLeft = breakoutPaddleX * screenW - BREAKOUT_PADDLE_W / 2;
              const paddleRight = breakoutPaddleX * screenW + BREAKOUT_PADDLE_W / 2;
              if (breakoutBall.y * screenH >= screenH - 35 && breakoutBall.vy > 0) {
                if (bx >= paddleLeft - BREAKOUT_BALL_R && bx <= paddleRight + BREAKOUT_BALL_R) {
                  breakoutBall.vy *= -1;
                  breakoutBall.y = (screenH - 35) / screenH;
                  playGameBounce();
                }
              }
              if (breakoutBall.y > 1.1) {
                breakoutGameOver = true;
                playGameOver();
              }
              breakoutBricks = breakoutBricks.filter((b) => {
                const hit = Math.abs(bx - b.x) < BRICK_W / 2 + BREAKOUT_BALL_R && Math.abs(by - b.y) < BRICK_H / 2 + BREAKOUT_BALL_R;
                if (hit) playGameBreak();
                return !hit;
              });
            }
            drawBreakoutScreen(displayCtx);
          } else if (gameMode === 'dodge') {
            if (!dodgeGameOver) {
              dodgeObstacles.forEach((o) => { o.y += 2.2; });
              dodgeObstacles = dodgeObstacles.filter((o) => o.y - DODGE_OBSTACLE_H / 2 < screenH);
              dodgeSpawnTicks++;
              if (dodgeSpawnTicks >= 28) {
                dodgeSpawnTicks = 0;
                dodgeObstacles.push({
                  x: 80 + Math.random() * (screenW - 160),
                  y: -DODGE_OBSTACLE_H,
                });
              }
              const px = dodgePlayerX * screenW;
              const py = screenH - 38;
              for (const o of dodgeObstacles) {
                if (Math.abs(px - o.x) < DODGE_PLAYER_W / 2 + DODGE_OBSTACLE_W / 2 && Math.abs(py - o.y) < 12 + DODGE_OBSTACLE_H / 2) {
                  dodgeGameOver = true;
                  playGameOver();
                  break;
                }
              }
            }
            drawDodgeScreen(displayCtx);
          } else {
          displayCtx.drawImage(baseCanvas, 0, 0);
            const nameLen = Math.min(nameStr.length, Math.floor(typingTime * NAME_TYPING_SPEED));
            const greetingStartTime = nameStr.length / NAME_TYPING_SPEED + GREETING_START_DELAY;
            const greetingLen = typingTime < greetingStartTime
              ? 0
              : Math.min(greetingStr.length, Math.floor((typingTime - greetingStartTime) * GREETING_TYPING_SPEED));
            if (nameLen > lastTypingNameLen) {
              lastTypingNameLen = nameLen;
              playTyping();
            }
            if (greetingLen > lastTypingGreetingLen) {
              lastTypingGreetingLen = greetingLen;
              playTyping();
            }
            const cursorOn = Math.floor(time * 2) % 2 === 0;
            drawTypedHero(displayCtx, nameLen, greetingLen, cursorOn);
          const pulse = 0.5 + 0.5 * Math.sin(time * 1.8);
          displayCtx.fillStyle = `rgba(245, 158, 11, ${0.05 * pulse})`;
          displayCtx.fillRect(8, 2, screenW - 16, 22);
          displayCtx.fillStyle = `rgba(192, 132, 252, ${0.03 * pulse})`;
          displayCtx.fillRect(8, 2, screenW - 16, 22);
          if (cursorOn) {
            displayCtx.fillStyle = '#f59e0b';
            displayCtx.fillRect(52, screenH - 19, 2, 10);
          }
            // Play games button: auto glow + hover glare/animation
            const r = PLAY_GAME_RECT;
            const playPulse = 0.5 + 0.5 * Math.sin(time * 3);
            const glarePhase = (time * 0.8) % 1;
            const outerPad = playGameHovered ? 14 : 10;
            displayCtx.save();
            displayCtx.globalCompositeOperation = 'lighter';
            const glowIntensity = playGameHovered ? 0.3 + 0.2 * playPulse : 0.18 + 0.14 * playPulse;
            displayCtx.shadowColor = 'rgba(251, 191, 36, 0.7)';
            displayCtx.shadowBlur = playGameHovered ? 5 + playPulse : 3 + playPulse;
            displayCtx.strokeStyle = `rgba(245, 158, 11, ${glowIntensity})`;
            displayCtx.lineWidth = playGameHovered ? 3 : 2;
            displayCtx.strokeRect(r.x - outerPad, r.y - outerPad, r.w + outerPad * 2, r.h + outerPad * 2);
            displayCtx.shadowBlur = 0;
            displayCtx.globalCompositeOperation = 'source-over';
            displayCtx.strokeStyle = `rgba(245, 158, 11, ${0.45 + 0.4 * playPulse})`;
            displayCtx.lineWidth = 2;
            displayCtx.strokeRect(r.x, r.y, r.w, r.h);
            // Magenta inner accent
            displayCtx.strokeStyle = `rgba(192, 132, 252, ${0.25 + 0.15 * playPulse})`;
            displayCtx.lineWidth = 1;
            displayCtx.strokeRect(r.x + 2, r.y + 2, r.w - 4, r.h - 4);
            displayCtx.lineWidth = 2;
            // Glare sweep
            const sweepW = 50;
            const sweepX = r.x - sweepW + glarePhase * (r.w + sweepW * 2);
            const grad = displayCtx.createLinearGradient(sweepX, 0, sweepX + sweepW, 0);
            grad.addColorStop(0, 'rgba(255, 230, 180, 0)');
            grad.addColorStop(0.35, 'rgba(255, 230, 180, 0.35)');
            grad.addColorStop(0.5, 'rgba(255, 248, 220, 0.48)');
            grad.addColorStop(0.65, 'rgba(255, 230, 180, 0.35)');
            grad.addColorStop(1, 'rgba(255, 230, 180, 0)');
            displayCtx.save();
            displayCtx.beginPath();
            displayCtx.rect(r.x, r.y, r.w, r.h);
            displayCtx.clip();
            displayCtx.globalCompositeOperation = 'lighter';
            displayCtx.fillStyle = grad;
            displayCtx.fillRect(r.x - sweepW, r.y, r.w + sweepW * 2, r.h);
            displayCtx.restore();
            displayCtx.restore();
            displayCtx.lineWidth = 1;
          }
          contentTexture.needsUpdate = true;
        }

        // Brightness pass for monitor screen
        renderer.setRenderTarget(crtRenderTarget);
        renderer.clear();
        renderer.render(crtScene, crtCamera);
        renderer.setRenderTarget(null);

        composer.render();
      }
      animationId = requestAnimationFrame(tick);

      const onResize = () => {
        const viewport = getHeroViewport();
        camera.aspect = viewport.aspect;
        camera.fov = viewport.cameraFov;
        camera.updateProjectionMatrix();
        renderer.setSize(viewport.width, viewport.height);
        composer.setSize(viewport.width, viewport.height);
        bloomPass.resolution.set(viewport.width, viewport.height);
      };
      window.addEventListener('resize', onResize);
      window.visualViewport?.addEventListener('resize', onResize);
      window.visualViewport?.addEventListener('scroll', onResize);

      cleanupRef.current = () => {
        canvas.removeEventListener('pointerdown', onPointerDown);
        canvas.removeEventListener('pointermove', onPointerMove);
        canvas.removeEventListener('pointerleave', onPointerLeave);
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('resize', onResize);
        window.visualViewport?.removeEventListener('resize', onResize);
        window.visualViewport?.removeEventListener('scroll', onResize);
        cancelAnimationFrame(animationId);
        composer.dispose();
        renderer.dispose();
        contentTexture.dispose();
        crtRenderTarget.dispose();
        crtMaterial.dispose();
        bakeTexture?.dispose();
        geoSmall.dispose();
        geoBig.dispose();
        matSmall.dispose();
        matBig.dispose();
      };
    })().catch((err) => {
      console.error('Hero3D init error:', err);
    });

    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const OPACITY_EPS = 0.02;
    const onScroll = () => {
      const vh = window.innerHeight;
      scrollRef.current = window.scrollY / vh;
      const fadeStart = 1.25;
      const fadeDuration = 0.5;
      const opacity = easeOutCubic(Math.min(1, Math.max(0, 1 - (window.scrollY / vh - fadeStart) / fadeDuration)));
      if (Math.abs(opacity - lastOpacityRef.current) > OPACITY_EPS) {
        lastOpacityRef.current = opacity;
        setCanvasOpacity(opacity);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [mounted]);

  useEffect(() => {
    if (experienceStarted) {
      typingStartTimeRef.current = timeRef.current;
      resumeAudioForTyping();
    }
  }, [experienceStarted]);

  useEffect(() => {
    if (!loaded) return;
    const t = window.setTimeout(() => setShowLoader(false), 200);
    return () => window.clearTimeout(t);
  }, [loaded]);

  const onMobileKey = (key: string) => (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
  };
  const loadPercent = Math.round(loadProgress * 100);

  const renderLoader = (exiting: boolean) => (
    <div className={`hero3d-loading${exiting ? ' hero3d-loading-exit' : ''}`} aria-hidden={exiting} aria-busy={!exiting}>
      <div className="hero3d-loading-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={loadPercent}>
        <div className="hero3d-loading-progress" style={{ width: `${exiting ? 100 : loadPercent}%` }} />
      </div>
    </div>
  );

  return (
    <section id="hero" className="hero3d-section">
      {!loaded && renderLoader(false)}
      {showLoader && loaded && renderLoader(true)}
      {mounted && (
        <div 
          className={`hero3d-canvas-wrap ${loaded ? 'hero3d-canvas-loaded' : ''}`}
          style={{ opacity: canvasOpacity }}
        >
          <div className="hero3d-canvas-chromatic" aria-hidden />
          <div className="hero3d-canvas-vignette" aria-hidden />
          <canvas ref={canvasRef} className="hero3d-canvas" />
        </div>
      )}

      <div
        className="hero3d-bridge"
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '60vh',
          background: 'linear-gradient(180deg, transparent 0%, rgba(28, 20, 40, 0.18) 25%, rgba(24, 18, 36, 0.38) 50%, rgba(18, 14, 28, 0.55) 75%, #120d1d 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {experienceStarted && (gameMode === 'snake' || gameMode === 'pong' || gameMode === 'breakout' || gameMode === 'dodge') && (
        <div className="hero3d-mobile-controls" aria-label="Game controls">
          <div className="hero3d-mobile-dpad">
            <button type="button" className="hero3d-mobile-btn hero3d-mobile-up" onPointerDown={onMobileKey('ArrowUp')} aria-label="Up">
              <svg className="hero3d-mobile-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
            </button>
            <button type="button" className="hero3d-mobile-btn hero3d-mobile-left" onPointerDown={onMobileKey('ArrowLeft')} aria-label="Left">
              <svg className="hero3d-mobile-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            </button>
            <button type="button" className="hero3d-mobile-btn hero3d-mobile-center" aria-hidden />
            <button type="button" className="hero3d-mobile-btn hero3d-mobile-right" onPointerDown={onMobileKey('ArrowRight')} aria-label="Right">
              <svg className="hero3d-mobile-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
            <button type="button" className="hero3d-mobile-btn hero3d-mobile-down" onPointerDown={onMobileKey('ArrowDown')} aria-label="Down">
              <svg className="hero3d-mobile-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
            </button>
          </div>
          <div className="hero3d-mobile-actions">
            <button type="button" className="hero3d-mobile-btn hero3d-mobile-ok" onPointerDown={onMobileKey('Enter')} aria-label="Select">OK</button>
            <button type="button" className="hero3d-mobile-btn hero3d-mobile-back" onPointerDown={onMobileKey('Escape')} aria-label="Back">Esc</button>
          </div>
        </div>
      )}
    </section>
  );
}