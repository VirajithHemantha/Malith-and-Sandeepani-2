import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn } from 'lucide-react';

const images = [
  { id: 1, url: '/images/a.jpg', fallback: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop', title: 'The Beginning' },
  { id: 2, url: '/images/b.jpg', fallback: 'https://images.unsplash.com/photo-1522673607200-164d1f624698?q=80&w=800&auto=format&fit=crop', title: 'Our Journey' },
  { id: 3, url: '/images/c.jpg', fallback: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop', title: 'A Thousand Words' },
  { id: 4, url: '/images/d.jpg', fallback: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop', title: 'Endless Love' },
  { id: 5, url: '/images/e.jpg', fallback: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800&auto=format&fit=crop', title: 'Cherished Moments' },
  { id: 6, url: '/images/f.jpg', fallback: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop', title: 'Together Forever' },
];

export const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Duplicate the array to create a seamless infinite marquee
  const marqueeImages = [...images, ...images];

  return (
    <div className="w-full relative py-12 md:py-20 overflow-hidden">
      <style>
        {`
          @keyframes slide-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: slide-left 40s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* Premium ambient backdrop & glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-radial from-brand-gold/15 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-[90rem] mx-auto px-6 mb-12 sm:mb-20 text-center relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="inline-flex items-center gap-4 mb-4 sm:mb-6 justify-center">
            <div className="w-12 sm:w-24 h-[1px] bg-gradient-to-r from-transparent to-brand-mocha/60" />
            <span className="text-brand-mocha uppercase tracking-[0.5em] sm:tracking-[0.6em] text-[10px] sm:text-[11px] font-bold font-sans drop-shadow-sm">A Lifetime OF</span>
            <div className="w-12 sm:w-24 h-[1px] bg-gradient-to-l from-transparent to-brand-mocha/60" />
          </div>
          <h2 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-display text-brand-mocha tracking-tight drop-shadow-sm leading-tight">
            Our <span className="italic font-light text-brand-gold">Gallery</span>
          </h2>
        </motion.div>
      </div>

      {/* Infinite Auto-Scrolling Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="w-full relative"
      >
        <div className="animate-marquee gap-6 sm:gap-10 px-6 sm:px-10 pb-16 pt-4 items-center cursor-ew-resize">
          {marqueeImages.map((image, index) => (
            <div
              key={`${image.id}-${index}`}
              className="relative flex-none w-[75vw] sm:w-[45vw] lg:w-[28vw] aspect-[3/4] sm:aspect-[4/5] arch-shape overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)] group cursor-pointer border-[8px] sm:border-[10px] border-white ring-1 ring-brand-gold/30 bg-brand-champagne transform transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_60px_rgba(193,18,31,0.2)]"
              onClick={() => setSelectedImage(image.url)}
            >
              <img
                src={image.url}
                onError={(e) => { e.currentTarget.src = image.fallback; }}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
              />
              {/* Elegant deep inner shadow for frame depth */}
              <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.15)] pointer-events-none" />

              {/* Soft Cinematic Hover Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end justify-center p-8 sm:p-10 pointer-events-none">
                <div className="text-white text-center transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                  <ZoomIn className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-4 text-white/90 drop-shadow-md opacity-80" />
                  <p className="font-serif text-3xl sm:text-4xl tracking-wide drop-shadow-lg font-light">{image.title}</p>
                  <div className="w-16 h-[2px] bg-brand-gold/80 mx-auto mt-5 drop-shadow-md" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Soft edge blur overlays to blend carousel into the page */}
        <div className="absolute top-0 left-0 w-16 sm:w-40 h-full bg-gradient-to-r from-brand-ivory to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-16 sm:w-40 h-full bg-gradient-to-l from-brand-ivory to-transparent pointer-events-none z-10" />
      </motion.div>

      {/* Fullscreen Premium Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 sm:top-8 sm:right-8 text-white/50 hover:text-white transition-colors p-4 bg-white/10 rounded-full backdrop-blur-md shadow-2xl hover:bg-white/20 group"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8 group-hover:rotate-90 transition-transform duration-500" />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              src={selectedImage}
              onError={(e) => {
                const fallbackImage = marqueeImages.find(img => img.url === selectedImage)?.fallback;
                if (fallbackImage) e.currentTarget.src = fallbackImage;
              }}
              alt="Gallery Preview"
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.6)] border-[6px] border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
