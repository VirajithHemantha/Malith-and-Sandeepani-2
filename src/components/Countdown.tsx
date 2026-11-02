import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface CountdownProps {
  targetDate: Date;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      const days = Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24)));
      const hours = Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24));
      const minutes = Math.max(0, Math.floor((difference / 1000 / 60) % 60));
      const seconds = Math.max(0, Math.floor((difference / 1000) % 60));

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-10 py-6">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds },
      ].map((item, i) => (
        <motion.div 
          key={item.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center min-w-[90px] sm:min-w-[130px] relative group"
        >
          {/* Glass background arch */}
          <div className="absolute inset-0 bg-white/60 border border-brand-gold/40 shadow-[0_15px_30px_rgba(193,18,31,0.1)] rounded-[3rem_3rem_1rem_1rem] sm:rounded-[4rem_4rem_1.5rem_1.5rem] group-hover:shadow-[0_20px_40px_rgba(193,18,31,0.2)] transition-all duration-700 ease-out group-hover:-translate-y-3 pointer-events-none" />
          
          <div className="relative pt-10 pb-8 px-4 flex flex-col items-center w-full z-10 transition-transform duration-700 group-hover:-translate-y-3">
            {/* Elegant number */}
            <span className="text-5xl sm:text-6xl lg:text-7xl font-display font-medium text-brand-mocha mb-4 tabular-nums tracking-wide">
              {String(item.value).padStart(2, '0')}
            </span>
            {/* Divider line */}
            <div className="w-10 h-[1.5px] bg-gradient-to-r from-transparent via-brand-mocha/50 to-transparent mb-4" />
            {/* Label */}
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-brand-sand font-semibold">{item.label}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
