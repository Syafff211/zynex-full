// components/CursorGlow.tsx
'use client';
import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const dot = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0, my = 0, gx = 0, gy = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${mx}px, ${my}px)`;
      }
    };

    const raf = () => {
      gx += (mx - gx) * 0.12;
      gy += (my - gy) * 0.12;
      if (glow.current) {
        glow.current.style.transform = `translate(${gx}px, ${gy}px)`;
      }
      requestAnimationFrame(raf);
    };

    window.addEventListener('mousemove', move);
    raf();
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      <div
        ref={glow}
        className="pointer-events-none fixed left-0 top-0 z-40 -ml-40 -mt-40 h-80 w-80 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(216,198,164,0.10) 0%, transparent 70%)',
        }}
      />
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-50 -ml-1 -mt-1 h-2 w-2 rounded-full bg-accent mix-blend-difference"
      />
    </>
  );
}