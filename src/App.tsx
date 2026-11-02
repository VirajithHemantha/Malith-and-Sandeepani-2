import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, VolumeX, Heart } from 'lucide-react';
import { Toaster } from 'sonner';

import { EnvelopeOpening } from './components/EnvelopeOpening';
import { Hero } from './components/Hero';
import { CoupleDetails } from './components/CoupleDetails';
import { CeremonyDetails } from './components/CeremonyDetails';
import { Location } from './components/Location';
import { Timeline } from './components/Timeline';
import { Countdown } from './components/Countdown';
import { RSVPForm } from './components/RSVPForm';
import { WishesSection } from './components/WishesSection';
import { DecorativeDivider } from './components/DecorativeDivider';
import { SafeSection } from './components/SafeSection';

export default function App() {
  const [showInvitation, setShowInvitation] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/song.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    audioRef.current.preload = 'metadata';

    // Pause the song when the guest switches apps or locks the phone
    const onVisibility = () => {
      if (document.hidden) audioRef.current?.pause();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleMusicStart = () => {
    setIsMusicPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  if (!showInvitation) {
    return (
      <EnvelopeOpening
        onComplete={() => setShowInvitation(true)}
        onMusicStart={handleMusicStart}
      />
    );
  }

  // Set the wedding date for the countdown
  const weddingDate = new Date("2026-12-13T10:00:00");

  return (
    <div className="font-sans text-brand-mocha bg-brand-champagne bg-texture-paper overflow-hidden selection:bg-brand-gold/20">
      <Toaster position="top-center" />
      
      {/* Premium Floating Music Toggle */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 1 }}
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 w-12 sm:w-14 h-12 sm:h-14 bg-brand-black/90 rounded-full shadow-[0_8px_30px_rgba(193,18,31,0.2)] flex items-center justify-center border border-brand-gold/60 text-white hover:scale-105 transition-all duration-300"
      >
        {isMusicPlaying ? <Music className="w-5 h-5 sm:w-6 sm:h-6" /> : <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />}
      </motion.button>

      <SafeSection><Hero /></SafeSection>
      <DecorativeDivider />
      
      <div className="py-8 sm:py-12 bg-gradient-to-b from-white/90 via-brand-champagne/90 to-white/90 relative inner-border-gold m-4 sm:m-8 rounded-[2rem]">
        <SafeSection><CoupleDetails /></SafeSection>
      </div>

      <DecorativeDivider />

      <div className="py-8 sm:py-12 bg-white/80 relative">
        <SafeSection><CeremonyDetails /></SafeSection>
      </div>

      <DecorativeDivider />

      <div className="py-8 sm:py-12 bg-gradient-to-b from-white/80 via-brand-champagne/90 to-white/80 relative inner-border-gold m-4 sm:m-8 rounded-[2rem]">
        <SafeSection><Location /></SafeSection>
      </div>

      <DecorativeDivider />

      <div className="py-8 sm:py-12 bg-white/80 relative">
        <SafeSection><Timeline /></SafeSection>
      </div>

      <DecorativeDivider />


      <div className="py-12 sm:py-16 bg-brand-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(179,18,29,0.35),transparent_65%)] pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
          <div className="max-w-6xl mx-auto px-6 mb-12 text-center relative">
            <span className="text-white/90 uppercase tracking-[0.4em] text-[10px] sm:text-[11px] font-bold">
              The Wait Is Almost Over
            </span>
          </div>
          <SafeSection><Countdown targetDate={weddingDate} /></SafeSection>
      </div>

      <DecorativeDivider />

      <div className="py-8 sm:py-12 bg-brand-champagne/90 relative inner-border-gold m-4 sm:m-8 rounded-[2rem]">
        <SafeSection><RSVPForm /></SafeSection>
      </div>

      <DecorativeDivider />

      <div className="py-8 sm:py-12 bg-gradient-to-b from-brand-champagne/80 to-white/90 relative">
        <SafeSection><WishesSection /></SafeSection>
      </div>

      {/* Elegant Footer Signature */}
      <footer className="py-12 bg-brand-black border-t-2 border-brand-gold text-center relative overflow-hidden mt-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(closest-side,rgba(179,18,29,0.25),rgba(179,18,29,0))] rounded-full pointer-events-none" />
        <Heart className="w-6 h-6 mx-auto mb-6 text-brand-gold-light fill-brand-gold/40" />
        <p className="font-display text-4xl sm:text-5xl mb-2"><span className="text-white">Malith</span> <span className="text-brand-gold-light italic">&</span> <span className="text-white">Nipunika</span></p>
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] font-sans text-white/60 font-semibold block mb-8">
          December 13, 2026 • Devon Hotel
        </span>
      </footer>
    </div>
  );
}
