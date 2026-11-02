import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // September 19, 2026
    const targetDate = new Date('2026-09-19T15:30:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 border-2 border-[#D4AF37]/20 w-32 flex flex-col items-center justify-center transform hover:scale-105 transition-transform"
        >
          <div className="text-4xl sm:text-5xl font-serif text-[#183d72] mb-2 font-bold">
            {unit.value.toString().padStart(2, '0')}
          </div>
          <div className="text-sm uppercase tracking-widest text-[#D4AF37] font-semibold">
            {unit.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
