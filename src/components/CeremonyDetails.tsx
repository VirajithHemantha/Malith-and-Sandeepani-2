import React from 'react';
import { motion } from 'motion/react';
import { Clock, Calendar, MapPin, Heart, Sparkles, CalendarPlus } from 'lucide-react';

const calendarUrl =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  `&text=${encodeURIComponent('Malith & Nipunika — Homecoming')}` +
  '&dates=20261213T100000/20261213T160000&ctz=Asia/Colombo' +
  `&location=${encodeURIComponent('Devon Hotel, Ampitiya Road')}` +
  `&details=${encodeURIComponent('10.00 AM Function starts · 12.30 PM Buffet opens · 4.00 PM Wedding send off\nhttps://maps.app.goo.gl/5k8w3bRbheoc6nfL6')}`;

export const CeremonyDetails: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
      {/* Premium ambient backdrop */}
      <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-[radial-gradient(closest-side,rgba(179,18,29,0.07),rgba(179,18,29,0))] rounded-full pointer-events-none" />
      
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        {/* Left Side: Text Content */}
        <div className="lg:w-1/2 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-4 mb-6">
              <span className="text-brand-mocha uppercase tracking-[0.4em] sm:tracking-[0.5em] text-[10px] sm:text-[11px] font-bold">
                The Homecoming
              </span>
              <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-brand-mocha/60 to-transparent" />
            </div>
            
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-display text-brand-mocha mb-8 leading-[1.1]">
              Welcoming Us <br />
              <span className="italic font-light text-brand-gold">Home Together</span>
            </h2>
            
            <p className="text-brand-sand/90 font-serif text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
              With hearts full of joy, we warmly invite you to celebrate our homecoming with us. Your blessings and presence will make this beautiful new beginning truly complete.
            </p>

            {/* Premium Timeline */}
            <div className="relative space-y-12 ml-10 sm:ml-12 border-l-[1.5px] border-brand-gold/30 pl-10 sm:pl-12 py-4">
              
              {/* Calendar */}
              <div className="relative group">
                <div className="absolute top-1/2 -translate-y-1/2 -left-[64px] sm:-left-[74px] w-12 h-12 bg-white rounded-full border border-brand-gold/40 shadow-lg flex items-center justify-center group-hover:border-brand-mocha group-hover:shadow-[0_4px_15px_rgba(193,18,31,0.3)] transition-all duration-500">
                  <Calendar className="w-5 h-5 text-brand-mocha group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="font-serif text-2xl sm:text-3xl text-brand-mocha mb-2 group-hover:text-brand-mocha transition-colors duration-500">Sunday, December 13</h4>
                  <p className="text-brand-sand/80 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-bold">The Year Two Thousand Twenty Six</p>
                </div>
              </div>

              {/* Clock */}
              <div className="relative group">
                <div className="absolute top-1/2 -translate-y-1/2 -left-[64px] sm:-left-[74px] w-12 h-12 bg-white rounded-full border border-brand-gold/40 shadow-lg flex items-center justify-center group-hover:border-brand-mocha group-hover:shadow-[0_4px_15px_rgba(193,18,31,0.3)] transition-all duration-500">
                  <Clock className="w-5 h-5 text-brand-mocha group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="font-serif text-2xl sm:text-3xl text-brand-mocha mb-2 group-hover:text-brand-mocha transition-colors duration-500">10:00 AM</h4>
                  <p className="text-brand-sand/80 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-bold">Homecoming Celebration Begins</p>
                </div>
              </div>

              {/* Location */}
              <div className="relative group">
                <div className="absolute top-1/2 -translate-y-1/2 -left-[64px] sm:-left-[74px] w-12 h-12 bg-white rounded-full border border-brand-gold/40 shadow-lg flex items-center justify-center group-hover:border-brand-mocha group-hover:shadow-[0_4px_15px_rgba(193,18,31,0.3)] transition-all duration-500">
                  <MapPin className="w-5 h-5 text-brand-mocha group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="font-serif text-2xl sm:text-3xl text-brand-mocha mb-2 group-hover:text-brand-mocha transition-colors duration-500">Devon Hotel</h4>
                  <p className="text-brand-sand/80 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-bold">Ampitiya Road</p>
                </div>
              </div>
            </div>

            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-3 bg-brand-black text-white px-8 py-4 rounded-full font-sans tracking-[0.2em] text-[11px] font-bold uppercase border border-brand-black hover:bg-brand-gold hover:border-brand-gold transition-colors duration-300 shadow-[0_10px_25px_rgba(20,17,17,0.15)]"
            >
              <CalendarPlus className="w-4 h-4" />
              Add to Calendar
            </a>
          </motion.div>
        </div>

        {/* Right Side: Visual Composition */}
        <div className="lg:w-1/2 w-full relative mt-16 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative"
          >
            {/* Artistic Background Frame */}
            <div className="absolute -inset-4 sm:-inset-6 border-[2px] border-brand-gold/30 arch-shape -z-10 translate-x-4 sm:translate-x-8 translate-y-4 sm:translate-y-8" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-champagne/40 arch-shape -z-20" />

            {/* Main Creative Image Frame */}
            <div className="relative aspect-[3/4] sm:aspect-[4/5] arch-shape overflow-hidden border-[6px] sm:border-[8px] border-white shadow-[0_20px_50px_rgba(193,18,31,0.2)] bg-white group">
              <img
                src="/z.jpg"
                loading="lazy"
                decoding="async"
                onError={(e) => { 
                  e.currentTarget.src = "https://images.unsplash.com/photo-1519225421980-715cb02151ff?auto=format&fit=crop&q=80&w=800&h=1000"; 
                  e.currentTarget.onerror = null; 
                }}
                alt="Ceremony Venue"
                className="w-full h-full object-cover scale-[1.2] lg:scale-[1.15] object-[center_30%] transition-transform duration-[2s] ease-out group-hover:scale-[1.25] lg:group-hover:scale-[1.2]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5 pointer-events-none opacity-opacity-70 group-hover:opacity-100 transition-opacity duration-1000" />
            </div>

            {/* Decorative Floating Circles */}
            <div className="absolute -top-6 -right-6 w-24 sm:w-32 h-24 sm:h-32 rounded-full border-[1.5px] border-dashed border-brand-gold/30 animate-[spin_20s_linear_infinite]" />
            <div className="absolute -top-2 -right-2 w-16 sm:w-24 h-16 sm:h-24 rounded-full border-[1.5px] border-brand-gold/20" />
          </motion.div>

          {/* Reception Card — Placed Below Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
            className="mt-10 sm:mt-14 bg-white/85 p-6 sm:p-10 shadow-[0_30px_60px_rgba(193,18,31,0.15)] rounded-2xl border border-white relative overflow-hidden"
          >
            <div className="absolute inset-x-8 -top-px h-[2px] bg-gradient-to-r from-transparent via-brand-mocha/60 to-transparent" />
            <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <div className="flex items-center gap-3">
                <Heart className="text-brand-mocha w-8 h-8 sm:w-10 sm:h-10 fill-brand-gold/20 flex-shrink-0" />
                <Sparkles className="w-4 h-4 text-brand-gold animate-pulse flex-shrink-0" />
              </div>
              <div className="flex-1">
                <h4 className="font-display text-2xl sm:text-4xl text-brand-mocha mb-1 sm:mb-2 tracking-tight">Lunch Buffet</h4>
                <p className="text-brand-sand/90 font-serif text-sm sm:text-base leading-relaxed">
                  Join us for a delightful lunch buffet and an afternoon of celebration at Devon Hotel.
                </p>
              </div>
              <div className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-brand-champagne rounded-full border border-brand-gold/30 shadow-sm self-start sm:self-center flex-shrink-0">
                <span className="text-brand-mocha font-sans font-bold tracking-[0.1em] sm:tracking-[0.2em] text-[9px] sm:text-[11px] uppercase block">12:30 PM Onwards</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
