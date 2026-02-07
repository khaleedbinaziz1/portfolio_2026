'use client';

import { useEffect, useState } from 'react';
import * as THREE from 'three';

const W = 512;
const H = 384;

export function useScreenTexture(
  imageUrl: string,
  name: string,
  title: string,
  greeting: string
): THREE.CanvasTexture | null {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;
    img.onload = () => {
      // Draw image (cover, top-aligned)
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(W / iw, H / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      ctx.drawImage(img, (W - sw) / 2, 0, sw, sh, 0, 0, W, H);

      // Dark gradient overlay at bottom for text
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(0.5, 'rgba(0,0,0,0.3)');
      grad.addColorStop(1, 'rgba(0,0,0,0.88)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Terminal-style text at bottom
      const lineH = 22;
      const left = 16;
      let y = H - 80;

      ctx.font = 'bold 14px "Courier New", monospace';
      ctx.fillStyle = '#00ff41';
      ctx.fillText('> ' + name, left, y);
      y += lineH;

      ctx.fillStyle = '#00d9ff';
      ctx.font = '12px "Courier New", monospace';
      ctx.fillText('> ' + title, left, y);
      y += lineH;
      ctx.fillText('> ' + greeting, left, y);

      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      tex.flipY = false;
      tex.colorSpace = THREE.SRGBColorSpace;
      setTexture(tex);

      return () => tex.dispose();
    };
  }, [imageUrl, name, title, greeting]);

  return texture;
}
