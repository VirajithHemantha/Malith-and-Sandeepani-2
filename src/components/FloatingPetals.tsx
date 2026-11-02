import React, { useEffect, useMemo, useRef, useState } from 'react';

const COLORS = ['#8b0000', '#b3121d', '#d42a35', '#141111'];
const PETAL_COUNT = 8;

// Petals fall with a GPU-only CSS transform animation, so they never trigger
// layout or repaint while the page scrolls. They stay inside their parent
// (not fixed over the whole page) and pause once scrolled out of view.
export const FloatingPetals: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  const petals = useMemo(
    () =>
      Array.from({ length: PETAL_COUNT }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 6 + 8,
        duration: Math.random() * 10 + 16,
        delay: -Math.random() * 20,
        color: COLORS[i % COLORS.length],
        drift: Math.random() * 30 - 15,
        spin: Math.random() > 0.5 ? 540 : -540,
      })),
    []
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden motion-reduce:hidden">
      <style>
        {`
          @keyframes petal-fall {
            0%   { transform: translate3d(0, -10vh, 0) rotate(0deg); opacity: 0; }
            10%  { opacity: 0.55; }
            90%  { opacity: 0.55; }
            100% { transform: translate3d(var(--drift), 110vh, 0) rotate(var(--spin)); opacity: 0; }
          }
        `}
      </style>
      {petals.map((petal) => (
        <svg
          key={petal.id}
          width={petal.size}
          height={petal.size}
          viewBox="0 0 24 24"
          fill={petal.color}
          className="absolute top-0"
          style={{
            left: `${petal.x}%`,
            animation: `petal-fall ${petal.duration}s linear ${petal.delay}s infinite`,
            animationPlayState: visible ? 'running' : 'paused',
            ['--drift' as string]: `${petal.drift}vw`,
            ['--spin' as string]: `${petal.spin}deg`,
          }}
        >
          <path d="M12,2C12,2 10,6 10,10C10,14 12,22 12,22C12,22 14,14 14,10C14,6 12,2 12,2Z" />
        </svg>
      ))}
    </div>
  );
};
