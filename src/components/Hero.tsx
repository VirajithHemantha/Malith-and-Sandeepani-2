import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { FloatingPetals } from './FloatingPetals';
import { getGuestFromLocation } from '../lib/invite';
import { Ornament } from './DecorativeDivider';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const guestName = getGuestFromLocation();
  // Scroll-linked parallax only on desktop; on phones it runs JS every scroll
  // frame and moves a full-screen image, which makes iPhones stutter.
  const [parallax] = useState(
    () => typeof window !== 'undefined' && !!window.matchMedia &&
      window.matchMedia('(min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference)').matches
  );
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-screen supports-[height:100svh]:min-h-svh flex items-center justify-center overflow-hidden bg-white/50 pt-24 pb-36 sm:py-28">

      {/* Background Image with Parallax & Elegant Overlay */}
      <motion.div
        className="absolute inset-0 z-0 origin-center"
        style={parallax ? { y: y1 } : undefined}
      >
        <img
          src="/x.jpg"
          fetchPriority="high"
          decoding="async"
          alt="Malith and Nipunika"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 20%' }}
        />
        {/* Soft elegant gradient overlays to ensure text readability & premium feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ivory via-white/40 to-white/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-gold/10 via-transparent to-brand-gold/5" />
      </motion.div>

      {/* Luxury Border Frame */}
      <div className="absolute inset-6 border border-brand-gold/30 rounded-3xl pointer-events-none z-10 hidden sm:block " />
      <div className="absolute inset-8 border-[0.5px] border-brand-gold/20 rounded-2xl pointer-events-none z-10 hidden sm:block" />

      {/* Corner Ornaments */}
      <div className="absolute top-6 left-6 w-12 h-12 pointer-events-none z-10 hidden sm:block opacity-60">
        <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
          <path d="M5,5 L5,25 C5,15 15,5 25,5 L5,5 Z" fill="none" stroke="#c1121f" strokeWidth="1"/>
          <circle cx="5" cy="5" r="2" fill="#c1121f" />
        </svg>
      </div>
      <div className="absolute top-6 right-6 w-12 h-12 pointer-events-none z-10 hidden sm:block opacity-60" style={{ transform: 'scaleX(-1)' }}>
        <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
          <path d="M5,5 L5,25 C5,15 15,5 25,5 L5,5 Z" fill="none" stroke="#c1121f" strokeWidth="1"/>
          <circle cx="5" cy="5" r="2" fill="#c1121f" />
        </svg>
      </div>
      <div className="absolute bottom-6 left-6 w-12 h-12 pointer-events-none z-10 hidden sm:block opacity-60" style={{ transform: 'scaleY(-1)' }}>
        <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
          <path d="M5,5 L5,25 C5,15 15,5 25,5 L5,5 Z" fill="none" stroke="#c1121f" strokeWidth="1"/>
          <circle cx="5" cy="5" r="2" fill="#c1121f" />
        </svg>
      </div>
      <div className="absolute bottom-6 right-6 w-12 h-12 pointer-events-none z-10 hidden sm:block opacity-60" style={{ transform: 'scale(-1, -1)' }}>
        <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
          <path d="M5,5 L5,25 C5,15 15,5 25,5 L5,5 Z" fill="none" stroke="#c1121f" strokeWidth="1"/>
          <circle cx="5" cy="5" r="2" fill="#c1121f" />
        </svg>
      </div>

      {/* Persistent subtle falling petals in background */}
      <div className="absolute inset-0 z-[5] opacity-60">
        <FloatingPetals />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 w-full max-w-6xl"
        style={parallax ? { opacity } : undefined}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Subtle top decoration */}
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-brand-gold/60 to-transparent" />
            <Ornament className="w-8 h-8" />
            <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-brand-gold/60 to-transparent" />
          </div>

          <span className="[text-shadow:0_1px_12px_rgba(255,255,255,0.9)] text-brand-mocha uppercase tracking-[0.4em] sm:tracking-[0.6em] text-xs sm:text-sm font-medium mb-6 sm:mb-10 block font-sans">
            Homecoming Celebration
          </span>

          <div className="relative mb-8 sm:mb-12 w-full flex justify-center">
            {/* Soft glow behind text for contrast and magical feel */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[140%] bg-[radial-gradient(closest-side,rgba(255,255,255,0.85),rgba(255,255,255,0.4)_60%,rgba(255,255,255,0))] rounded-full pointer-events-none" />

            <h1 className="relative text-6xl sm:text-[7rem] lg:text-[9.5rem] font-display text-brand-mocha leading-[1.1] sm:leading-[0.9]">
              <span className="text-red-foil">Malith</span> <br className="sm:hidden" />
              <span className="text-brand-gold italic font-light mx-2 sm:mx-6 text-5xl sm:text-[6rem] lg:text-[8rem] inline-block -translate-y-2 sm:-translate-y-6">&</span>
              <br className="sm:hidden" />
              <span className="text-red-foil">Nipunika</span>
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16">
            <div className="hidden sm:block h-[1px] w-20 bg-gradient-to-r from-transparent to-brand-gold/40" />
            {guestName ? (
              <p className="text-[1.1rem] sm:text-2xl font-serif italic text-brand-mocha tracking-wide px-4 text-center max-w-xl leading-relaxed [text-shadow:0_1px_12px_rgba(255,255,255,0.9)]">
                We cordially invite
                <span className="block not-italic font-display text-2xl sm:text-4xl text-brand-gold my-2 sm:my-3 tracking-wide">
                  {guestName}
                </span>
                to celebrate our special day with us
              </p>
            ) : (
              <p className="text-[1.1rem] sm:text-2xl font-serif italic text-brand-mocha tracking-wide px-4 text-center max-w-xl leading-relaxed [text-shadow:0_1px_12px_rgba(255,255,255,0.9)]">
                Together with our families, we joyfully invite you to celebrate our homecoming
              </p>
            )}
            <div className="hidden sm:block h-[1px] w-20 bg-gradient-to-l from-transparent to-brand-gold/40" />
          </div>

          {/* Enhanced Date pill with premium glass effect */}
          <div className="inline-block relative group mt-4 sm:mt-8 w-full sm:w-auto px-4 sm:px-0">
            <div className="absolute inset-0 rounded-full shadow-[0_0_14px_4px_rgba(179,18,29,0.25)] pointer-events-none" />
            <div className="relative px-4 sm:px-12 py-3 sm:py-5 bg-white/70 border border-brand-gold/50 rounded-full shadow-[0_8px_30px_rgba(193,18,31,0.15)] overflow-hidden whitespace-nowrap flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
              <span className="relative text-[16px] sm:text-3xl font-serif text-brand-mocha tracking-[0.2em] sm:tracking-[0.4em] font-medium flex items-center gap-2 sm:gap-3 whitespace-nowrap">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-brand-gold flex-shrink-0" />
                13 . 12 . 2026
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-brand-gold flex-shrink-0" />
              </span>
            </div>
            
          </div>
        </motion.div>
      </motion.div>

      {/* Premium Side Decorative Text */}
      <div className="absolute left-8 sm:left-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6 opacity-80">
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent to-brand-gold/50" />
        <p className="writing-mode-vertical text-[11px] uppercase tracking-[0.6em] text-brand-mocha font-semibold font-sans">
          Devon Hotel • Ampitiya Road
        </p>
        <div className="w-[1px] h-24 bg-gradient-to-t from-transparent to-brand-gold/50" />
      </div>

      <div className="absolute right-8 sm:right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6 opacity-80">
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent to-brand-gold/50" />
        <p className="writing-mode-vertical text-[11px] uppercase tracking-[0.6em] text-brand-mocha font-semibold font-sans rotate-180">
          Save the Date • December 2026
        </p>
        <div className="w-[1px] h-24 bg-gradient-to-t from-transparent to-brand-gold/50" />
      </div>

      {/* Refined Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
        whileHover={{ scale: 1.1 }}
      >
        <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.4em] text-brand-sand font-semibold">Discover</span>
        <div className="w-[1px] h-12 sm:h-20 bg-gradient-to-b from-brand-gold/60 to-transparent animate-bounce" />
      </motion.div>
    </div>
  );
};
