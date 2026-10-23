'use client';

import { useEffect, useRef } from 'react';

export default function RetroCursor() {
  const glowRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let prevX = -100;
    let prevY = -100;
    let isHovering = false;
    let isMouseDown = false;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      const target = e.target as HTMLElement | null;
      isHovering = Boolean(
        target?.closest(
          'a, button, input, select, textarea, [role="button"], summary, [data-cursor-pointer], .cursor-pointer'
        )
      );

      if (coreRef.current) {
        coreRef.current.style.left = `${targetX}px`;
        coreRef.current.style.top = `${targetY}px`;
        if (isHovering || isMouseDown) {
          coreRef.current.classList.add('is-active');
        } else {
          coreRef.current.classList.remove('is-active');
        }
      }
    };

    const onMouseDown = () => {
      isMouseDown = true;
      if (coreRef.current) coreRef.current.classList.add('is-active');
      if (glowRef.current) glowRef.current.classList.add('is-active');
    };

    const onMouseUp = () => {
      isMouseDown = false;
      if (!isHovering) {
        if (coreRef.current) coreRef.current.classList.remove('is-active');
        if (glowRef.current) glowRef.current.classList.remove('is-active');
      }
    };

    const onMouseLeave = () => {
      targetX = -100;
      targetY = -100;
    };

    // Physics lerp loop with velocity dampening
    const animate = () => {
      prevX = currentX;
      prevY = currentY;

      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;

      const vx = currentX - prevX;
      const vy = currentY - prevY;
      const speed = Math.sqrt(vx * vx + vy * vy);
      const angle = Math.atan2(vy, vx) * (180 / Math.PI);
      const scaleX = Math.min(1 + speed * 0.015, 1.35);
      const scaleY = Math.max(1 - speed * 0.01, 0.75);

      if (glowRef.current) {
        glowRef.current.style.left = `${currentX}px`;
        glowRef.current.style.top = `${currentY}px`;
        if (isHovering || isMouseDown) {
          glowRef.current.style.transform = `translate(-50%, -50%) scale(1.3)`;
          glowRef.current.classList.add('is-active');
        } else {
          glowRef.current.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;
          glowRef.current.classList.remove('is-active');
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden="true"
        className="retro-cursor-glow"
        style={{ left: -100, top: -100 }}
      />
      <div
        ref={coreRef}
        aria-hidden="true"
        className="retro-cursor-core"
        style={{ left: -100, top: -100 }}
      />
    </>
  );
}
