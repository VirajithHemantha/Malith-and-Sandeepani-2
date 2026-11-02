import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from 'motion/react';
import { getGuestFromLocation } from '../lib/invite';

// If the intro video hasn't started moving within this time (blocked, Low Power Mode,
// slow connection, in-app browsers), go straight to the invitation.
const START_TIMEOUT_MS = 5000;
// Hard cap so the intro can never trap a guest, whatever the video does.
const MAX_INTRO_MS = 15000;

export function EnvelopeOpening({ onComplete, onMusicStart }: { onComplete: () => void, onMusicStart?: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const finishedRef = useRef(false);
  const timersRef = useRef<number[]>([]);
  const guestName = getGuestFromLocation();

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    timersRef.current.forEach((t) => window.clearTimeout(t));
    // Release the decoded video before the invitation renders (frees memory on iPhones)
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.removeAttribute('src');
      video.load();
    }
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    // iOS Safari only plays inline when these are real attributes on the element
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
    }
    return () => timersRef.current.forEach((t) => window.clearTimeout(t));
  }, []);

  const handleStart = () => {
    setShowButton(false);
    setIsPlaying(true);
    if (onMusicStart) onMusicStart();

    const video = videoRef.current;
    if (!video) {
      finish();
      return;
    }

    timersRef.current.push(
      window.setTimeout(() => {
        if (video.currentTime < 0.1) finish();
      }, START_TIMEOUT_MS),
      window.setTimeout(finish, MAX_INTRO_MS)
    );

    const attempt = video.play();
    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch((error) => {
        console.error('Intro video could not play: ', error);
        finish();
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-[#050505] z-[100] flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        src="/images/greenopening.mp4"
        className="absolute w-full h-full object-cover transition-opacity duration-1000"
        style={{ opacity: isPlaying ? 1 : 0.3 }}
        playsInline
        preload="auto"
        muted
        onEnded={finish}
        onError={finish}
      />

      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-10"
          >
            <div className="w-[1px] h-24 bg-gradient-to-b from-transparent to-brand-gold/60 mb-8" />
            {guestName && (
              <div className="text-center mb-8 px-6">
                <span className="block font-sans uppercase tracking-[0.4em] text-[10px] text-white/70 mb-3">Dear</span>
                <span className="block font-display text-3xl sm:text-4xl text-white drop-shadow-lg">{guestName}</span>
              </div>
            )}
            <button
              onClick={handleStart}
              className="px-10 py-4 bg-transparent border border-brand-gold text-white font-sans uppercase tracking-[0.4em] text-xs hover:bg-brand-gold active:bg-brand-gold transition-all duration-500 rounded-full shadow-[0_0_30px_rgba(179,18,29,0.25)]"
            >
              Open Invitation
            </button>
            <div className="w-[1px] h-24 bg-gradient-to-t from-transparent to-brand-gold/60 mt-8" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip button, shown as soon as the intro starts */}
      {!showButton && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={finish}
          className="absolute bottom-[max(2rem,env(safe-area-inset-bottom))] right-6 px-4 py-2 rounded-full bg-black/40 border border-white/20 text-white/80 hover:text-white font-sans uppercase tracking-[0.2em] text-[10px] transition-colors z-20"
        >
          Skip Video
        </motion.button>
      )}
    </div>
  );
}
