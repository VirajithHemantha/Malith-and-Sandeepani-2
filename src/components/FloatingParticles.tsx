import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function FloatingParticles() {
  const [particles, setParticles] = useState<{ id: number; top: number; left: number; dur: number }[]>([]);

  useEffect(() => {
    // Generate only once on client to avoid hydration mismatch
    const generated = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      dur: 10 + Math.random() * 20,
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-2 h-2 sm:w-3 sm:h-3 opacity-40 rounded-full blur-sm"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            background: `radial-gradient(circle, #D4AF37 0%, transparent 80%)`,
          }}
          animate={{
            y: [-20, -100, -20],
            x: [0, 20, -20, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
